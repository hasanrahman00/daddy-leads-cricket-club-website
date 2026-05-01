import { FAQ_ITEMS } from '../data/content.js';

export default function FAQ() {
  return (
    <section className="py-24 bg-cream-100 border-y border-ink-950">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <div className="reveal text-center">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">// FAQ</div>
          <h2 className="mt-3 font-display text-5xl md:text-6xl leading-none">Asked &amp; answered.</h2>
        </div>
        <div className="mt-12 space-y-3 reveal">
          {FAQ_ITEMS.map((it, i) => (
            <details key={i} className="border border-ink-950 bg-cream-50 p-5 group">
              <summary className="flex items-center justify-between font-serif text-lg">
                {it.q}
                <span className="chev font-display text-2xl">▾</span>
              </summary>
              <p className="mt-4 text-ink-700">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
