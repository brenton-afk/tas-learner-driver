import { QUESTIONS } from '../data/questions';
import { readItem, writeItem } from './storage';

/** Same key and shape as the original single-file app, so existing progress keeps working. */
export const STORAGE_KEY = 'tas-learner-v1';

export interface Progress {
  /** How many times each question has been answered. */
  seen: Record<string, number>;
  /** Questions answered correctly at least once. */
  correct: Record<string, true>;
  /** Trouble spots: questions most recently answered wrong, oldest first. */
  wrong: string[];
  /** Larger text toggle (1 = on). */
  big: 0 | 1;
}

export const emptyProgress = (): Progress => ({ seen: {}, correct: {}, wrong: [], big: 0 });

const KNOWN_IDS = new Set(QUESTIONS.map((q) => q.id));

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * Checks untrusted data (from storage or an import) and returns clean Progress,
 * or null if the shape is wrong. IDs for questions that no longer exist are dropped.
 */
export function parseProgress(data: unknown): Progress | null {
  if (!isRecord(data)) return null;
  const { seen, correct, wrong, big } = data;
  if (seen !== undefined && !isRecord(seen)) return null;
  if (correct !== undefined && !isRecord(correct)) return null;
  if (wrong !== undefined && !Array.isArray(wrong)) return null;
  if (seen === undefined && correct === undefined && wrong === undefined) return null;

  const out = emptyProgress();
  for (const [id, n] of Object.entries(seen ?? {})) {
    if (typeof n !== 'number' || !Number.isFinite(n) || n < 0) return null;
    if (KNOWN_IDS.has(id)) out.seen[id] = Math.floor(n);
  }
  for (const [id, v] of Object.entries(correct ?? {})) {
    if (typeof v !== 'boolean') return null;
    if (v && KNOWN_IDS.has(id)) out.correct[id] = true;
  }
  for (const id of wrong ?? []) {
    if (typeof id !== 'string') return null;
    if (KNOWN_IDS.has(id) && !out.wrong.includes(id)) out.wrong.push(id);
  }
  out.big = big === 1 || big === true ? 1 : 0;
  return out;
}

export function loadProgress(): Progress {
  const raw = readItem(STORAGE_KEY);
  if (!raw) return emptyProgress();
  try {
    return parseProgress(JSON.parse(raw)) ?? emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(p: Progress): boolean {
  return writeItem(STORAGE_KEY, JSON.stringify(p));
}

/** Records one answer, exactly as the original app did. */
export function recordAnswer(p: Progress, id: string, right: boolean): Progress {
  const next: Progress = {
    ...p,
    seen: { ...p.seen, [id]: (p.seen[id] ?? 0) + 1 },
    correct: right ? { ...p.correct, [id]: true } : p.correct,
    wrong: right
      ? p.wrong.filter((w) => w !== id)
      : p.wrong.includes(id)
        ? p.wrong
        : [...p.wrong, id],
  };
  return next;
}

/** Combines imported progress with what's already on this device. Nothing is lost. */
export function mergeProgress(a: Progress, b: Progress): Progress {
  const seen = { ...a.seen };
  for (const [id, n] of Object.entries(b.seen)) seen[id] = Math.max(seen[id] ?? 0, n);
  const wrong = [...a.wrong];
  for (const id of b.wrong) if (!wrong.includes(id)) wrong.push(id);
  return { seen, correct: { ...a.correct, ...b.correct }, wrong, big: a.big };
}
