import { timeAgo } from '../../utils/timeAgo.js';

export function LiveBadge({ fetchedAt }) {
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

export default LiveBadge;
