'use client';

type Props = {
  values: number[];
  labels: string[];
  color?: string;
};

export function SimpleLineChart({ values, labels, color = '#0f172a' }: Props) {
  if (!values.length) return <p className="text-sm text-slate-400">Sem dados ainda.</p>;

  const max = Math.max(...values);
  const min = Math.min(...values);
  const normalize = (value: number) => ((value - min) / (max - min || 1)) * 80 + 10;

  const points = values
    .map((v, i) => `${(i / Math.max(values.length - 1, 1)) * 100},${100 - normalize(v)}`)
    .join(' ');

  return (
    <div className="space-y-2">
      <svg viewBox="0 0 100 100" className="h-36 w-full overflow-visible rounded-xl bg-slate-50 p-2">
        <polyline fill="none" stroke={color} strokeWidth="2.5" points={points} />
      </svg>
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>{labels[0]}</span>
        <span>{labels[labels.length - 1]}</span>
      </div>
    </div>
  );
}
