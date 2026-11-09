import { describe, expect, it } from 'vitest';
import { SIGNS, isSignId } from '../signs';
import { QUESTIONS, TOPICS } from './questions';
import { CHEAT_SECTIONS } from './cheatsheet';

describe('question data', () => {
  it('has 80 questions', () => {
    expect(QUESTIONS).toHaveLength(80);
  });

  it('has unique IDs', () => {
    const ids = QUESTIONS.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every question exactly one correct answer out of four distinct options', () => {
    for (const q of QUESTIONS) {
      expect(q.options, q.id).toHaveLength(4);
      expect(new Set(q.options).size, q.id).toBe(4);
      expect([0, 1, 2, 3], q.id).toContain(q.answer);
      expect(q.options[q.answer], q.id).toBeTruthy();
    }
  });

  it('has no empty text', () => {
    for (const q of QUESTIONS) {
      expect(q.question.trim(), q.id).not.toBe('');
      expect(q.explanation.trim(), q.id).not.toBe('');
      for (const o of q.options) expect(o.trim(), q.id).not.toBe('');
    }
  });

  it('uses only known topics, and every topic has questions', () => {
    const topicIds = new Set(TOPICS.map((t) => t.id));
    for (const q of QUESTIONS) expect(topicIds.has(q.topic), q.id).toBe(true);
    for (const t of TOPICS) {
      expect(QUESTIONS.filter((q) => q.topic === t.id).length, t.id).toBeGreaterThan(0);
    }
  });

  it('matches the per-topic counts of the original app', () => {
    const counts = Object.fromEntries(
      TOPICS.map((t) => [t.id, QUESTIONS.filter((q) => q.topic === t.id).length]),
    );
    expect(counts).toEqual({
      speed: 12,
      giveway: 14,
      signs: 12,
      learner: 14,
      sharing: 10,
      safety: 10,
      tas: 8,
    });
  });

  it('only refers to signs that exist', () => {
    for (const q of QUESTIONS) {
      if (q.sign) expect(isSignId(q.sign), `${q.id} -> ${q.sign}`).toBe(true);
    }
    expect(Object.keys(SIGNS)).toHaveLength(13);
  });

  it('has a non-empty cheat sheet', () => {
    expect(CHEAT_SECTIONS).toHaveLength(8);
    for (const s of CHEAT_SECTIONS) expect(s.items.length, s.title).toBeGreaterThan(0);
  });
});
