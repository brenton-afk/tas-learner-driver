import { useEffect, useRef, useState } from 'react';
import { copyText } from '../lib/clipboard';

const SHARE = {
  title: 'Tasmanian Road Rules — Learner Study',
  text: 'Free practice questions for the Tasmanian learner licence knowledge test. Works offline.',
};

/** Web Share on phones; copy-link with a "Copied!" message everywhere else. */
export function ShareButton({ className }: { className: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function onClick() {
    const url = `${window.location.origin}/`;
    const touch = window.matchMedia?.('(pointer: coarse)').matches;
    if (touch && typeof navigator.share === 'function') {
      try {
        await navigator.share({ ...SHARE, url });
        return;
      } catch (e) {
        if (e instanceof DOMException && e.name === 'AbortError') return;
      }
    }
    const ok = await copyText(url);
    setStatus(ok ? 'copied' : 'failed');
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), 2500);
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      <span aria-live="polite">
        {status === 'copied'
          ? 'Copied!'
          : status === 'failed'
            ? `Copy failed — ${window.location.host}`
            : 'Share this app'}
      </span>
    </button>
  );
}
