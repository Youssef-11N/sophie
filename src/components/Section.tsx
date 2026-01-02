import type { ReactNode } from 'react';

type SectionProps = {
  id: string;
  title: string;
  kicker?: string;
  children: ReactNode;
};

export function Section({ id, title, kicker, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-28 py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="card-surface print-flat px-6 py-8 md:px-10 md:py-10">
          <div className="mb-6 md:mb-8">
            {kicker && <p className="section-kicker">{kicker}</p>}
            <h2 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">
              {title}
            </h2>
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}
