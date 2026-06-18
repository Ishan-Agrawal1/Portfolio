export function CTAButton({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-xs uppercase tracking-widest text-white bg-transparent border border-[#e9c176] px-10 py-5 rounded-full hover:bg-[#e9c176] hover:text-black transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
}

export default CTAButton;
