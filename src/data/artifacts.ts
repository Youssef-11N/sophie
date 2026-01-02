export type Artifact = {
  id: string;
  title: string;
  subject: string;
  level: string;
  goal: string;
  method: string;
  href: string;
};

export const artifacts: Artifact[] = [
  {
    id: 'unterrichtssequenz',
    title: 'Unterrichtssequenz (PDF)',
    subject: 'Englisch',
    level: 'Sek I',
    goal: 'Schüler:innen erarbeiten alltagsnahe Dialoge mit klarer Struktur.',
    method: 'Think-Pair-Share mit kurzen Rollenspielen.',
    href: '/artifact-unterrichtssequenz.pdf',
  },
  {
    id: 'differenzierung',
    title: 'Differenzierung (A/B/C)',
    subject: 'Französisch',
    level: 'Sek I',
    goal: 'Aufgaben in drei Niveaus sichern alle Lernziele ab.',
    method: 'Stationenlernen mit Wahlpflichtaufgaben.',
    href: '/artifact-differenzierung.pdf',
  },
  {
    id: 'rubrik',
    title: 'Bewertungsraster / Rubrik',
    subject: 'Englisch oder Französisch',
    level: 'Sek I',
    goal: 'Transparente Kriterien unterstützen Selbst- und Fremdeinschätzung.',
    method: 'Rubrik mit Kriterienraster zur Feedbackrunde.',
    href: '/artifact-rubrik.pdf',
  },
];
