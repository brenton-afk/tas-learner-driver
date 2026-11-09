import type { ReactNode } from 'react';
import { btnPill } from './ui';

export function BackBar({
  label,
  onBack,
  children,
}: {
  label: string;
  onBack: () => void;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 pt-[18px] pb-3">
      <button type="button" className={btnPill} onClick={onBack}>
        ← {label}
      </button>
      {children}
    </div>
  );
}
