import { useRef } from 'react';
import { PRODUCTS } from '../data/content.js';

export default function About() {
  const scrollerRef = useRef(null);
  const scrollByCards = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Scroll by ~one card-width plus gap (≈ 320px) per click
    el.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* PART 1 — about the club */}
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 reveal">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">// About the Club</div>
            <h2 className="mt-3 font-display text-6xl md:text-7xl leading-none">
              A side built
              <br />
              on <span className="marker">leads</span>
              <br />
              and <span className="marker">legacy</span>.
            </h2>
            <p className="mt-6 italic font-serif text-ink-700">"a gentleman's game"</p>
          </div>
          <div className="md:col-span-7 reveal space-y-7 text-lg text-ink-800">
            {/* Lead paragraph — chip-style year badges + marker accent */}
            <p className="leading-relaxed">
              Daddy Leads Cricket Club is brand new — founded in{' '}
              <span className="inline-flex items-center px-2.5 py-0.5 bg-ember-500 text-cream-50 text-base font-bold tracking-wide rounded-md align-baseline">
                2026
              </span>{' '}
              by the team behind Daddy Leads, the{' '}
              <strong className="marker font-bold text-ink-950">software development company</strong>{' '}
              that's been shipping{' '}
              <span className="font-bold text-ink-950">B2B SaaS tools</span> since{' '}
              <span className="inline-flex items-center px-2.5 py-0.5 bg-ink-950 text-cream-50 text-base font-bold tracking-wide rounded-md align-baseline">
                2022
              </span>
              . The club is our way of putting the same hustle that built our software
              into something we{' '}
              <em className="font-serif font-semibold text-ink-950 not-italic">
                love off-screen
              </em>
              .
            </p>

            {/* Pull-quote — team motto with vertical ember accent bar */}
            <div className="relative pl-6 py-2">
              <div
                className="absolute left-0 top-2 bottom-2 w-1 bg-ember-500 rounded-full"
                aria-hidden="true"
              />
              <p className="font-serif text-xl md:text-2xl leading-snug text-ink-950 italic">
                "Twenty-two players, one jersey, cream on black."
              </p>
              <p className="mt-3 text-base text-ink-700 leading-relaxed">
                Premier-level cricket from ball one. We play hard, we travel together,
                and{' '}
                <strong className="text-ink-950 font-semibold">
                  we never let a teammate carry the bag alone
                </strong>
                .
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5 pt-6">
              {[
                { k: 'Home Ground',  v: 'Dhunat Cricket Club' },
                { k: 'Club Founded', v: 'Spring 2026'         },
                { k: 'Colours',      v: 'Cream & Black'       },
              ].map((x) => (
                <div key={x.k} className="border-l-[3px] border-ink-950 pl-4">
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-ember-500">
                    {x.k}
                  </div>
                  <div className="font-serif text-lg md:text-xl text-ink-950 leading-tight mt-1.5 whitespace-nowrap">
                    {x.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-20 md:my-24 stitch h-[3px]" />

        {/* PART 2 — Try Our Tools (full-width, products carousel) */}
        <div className="reveal">
          {/* Centered header block */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">
              // Try Our Tools
            </div>
            <h2 className="mt-3 font-display text-5xl md:text-6xl lg:text-7xl leading-none">
              {PRODUCTS.length} SaaS Tools.{' '}
              <span className="marker">One Stack.</span>
            </h2>
            <p className="mt-4 text-lg text-ink-700">
              Built for modern outbound teams — scrapers, enrichers, validators &amp; outreach
              under one roof.
            </p>

            {/* WhatsApp CTA — centered below description */}
            <div className="mt-8 flex justify-center">
              <a
                href={`https://wa.me/8801885781259?text=${encodeURIComponent(
                  "Hi Daddy Leads — I'd like to try your tools.",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp group max-w-sm"
              >
                <span className="inline-flex items-center justify-center w-10 h-10 bg-cream-50 border border-ink-950 text-[#25D366]">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                </span>
                <span className="flex-1 text-left leading-tight">
                  <span className="block text-[10px] uppercase tracking-[0.25em] font-bold opacity-80">
                    Free trial · setup help
                  </span>
                  <span className="block text-base">Chat on WhatsApp</span>
                </span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Horizontal scroll carousel — full-width with arrow buttons */}
          <div className="relative mt-12 -mx-5 md:-mx-8">
            {/* Left arrow */}
            <button
              type="button"
              onClick={() => scrollByCards(-1)}
              aria-label="Scroll products left"
              className="hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-cream-50 border-2 border-ink-950 shadow-[3px_3px_0_#1A1A1A] hover:bg-ember-500 hover:text-cream-50 hover:-translate-y-[calc(50%+2px)] transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right arrow */}
            <button
              type="button"
              onClick={() => scrollByCards(1)}
              aria-label="Scroll products right"
              className="hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-cream-50 border-2 border-ink-950 shadow-[3px_3px_0_#1A1A1A] hover:bg-ember-500 hover:text-cream-50 hover:-translate-y-[calc(50%+2px)] transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Edge fades so cards visibly disappear under the cream on both sides */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
              style={{ background: 'linear-gradient(to right, #FBF1E5, transparent)' }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
              style={{ background: 'linear-gradient(to left, #FBF1E5, transparent)' }}
              aria-hidden="true"
            />

            <div
              ref={scrollerRef}
              className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-pl-5 md:scroll-pl-8"
            >
              <div className="flex gap-5 px-5 md:px-8 pb-3">
                {PRODUCTS.map((p) => (
                  <article
                    key={p.name}
                    className="snap-start flex-none w-[280px] md:w-[300px] bg-cream-50 border-2 border-ink-950 shadow-[5px_5px_0_#1A1A1A] hover:shadow-[8px_8px_0_#1A1A1A] hover:-translate-y-1 transition-all duration-200 p-5 group cursor-default"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="font-display text-base bg-ink-950 text-cream-50 w-12 h-12 inline-flex items-center justify-center border border-ink-950 group-hover:bg-ember-500 transition-colors">
                        {p.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-700">
                        SaaS
                      </span>
                    </div>
                    <h4 className="font-serif text-[19px] text-ink-950 leading-tight">
                      {p.name}
                    </h4>
                    <p className="mt-3 text-[13px] text-ink-700 leading-relaxed">
                      {p.desc}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll hint footer */}
          <div className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-bold text-ink-700">
            <span>← Scroll →</span>
            <span className="flex-1 h-px bg-ink-700/25" />
            <span>{PRODUCTS.length} products</span>
          </div>
        </div>
      </div>
    </section>
  );
}
