interface LaneProps {
  value: number;
  max: number;
  label: string;
  plain?: boolean;
  thin?: boolean;
}

/** The lane-line progress bar. */
export function Lane({ value, max, label, plain, thin }: LaneProps) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div
      role="img"
      aria-label={label}
      className={`${plain ? 'lane-plain ' : ''}${thin ? 'h-2' : 'h-3.5'} block overflow-hidden rounded-full border border-edge bg-track`}
    >
      <div className="lane-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}
