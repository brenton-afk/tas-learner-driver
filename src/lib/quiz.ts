import { QUESTIONS, TOPICS, type Question, type TopicId } from '../data/questions';

export const MOCK_LENGTH = 30;
export const QUICK_LENGTH = 10;

export function shuffle<T>(items: readonly T[]): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j] as T, a[i] as T];
  }
  return a;
}

export const BY_ID: ReadonlyMap<string, Question> = new Map(QUESTIONS.map((q) => [q.id, q]));

export const topicName = (id: TopicId) => TOPICS.find((t) => t.id === id)?.name ?? '';

export const questionsForTopic = (id: TopicId) => QUESTIONS.filter((q) => q.topic === id);
