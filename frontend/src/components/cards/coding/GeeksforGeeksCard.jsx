import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import AnimatedNumber from '../../ui/AnimatedNumber.jsx';
import Skeleton from '../../ui/Skeleton.jsx';

export function GeeksforGeeksCard({ data, loading }) {
  const problemsSolved = data?.problemsSolved ?? 0;
  const codingScore = data?.codingScore ?? 0;
  const instituteRank = data?.instituteRank ?? 0;
  const breakdown = data?.difficultyBreakdown ?? {};
  const profileUrl = data?.profileUrl ?? 'https://www.geeksforgeeks.org/profile/agrawaliu1lq';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#141414] border border-white/5 p-8 rounded-2xl group hover:border-[#32bf6e]/20 transition-all"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl">GeeksforGeeks</h3>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-serif text-[#32bf6e]">
              <AnimatedNumber value={problemsSolved} />
            </span>
            <span className="text-xs text-gray-400">problems solved</span>
          </div>

          <div className="space-y-3">
            {[['Basic', breakdown.basic, '#60a5fa'], ['Easy', breakdown.easy, '#4ade80'], ['Medium', breakdown.medium, '#fbbf24'], ['Hard', breakdown.hard, '#f87171']].map(([label, count, color]) => (
              <div key={label}>
                <div className="flex justify-between text-[10px] mb-1">
                  <span style={{ color }}>{label}</span>
                  <span className="text-gray-400">{count ?? 0}</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${problemsSolved > 0 ? ((count ?? 0) / problemsSolved) * 100 : 0}%`, backgroundColor: color + '99' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-4 border-t border-white/5 flex gap-8">
            <div>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Coding Score</p>
              <p className="text-lg font-serif text-[#32bf6e]"><AnimatedNumber value={codingScore} /></p>
            </div>
            <div>
              <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Institute Rank</p>
              <p className="text-lg font-serif text-[#32bf6e]">#<AnimatedNumber value={instituteRank} /></p>
            </div>
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] text-gray-500 uppercase tracking-widest hover:text-[#32bf6e] transition-colors"
          >
            View Profile <ExternalLink size={10} />
          </a>
        </>
      )}
    </motion.div>
  );
}

export default GeeksforGeeksCard;
