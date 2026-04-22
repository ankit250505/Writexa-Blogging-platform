type StatCardProps = {
  label: string;
  value: number;
  description: string;
};

export function StatCard({ label, value, description }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-ink">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}
