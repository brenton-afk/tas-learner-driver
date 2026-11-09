import { Fragment, useEffect, useRef } from 'react';
import { CHEAT_FOOTNOTE, CHEAT_INTRO, CHEAT_SECTIONS } from '../data/cheatsheet';
import { BackBar } from './BackBar';

/** Renders **highlighted** numbers from the cheat sheet data. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 ? (
          <span key={i} className="num">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export function CheatSheet({ onHome }: { onHome: () => void }) {
  const headRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    headRef.current?.focus({ preventScroll: true });
  }, []);
  return (
    <section>
      <BackBar label="Home" onBack={onHome} />
      <h2
        ref={headRef}
        tabIndex={-1}
        className="mt-0 mb-3 font-display text-base font-semibold tracking-[0.04em] text-muted uppercase focus:outline-none"
      >
        Cheat sheet
      </h2>
      <p className="mt-0 text-muted">{CHEAT_INTRO}</p>
      {CHEAT_SECTIONS.map((s) => (
        <Fragment key={s.title}>
          <h3 className="mt-6 mb-2 font-display text-[1.0625rem] font-bold tracking-[0.05em] uppercase">
            {s.title}
          </h3>
          <ul className="m-0 list-disc pl-5">
            {s.items.map((item) => (
              <li key={item} className="mb-[7px]">
                <Rich text={item} />
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
      <p className="mt-9 border-t border-edge pt-4 text-[0.765rem] text-muted">{CHEAT_FOOTNOTE}</p>
    </section>
  );
}
