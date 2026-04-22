type StatCardProps = {
  label: string;
  value: number;
  description: string;
};

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="glass-card group relative overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.6),_0_0_20px_-5px_rgba(59,130,246,0.2)] hover:border-white/20">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-all duration-500 group-hover:bg-blue-400/20" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent mix-blend-overlay pointer-events-none" />
      
      <div className="relative z-10">
        <p className="text-sm font-bold uppercase tracking-wider text-blue-400/80 drop-shadow-sm">
          {label}
        </p>
        <p className="mt-4 text-4xl font-extrabold text-white drop-shadow-lg transition-all duration-300 group-hover:text-blue-100 group-hover:text-glow">
          {value}
        </p>
        <div className="mt-4 border-t border-white/10 pt-4">
          <p className="text-xs font-medium text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
