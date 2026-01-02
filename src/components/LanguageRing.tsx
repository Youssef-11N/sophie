type LanguageRingProps = {
  label: string;
  level: string;
  shortLevel: string;
};

export function LanguageRing({ label, level, shortLevel }: LanguageRingProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="relative grid h-20 w-20 place-items-center rounded-full bg-accent/20">
        <div className="absolute inset-0 rounded-full border-2 border-accent/70" />
        <span className="px-2 text-center text-[0.65rem] font-semibold uppercase leading-tight tracking-wide text-ink">
          {shortLevel}
        </span>
      </div>
      <span className="text-sm text-muted">{label}</span>
      <span className="rounded-full border border-accent/40 bg-white/70 px-3 py-1 text-xs font-semibold text-muted">
        {level}
      </span>
    </div>
  );
}
