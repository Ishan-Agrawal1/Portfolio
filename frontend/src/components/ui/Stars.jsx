export function Stars({ count }) {
  const num = typeof count === 'string' ? parseInt(count, 10) : count;
  if (!num || isNaN(num)) return null;
  return (
    <span className="star-icon text-[#e9c176] text-2xl tracking-widest">
      {'★'.repeat(num)}
    </span>
  );
}

export default Stars;
