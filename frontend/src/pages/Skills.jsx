import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, Terminal, Code2, Trophy, Globe, ArrowUpRight, ExternalLink } from 'lucide-react';
import SkillTag from '../components/SkillTag.jsx';
import { DSA_SKILLS, TECH_STACK } from '../utils/constants.js';
import useCodingProfiles from '../hooks/useCodingProfiles.js';

// ─── Helpers ────────────────────────────────────────────────────────

function timeAgo(isoString) {
  if (!isoString) return null;
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function AnimatedNumber({ value, suffix = '' }) {
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (value == null) return;
    const target = typeof value === 'string' ? parseInt(value, 10) : value;
    if (isNaN(target)) { setDisplay(value); return; }

    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [value]);

  return <>{display}{suffix}</>;
}

function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />;
}

function LiveBadge({ fetchedAt }) {
  const ago = timeAgo(fetchedAt);
  if (!ago) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="live-dot" />
      <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
        Synced {ago}
      </span>
    </div>
  );
}

function Stars({ count }) {
  const num = typeof count === 'string' ? parseInt(count, 10) : count;
  if (!num || isNaN(num)) return null;
  return (
    <span className="star-icon text-[#e9c176] text-2xl tracking-widest">
      {'★'.repeat(num)}
    </span>
  );
}

// ─── Codeforces Card ────────────────────────────────────────────────

function CodeforcesCard({ data, loading }) {
  // Fallback defaults
  const rating = data?.rating ?? 1942;
  const maxRating = data?.maxRating ?? 2015;
  const rank = data?.rank ?? 'candidate master';
  const contests = data?.contests ?? 142;
  const fetchedAt = data?.fetchedAt;
  const profileUrl = data?.profileUrl ?? 'https://codeforces.com/profile/ishan_agr';
  const isLive = !!data && !data.error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-[#141414] border border-white/5 p-10 rounded-2xl group hover:border-[#6b9bd2]/30 transition-all relative overflow-hidden"
    >
      {/* Subtle accent gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#6b9bd2]/5 to-transparent rounded-bl-full pointer-events-none" />

      <div className="flex items-center justify-between mb-10">
        <BarChart3 className="text-[#6b9bd2]/50" size={36} />
        {isLive && <LiveBadge fetchedAt={fetchedAt} />}
      </div>

      <h3 className="font-serif text-3xl mb-8">Codeforces</h3>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-14 w-28" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-[1px] w-full mt-8" />
          <div className="flex gap-10 mt-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-6xl font-serif text-[#6b9bd2]">
              <AnimatedNumber value={rating} />
            </span>
            <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest capitalize">
              {rank}
            </span>
          </div>

          <div className="pt-8 mt-8 border-t border-white/5 flex gap-10">
            <div>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Max Rating</p>
              <p className="text-lg font-serif"><AnimatedNumber value={maxRating} /></p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Contests</p>
              <p className="text-lg font-serif"><AnimatedNumber value={contests} /></p>
            </div>
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] text-gray-500 uppercase tracking-widest hover:text-[#6b9bd2] transition-colors"
          >
            View Profile <ExternalLink size={10} />
          </a>
        </>
      )}
    </motion.div>
  );
}

// ─── LeetCode Card ──────────────────────────────────────────────────

function LeetCodeCard({ data, loading }) {
  const totalSolved = data?.totalSolved ?? 850;
  const easySolved = data?.easySolved ?? 200;
  const mediumSolved = data?.mediumSolved ?? 450;
  const hardSolved = data?.hardSolved ?? 200;
  const contestRating = data?.contestRating ?? null;
  const topPercentage = data?.topPercentage ?? null;
  const fetchedAt = data?.fetchedAt;
  const profileUrl = data?.profileUrl ?? 'https://leetcode.com/u/Ishan_Agrawal/';
  const isLive = !!data && !data.error;

  // Total LC problems for progress bars (approximate)
  const TOTAL_EASY = 850;
  const TOTAL_MEDIUM = 1800;
  const TOTAL_HARD = 800;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#141414] border border-white/5 p-10 rounded-2xl group hover:border-[#e9c176]/30 transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#e9c176]/5 to-transparent rounded-bl-full pointer-events-none" />

      <div className="flex items-center justify-between mb-10">
        <Terminal className="text-[#e9c176]/50" size={36} />
        {isLive && <LiveBadge fetchedAt={fetchedAt} />}
      </div>

      <h3 className="font-serif text-3xl mb-8">LeetCode</h3>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-4 w-48 mt-4" />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                Problems Solved
              </p>
              <p className="text-5xl font-serif text-[#e9c176]">
                <AnimatedNumber value={totalSolved} />
              </p>
            </div>
            {contestRating && (
              <div className="text-right">
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">
                  Contest Rating
                </p>
                <p className="text-2xl font-serif">
                  <AnimatedNumber value={contestRating} />
                </p>
              </div>
            )}
          </div>

          {/* Difficulty breakdown */}
          <div className="space-y-3 mb-6">
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-mono text-[10px] text-green-400/80 uppercase">Easy</span>
                <span className="font-mono text-[10px] text-gray-500">{easySolved}</span>
              </div>
              <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((easySolved / TOTAL_EASY) * 100, 100)}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-green-400/60 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-mono text-[10px] text-amber-400/80 uppercase">Medium</span>
                <span className="font-mono text-[10px] text-gray-500">{mediumSolved}</span>
              </div>
              <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((mediumSolved / TOTAL_MEDIUM) * 100, 100)}%` }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="h-full bg-amber-400/60 rounded-full"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="font-mono text-[10px] text-red-400/80 uppercase">Hard</span>
                <span className="font-mono text-[10px] text-gray-500">{hardSolved}</span>
              </div>
              <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((hardSolved / TOTAL_HARD) * 100, 100)}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-red-400/60 rounded-full"
                />
              </div>
            </div>
          </div>

          {topPercentage && (
            <p className="font-mono text-[10px] text-[#e9c176] uppercase tracking-widest">
              Top {topPercentage.toFixed(1)}% globally
            </p>
          )}

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] text-gray-500 uppercase tracking-widest hover:text-[#e9c176] transition-colors"
          >
            View Profile <ExternalLink size={10} />
          </a>
        </>
      )}
    </motion.div>
  );
}

// ─── CodeChef Card ──────────────────────────────────────────────────

function CodeChefCard({ data, loading }) {
  const currentRating = data?.currentRating ?? null;
  const highestRating = data?.highestRating ?? null;
  const stars = data?.stars ?? 3;
  const globalRank = data?.globalRank ?? null;
  const countryRank = data?.countryRank ?? null;
  const isFallback = data?.fallback === true;
  const fetchedAt = data?.fetchedAt;
  const profileUrl = data?.profileUrl ?? 'https://www.codechef.com/users/agrawal_ishan6';
  const isLive = !!data && !data.error && !isFallback;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-[#141414] border border-white/5 p-10 rounded-2xl group hover:border-[#b8860b]/30 transition-all relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#b8860b]/5 to-transparent rounded-bl-full pointer-events-none" />

      <div className="flex items-center justify-between mb-10">
        <Code2 className="text-[#b8860b]/50" size={36} />
        {isLive ? (
          <LiveBadge fetchedAt={fetchedAt} />
        ) : (
          <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">
            Last synced: {fetchedAt ? timeAgo(fetchedAt) : 'N/A'}
          </span>
        )}
      </div>

      <h3 className="font-serif text-3xl mb-6">CodeChef</h3>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-6 w-32" />
          <div className="flex gap-10 mt-6">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      ) : (
        <>
          {/* Stars display */}
          <div className="mb-6">
            <Stars count={stars} />
          </div>

          {currentRating && (
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-5xl font-serif text-[#b8860b]">
                <AnimatedNumber value={currentRating} />
              </span>
              <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                Rating
              </span>
            </div>
          )}

          <div className="pt-8 mt-6 border-t border-white/5 flex gap-10">
            {highestRating && (
              <div>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Highest</p>
                <p className="text-lg font-serif"><AnimatedNumber value={highestRating} /></p>
              </div>
            )}
            {globalRank && (
              <div>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Global Rank</p>
                <p className="text-lg font-serif">{globalRank}</p>
              </div>
            )}
            {countryRank && (
              <div>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Country</p>
                <p className="text-lg font-serif">{countryRank}</p>
              </div>
            )}
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] text-gray-500 uppercase tracking-widest hover:text-[#b8860b] transition-colors"
          >
            View Profile <ExternalLink size={10} />
          </a>
        </>
      )}
    </motion.div>
  );
}

// ─── Main Skills Page ───────────────────────────────────────────────

export function Skills() {
  const { data, loading } = useCodingProfiles();

  const cf = data?.codeforces?.error ? null : data?.codeforces;
  const lc = data?.leetcode?.error ? null : data?.leetcode;
  const cc = data?.codechef?.error ? null : data?.codechef;

  return (
    <section className="px-10 md:px-20 max-w-7xl mx-auto space-y-40 py-20">
      <div className="max-w-4xl">
        <p className="font-mono text-xs text-[#e9c176] uppercase tracking-[0.3em] mb-6">Capabilities</p>
        <h2 className="font-serif text-7xl text-white mb-10 leading-[0.9]">
          Technical <br />
          <span className="italic text-gray-400">Expertise</span>
        </h2>
        <p className="font-sans text-gray-400 text-xl leading-relaxed font-light">
          I combine strong problem-solving, full-stack development, and modern technologies to build efficient and user-focused applications.
        </p>
      </div>

      {/* ── Platform Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CodeforcesCard data={cf} loading={loading} />
        <LeetCodeCard data={lc} loading={loading} />
        <CodeChefCard data={cc} loading={loading} />
      </div>

      {/* ── Achievements Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#141414] border border-white/5 p-8 rounded-2xl flex items-center gap-6 hover:border-[#e9c176]/20 transition-all"
        >
          <Trophy className="text-[#e9c176]" size={24} />
          <div>
            <p className="font-serif text-xl">ICPC Regional</p>
            <p className="font-mono text-[10px] text-gray-500 uppercase">Rank 14 — 2023</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-[#141414] border border-white/5 p-8 rounded-2xl flex items-center gap-6 hover:border-[#e9c176]/20 transition-all"
        >
          <Globe className="text-[#e9c176]" size={24} />
          <div>
            <p className="font-serif text-xl">Google Kickstart</p>
            <p className="font-mono text-[10px] text-gray-500 uppercase">Global Top 500</p>
          </div>
        </motion.div>
      </div>

      {/* ── Skill Tags ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-40">
        <div className="space-y-12">
          <h3 className="font-serif text-4xl">DSA Mastery</h3>
          <div className="flex flex-wrap gap-3">
            {DSA_SKILLS.map((skill) => (
              <SkillTag key={skill} skill={skill} />
            ))}
          </div>
        </div>
        <div className="space-y-12">
          <h3 className="font-serif text-4xl">Technical Stack</h3>
          <div className="flex flex-wrap gap-3">
            {TECH_STACK.map((tool, idx) => (
              <SkillTag key={tool} skill={tool} isHighlight={idx === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
