type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
