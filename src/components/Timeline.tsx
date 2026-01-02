export type TimelineEntry = {
  title: string;
  subtitle?: string;
  time: string;
  description?: string;
};

type TimelineProps = {
  items: TimelineEntry[];
};

export function Timeline({ items }: TimelineProps) {
  return (
    <ol className="relative border-l border-accent/40 pl-6">
      {items.map((item) => (
        <li key={`${item.title}-${item.time}`} className="mb-8 last:mb-0">
          <span className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full bg-accent shadow-softLight" />
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-baseline gap-2">
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <span className="text-sm text-muted">{item.time}</span>
            </div>
            {item.subtitle && (
              <p className="text-sm font-medium text-muted-lilac">{item.subtitle}</p>
            )}
            {item.description && (
              <p className="text-sm text-muted">{item.description}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
