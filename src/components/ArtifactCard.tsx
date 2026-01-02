type ArtifactCardProps = {
  title: string;
  subject: string;
  level: string;
  goal: string;
  method: string;
  href: string;
  available: boolean;
};

export function ArtifactCard({
  title,
  subject,
  level,
  goal,
  method,
  href,
  available,
}: ArtifactCardProps) {
  const buttonClasses =
    'inline-flex items-center justify-center rounded-full border border-ink px-4 py-2 text-xs font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:border-ink/70 hover:text-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none';

  const primaryButtonClasses =
    'inline-flex items-center justify-center rounded-full bg-ink px-4 py-2 text-xs font-semibold text-surface shadow-softLight transition duration-200 hover:-translate-y-0.5 hover:bg-ink/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none';

  const disabledClasses = 'pointer-events-none opacity-50';

  return (
    <div className="flex h-full flex-col rounded-2xl border border-accent/30 bg-white/70 p-5 text-sm text-muted shadow-softLight">
      <div className="flex-1 space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
            {subject} · {level}
          </p>
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-semibold text-ink">Lernziel:</span> {goal}
          </p>
          <p>
            <span className="font-semibold text-ink">Methode:</span> {method}
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {available ? (
          <a
            className={primaryButtonClasses}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${title} öffnen`}
          >
            Öffnen (PDF)
          </a>
        ) : (
          <span
            className={`${primaryButtonClasses} ${disabledClasses}`}
            aria-disabled="true"
          >
            Öffnen (PDF)
          </span>
        )}
        {available ? (
          <a
            className={buttonClasses}
            href={href}
            download
            aria-label={`${title} herunterladen`}
          >
            Herunterladen
          </a>
        ) : (
          <span className={`${buttonClasses} ${disabledClasses}`} aria-disabled="true">
            Herunterladen
          </span>
        )}
      </div>
      {!available && (
        <p className="mt-2 text-xs text-muted">(Datei folgt)</p>
      )}
    </div>
  );
}
