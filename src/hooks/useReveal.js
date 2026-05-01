import { useEffect } from 'react';

// Adds the `.in` class to any `.reveal` element when it scrolls into view.
// Also watches for `.reveal` elements added to the DOM AFTER mount (e.g.
// when the user clicks "+" in the Squad to add a new player slot) so they
// don't stay stuck at opacity:0.
export default function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    const observeIfReveal = (el) => {
      if (!el || el.nodeType !== 1) return;
      if (el.classList?.contains('reveal') && !el.classList.contains('in')) {
        io.observe(el);
      }
      el.querySelectorAll?.('.reveal:not(.in)').forEach((child) => {
        io.observe(child);
      });
    };

    // Initial sweep
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // Watch for nodes added after mount (dynamically-rendered cards, etc.)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach(observeIfReveal);
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
