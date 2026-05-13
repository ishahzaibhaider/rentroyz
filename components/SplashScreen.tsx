"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Wordmark from "./ui/Wordmark";

const SESSION_KEY = "rentroyz:splash-seen";
// Hard ceiling: splash never holds the page longer than this, even if the
// video preload hangs forever. Users on broken connections still get to see
// the site (with the gradient fallback instead of the video).
const MAX_DURATION_MS = 4000;
// Floor so the splash never flashes for a few frames on a fast connection —
// it should feel intentional, not buggy.
const MIN_DURATION_MS = 800;

export default function SplashScreen() {
  // We start `visible = true` so the splash is part of the initial server
  // render and there's no flash of unsplashed content on first paint.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Already shown earlier in this session (in-page navigation, refresh
    // during the same tab) — dismiss immediately, no second show.
    if (sessionStorage.getItem(SESSION_KEY)) {
      setVisible(false);
      return;
    }

    const start = Date.now();
    let dismissTimer: ReturnType<typeof setTimeout> | undefined;

    const dismiss = () => {
      if (dismissTimer) return;
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_DURATION_MS - elapsed);
      dismissTimer = setTimeout(() => {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          // sessionStorage can throw in some private-browsing modes — ignore.
        }
        setVisible(false);
      }, wait);
    };

    // Two paths to dismissal: whichever fires first.
    const maxTimer = setTimeout(dismiss, MAX_DURATION_MS);
    const onVideoReady = () => dismiss();
    window.addEventListener("rentroyz:video-ready", onVideoReady);

    return () => {
      clearTimeout(maxTimer);
      if (dismissTimer) clearTimeout(dismissTimer);
      window.removeEventListener("rentroyz:video-ready", onVideoReady);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Wordmark className="h-12 w-auto text-sand sm:h-14" />
            </motion.div>
            <div className="flex gap-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sand/50" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sand/50 [animation-delay:160ms]" />
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sand/50 [animation-delay:320ms]" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
