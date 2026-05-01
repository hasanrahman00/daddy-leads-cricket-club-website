import { NEWS } from '../data/content.js';

export default function News() {
  return (
    <section id="news" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="reveal">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">// Latest</div>
          <h2 className="mt-3 font-display text-6xl md:text-7xl leading-none">From the dressing room.</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {NEWS.map((n, i) => (
            <article key={i} className="border border-ink-950 bg-cream-50 p-7 card-tilt reveal flex flex-col">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">{n.tag}</div>
              <h3 className="mt-3 font-serif text-2xl leading-snug">{n.title}</h3>
              <p className="mt-4 text-ink-700 flex-1">{n.excerpt}</p>
              <div className="mt-6 pt-4 border-t border-ink-950 flex items-center justify-between text-xs uppercase tracking-widest">
                <span>{n.date}</span>
                <a href="#" className="font-bold inline-flex items-center gap-1">
                  Read
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
