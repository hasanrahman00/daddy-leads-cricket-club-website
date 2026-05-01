import { useRef, useState } from 'react';
import { useTexts } from '../context/TextsProvider';
import { ensurePassword, saveValue } from '../lib/editableAuth.js';
import { getCurrentYear } from '../lib/dateUtils.js';
import EditableText from './EditableText.jsx';
import PlayerPhoto from './PlayerPhoto.jsx';

const DEFAULT_COUNT = 4;
const COUNT_KEY = 'sponsors_count';

function seedFor(slotIndex) {
  return {
    name: `Sponsor ${slotIndex + 1}`,
    league: 'Premier League T20',
    season: 'Season 1',
    initials: `S${slotIndex + 1}`,
  };
}

function SponsorCard({ slotIndex }) {
  const seed = seedFor(slotIndex);
  const slot = `sponsor_${slotIndex + 1}`;

  return (
    <article className="snap-start flex-none w-[240px] md:w-[260px] polaroid card-tilt reveal text-center">
      {/* Round portrait */}
      <div className="pt-2">
        <PlayerPhoto storageKey={`${slot}_photo`} initials={seed.initials} />
      </div>

      <div className="pt-5 text-center">
        {/* Sponsor name */}
        <div className="font-serif text-lg leading-tight">
          <EditableText
            storageKey={`${slot}_name`}
            defaultValue={seed.name}
            type="text"
          />
        </div>

        {/* League */}
        <div className="mt-3 px-2 py-1.5 bg-ember-500/10 border border-ember-500/30 rounded-md">
          <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-ember-500 mb-0.5">
            League
          </div>
          <div className="text-[12px] font-semibold text-ink-950 leading-tight">
            <EditableText
              storageKey={`${slot}_league`}
              defaultValue={seed.league}
              type="text"
            />
          </div>
        </div>

        {/* Season */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 border border-ink-950 bg-cream-50 rounded-full text-[10px] font-bold uppercase tracking-[0.15em]">
          <span className="w-1.5 h-1.5 rounded-full bg-ember-500" />
          <EditableText
            storageKey={`${slot}_season`}
            defaultValue={seed.season}
            type="text"
          />
        </div>
      </div>
    </article>
  );
}

function AddSlotCard({ onAdd, isAdding }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={isAdding}
      className="snap-start flex-none w-[240px] md:w-[260px] reveal min-h-[340px] flex flex-col items-center justify-center gap-4 bg-cream-50 border-2 border-dashed border-ink-950 rounded-[18px] hover:border-ember-500 hover:bg-cream-100 hover:-translate-y-1 hover:shadow-[6px_6px_0_#1A1A1A] transition-all p-6 group"
      title="Add a new sponsor slot"
    >
      <div className="w-16 h-16 rounded-full border-2 border-dashed border-ink-950 group-hover:border-ember-500 group-hover:bg-ember-500/10 flex items-center justify-center transition-colors">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ink-950 group-hover:text-ember-500 transition-colors"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <div className="text-center">
        <div className="font-display text-2xl text-ink-950 leading-none">
          {isAdding ? 'Adding…' : 'Add Sponsor'}
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.2em] font-bold text-ink-700">
          Click to add a new slot
        </div>
      </div>
    </button>
  );
}

export default function OurSponsors() {
  const { texts, setLocalText } = useTexts();
  const count =
    parseInt(texts[COUNT_KEY] ?? String(DEFAULT_COUNT), 10) || DEFAULT_COUNT;
  const [isAdding, setIsAdding] = useState(false);
  const scrollerRef = useRef(null);

  const scrollByCard = (direction) => {
    scrollerRef.current?.scrollBy({ left: direction * 280, behavior: 'smooth' });
  };

  const handleAddSlot = async () => {
    if (isAdding) return;
    const pw = await ensurePassword();
    if (!pw) return;
    const next = count + 1;
    const previous = count;
    setLocalText(COUNT_KEY, String(next));
    setIsAdding(true);
    const result = await saveValue(COUNT_KEY, String(next));
    setIsAdding(false);
    if (!result.ok) {
      setLocalText(COUNT_KEY, String(previous));
      window.alert('Could not add slot.');
    }
    requestAnimationFrame(() => {
      scrollerRef.current?.scrollTo({
        left: scrollerRef.current.scrollWidth,
        behavior: 'smooth',
      });
    });
  };

  const handleRemoveSlot = async () => {
    if (count <= 1) {
      window.alert('Cannot remove — at least one slot is required.');
      return;
    }
    const ok = window.confirm(
      `Remove the last sponsor slot (#${count})? Its content stays in storage and will reappear if you click +.`,
    );
    if (!ok) return;
    const pw = await ensurePassword();
    if (!pw) return;
    const next = count - 1;
    const previous = count;
    setLocalText(COUNT_KEY, String(next));
    const result = await saveValue(COUNT_KEY, String(next));
    if (!result.ok) {
      setLocalText(COUNT_KEY, String(previous));
      window.alert('Could not remove slot.');
    }
  };

  return (
    <section
      id="our-sponsors"
      className="py-24 md:py-32 bg-cream-50 border-b border-ink-950"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto reveal">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">
            // Partners
          </div>
          <h2 className="mt-3 font-display text-5xl md:text-6xl lg:text-7xl leading-none">
            Our <span className="marker">Sponsors</span>
          </h2>
          <p className="mt-4 text-lg text-ink-700">
            The people and brands backing Daddy Leads CC season after season.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-12 -mx-5 md:-mx-8">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll left"
            className="hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-cream-50 border-2 border-ink-950 shadow-[3px_3px_0_#1A1A1A] hover:bg-ember-500 hover:text-cream-50 hover:-translate-y-[calc(50%+2px)] transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll right"
            className="hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-cream-50 border-2 border-ink-950 shadow-[3px_3px_0_#1A1A1A] hover:bg-ember-500 hover:text-cream-50 hover:-translate-y-[calc(50%+2px)] transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Edge fades */}
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
            <div className="flex gap-5 px-5 md:px-8 pb-3 pt-2">
              {Array.from({ length: count }, (_, i) => (
                <SponsorCard key={`sponsor-${i}`} slotIndex={i} />
              ))}
              <AddSlotCard onAdd={handleAddSlot} isAdding={isAdding} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-bold text-ink-700">
          <span>← Scroll →</span>
          <span className="flex-1 h-px bg-ink-700/25" />
          <span>{count} {count === 1 ? 'sponsor' : 'sponsors'}</span>
          <button
            type="button"
            onClick={handleRemoveSlot}
            disabled={count <= 1}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] border-2 border-ink-950 bg-cream-50 text-ink-950 hover:bg-ember-500 hover:text-cream-50 hover:border-ember-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-cream-50 disabled:hover:text-ink-950 disabled:hover:border-ink-950 transition-colors rounded-md shadow-[2px_2px_0_#1A1A1A]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
            </svg>
            Remove Last
          </button>
        </div>
      </div>
    </section>
  );
}
