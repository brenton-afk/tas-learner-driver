import { useEffect, useId, useRef, useState, type ChangeEvent } from 'react';
import { QUESTIONS } from '../data/questions';
import { backupFileContents, decodeBackup, encodeBackup, parseJson } from '../lib/backup';
import { copyText } from '../lib/clipboard';
import type { Progress } from '../lib/progress';
import { BackBar } from './BackBar';
import { btnGhost, btnPrimary, card, sectionHead } from './ui';

interface BackupProps {
  progress: Progress;
  /** Merges imported progress. Only called with data that has passed validation. */
  onImport: (p: Progress) => void;
  onHome: () => void;
}

type Status = { kind: 'ok' | 'error'; text: string } | null;

const field =
  'block w-full rounded-card border border-edge bg-panel p-3 font-mono text-sm text-ink break-all';

export function Backup({ progress, onImport, onHome }: BackupProps) {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<Status>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const exportId = useId();
  const importId = useId();

  useEffect(() => {
    let live = true;
    encodeBackup(progress).then((c) => live && setCode(c));
    return () => {
      live = false;
    };
  }, [progress]);

  useEffect(() => {
    window.scrollTo(0, 0);
    headRef.current?.focus({ preventScroll: true });
  }, []);

  const correct = Object.keys(progress.correct).length;

  async function copy() {
    setCopied(await copyText(code));
    window.setTimeout(() => setCopied(false), 2500);
  }

  function download() {
    const blob = new Blob([backupFileContents(progress)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `road-rules-progress-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function apply(p: Progress) {
    onImport(p);
    const n = Object.keys(p.correct).length;
    setStatus({
      kind: 'ok',
      text: `Imported. The backup had ${n} of ${QUESTIONS.length} correct and ${p.wrong.length} trouble spots, now combined with this device.`,
    });
    setInput('');
  }

  async function importCode() {
    const r = await decodeBackup(input);
    if (r.ok) apply(r.progress);
    else setStatus({ kind: 'error', text: r.error });
  }

  async function importFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 1_000_000) {
      setStatus({ kind: 'error', text: 'That file is too big to be a progress backup.' });
      return;
    }
    const r = parseJson(await file.text());
    if (r.ok) apply(r.progress);
    else setStatus({ kind: 'error', text: r.error });
  }

  return (
    <section>
      <BackBar label="Home" onBack={onHome} />
      <h2
        ref={headRef}
        tabIndex={-1}
        className="mt-0 mb-3 font-display text-base font-semibold tracking-[0.04em] text-muted uppercase focus:outline-none"
      >
        Back up progress
      </h2>
      <p className="mt-0 text-muted">
        Progress is saved in this browser only. Use a code or file to move it to another phone or
        browser, or to keep a copy.
      </p>

      <h3 className={sectionHead}>Export</h3>
      <div className={card}>
        <p className="mt-0">
          {correct} of {QUESTIONS.length} correct, {progress.wrong.length} trouble spots.
        </p>
        <label htmlFor={exportId} className="mb-1.5 block text-sm font-semibold">
          Your progress code
        </label>
        <textarea
          id={exportId}
          readOnly
          rows={3}
          value={code}
          onFocus={(e) => e.currentTarget.select()}
          className={field}
        />
        <button type="button" className={btnPrimary} onClick={copy} disabled={!code}>
          <span aria-live="polite">{copied ? 'Copied!' : 'Copy code'}</span>
        </button>
        <button type="button" className={btnGhost} onClick={download}>
          Download backup file
        </button>
      </div>

      <h3 className={sectionHead}>Import</h3>
      <div className={card}>
        <p className="mt-0">
          Importing adds to the progress on this device. Nothing here is deleted.
        </p>
        <label htmlFor={importId} className="mb-1.5 block text-sm font-semibold">
          Paste a progress code
        </label>
        <textarea
          id={importId}
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          className={field}
        />
        <button type="button" className={btnPrimary} onClick={importCode}>
          Import code
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={importFile}
        />
        <button type="button" className={btnGhost} onClick={() => fileRef.current?.click()}>
          Choose backup file…
        </button>
        <div role="status" aria-live="polite" className="mt-3 empty:hidden">
          {status && (
            <p
              className={`m-0 rounded-card px-3.5 py-3 font-semibold ${
                status.kind === 'ok' ? 'bg-good text-good-ink' : 'bg-bad text-bad-ink'
              }`}
            >
              {status.text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
