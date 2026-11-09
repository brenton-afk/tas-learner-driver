import { useEffect, useRef } from 'react';
import type { Question } from '../data/questions';
import { topicName } from '../lib/quiz';
import { RoadSign } from '../signs';
import { BackBar } from './BackBar';
import { Lane } from './Lane';
import { btnPrimary, eyebrow } from './ui';

export interface Answer {
  id: string;
  picked: number;
  right: boolean;
}

export type RunMode = 'mock' | 'quick' | 'trouble' | 'topic' | 'review';

export interface Run {
  list: Question[];
  i: number;
  mode: RunMode;
  /** Show the answer straight away (everything except Mock test). */
  instant: boolean;
  label: string;
  answers: Answer[];
}

interface QuizProps {
  run: Run;
  onAnswer: (picked: number) => void;
  onNext: () => void;
  onHome: () => void;
}

const optBase =
  'flex w-full min-h-14 items-start gap-3 rounded-card border px-[15px] py-3.5 text-left text-[0.941rem] leading-[1.4]';

export function Quiz({ run, onAnswer, onNext, onHome }: QuizProps) {
  const q = run.list[run.i] as Question;
  const answer = run.answers[run.i];
  const answered = answer !== undefined;
  const last = run.i === run.list.length - 1;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    headingRef.current?.focus({ preventScroll: true });
  }, [run.i]);

  useEffect(() => {
    if (answered) nextRef.current?.focus({ preventScroll: true });
  }, [answered]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey || answered) return;
      const n = Number(e.key);
      if (n >= 1 && n <= q.options.length) onAnswer(n - 1);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [answered, onAnswer, q.options.length]);

  function optClass(idx: number) {
    if (!answered)
      return `${optBase} cursor-pointer border-edge bg-panel text-ink hover:border-muted hover:bg-panel-2`;
    const picked = answer.picked === idx;
    if (run.instant) {
      if (picked && answer.right)
        return `${optBase} border-good bg-good font-semibold text-good-ink`;
      if (picked) return `${optBase} border-bad bg-bad font-semibold text-bad-ink`;
      if (idx === q.answer) return `${optBase} border-2 border-good bg-panel text-ink`;
    } else if (picked) {
      return `${optBase} border-2 border-accent bg-panel text-ink`;
    }
    return `${optBase} border-edge bg-panel text-ink`;
  }

  function optStatus(idx: number) {
    if (!answered) return '';
    const picked = answer.picked === idx;
    if (!run.instant) return picked ? ' (your answer)' : '';
    if (picked) return answer.right ? ' (your answer, correct)' : ' (your answer, incorrect)';
    if (idx === q.answer) return ' (correct answer)';
    return '';
  }

  const keyClass = (idx: number) => {
    const coloured = answered && run.instant && answer.picked === idx;
    return `mt-px grid h-[26px] w-[26px] flex-none place-items-center rounded-md font-display text-[15px] font-bold ${
      coloured
        ? answer.right
          ? 'bg-black/20 text-good-ink'
          : 'bg-black/20 text-bad-ink'
        : 'bg-track text-muted'
    }`;
  };

  return (
    <section aria-labelledby="question-text">
      <BackBar label="Back" onBack={onHome}>
        <span className="ml-auto font-display text-[0.882rem] font-semibold tracking-[0.05em] text-muted">
          <span className="sr-only">Question </span>
          {run.i + 1} / {run.list.length}
        </span>
      </BackBar>
      <Lane
        plain
        value={run.i}
        max={run.list.length}
        label={`Question ${run.i + 1} of ${run.list.length}`}
      />
      <p className={`${eyebrow} mt-[18px] mb-0`}>
        {run.mode === 'topic' ? run.label : topicName(q.topic)}
      </p>
      {q.sign && (
        <div className="mt-1 mb-[18px] flex justify-center">
          <RoadSign id={q.sign} className="h-[132px] w-[132px]" />
        </div>
      )}
      <h2
        id="question-text"
        ref={headingRef}
        tabIndex={-1}
        className="mt-2.5 mb-[18px] text-[1.176rem] leading-[1.35] font-semibold focus:outline-none"
      >
        {q.question}
      </h2>
      <div className="grid gap-2.5" role="group" aria-labelledby="question-text">
        {q.options.map((text, idx) => (
          <button
            key={idx}
            type="button"
            className={optClass(idx)}
            disabled={answered}
            onClick={() => onAnswer(idx)}
          >
            <span aria-hidden="true" className={keyClass(idx)}>
              {idx + 1}
            </span>
            <span>
              {text}
              <span className="sr-only">{optStatus(idx)}</span>
            </span>
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {answered &&
          (run.instant ? (
            <div className="mt-3.5 rounded-r-card border-l-[3px] border-accent bg-panel px-4 py-3.5">
              <b className="mb-1 block font-display text-[0.765rem] tracking-[0.06em] text-accent-text uppercase">
                {answer.right ? 'Correct' : 'Not quite'}
              </b>
              <p className="m-0 text-[0.912rem]">{q.explanation}</p>
            </div>
          ) : (
            <p className="mt-3.5 mb-0 text-muted">
              Answer recorded. You'll see how you went at the end.
            </p>
          ))}
      </div>
      {answered && (
        <button type="button" ref={nextRef} className={btnPrimary} onClick={onNext}>
          {last ? 'See results' : 'Next question'}
        </button>
      )}
      <p className="mt-6 hidden text-[0.765rem] text-muted [@media(hover:hover)]:block">
        Tip: press 1–4 to answer.
      </p>
    </section>
  );
}
