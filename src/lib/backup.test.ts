import { describe, expect, it } from 'vitest';
import { backupFileContents, decodeBackup, encodeBackup, parseJson } from './backup';
import {
  emptyProgress,
  mergeProgress,
  parseProgress,
  recordAnswer,
  type Progress,
} from './progress';

const sample: Progress = {
  seen: { 'speed-0': 3, 'giveway-12': 1, 'tas-79': 2 },
  correct: { 'speed-0': true, 'tas-79': true },
  wrong: ['giveway-12'],
  big: 1,
};

describe('export / import', () => {
  it('round-trips through a compressed code', async () => {
    const code = await encodeBackup(sample);
    expect(code.startsWith('TLD1.')).toBe(true);
    expect(code).toMatch(/^TLD1\.[A-Za-z0-9_-]+$/);
    const r = await decodeBackup(code);
    expect(r).toEqual({ ok: true, progress: sample });
  });

  it('tolerates whitespace and line breaks pasted into the code', async () => {
    const code = await encodeBackup(sample);
    const messy = `  ${code.slice(0, 10)}\n${code.slice(10)}  `;
    expect(await decodeBackup(messy)).toEqual({ ok: true, progress: sample });
  });

  it('round-trips through the JSON file', () => {
    expect(parseJson(backupFileContents(sample))).toEqual({ ok: true, progress: sample });
  });

  it('accepts the raw localStorage JSON from the original app', async () => {
    expect(await decodeBackup(JSON.stringify(sample))).toEqual({ ok: true, progress: sample });
  });

  it('reads a code made by the export button added to the old single-file app', async () => {
    const fromOldApp =
      'TLD1.q1YqTk3NU7KqViouSE1N0TVQsjLSUSrOTM8r1jU2ULIyrNVRSs4vKkpNLkFRVFJUmlqro1RelJ-XrmQVjdARq6OUlJkO0ggA';
    expect(await decodeBackup(fromOldApp)).toEqual({
      ok: true,
      progress: {
        seen: { 'speed-0': 2, 'signs-30': 1 },
        correct: { 'speed-0': true },
        wrong: ['signs-30'],
        big: 1,
      },
    });
  });

  it('rejects bad data with a friendly error', async () => {
    for (const bad of [
      '',
      'hello',
      'TLD1.!!!!',
      'TLD1.AAAA',
      '[]',
      '{}',
      '{"wrong":"x"}',
      '{"seen":{"speed-0":-1}}',
    ]) {
      const r = await decodeBackup(bad);
      expect(r.ok, bad).toBe(false);
      if (!r.ok) expect(r.error.length).toBeGreaterThan(10);
    }
  });

  it('drops IDs for questions that do not exist', () => {
    const p = parseProgress({
      seen: { nope: 1 },
      correct: { nope: true },
      wrong: ['nope', 'speed-1'],
    });
    expect(p).toEqual({ seen: {}, correct: {}, wrong: ['speed-1'], big: 0 });
  });

  it('merges without losing existing progress', () => {
    const here: Progress = {
      seen: { 'speed-0': 5 },
      correct: { 'speed-1': true },
      wrong: ['safety-62'],
      big: 0,
    };
    const m = mergeProgress(here, sample);
    expect(m.seen['speed-0']).toBe(5);
    expect(m.correct).toEqual({ 'speed-1': true, 'speed-0': true, 'tas-79': true });
    expect(m.wrong).toEqual(['safety-62', 'giveway-12']);
    expect(m.big).toBe(0);
  });
});

describe('recordAnswer', () => {
  it('adds wrong answers to trouble spots and removes them when answered correctly', () => {
    let p = recordAnswer(emptyProgress(), 'speed-0', false);
    expect(p.wrong).toEqual(['speed-0']);
    p = recordAnswer(p, 'speed-0', false);
    expect(p.wrong).toEqual(['speed-0']);
    expect(p.seen['speed-0']).toBe(2);
    p = recordAnswer(p, 'speed-0', true);
    expect(p.wrong).toEqual([]);
    expect(p.correct['speed-0']).toBe(true);
  });
});
