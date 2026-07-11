import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import AnimatedNumber from '../../ui/AnimatedNumber.jsx';
import Skeleton from '../../ui/Skeleton.jsx';
import LiveBadge from '../../ui/LiveBadge.jsx';
import BorderGlow from '../../ui/BorderGlow/BorderGlow.jsx';

export function CodeforcesCard({ data, loading }) {
  const rating = data?.rating ?? "N/A";
  const maxRating = data?.maxRating ?? "N/A";
  const rank = data?.rank ?? 'N/A';
  const contests = data?.contests ?? "N/A";
  const fetchedAt = data?.fetchedAt;
  const profileUrl = data?.profileUrl ?? 'https://codeforces.com/profile/ishan_agr';
  const isLive = !!data && !data.error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <BorderGlow
        backgroundColor="#141414"
        borderRadius={16}
        glowColor="215 60 65"
        colors={['#6b9bd2', '#38bdf8', '#818cf8']}
      >
        <div className="p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#6b9bd2]/5 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex items-center justify-between mb-10">
            <img src='/assets/code-forces.png' className='h-12 filter sepia brightness-110 drop-shadow-lg' style={{ filter: 'sepia(0.8) hue-rotate(35deg) brightness(1.2)', backgroundColor: 'transparent' }} alt="Codeforces" />
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
              <div className="mb-6">
                <span className="font-mono text-[12px] uppercase tracking-widest capitalize text-[#6b9bd2] font-bold">
                  {rank}
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-6xl font-serif text-[#6b9bd2]">
                  <AnimatedNumber value={rating} />
                </span>
                <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
                  Rating
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
        </div>
      </BorderGlow>
    </motion.div>
  );
}

export default CodeforcesCard;
