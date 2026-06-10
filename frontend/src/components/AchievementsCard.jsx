import React from 'react';
import { Shield, Star, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const achievements = [
  {
    platform: 'LeetCode',
    rank: 'Knight',
    icon: <Shield className="text-[#e9c176]" size={24} />,
  },
  {
    platform: 'CodeChef',
    rank: '3 star',
    icon: <Star className="text-[#e9c176]" size={24} />,
  },
  {
    platform: 'Codeforces',
    rank: 'Specialist',
    icon: <User className="text-[#e9c176]" size={24} />,
  },
];

export default function AchievementsCard() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 h-full flex flex-col justify-center">
      <h3 className="font-serif text-3xl text-white mb-6">Achievements</h3>
      <div className="space-y-4">
        {achievements.map((ach, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-black/20 rounded-lg">
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
  );
}
