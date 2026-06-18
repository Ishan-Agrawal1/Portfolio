export function StickySidebarSection({ title, subtitle, children, contentClassName = '' }) {
  return (
    <section className="border-t border-white/10 pt-40">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        <div className="lg:col-span-4">
          <h2 className="font-serif text-5xl text-white sticky top-40">
            {title}
          </h2>
          {subtitle && (
            <h4 className="font-serif text-3xl text-gray-400 sticky top-40 mt-5">
              {subtitle}
            </h4>
          )}
        </div>
        <div className={`lg:col-span-8 ${contentClassName}`}>
          {children}
        </div>
      </div>
    </section>
  );
}

export default StickySidebarSection;
