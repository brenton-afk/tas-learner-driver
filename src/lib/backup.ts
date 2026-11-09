import { parseProgress, type Progress } from './progress';

/**
 * Backup codes look like "TLD1.<base64url>" where the payload is the progress
 * JSON compressed with deflate-raw. "TLD0." is the same without compression,
 * used when the browser has no CompressionStream. Plain JSON is accepted too.
 */
const COMPRESSED = 'TLD1.';
const PLAIN = 'TLD0.';

function toBase64Url(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(s: string): Uint8Array {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/');
  const bin = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

async function pipe(bytes: Uint8Array, stream: CompressionStream | DecompressionStream) {
  const out = new Blob([bytes as BlobPart]).stream().pipeThrough(stream);
  return new Uint8Array(await new Response(out).arrayBuffer());
}

export async function encodeBackup(p: Progress): Promise<string> {
  const bytes = new TextEncoder().encode(JSON.stringify(p));
  if (typeof CompressionStream === 'undefined') return PLAIN + toBase64Url(bytes);
  return COMPRESSED + toBase64Url(await pipe(bytes, new CompressionStream('deflate-raw')));
}

export type DecodeResult = { ok: true; progress: Progress } | { ok: false; error: string };

const BAD =
  "That doesn't look like a progress code from this app. Check you copied all of it and try again.";

export async function decodeBackup(input: string): Promise<DecodeResult> {
  const text = input.replace(/\s+/g, '');
  if (!text) return { ok: false, error: 'Paste a progress code first.' };
  let json: string;
  try {
    if (text.startsWith(COMPRESSED)) {
      if (typeof DecompressionStream === 'undefined') {
        return { ok: false, error: "This browser can't read compressed codes. Try the JSON file." };
      }
      const raw = await pipe(
        fromBase64Url(text.slice(COMPRESSED.length)),
        new DecompressionStream('deflate-raw'),
      );
      json = new TextDecoder().decode(raw);
    } else if (text.startsWith(PLAIN)) {
      json = new TextDecoder().decode(fromBase64Url(text.slice(PLAIN.length)));
    } else {
      json = input;
    }
    return parseJson(json);
  } catch {
    return { ok: false, error: BAD };
  }
}

/** Parses a backup JSON file (either the bare progress object or the wrapped file format). */
export function parseJson(json: string): DecodeResult {
  try {
    const data: unknown = JSON.parse(json);
    const body =
      typeof data === 'object' && data !== null && 'progress' in data
        ? (data as { progress: unknown }).progress
        : data;
    const progress = parseProgress(body);
    return progress ? { ok: true, progress } : { ok: false, error: BAD };
  } catch {
    return { ok: false, error: BAD };
  }
}

export function backupFileContents(p: Progress): string {
  return JSON.stringify(
    { app: 'tas-learner-driver', version: 1, exported: new Date().toISOString(), progress: p },
    null,
    2,
  );
}
