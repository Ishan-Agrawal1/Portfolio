import { logger } from '../utils/logger.js';

// ─── In-memory cache (15-minute TTL) ────────────────────────────────
const CACHE_TTL_MS = 15 * 60 * 1000;
let cache = { data: null, timestamp: 0 };

function isCacheValid() {
  return cache.data && Date.now() - cache.timestamp < CACHE_TTL_MS;
}

// ─── Codeforces (official API) ──────────────────────────────────────
async function fetchCodeforces() {
  const handle = 'ishan_agr';
  const url = `https://codeforces.com/api/user.info?handles=${handle}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Codeforces API returned ${res.status}`);

  const json = await res.json();
  if (json.status !== 'OK' || !json.result?.length) {
    throw new Error('Codeforces returned unexpected payload');
  }

  const user = json.result[0];

  // Also fetch rating history to get contest count
  let contestCount = 0;
  try {
    const ratingRes = await fetch(
      `https://codeforces.com/api/user.rating?handle=${handle}`
    );
    if (ratingRes.ok) {
      const ratingJson = await ratingRes.json();
      if (ratingJson.status === 'OK') {
        contestCount = ratingJson.result?.length || 0;
      }
    }
  } catch {
    // non-critical — fall back to 0
  }

  return {
    platform: 'codeforces',
    handle,
    profileUrl: `https://codeforces.com/profile/${handle}`,
    rating: user.rating,
    maxRating: user.maxRating,
    rank: user.rank,
    maxRank: user.maxRank,
    contests: contestCount,
    fetchedAt: new Date().toISOString(),
  };
}

// ─── LeetCode (unofficial GraphQL) ──────────────────────────────────
async function fetchLeetCode() {
  const username = 'Ishan_Agrawal';
  const graphqlUrl = 'https://leetcode.com/graphql/';

  // Query 1 — solved problems breakdown
  const statsQuery = {
    query: `query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
        }
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }`,
    variables: { username },
  };

  // Query 2 — contest rating
  const contestQuery = {
    query: `query userContestRankingInfo($username: String!) {
      userContestRanking(username: $username) {
        rating
        globalRanking
        totalParticipants
        attendedContestsCount
        topPercentage
      }
    }`,
    variables: { username },
  };

  const headers = {
    'Content-Type': 'application/json',
    Referer: 'https://leetcode.com',
  };

  const [statsRes, contestRes] = await Promise.all([
    fetch(graphqlUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(statsQuery),
    }),
    fetch(graphqlUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(contestQuery),
    }),
  ]);

  if (!statsRes.ok) throw new Error(`LeetCode stats API returned ${statsRes.status}`);
  if (!contestRes.ok) throw new Error(`LeetCode contest API returned ${contestRes.status}`);

  const statsJson = await statsRes.json();
  const contestJson = await contestRes.json();

  const user = statsJson.data?.matchedUser;
  if (!user) throw new Error('LeetCode user not found');

  const acStats = user.submitStats?.acSubmissionNum || [];
  const totalSolved = acStats.find((s) => s.difficulty === 'All')?.count || 0;
  const easySolved = acStats.find((s) => s.difficulty === 'Easy')?.count || 0;
  const mediumSolved = acStats.find((s) => s.difficulty === 'Medium')?.count || 0;
  const hardSolved = acStats.find((s) => s.difficulty === 'Hard')?.count || 0;

  const contest = contestJson.data?.userContestRanking;

  return {
    platform: 'leetcode',
    handle: username,
    profileUrl: `https://leetcode.com/u/${username}/`,
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    contestRating: contest?.rating ? Math.round(contest.rating) : null,
    globalRanking: contest?.globalRanking || null,
    totalParticipants: contest?.totalParticipants || null,
    topPercentage: contest?.topPercentage || null,
    contestsAttended: contest?.attendedContestsCount || null,
    profileRanking: user.profile?.ranking || null,
    fetchedAt: new Date().toISOString(),
  };
}

// ─── CodeChef (direct profile page scraping) ────────────────────────
async function fetchCodeChef() {
  const username = 'agrawal_ishan6';
  const profileUrl = `https://www.codechef.com/users/${username}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  const res = await fetch(profileUrl, {
    signal: controller.signal,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  clearTimeout(timeout);

  if (!res.ok) throw new Error(`CodeChef profile page returned ${res.status}`);

  const html = await res.text();

  // ── Extract data from embedded Drupal.settings JSON ──
  // The page has: jQuery.extend(Drupal.settings, { ... date_versus_rating: { all: [...] } ... });
  const settingsMatch = html.match(
    /jQuery\.extend\(Drupal\.settings,\s*(\{[\s\S]*?\})\);/
  );

  let currentRating = null;
  let highestRating = null;
  let contests = 0;
  let globalRank = null;
  let lastContest = null;

  if (settingsMatch) {
    try {
      const settings = JSON.parse(settingsMatch[1]);
      const ratingHistory = settings.date_versus_rating?.all || [];

      if (ratingHistory.length > 0) {
        contests = ratingHistory.length;

        // Current rating = last entry's rating
        const lastEntry = ratingHistory[ratingHistory.length - 1];
        currentRating = parseInt(lastEntry.rating, 10) || null;
        globalRank = parseInt(lastEntry.rank, 10) || null;
        lastContest = lastEntry.name || null;

        // Highest rating = max across all entries
        highestRating = Math.max(
          ...ratingHistory.map((e) => parseInt(e.rating, 10) || 0)
        );
      }
    } catch (e) {
      logger.warn('Failed to parse CodeChef Drupal.settings JSON', {
        error: e.message,
      });
    }
  }

  // ── Extract star rating from HTML ──
  // Pattern: <span class='rating' style='...; background: #COLOR; ...'>3★</span>
  let stars = null;
  const starMatch = html.match(
    /<span\s+class='rating'[^>]*>(\d+)&#9733;<\/span>/
  );
  if (starMatch) {
    stars = parseInt(starMatch[1], 10);
  }

  // ── Extract total problems solved from HTML ──
  // Pattern: <h3>Total Problems Solved: 237</h3>
  let totalProblemsSolved = null;
  const problemsMatch = html.match(
    /Total Problems Solved:\s*(\d+)/i
  );
  if (problemsMatch) {
    totalProblemsSolved = parseInt(problemsMatch[1], 10);
  }

  // ── Extract league from HTML ──
  // Pattern: <span class="tooltip">Silver League</span>
  let league = null;
  const leagueMatch = html.match(
    /alt="([^"]*League)"/i
  );
  if (leagueMatch) {
    league = leagueMatch[1];
  }

  return {
    platform: 'codechef',
    handle: username,
    profileUrl,
    currentRating,
    highestRating,
    stars,
    contests,
    globalRank,
    lastContest,
    totalProblemsSolved,
    league,
    fetchedAt: new Date().toISOString(),
  };
}

// ─── GeeksforGeeks (static data — GFG is a client-rendered SPA with no public API) ──
async function fetchGeeksforGeeks() {
  const username = 'agrawaliu1lq';
  const profileUrl = 'https://www.geeksforgeeks.org/profile/agrawaliu1lq';

  return {
    platform: 'geeksforgeeks',
    handle: username,
    profileUrl,
    problemsSolved: 100,
    codingScore: 259,
    instituteRank: 349,
    difficultyBreakdown: {
      school: 0,
      basic: 22,
      easy: 39,
      medium: 37,
      hard: 2,
    },
    fetchedAt: new Date().toISOString(),
  };
}

// ─── Main controller ────────────────────────────────────────────────
export async function getCodingProfiles(req, res) {
  // Return cached data if still valid
  if (isCacheValid()) {
    logger.debug('Serving coding profiles from cache');
    return res.status(200).json({
      success: true,
      cached: true,
      data: cache.data,
    });
  }

  logger.info('Fetching fresh coding profiles from external APIs');

  const [cfResult, lcResult, ccResult, gfgResult] = await Promise.allSettled([
    fetchCodeforces(),
    fetchLeetCode(),
    fetchCodeChef(),
    fetchGeeksforGeeks(),
  ]);

  const data = {
    codeforces:
      cfResult.status === 'fulfilled'
        ? cfResult.value
        : { platform: 'codeforces', error: cfResult.reason?.message },
    leetcode:
      lcResult.status === 'fulfilled'
        ? lcResult.value
        : { platform: 'leetcode', error: lcResult.reason?.message },
    codechef:
      ccResult.status === 'fulfilled'
        ? ccResult.value
        : { platform: 'codechef', error: ccResult.reason?.message },
    geeksforgeeks:
      gfgResult.status === 'fulfilled'
        ? gfgResult.value
        : { platform: 'geeksforgeeks', error: gfgResult.reason?.message },
    fetchedAt: new Date().toISOString(),
  };

  // Only cache if at least one platform succeeded
  const anySuccess = [cfResult, lcResult, ccResult, gfgResult].some(
    (r) => r.status === 'fulfilled'
  );
  if (anySuccess) {
    cache = { data, timestamp: Date.now() };
  }

  res.status(200).json({
    success: true,
    cached: false,
    data,
  });
}

export default { getCodingProfiles };
