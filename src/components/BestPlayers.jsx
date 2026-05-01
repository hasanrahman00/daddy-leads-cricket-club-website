import { useRef, useState } from 'react';
import { useTexts } from '../context/TextsProvider';
import { ensurePassword, saveValue } from '../lib/editableAuth.js';
import EditableText from './EditableText.jsx';
import AccumulatorStat from './AccumulatorStat.jsx';
import PlayerPhoto from './PlayerPhoto.jsx';

const DEFAULT_COUNT = 4;
const COUNT_KEY = 'best_players_count';

function seedFor(slotIndex) {
  const n = String(slotIndex + 1).padStart(2, '0');
  return {
    name: `Best Player ${slotIndex + 1}`,
    role: 'MVP · Top Performer',
    runs: '0',
    wickets: '0',
    jersey: n,
    initials: `B${slotIndex + 1}`,
    league: 'Premier League T20',
    session: 'Season 1',
  };
}

function BestPlayerCard({ slotIndex }) {
  const seed = seedFor(slotIndex);
  const slot = `best_player_${slotIndex + 1}`;

  return (
    <article className="snap-start flex-none w-[240px] md:w-[260px] polaroid card-tilt reveal text-center">
      {/* Round portrait + jersey badge */}
      <div className="relative pt-2">
        <PlayerPhoto storageKey={`${slot}_photo`} initials={seed.initials} />

        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 inline-flex items-center bg-ember-500 text-cream-50 font-display text-xs border-2 border-ink-950 shadow-[2px_2px_0_#1A1A1A] px-2 py-0.5"
          style={{ minWidth: '2.4rem', justifyContent: 'center' }}
        >
          #
          <EditableText
            storageKey={`${slot}_jersey`}
            defaultValue={seed.jersey}
            type="text"
          />
        </div>
      </div>

      <div className="pt-7 text-center">
        {/* Subtle "MVP" ribbon */}
        <div className="inline-flex items-center gap-1 px-2 py-0.5 mb-2 bg-gold-500/15 border border-gold-500/40 rounded-sm">
          <span aria-hidden="true">🏆</span>
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gold-500">
            Hall of Fame
          </span>
        </div>

        <div className="font-serif text-lg leading-tight">
          <EditableText
            storageKey={`${slot}_name`}
            defaultValue={seed.name}
            type="text"
          />
        </div>

        <div className="text-[11px] uppercase tracking-wider text-ink-700 mt-1">
          <EditableText
            storageKey={`${slot}_role`}
            defaultValue={seed.role}
            type="text"
          />
        </div>

        {/* League + session — context for which competition they were best in */}
        <div className="mt-2 px-2 py-1.5 bg-ember-500/10 border border-ember-500/30 rounded-md">
          <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-ember-500 mb-0.5">
            Best in
          </div>
          <div className="text-[11px] font-semibold text-ink-950 leading-tight">
            <EditableText
              storageKey={`${slot}_league`}
              defaultValue={seed.league}
              type="text"
            />
          </div>
          <div className="text-[10px] uppercase tracking-wider text-ink-700 mt-0.5">
            <EditableText
              storageKey={`${slot}_session`}
              defaultValue={seed.session}
              type="text"
            />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-3 text-xs flex-wrap">
          <AccumulatorStat
            storageKey={`${slot}_runs`}
            defaultValue={seed.runs}
            emoji="🏏"
            label="runs"
          />
          <span className="text-ember-500">•</span>
          <AccumulatorStat
            storageKey={`${slot}_wickets`}
            defaultValue={seed.wickets}
            emoji="🎯"
            label="wkts"
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
      title="Add a new best-player slot"
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
          {isAdding ? 'Adding…' : 'Add Player'}
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.2em] font-bold text-ink-700">
          Click to nominate an MVP
        </div>
      </div>
    </button>
  );
}

export default function BestPlayers() {
  const { texts, setLocalText } = useTexts();
  const count =
    parseInt(texts[COUNT_KEY] ?? String(DEFAULT_COUNT), 10) || DEFAULT_COUNT;
  const [isAdding, setIsAdding] = useState(false);
  const scrollerRef = useRef(null);

  const scrollByCard = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 280, behavior: 'smooth' });
  };

  const handleAddSlot = async () => {
    if (isAdding) return;
    const pw = await ensurePassword();
    if (!pw) return;

    const next = count + 1;
    const previous = count;
    // Optimistic: show the new card immediately
    setLocalText(COUNT_KEY, String(next));
    setIsAdding(true);
    const result = await saveValue(COUNT_KEY, String(next));
    setIsAdding(false);
    if (!result.ok) {
      setLocalText(COUNT_KEY, String(previous));
      if (result.reason === 'locked' || result.reason === 'unauthorized') {
        window.alert('Session locked — re-enter your password and try again.');
      } else {
        window.alert('Could not add slot.');
      }
    }
    // Scroll to the right so the new card is visible
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
      `Remove the last slot (Best Player ${count})? Its content stays in storage and will reappear if you click +.`,
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
      id="best-players"
      className="py-24 md:py-32 bg-cream-50 border-b border-ink-950"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto reveal">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">
            // Hall of Fame
          </div>
          <h2 className="mt-3 font-display text-5xl md:text-6xl lg:text-7xl leading-none">
            Best Players of{' '}
            <span className="marker">Daddy Leads</span>
          </h2>
          <p className="mt-4 text-lg text-ink-700">
            Match-winners, season MVPs, the players who showed up when it mattered.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-12 -mx-5 md:-mx-8">
          {/* Left arrow */}
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

          {/* Right arrow */}
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

          {/* Scroller */}
          <div
            ref={scrollerRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-pl-5 md:scroll-pl-8"
          >
            <div className="flex gap-5 px-5 md:px-8 pb-3 pt-2">
              {Array.from({ length: count }, (_, i) => (
                <BestPlayerCard key={`best-${i}`} slotIndex={i} />
              ))}
              <AddSlotCard onAdd={handleAddSlot} isAdding={isAdding} />
            </div>
          </div>
        </div>

        {/* Scroll hint footer + remove button */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-bold text-ink-700">
          <span>← Scroll →</span>
          <span className="flex-1 h-px bg-ink-700/25" />
          <span>{count} {count === 1 ? 'player' : 'players'}</span>
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
