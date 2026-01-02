type DownloadCardProps = {
  title: string;
  description: string;
  openHref: string;
  downloadHref: string;
  downloadName?: string;
  openLabel?: string;
  downloadLabel?: string;
};

export function DownloadCard({
  title,
  description,
  openHref,
  downloadHref,
  downloadName,
  openLabel = 'Öffnen',
  downloadLabel = 'Herunterladen',
}: DownloadCardProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-accent/30 bg-white/70 p-5 shadow-softLight">
      <div>
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <a
          className="btn-secondary"
          href={openHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`${title} öffnen`}
        >
          {openLabel}
        </a>
        <a
          className="btn-primary"
          href={downloadHref}
          download={downloadName ?? true}
          aria-label={`${title} herunterladen`}
        >
          {downloadLabel}
        </a>
      </div>
    </div>
  );
}
