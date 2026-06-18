import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import AnimatedNumber from '../../ui/AnimatedNumber.jsx';
import Skeleton from '../../ui/Skeleton.jsx';
import LiveBadge from '../../ui/LiveBadge.jsx';
import Stars from '../../ui/Stars.jsx';

export function CodeChefCard({ data, loading }) {
  const currentRating = data?.currentRating ?? null;
  const highestRating = data?.highestRating ?? null;
  const stars = data?.stars ?? 3;
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
        <img src='/assets/codechef.png' className='h-12 filter sepia brightness-110 drop-shadow-lg' style={{ filter: 'sepia(0.8) hue-rotate(35deg) brightness(1.2)', backgroundColor: 'transparent' }} alt="CodeChef" />
        {isLive && <LiveBadge fetchedAt={fetchedAt} />}
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

export default CodeChefCard;
