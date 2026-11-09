import { useEffect, useRef } from 'react';
import { BY_ID } from '../lib/quiz';
import { BackBar } from './BackBar';
import type { Answer } from './Quiz';
import { btnGhost, btnPrimary, sectionHead } from './ui';

interface ResultsProps {
  answers: Answer[];
  onReview: () => void;
  onHome: () => void;
}

export function Results({ answers, onReview, onHome }: ResultsProps) {
  const right = answers.filter((a) => a.right).length;
  const total = answers.length;
  const pct = total ? Math.round((right / total) * 100) : 0;
  const verdict =
    pct === 100
      ? 'Clean sweep. Do it again tomorrow to make sure it stuck.'
      : pct >= 90
        ? "Strong. Review the misses below and you're close to test-ready."
        : pct >= 70
          ? 'Getting there. The misses below are where your marks are going.'
          : 'Worth a slow read of the cheat sheet, then run this again.';
  const missed = answers.filter((a) => !a.right);
  const headRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    headRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section>
      <BackBar label="Home" onBack={onHome} />
      <div
        ref={headRef}
        tabIndex={-1}
        aria-label={`You scored ${right} out of ${total}, ${pct}% correct`}
        className="rounded-card border-4 border-plate bg-plate p-[22px] text-center text-[#141414] shadow-[inset_0_0_0_3px_#141414]"
      >
        <div className="font-display text-[3.41rem] leading-[0.95] font-bold" aria-hidden="true">
          {right} / {total}
        </div>
        <div
          className="mt-1.5 font-display text-[0.882rem] font-semibold tracking-[0.08em] uppercase"
          aria-hidden="true"
        >
          {pct}% correct
        </div>
      </div>
      <p className="mt-4 mb-1 text-center text-[1.0625rem]">{verdict}</p>
      {missed.length > 0 && (
        <button type="button" className={btnPrimary} onClick={onReview}>
          Practise the ones I missed
        </button>
      )}
      <button type="button" className={btnGhost} onClick={onHome}>
        Back to home
      </button>
      {missed.length > 0 && (
        <>
          <h2 className={sectionHead}>What to review</h2>
          <ol className="mt-2.5 pl-6">
            {missed.map((a) => {
              const q = BY_ID.get(a.id);
              if (!q) return null;
              return (
                <li key={a.id} className="mb-4">
                  <div className="font-semibold">{q.question}</div>
                  <div className="text-[0.882rem] text-muted">You chose: {q.options[a.picked]}</div>
                  <div className="text-[0.882rem] text-good-text">
                    Correct: {q.options[q.answer]}
                  </div>
                  <div className="mt-1 text-[0.92em] text-muted">{q.explanation}</div>
                </li>
              );
            })}
          </ol>
        </>
      )}
    </section>
  );
}
