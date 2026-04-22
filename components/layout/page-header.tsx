type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="space-y-3">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300/80">
          {eyebrow}
        </p>
      ) : null}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-white/95 sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-slate-300/85 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
