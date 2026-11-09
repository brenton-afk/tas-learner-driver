import { useCallback, useEffect, useState } from 'react';
import { QUESTIONS, type Question, type TopicId } from './data/questions';
import {
  emptyProgress,
  loadProgress,
  mergeProgress,
  recordAnswer,
  saveProgress,
  type Progress,
} from './lib/progress';
import {
  BY_ID,
  MOCK_LENGTH,
  QUICK_LENGTH,
  questionsForTopic,
  shuffle,
  topicName,
} from './lib/quiz';
import { Backup } from './components/Backup';
import { CheatSheet } from './components/CheatSheet';
import { Header } from './components/Header';
import { Home, type HomeAction } from './components/Home';
import { Quiz, type Run, type RunMode } from './components/Quiz';
import { Results } from './components/Results';
import { UpdatePrompt } from './components/UpdatePrompt';

type View = 'home' | 'quiz' | 'results' | 'ref' | 'backup';

export default function App() {
  const [progress, setProgress] = useState<Progress>(loadProgress);
  const [view, setView] = useState<View>('home');
  const [run, setRun] = useState<Run | null>(null);

  useEffect(() => {
    saveProgress(progress);
    document.documentElement.dataset.big = progress.big ? '1' : '0';
  }, [progress]);

  const goHome = useCallback(() => setView('home'), []);

  function start(list: Question[], mode: RunMode, instant: boolean, label = '') {
    if (!list.length) return;
    setRun({ list, i: 0, mode, instant, label, answers: [] });
    setView('quiz');
  }

  function onAction(a: HomeAction) {
    if (a === 'ref' || a === 'backup') return setView(a);
    if (a === 'quick') start(shuffle(QUESTIONS).slice(0, QUICK_LENGTH), 'quick', true);
    if (a === 'mock') start(shuffle(QUESTIONS).slice(0, MOCK_LENGTH), 'mock', false);
    if (a === 'trouble') {
      const list = progress.wrong.map((id) => BY_ID.get(id)).filter((q): q is Question => !!q);
      start(shuffle(list), 'trouble', true, 'Trouble spots');
    }
  }

  const onTopic = (id: TopicId) =>
    start(shuffle(questionsForTopic(id)), 'topic', true, topicName(id));

  const onAnswer = useCallback(
    (picked: number) => {
      if (!run || run.answers[run.i]) return;
      const q = run.list[run.i] as Question;
      const right = picked === q.answer;
      setRun({ ...run, answers: [...run.answers, { id: q.id, picked, right }] });
      setProgress((p) => recordAnswer(p, q.id, right));
    },
    [run],
  );

  function onNext() {
    if (!run) return;
    if (run.i === run.list.length - 1) setView('results');
    else setRun({ ...run, i: run.i + 1 });
  }

  function onReview() {
    if (!run) return;
    const missed = run.answers
      .filter((a) => !a.right)
      .map((a) => BY_ID.get(a.id))
      .filter((q): q is Question => !!q);
    start(shuffle(missed), 'review', true, 'Review');
  }

  function onReset() {
    if (window.confirm('Clear all saved progress on this device?')) {
      setProgress((p) => ({ ...emptyProgress(), big: p.big }));
    }
  }

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-20 -translate-y-24 rounded-lg bg-accent px-3.5 py-2.5 text-on-accent focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-[600px] px-[18px] pb-24">
        <Header
          big={progress.big === 1}
          onToggleBig={() => setProgress((p) => ({ ...p, big: p.big ? 0 : 1 }))}
        />
        <main id="main">
          {view === 'home' && (
            <Home progress={progress} onAction={onAction} onTopic={onTopic} onReset={onReset} />
          )}
          {view === 'quiz' && run && (
            <Quiz run={run} onAnswer={onAnswer} onNext={onNext} onHome={goHome} />
          )}
          {view === 'results' && run && (
            <Results answers={run.answers} onReview={onReview} onHome={goHome} />
          )}
          {view === 'ref' && <CheatSheet onHome={goHome} />}
          {view === 'backup' && (
            <Backup
              progress={progress}
              onImport={(p) => setProgress((cur) => mergeProgress(cur, p))}
              onHome={goHome}
            />
          )}
        </main>
      </div>
      <UpdatePrompt />
    </>
  );
}
