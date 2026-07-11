import React from 'react';
import { Shield, Star, User } from 'lucide-react';
import useCodingProfiles from '../../hooks/useCodingProfiles.js';
import BorderGlow from '../ui/BorderGlow/BorderGlow.jsx';

const FALLBACK_ACHIEVEMENTS = [
  { platform: 'LeetCode', rank: 'Knight', icon: <Shield className="text-[#e9c176]" size={24} /> },
  { platform: 'CodeChef', rank: '3★', icon: <Star className="text-[#e9c176]" size={24} /> },
  { platform: 'Codeforces', rank: 'Specialist', icon: <User className="text-[#e9c176]" size={24} /> },
];

function capitalize(str) {
  if (!str) return str;
  return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function AchievementsCard() {
  const { data } = useCodingProfiles();

  const achievements = React.useMemo(() => {
    const lc = data?.leetcode;
    const cc = data?.codechef;
    const cf = data?.codeforces;

    return [
      {
        platform: 'LeetCode',
        rank: lc && !lc.error ? "Knight" : FALLBACK_ACHIEVEMENTS[0].rank,
        icon: <img src='/assets/leetcode.png' alt='LeetCode' className="w-8 h-8" />,
      },
      {
        platform: 'CodeChef',
        rank: cc && !cc.error && cc.stars ? '★'.repeat(typeof cc.stars === 'string' ? parseInt(cc.stars, 10) || 3 : cc.stars) : FALLBACK_ACHIEVEMENTS[1].rank,
        icon: <img src='/assets/codechef.png' alt='CodeChef' className="w-8 h-8" />,
      },
      {
        platform: 'Codeforces',
        rank: cf && !cf.error ? capitalize(cf.rank) : FALLBACK_ACHIEVEMENTS[2].rank,
        icon: <img src='/assets/code-forces.png' alt='Codeforces' className="w-8 h-8" />,
      },
    ];
  }, [data]);

  return (
    <BorderGlow
      backgroundColor="#141414"
      borderRadius={16}
      glowColor="40 80 80"
      colors={['#e9c176', '#f472b6', '#38bdf8']}
    >
      <div className="p-8 h-full flex flex-col justify-center">
        <h3 className="font-serif text-3xl text-white mb-6">Achievements</h3>
        <div className="space-y-4">
          {achievements.map((ach, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg">
                {ach.icon}
              </div>
              <div>
                <p className="font-mono text-sm text-gray-300">{ach.platform}</p>
                <p className="font-serif text-lg text-white">{ach.rank}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BorderGlow>
  );
}
