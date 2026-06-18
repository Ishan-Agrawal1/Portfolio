import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import AnimatedNumber from '../../ui/AnimatedNumber.jsx';
import Skeleton from '../../ui/Skeleton.jsx';
import LiveBadge from '../../ui/LiveBadge.jsx';

export function LeetCodeStatsCard({ data, loading }) {
  const totalSolved = data?.totalSolved ?? 0;
  const easySolved = data?.easySolved ?? 0;
  const mediumSolved = data?.mediumSolved ?? 0;
  const hardSolved = data?.hardSolved ?? 0;
  const fetchedAt = data?.fetchedAt;
  const profileUrl = data?.profileUrl ?? 'https://leetcode.com/u/Ishan_Agrawal/';
  const isLive = !!data && !data.error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-[#141414] border border-white/5 p-8 rounded-2xl group hover:border-[#e9c176]/20 transition-all"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl">LeetCode</h3>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-24" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-1 w-full" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-serif text-[#e9c176]">
              <AnimatedNumber value={totalSolved} />
            </span>
            <span className="text-xs text-gray-400">problems solved</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-green-400">Easy</span>
                <span className="text-gray-400"><AnimatedNumber value={easySolved} /></span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400/60 rounded-full transition-all duration-500"
                  style={{ width: `${totalSolved > 0 ? (easySolved / totalSolved) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-amber-400">Medium</span>
                <span className="text-gray-400"><AnimatedNumber value={mediumSolved} /></span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400/60 rounded-full transition-all duration-500"
                  style={{ width: `${totalSolved > 0 ? (mediumSolved / totalSolved) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-red-400">Hard</span>
                <span className="text-gray-400"><AnimatedNumber value={hardSolved} /></span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-400/60 rounded-full transition-all duration-500"
                  style={{ width: `${totalSolved > 0 ? (hardSolved / totalSolved) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row  justify-between items-center '>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center gap-2 font-mono text-[10px] text-gray-500 uppercase tracking-widest hover:text-[#e9c176] transition-colors"
            >
              View Profile <ExternalLink size={10} />
            </a>

            <p className='font-mono text-[10px] text-gray-400'>{isLive && <LiveBadge fetchedAt={fetchedAt} />}</p>
          </div>
        </>
      )}
    </motion.div>
  );
}

export default LeetCodeStatsCard;
