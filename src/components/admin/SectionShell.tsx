export function SectionShell({
  title,
  icon,
  desc,
  children,
}: {
  title: string;
  icon: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="text-xl">{icon}</span>
          <h1 className="text-xl sm:text-2xl font-bold text-white">{title}</h1>
        </div>
        <p className="text-white/40 text-sm">{desc}</p>
      </div>
      {children}
    </div>
  );
}
