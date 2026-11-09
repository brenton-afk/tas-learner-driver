import { useRegisterSW } from 'virtual:pwa-register/react';

const HOUR = 60 * 60 * 1000;

/** Shows "Update available" when a new version has been deployed. */
export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      if (!registration) return;
      const check = () => {
        if (navigator.onLine) registration.update().catch(() => {});
      };
      window.setInterval(check, HOUR);
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') check();
      });
    },
  });

  if (!needRefresh) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
      <button
        type="button"
        onClick={() => updateServiceWorker(true)}
        className="mx-auto block min-h-14 w-full max-w-[564px] cursor-pointer rounded-card bg-accent px-4 py-3 font-bold text-on-accent shadow-lg hover:bg-accent-hover"
      >
        Update available, tap to refresh
      </button>
    </div>
  );
}
