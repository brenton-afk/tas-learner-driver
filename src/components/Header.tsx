export function Header({ big, onToggleBig }: { big: boolean; onToggleBig: () => void }) {
  return (
    <header className="flex items-center gap-3 pt-5 pb-[18px]">
      <div
        aria-hidden="true"
        className="grid h-11 w-11 flex-none place-items-center rounded-md bg-accent pb-0.5 font-display text-[30px] leading-none font-bold text-[#111]"
      >
        L
      </div>
      <div className="min-w-0">
        <h1 className="m-0 font-display text-[1.235rem] leading-none font-bold tracking-[0.03em] uppercase">
          Tasmanian Road Rules
        </h1>
        <p className="mt-[3px] mb-0 text-[0.765rem] text-muted">
          Learner study — practise until it sticks
        </p>
      </div>
      <button
        type="button"
        onClick={onToggleBig}
        aria-pressed={big}
        className="ml-auto min-h-11 min-w-11 flex-none cursor-pointer rounded-full border border-edge bg-transparent px-3 py-2 text-sm text-muted hover:border-muted hover:text-ink aria-pressed:border-accent aria-pressed:text-ink"
      >
        A<sup>+</sup>
        <span className="sr-only"> Larger text</span>
      </button>
    </header>
  );
}
