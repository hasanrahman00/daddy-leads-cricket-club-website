import { useState } from 'react';
import { PLAYERS } from '../data/content.js';
import { useTexts } from '../context/TextsProvider';
import { ensurePassword, saveValue } from '../lib/editableAuth.js';
import { getCurrentYear } from '../lib/dateUtils.js';
import EditableText from './EditableText.jsx';
import AccumulatorStat from './AccumulatorStat.jsx';
import PlayerPhoto from './PlayerPhoto.jsx';

const DEFAULT_SQUAD_SIZE = 13;

// Build the default seed for a slot. Uses PLAYERS data when available,
// otherwise generates a friendly placeholder.
function seedFor(slotIndex) {
  const seed = PLAYERS[slotIndex];
  if (seed) {
    return {
      name: seed.name,
      role: seed.role,
      // Stats start at 0 for everyone — the season hasn't begun.
      // Use the accumulator to add real runs/wickets after each match.
      runs: '0',
      wickets: '0',
      jersey: seed.no,
      initials: seed.initials,
    };
  }
  const n = String(slotIndex + 1).padStart(2, '0');
  return {
    name: `Player ${slotIndex + 1}`,
    role: 'Player · Right-hand bat',
    runs: '0',
    wickets: '0',
    jersey: n,
    initials: `P${slotIndex + 1}`,
  };
}

function PlayerCard({ slotIndex }) {
  const seed = seedFor(slotIndex);
  const slot = `slot_${slotIndex + 1}`;

  return (
    <article className="polaroid card-tilt reveal text-center">
      {/* Round photo + overlapping editable jersey badge */}
      <div className="relative pt-2">
        <PlayerPhoto storageKey={`${slot}_photo`} initials={seed.initials} />

        {/* Jersey badge — overlapping bottom-right of the circle */}
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
        {/* Name */}
        <div className="font-serif text-lg leading-tight">
          <EditableText
            storageKey={`${slot}_name`}
            defaultValue={seed.name}
            type="text"
          />
        </div>

        {/* Role / designation */}
        <div className="text-[11px] uppercase tracking-wider text-ink-700 mt-1">
          <EditableText
            storageKey={`${slot}_role`}
            defaultValue={seed.role}
            type="text"
          />
        </div>

        {/* Stats — click to add to running total */}
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

function AddPlayerCard({ onAdd, isAdding }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={isAdding}
      className="reveal w-full min-h-[280px] flex flex-col items-center justify-center gap-4 bg-cream-50 border-2 border-dashed border-ink-950 rounded-[18px] hover:border-ember-500 hover:bg-cream-100 hover:-translate-y-1 hover:shadow-[6px_6px_0_#1A1A1A] transition-all p-6 group"
      title="Add a new player slot"
    >
      <div
        className="w-16 h-16 rounded-full border-2 border-dashed border-ink-950 group-hover:border-ember-500 group-hover:bg-ember-500/10 flex items-center justify-center transition-colors"
      >
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
          Click to create a new slot
        </div>
      </div>
    </button>
  );
}

export default function Squad() {
  const { texts, setLocalText } = useTexts();
  const squadSize =
    parseInt(texts['squad_size'] ?? String(DEFAULT_SQUAD_SIZE), 10) ||
    DEFAULT_SQUAD_SIZE;
  const [isAdding, setIsAdding] = useState(false);

  const handleAddSlot = async () => {
    if (isAdding) return;
    const pw = await ensurePassword();
    if (!pw) return;

    const next = squadSize + 1;
    const previous = squadSize;

    // Optimistic update — show the new dummy slot immediately so the user
    // sees something happen the instant they click. The API save runs in
    // the background; if it fails, we roll back.
    setLocalText('squad_size', String(next));
    setIsAdding(true);

    const result = await saveValue('squad_size', String(next));
    setIsAdding(false);

    if (!result.ok) {
      // Roll back the optimistic update
      setLocalText('squad_size', String(previous));
      if (result.reason === 'locked' || result.reason === 'unauthorized') {
        window.alert('Session locked — re-enter your password and try again.');
      } else {
        window.alert('Could not add slot.');
      }
    }
  };

  const handleRemoveSlot = async () => {
    if (squadSize <= 1) {
      window.alert('Cannot remove — at least one slot is required.');
      return;
    }
    const ok = window.confirm(
      `Remove the last slot (Player ${squadSize})? Its content stays in storage and will reappear if you click +.`,
    );
    if (!ok) return;
    const pw = await ensurePassword();
    if (!pw) return;
    const next = squadSize - 1;
    const previous = squadSize;
    setLocalText('squad_size', String(next));
    const result = await saveValue('squad_size', String(next));
    if (!result.ok) {
      setLocalText('squad_size', String(previous));
      window.alert('Could not remove slot.');
    }
  };

  return (
    <section id="squad" className="py-24 md:py-32 bg-cream-100 border-y border-ink-950">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="reveal">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">
            // The Squad
          </div>
          <h2 className="mt-3 font-display text-6xl md:text-7xl leading-none">
            <EditableText
              storageKey="squad_count"
              defaultValue={String(squadSize)}
              type="number"
            />{' '}
            names. one shirt.
          </h2>
        </div>

        {/* League / session / year banner — editable */}
        <div className="reveal mt-8 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 py-3 border-2 border-ink-950 bg-cream-50 rounded-xl shadow-[4px_4px_0_#1A1A1A]">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-ember-500">
              Playing in
            </span>
            <span className="hidden sm:inline w-px h-5 bg-ink-950/30" />
            <span className="font-display text-lg md:text-xl tracking-wider text-ink-950">
              <EditableText
                storageKey="squad_league"
                defaultValue="Premier League T20"
                type="text"
              />
            </span>
            <span className="text-ember-500">·</span>
            <span className="font-display text-lg md:text-xl tracking-wider text-ink-950">
              <EditableText
                storageKey="squad_session"
                defaultValue="Season 1"
                type="text"
              />
            </span>
            <span className="text-ember-500">·</span>
            <span className="font-display text-lg md:text-xl tracking-wider text-ink-950">
              <EditableText
                storageKey="squad_year"
                defaultValue={String(getCurrentYear())}
                type="year"
              />
            </span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: squadSize }, (_, i) => (
            <PlayerCard key={`slot-${i}`} slotIndex={i} />
          ))}
          <AddPlayerCard onAdd={handleAddSlot} isAdding={isAdding} />
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleRemoveSlot}
            disabled={squadSize <= 1}
            className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] border-2 border-ink-950 bg-cream-50 text-ink-950 hover:bg-ember-500 hover:text-cream-50 hover:border-ember-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-cream-50 disabled:hover:text-ink-950 disabled:hover:border-ink-950 transition-colors rounded-md shadow-[3px_3px_0_#1A1A1A]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
            </svg>
            Remove Last Slot
          </button>
        </div>
      </div>
    </section>
  );
}
