import type { CSSProperties } from 'react';

type SkillBarProps = {
  label: string;
  value: number;
};

export function SkillBar({ label, value }: SkillBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const style: CSSProperties = { width: `${clamped}%` };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink">{label}</span>
        <span className="sr-only">{clamped}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-accent-light/70">
        <div
          className="h-2.5 rounded-full bg-accent shadow-softLight"
          style={style}
          role="presentation"
        />
      </div>
    </div>
  );
}
