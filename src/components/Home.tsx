import { QUESTIONS, TOPICS, type TopicId } from '../data/questions';
import type { Progress } from '../lib/progress';
import { questionsForTopic } from '../lib/quiz';
import { Lane } from './Lane';
import { ShareButton } from './ShareButton';
import { btnGhost, card, eyebrow, sectionHead } from './ui';

export type HomeAction = 'mock' | 'quick' | 'trouble' | 'ref' | 'backup';

interface HomeProps {
  progress: Progress;
  onAction: (a: HomeAction) => void;
  onTopic: (id: TopicId) => void;
  onReset: () => void;
}

/** Inline links padded to a 44px tap target without changing the sentence. */
const footLink = 'inline-flex min-h-11 items-center align-middle';

const modeBase =
  'flex w-full min-h-[60px] cursor-pointer items-center gap-3.5 rounded-card border px-4 py-[15px] text-left';
const modeNormal = `${modeBase} border-edge bg-panel text-ink hover:border-muted hover:bg-panel-2`;

function Mode({
  title,
  sub,
  primary,
  disabled,
  badge,
  onClick,
}: {
  title: string;
  sub: string;
  primary?: boolean;
  disabled?: boolean;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={
        primary
          ? `${modeBase} border-accent bg-accent text-on-accent hover:bg-accent-hover`
          : `${modeNormal} disabled:cursor-default disabled:opacity-60 disabled:hover:border-edge disabled:hover:bg-panel`
      }
    >
      <span>
        <strong className="block text-[1.0625rem] font-semibold">{title}</strong>
        <span
          className={`block text-[0.794rem] leading-[1.35] ${primary ? 'text-on-accent-muted' : 'text-muted'}`}
        >
          {sub}
        </span>
      </span>
      {badge !== undefined && (
        <span
          aria-label={`${badge} ${badge === 1 ? 'question' : 'questions'}`}
          className="ml-auto flex-none rounded-full bg-track px-[11px] py-1 font-display text-[0.882rem] font-bold text-accent-text"
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export function Home({ progress, onAction, onTopic, onReset }: HomeProps) {
  const total = QUESTIONS.length;
  const mastered = QUESTIONS.filter((q) => progress.correct[q.id]).length;
  const note =
    mastered === 0
      ? 'Nothing yet. Start with Quick 10 — it takes about three minutes.'
      : mastered === total
        ? 'Every question answered correctly at least once. Now run mock tests until you score 100 twice in a row.'
        : 'Keep going. Questions you get wrong come back in Trouble spots.';
  const trouble = progress.wrong.length;

  return (
    <section>
      <div className={`${card} mb-[22px]`}>
        <div className="mb-2.5 flex items-baseline gap-2.5">
          <span className={eyebrow}>Your progress</span>
          <span className="ml-auto text-[0.765rem] text-muted tabular-nums">
            {mastered} of {total} answered correctly
          </span>
        </div>
        <Lane value={mastered} max={total} label={`Overall progress: ${mastered} of ${total}`} />
        <p className="mt-2.5 mb-0 text-[0.85em] text-muted">{note}</p>
      </div>

      <div className="grid gap-2.5">
        <Mode
          primary
          title="Mock test"
          sub="30 questions, answers at the end — like the real thing"
          onClick={() => onAction('mock')}
        />
        <Mode
          title="Quick 10"
          sub="Ten mixed questions with instant feedback"
          onClick={() => onAction('quick')}
        />
        <Mode
          title="Trouble spots"
          sub="Only the ones you've got wrong before"
          badge={trouble}
          disabled={trouble === 0}
          onClick={() => onAction('trouble')}
        />
        <Mode
          title="Cheat sheet"
          sub="The numbers worth memorising, on one page"
          onClick={() => onAction('ref')}
        />
      </div>

      <h2 className={sectionHead}>Practise one topic</h2>
      <ul className="m-0 list-none p-0">
        {TOPICS.map((t) => {
          const qs = questionsForTopic(t.id);
          const ok = qs.filter((q) => progress.correct[q.id]).length;
          return (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => onTopic(t.id)}
                aria-label={`${t.name}, ${ok} of ${qs.length} correct`}
                className="group block min-h-14 w-full cursor-pointer border-0 border-b border-edge bg-transparent px-0.5 py-3.5 text-left text-ink"
              >
                <span className="mb-2 flex items-baseline gap-2.5">
                  <span className="text-[0.941rem] font-semibold group-hover:text-accent-text">
                    {t.name}
                  </span>
                  <span className="ml-auto text-[0.765rem] text-muted tabular-nums">
                    {ok}/{qs.length}
                  </span>
                </span>
                <span aria-hidden="true" className="block">
                  <span className="block h-2 overflow-hidden rounded-full border border-edge bg-track">
                    <span
                      className="lane-fill block"
                      style={{ width: `${(ok / qs.length) * 100}%` }}
                    />
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <h2 className={sectionHead}>Share and back up</h2>
      <div className="grid grid-cols-2 gap-2.5">
        <ShareButton className={`${modeNormal} justify-center !text-center font-semibold`} />
        <button
          type="button"
          onClick={() => onAction('backup')}
          className={`${modeNormal} justify-center text-center font-semibold`}
        >
          Back up progress
        </button>
      </div>

      <button type="button" className={`${btnGhost} mt-7`} onClick={onReset}>
        Clear my progress
      </button>

      <p className="mt-9 border-t border-edge pt-4 text-[0.765rem] text-muted">
        Study aid only — not an official test. Rules checked against the Tasmanian Government's{' '}
        <a
          href="https://www.platesplus.tas.gov.au"
          target="_blank"
          rel="noopener"
          className={footLink}
        >
          Plates Plus
        </a>{' '}
        and{' '}
        <a
          href="https://www.transport.tas.gov.au"
          target="_blank"
          rel="noopener"
          className={footLink}
        >
          Transport Services
        </a>{' '}
        sites in August 2026. Always confirm current rules there before your test. Progress is saved
        on this device only.
      </p>
    </section>
  );
}
