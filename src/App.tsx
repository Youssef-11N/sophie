import { useEffect, useState } from "react";
import { ArtifactCard } from "./components/ArtifactCard";
import { DownloadCard } from "./components/DownloadCard";
import { LanguageRing } from "./components/LanguageRing";
import { Section } from "./components/Section";
import { SkillBar } from "./components/SkillBar";
import { Timeline, TimelineEntry } from "./components/Timeline";
import { artifacts } from "./data/artifacts";

const navItems = [
  { label: "Start", href: "#start", id: "start" },
  { label: "Kurzprofil", href: "#kurzprofil", id: "kurzprofil" },
  { label: "Unterricht & Profil", href: "#profil", id: "profil" },
  {
    label: "Unterrichtsbeispiele",
    href: "#unterrichtsbeispiele",
    id: "unterrichtsbeispiele",
  },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Sprachen", href: "#sprachen", id: "sprachen" },
  { label: "Auslandsaufenthalte", href: "#ausland", id: "ausland" },
  { label: "Ausbildung", href: "#ausbildung", id: "ausbildung" },
  { label: "Erfahrung", href: "#erfahrung", id: "erfahrung" },
  { label: "Downloads", href: "#downloads", id: "downloads" },
];

const skills = [
  { label: "Office & Adobe", value: 90 },
  { label: "Kreativität", value: 88 },
  { label: "Kommunikation", value: 86 },
  { label: "Präsentation", value: 84 },
  { label: "Empathie", value: 90 },
  { label: "Konfliktlösung", value: 82 },
];

const languages = [
  { label: "Deutsch", level: "Muttersprache", shortLevel: "Mutterspr." },
  { label: "Englisch", level: "Fließend", shortLevel: "Fließend" },
  { label: "Französisch", level: "Fließend", shortLevel: "Fließend" },
  { label: "Spanisch", level: "Grundkenntnisse", shortLevel: "Grundk." },
  { label: "Latein", level: "Grundkenntnisse", shortLevel: "Grundk." },
  {
    label: "Martinique Kreol",
    level: "Grundkenntnisse",
    shortLevel: "Grundk.",
  },
];

const abroad: TimelineEntry[] = [
  {
    title: "Erasmus in Martinique (Französisches Überseegebiet)",
    time: "WS 2024/2025",
  },
  {
    title: "Au Pair in Frankreich (Kinderbetreuung, Évaux-les-Bains)",
    time: "August 2023",
  },
];

const education: TimelineEntry[] = [
  {
    title: "B.Ed. Universität Wien (Englisch, Französisch)",
    time: "2022–2026",
  },
  {
    title:
      "Höhere Lehranstalt für Produktmanagement und Präsentation (HLP Mödling)",
    time: "2017–2022",
  },
  {
    title: "Bundesrealgymnasium (GRG 23)",
    time: "2013–2017",
  },
];

const experience: TimelineEntry[] = [
  {
    title: "Lehrveranstaltungs-Assistentin",
    subtitle:
      "bei Univ.-Prof. Elissa Pustka & Univ.-Prof. Eva-Maria Remberger, Universität Wien",
    time: "SS 2023",
  },
  {
    title: "Organisation & Workshops",
    subtitle: "MISCHA – Medien in Schule und Ausbildung",
    time: "2022–2023",
  },
  {
    title: "Kundenbetreuung",
    subtitle: "BAWAG",
    time: "Juli 2020",
  },
];

const profileBullets = [
  "Begeisterung für abwechslungsreichen, freudvollen Unterricht",
  "Offenheit für Feedback und kontinuierliche Reflexion (Mentor-Reflexion im Orientierungspraktikum)",
  "Wertschätzende, gewaltfreie Kommunikation (auch mit sich selbst)",
  "Fremdsprachen fördern Offenheit & interkulturelles Verständnis",
  "Auslandserfahrung (Martinique) stärkte Geduld, Großzügigkeit, Selbstvertrauen",
];

export default function App() {
  const [showPrivate, setShowPrivate] = useState(true);
  const [activeSection, setActiveSection] = useState("start");
  const [showPreview, setShowPreview] = useState(false);
  const [artifactAvailability, setArtifactAvailability] = useState<
    Record<string, boolean>
  >(() => Object.fromEntries(artifacts.map((artifact) => [artifact.id, true])));

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const downloadsSection = document.getElementById("downloads");
    if (!downloadsSection) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShowPreview(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(downloadsSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const checkArtifacts = async () => {
      const results = await Promise.all(
        artifacts.map(async (artifact) => {
          try {
            const response = await fetch(artifact.href, {
              method: "HEAD",
              signal: controller.signal,
            });
            const available = response.ok || response.status === 405;
            return [artifact.id, available] as const;
          } catch {
            return [artifact.id, false] as const;
          }
        })
      );

      if (isMounted) {
        setArtifactAvailability(Object.fromEntries(results));
      }
    };

    checkArtifacts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-screen bg-taupe text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
      >
        Zum Inhalt springen
      </a>

      <header className="no-print sticky top-0 z-50 border-b border-white/60 bg-taupe/90 backdrop-blur-md">
        <nav
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4"
          aria-label="Hauptnavigation"
        >
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-muted">
              SOPHIE MAYERHOFER
            </p>
            <p className="text-xs uppercase text-muted-lilac">
              Englisch & Französisch Lehrerin
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveSection(item.id)}
                  aria-current={isActive ? "location" : undefined}
                  aria-label={`${item.label} Abschnitt`}
                  className={`flex items-center gap-2 text-ink/70 transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-taupe motion-reduce:transition-none ${
                    isActive ? "text-ink" : ""
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full transition duration-200 motion-reduce:transition-none ${
                      isActive ? "bg-ink" : "bg-transparent"
                    }`}
                  />
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      </header>

      <main id="main">
        <section id="start" className="scroll-mt-28 pt-10 md:pt-14">
          <div className="mx-auto max-w-6xl px-6">
            <div className="card-surface print-flat overflow-hidden">
              <div className="grid gap-10 px-6 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-12 md:py-12">
                <div>
                  <p className="section-kicker">Lehrerinnen-Portfolio</p>
                  <h1 className="mt-4 text-4xl font-semibold text-ink md:text-5xl">
                    Sophie Mayerhofer
                  </h1>
                  <p className="mt-3 text-lg text-muted">
                    Englisch & Französisch Lehrerin · Wien
                  </p>
                  <p className="mt-6 text-base text-muted">
                    Engagierte Lehramtsstudentin mit internationaler Erfahrung
                    und Fokus auf wertschätzende Kommunikation. Mein Unterricht
                    verbindet klare Strukturen mit lebendigen, freudvollen
                    Lernmomenten.
                  </p>
                  <div className="no-print mt-6 flex flex-wrap gap-3">
                    <a
                      className="btn-primary"
                      href="/cv.pdf"
                      download
                      aria-label="Lebenslauf als PDF herunterladen"
                    >
                      Lebenslauf PDF
                    </a>
                    <a
                      className="btn-secondary"
                      href="#downloads"
                      aria-label="Zum Kontaktbereich springen"
                    >
                      Kontakt
                    </a>
                  </div>
                  <div className="mt-8 grid gap-3 text-sm text-muted md:grid-cols-2">
                    <div className="rounded-2xl border border-accent/30 bg-white/70 px-4 py-3 shadow-softLight">
                      <span className="font-semibold text-ink">Geboren:</span>{" "}
                      18.10.2002
                    </div>
                    <div className="rounded-2xl border border-accent/30 bg-white/70 px-4 py-3 shadow-softLight">
                      <span className="font-semibold text-ink">Wohnort:</span>{" "}
                      Wien
                    </div>
                    <div className="rounded-2xl border border-accent/30 bg-white/70 px-4 py-3 shadow-softLight">
                      <span className="font-semibold text-ink">Studium:</span>{" "}
                      B.Ed. Universität Wien (Englisch, Französisch)
                    </div>
                    <div className="rounded-2xl border border-accent/30 bg-white/70 px-4 py-3 shadow-softLight">
                      <span className="font-semibold text-ink">Ausland:</span>{" "}
                      Erasmus in Martinique (WS 2024/2025)
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="relative">
                    <img
                      src={`${
                        import.meta.env.BASE_URL
                      }PHOTO-2025-12-25-22-09-44.jpg`}
                      alt="Porträt von Sophie Mayerhofer"
                      className="h-56 w-56 rounded-full object-cover ring-4 ring-white/70 shadow-soft md:h-64 md:w-64"
                    />
                  </div>
                  <div className="w-full rounded-2xl border border-accent/30 bg-white/70 p-5 text-left shadow-softLight">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">
                      Fokus
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-muted">
                      <li>Englisch & Französisch mit Praxisnähe</li>
                      <li>
                        Interkulturelle Perspektive durch Auslandserfahrung
                      </li>
                      <li>Wertschätzende, gewaltfreie Kommunikation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section id="kurzprofil" title="Kurzprofil" kicker="Überblick">
          <div className="grid gap-8 md:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-4 text-base text-muted">
              <p>
                Ich studiere Lehramt für Englisch und Französisch an der
                Universität Wien (B.Ed. 2022–2026) und bringe durch
                internationale Erfahrungen eine offene, neugierige Haltung in
                den Unterricht. In meinem Fokus stehen klare Strukturen, aktive
                Beteiligung und eine Lernatmosphäre, in der sich Schüler:innen
                sicher und motiviert fühlen.
              </p>
              <p>
                Meine Arbeit verbindet Unterrichtsplanung, kreative
                Präsentationstechniken und empathische Kommunikation. Dabei ist
                mir wichtig, dass Fremdsprachen als Brücke zu kulturellem
                Verständnis erlebt werden.
              </p>
            </div>
            <div className="rounded-2xl border border-accent/30 bg-white/70 p-5 text-sm text-muted shadow-softLight">
              <h3 className="text-base font-semibold text-ink">Steckbrief</h3>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted">
                    Name
                  </dt>
                  <dd className="text-sm text-ink">Sophie Mayerhofer</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted">
                    Standort
                  </dt>
                  <dd className="text-sm text-ink">Wien</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted">
                    Geburtsdatum
                  </dt>
                  <dd className="text-sm text-ink">18.10.2002</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-muted">
                    Sprachen
                  </dt>
                  <dd className="text-sm text-ink">
                    Deutsch, Englisch, Französisch, Spanisch, Latein, Martinique
                    Kreol
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </Section>

        <Section
          id="profil"
          title="Unterricht & Profil"
          kicker="Pädagogisches Profil"
        >
          <ul className="grid gap-4 text-sm text-muted md:grid-cols-2">
            {profileBullets.map((bullet) => (
              <li
                key={bullet}
                className="rounded-2xl border border-accent/30 bg-white/70 p-4 shadow-softLight"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </Section>

        <Section
          id="unterrichtsbeispiele"
          title="Unterrichtsbeispiele"
          kicker="Portfolio"
        >
          <p className="text-sm text-muted">
            Ausgewählte Materialien (ohne Schülerdaten).
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {artifacts.map((artifact) => (
              <ArtifactCard
                key={artifact.id}
                title={artifact.title}
                subject={artifact.subject}
                level={artifact.level}
                goal={artifact.goal}
                method={artifact.method}
                href={artifact.href}
                available={artifactAvailability[artifact.id] ?? false}
              />
            ))}
          </div>
        </Section>

        <Section id="skills" title="Skills" kicker="Kompetenzen">
          <div className="grid gap-6 md:grid-cols-2">
            {skills.map((skill) => (
              <SkillBar
                key={skill.label}
                label={skill.label}
                value={skill.value}
              />
            ))}
          </div>
        </Section>

        <Section id="sprachen" title="Sprachen" kicker="Sprachprofil">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {languages.map((language) => (
              <LanguageRing
                key={language.label}
                label={language.label}
                level={language.level}
                shortLevel={language.shortLevel}
              />
            ))}
          </div>
        </Section>

        <Section
          id="ausland"
          title="Auslandsaufenthalte"
          kicker="International"
        >
          <Timeline items={abroad} />
        </Section>

        <Section id="ausbildung" title="Ausbildung" kicker="Werdegang">
          <Timeline items={education} />
        </Section>

        <Section id="erfahrung" title="Erfahrung" kicker="Praxis">
          <Timeline items={experience} />
        </Section>

        <Section id="downloads" title="Downloads & Kontakt" kicker="Dokumente">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="grid gap-4">
              <DownloadCard
                title="Lebenslauf"
                description="Lebenslauf als übersichtliches PDF."
                openHref="/cv.pdf"
                downloadHref="/cv.pdf"
                downloadName="Lebenslauf_Sophie_Mayerhofer.pdf"
              />
              <div className="flex h-full flex-col justify-between rounded-2xl border border-accent/30 bg-white/70 p-5 text-sm text-muted shadow-softLight">
                <div>
                  <h3 className="text-lg font-semibold text-ink">Kontakt</h3>
                  <p className="mt-2">Englisch & Französisch Lehrerin, Wien</p>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-ink">sophiemayerhofer38@gmail.com</p>
                  {showPrivate ? (
                    <>
                      <p className="text-ink">+43 676 461 4667</p>
                      <p className="text-ink">
                        Kellerberggasse 3/16, 1230 Wien
                      </p>
                    </>
                  ) : (
                    <p className="text-muted">Adresse und Telefon verborgen</p>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPrivate((prev) => !prev)}
                    className="mt-2 text-sm font-semibold text-ink underline-offset-4 transition hover:underline motion-reduce:transition-none"
                    aria-pressed={!showPrivate}
                    aria-label="Privatdaten ein- oder ausblenden"
                  >
                    {showPrivate
                      ? "Privatdaten ausblenden"
                      : "Privatdaten anzeigen"}
                  </button>
                  <p className="text-xs text-muted">
                    Hinweis: In der öffentlichen Version können Adresse und
                    Telefon verborgen werden.
                  </p>
                </div>
              </div>
            </div>
            <div className="no-print rounded-2xl border border-accent/30 bg-white/70 p-5 shadow-softLight">
              <h3 className="text-lg font-semibold text-ink">Lebenslauf PDF</h3>
              <p className="mt-2 text-sm text-muted">
                Eingebettete Vorschau für schnellen Überblick.
              </p>
              {showPreview ? (
                <div className="mt-4 overflow-hidden rounded-xl border border-accent/20">
                  <iframe
                    title="Lebenslauf PDF"
                    src="/cv.pdf"
                    loading="lazy"
                    className="h-[520px] w-full"
                  />
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="mt-4 inline-flex items-center justify-center rounded-full border border-ink px-5 py-2.5 text-sm font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:border-ink/70 hover:text-ink/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface motion-reduce:transition-none"
                  aria-label="Lebenslauf Vorschau anzeigen"
                >
                  Vorschau anzeigen
                </button>
              )}
              <p className="mt-3 text-xs text-muted">
                Falls die Vorschau nicht lädt:{" "}
                <a
                  className="font-semibold text-ink underline-offset-4 hover:underline"
                  href="/cv.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Lebenslauf PDF öffnen
                </a>
              </p>
            </div>
          </div>
        </Section>
      </main>

      <footer className="mx-auto max-w-6xl px-6 pb-12 text-sm text-muted">
        <div className="flex flex-col gap-2 border-t border-white/60 pt-6">
          <p className="text-ink">
            Sophie Mayerhofer · Englisch & Französisch Lehrerin
          </p>
          <p>sophiemayerhofer38@gmail.com</p>
          <p className="text-xs text-muted">
            Datenschutz: Öffentliche Version blendet Adresse und Telefonnummer
            aus.
          </p>
        </div>
      </footer>
    </div>
  );
}
