import { useState } from 'react';
import { FIXTURES, RESULTS } from '../data/content.js';
import { useTexts } from '../context/TextsProvider';
import { ensurePassword, saveValue } from '../lib/editableAuth.js';
import { getCurrentYear } from '../lib/dateUtils.js';
import EditableText from './EditableText.jsx';

const DEFAULT_FIXTURES = 7;
const DEFAULT_RESULTS = 7;

const FIXTURES_COUNT_KEY = 'fixtures_count';
const RESULTS_COUNT_KEY = 'results_count';

// "MAY 09" → "2026-05-09" (best-effort using current year)
function legacyDateToIso(legacy, fallbackYear) {
  if (!legacy) return '';
  const m = String(legacy).match(/^([A-Z]{3})\s+(\d{1,2})$/i);
  if (!m) return legacy;
  const monthMap = {
    JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06',
    JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12',
  };
  const mm = monthMap[m[1].toUpperCase()];
  if (!mm) return legacy;
  const dd = String(parseInt(m[2], 10)).padStart(2, '0');
  return `${fallbackYear}-${mm}-${dd}`;
}

const SEED_YEAR = new Date().getFullYear();

function fixtureSeed(slotIndex) {
  const real = FIXTURES[slotIndex];
  if (real) {
    return {
      date: legacyDateToIso(real.date, SEED_YEAR),
      time: real.time,
      opp: real.opp,
      venue: real.venue,
    };
  }
  return {
    date: '',
    time: '14:00',
    opp: `Opponent ${slotIndex + 1}`,
    venue: 'Venue · TBD',
  };
}

function resultSeed(slotIndex) {
  const real = RESULTS[slotIndex];
  if (real) {
    return {
      date: legacyDateToIso(real.date, SEED_YEAR),
      opp: real.opp,
      usRuns: String(real.us),
      usWkts: '0',
      themRuns: String(real.them),
      themWkts: '0',
      overs: String(real.overs),
      outcome: real.result === 'WON' ? 'WON' : 'LOST',
      margin: real.margin,
    };
  }
  return {
    date: '',
    opp: `Opponent ${slotIndex + 1}`,
    usRuns: '0',
    usWkts: '0',
    themRuns: '0',
    themWkts: '0',
    overs: '20',
    outcome: 'WON',
    margin: '',
  };
}

const OUTCOME_OPTIONS = ['WON', 'LOST', 'TIED', 'NO RESULT'];

function FixtureRow({ slotIndex }) {
  const i = slotIndex + 1;
  const seed = fixtureSeed(slotIndex);
  return (
    <div className="grid grid-cols-12 gap-4 px-5 md:px-8 py-6 border-b border-ink-950 last:border-b-0 items-center hover:bg-cream-100 transition">
      <div className="col-span-3 md:col-span-2">
        <div className="font-display text-2xl md:text-3xl leading-none">
          <EditableText
            storageKey={`fixture_${i}_date`}
            defaultValue={seed.date}
            type="date"
          />
        </div>
        <div className="text-xs uppercase tracking-widest mt-1">
          <EditableText
            storageKey={`fixture_${i}_time`}
            defaultValue={seed.time}
            type="time"
          />
        </div>
      </div>
      <div className="col-span-9 md:col-span-10">
        <div className="font-serif text-xl md:text-2xl">
          DLCC <span className="text-ink-700">vs</span>{' '}
          <EditableText
            storageKey={`fixture_${i}_opp`}
            defaultValue={seed.opp}
            type="text"
          />
        </div>
        <div className="text-sm text-ink-700 mt-1">
          <EditableText
            storageKey={`fixture_${i}_venue`}
            defaultValue={seed.venue}
            type="text"
          />
        </div>
      </div>
    </div>
  );
}

function ResultRow({ slotIndex }) {
  const i = slotIndex + 1;
  const seed = resultSeed(slotIndex);
  const { texts } = useTexts();
  const outcomeKey = `result_${i}_outcome`;
  const outcome = String(texts[outcomeKey] ?? seed.outcome).toUpperCase();
  const isWon = outcome === 'WON';

  return (
    <tr className="hover:bg-cream-100 transition border-b border-ink-950 last:border-b-0">
      <td className="px-4 py-4 font-display text-base whitespace-nowrap">
        <EditableText
          storageKey={`result_${i}_date`}
          defaultValue={seed.date}
          type="date"
        />
      </td>
      <td className="px-4 py-4 font-serif">
        <EditableText
          storageKey={`result_${i}_opp`}
          defaultValue={seed.opp}
          type="text"
        />
      </td>
      {/* DLCC: runs / wickets */}
      <td className="px-4 py-4 font-display text-lg whitespace-nowrap">
        <EditableText
          storageKey={`result_${i}_us_runs`}
          defaultValue={seed.usRuns}
          type="number"
        />
        <span className="text-ink-700 mx-0.5">/</span>
        <EditableText
          storageKey={`result_${i}_us_wkts`}
          defaultValue={seed.usWkts}
          type="number"
        />
      </td>
      {/* Opp: runs / wickets */}
      <td className="px-4 py-4 font-display text-lg whitespace-nowrap">
        <EditableText
          storageKey={`result_${i}_them_runs`}
          defaultValue={seed.themRuns}
          type="number"
        />
        <span className="text-ink-700 mx-0.5">/</span>
        <EditableText
          storageKey={`result_${i}_them_wkts`}
          defaultValue={seed.themWkts}
          type="number"
        />
      </td>
      <td className="px-4 py-4">
        <EditableText
          storageKey={`result_${i}_overs`}
          defaultValue={seed.overs}
          type="number"
        />
      </td>
      <td className="px-4 py-4 whitespace-nowrap">
        <span
          className={`inline-block px-2 py-1 text-xs font-bold uppercase tracking-widest border ${
            isWon
              ? 'bg-ink-950 text-cream-50 border-ink-950'
              : 'bg-cream-50 text-ink-950 border-ink-950'
          }`}
        >
          <EditableText
            storageKey={outcomeKey}
            defaultValue={seed.outcome}
            type="select"
            options={OUTCOME_OPTIONS}
          />
        </span>
        <span className="ml-3 text-xs text-ink-700">
          <EditableText
            storageKey={`result_${i}_margin`}
            defaultValue={seed.margin}
            type="text"
          />
        </span>
      </td>
    </tr>
  );
}

function ResultCard({ slotIndex }) {
  const i = slotIndex + 1;
  const seed = resultSeed(slotIndex);
  const { texts } = useTexts();
  const outcomeKey = `result_${i}_outcome`;
  const outcome = String(texts[outcomeKey] ?? seed.outcome).toUpperCase();
  const isWon = outcome === 'WON';

  return (
    <div className="px-5 py-5 border-b border-ink-950 last:border-b-0 hover:bg-cream-100 transition">
      {/* Top row: date + outcome badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-ember-500 font-bold">
            Match Date
          </div>
          <div className="font-display text-2xl mt-0.5">
            <EditableText
              storageKey={`result_${i}_date`}
              defaultValue={seed.date}
              type="date"
            />
          </div>
        </div>
        <span
          className={`inline-block px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest border whitespace-nowrap ${
            isWon
              ? 'bg-ink-950 text-cream-50 border-ink-950'
              : 'bg-cream-50 text-ink-950 border-ink-950'
          }`}
        >
          <EditableText
            storageKey={outcomeKey}
            defaultValue={seed.outcome}
            type="select"
            options={OUTCOME_OPTIONS}
          />
        </span>
      </div>

      {/* Opponent */}
      <div className="mb-4">
        <div className="text-[10px] uppercase tracking-widest text-ink-700 font-bold mb-0.5">
          DLCC vs
        </div>
        <div className="font-serif text-xl">
          <EditableText
            storageKey={`result_${i}_opp`}
            defaultValue={seed.opp}
            type="text"
          />
        </div>
      </div>

      {/* Score grid: DLCC | Opp | Overs */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-ink-950/15">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-ink-700 font-bold">DLCC</div>
          <div className="font-display text-lg mt-1 whitespace-nowrap">
            <EditableText
              storageKey={`result_${i}_us_runs`}
              defaultValue={seed.usRuns}
              type="number"
            />
            <span className="text-ink-700 mx-0.5">/</span>
            <EditableText
              storageKey={`result_${i}_us_wkts`}
              defaultValue={seed.usWkts}
              type="number"
            />
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-ink-700 font-bold">Opp</div>
          <div className="font-display text-lg mt-1 whitespace-nowrap">
            <EditableText
              storageKey={`result_${i}_them_runs`}
              defaultValue={seed.themRuns}
              type="number"
            />
            <span className="text-ink-700 mx-0.5">/</span>
            <EditableText
              storageKey={`result_${i}_them_wkts`}
              defaultValue={seed.themWkts}
              type="number"
            />
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-ink-700 font-bold">Overs</div>
          <div className="font-display text-lg mt-1">
            <EditableText
              storageKey={`result_${i}_overs`}
              defaultValue={seed.overs}
              type="number"
            />
          </div>
        </div>
      </div>

      {/* Margin (if any) */}
      <div className="mt-3 pt-3 border-t border-ink-950/15">
        <div className="text-[10px] uppercase tracking-widest text-ink-700 font-bold mb-1">
          Margin
        </div>
        <div className="text-sm text-ink-700">
          <EditableText
            storageKey={`result_${i}_margin`}
            defaultValue={seed.margin}
            type="text"
          />
        </div>
      </div>
    </div>
  );
}

function RowActions({ addLabel, onAdd, isAdding, onRemove, canRemove }) {
  return (
    <div className="flex items-stretch border-t-2 border-dashed border-ink-950 bg-cream-50">
      <button
        type="button"
        onClick={onAdd}
        disabled={isAdding}
        className="flex-1 flex items-center justify-center gap-2 px-5 md:px-8 py-5 text-xs font-bold uppercase tracking-[0.25em] hover:bg-ember-500/15 hover:text-ember-500 transition-colors"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        {isAdding ? 'Adding…' : addLabel}
      </button>
      <button
        type="button"
        onClick={onRemove}
        disabled={!canRemove}
        className="flex items-center justify-center gap-2 px-5 md:px-8 py-5 text-xs font-bold uppercase tracking-[0.25em] border-l-2 border-dashed border-ink-950 hover:bg-ember-500 hover:text-cream-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-cream-50 disabled:hover:text-ink-950 transition-colors"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
        </svg>
        Remove Last
      </button>
    </div>
  );
}

export default function Fixtures() {
  const [tab, setTab] = useState('upcoming');
  const { texts, setLocalText } = useTexts();
  const [isAddingFixture, setIsAddingFixture] = useState(false);
  const [isAddingResult, setIsAddingResult] = useState(false);

  const fixturesCount =
    parseInt(texts[FIXTURES_COUNT_KEY] ?? String(DEFAULT_FIXTURES), 10) ||
    DEFAULT_FIXTURES;
  const resultsCount =
    parseInt(texts[RESULTS_COUNT_KEY] ?? String(DEFAULT_RESULTS), 10) ||
    DEFAULT_RESULTS;

  const addSlot = async (countKey, currentCount, setLoading) => {
    if (setLoading.current) return;
    const pw = await ensurePassword();
    if (!pw) return;
    const next = currentCount + 1;
    setLocalText(countKey, String(next));
    setLoading(true);
    const result = await saveValue(countKey, String(next));
    setLoading(false);
    if (!result.ok) {
      setLocalText(countKey, String(currentCount));
      if (result.reason === 'locked' || result.reason === 'unauthorized') {
        window.alert('Session locked — re-enter your password and try again.');
      } else {
        window.alert('Could not add slot.');
      }
    }
  };

  const removeSlot = async (countKey, currentCount, label) => {
    if (currentCount <= 1) {
      window.alert('Cannot remove — at least one row is required.');
      return;
    }
    const ok = window.confirm(
      `Remove the last ${label} (row ${currentCount})? Its content stays in storage and will reappear if you click +.`,
    );
    if (!ok) return;
    const pw = await ensurePassword();
    if (!pw) return;
    const next = currentCount - 1;
    setLocalText(countKey, String(next));
    const result = await saveValue(countKey, String(next));
    if (!result.ok) {
      setLocalText(countKey, String(currentCount));
      window.alert(`Could not remove ${label}.`);
    }
  };

  const handleAddFixture = () =>
    addSlot(FIXTURES_COUNT_KEY, fixturesCount, setIsAddingFixture);
  const handleAddResult = () =>
    addSlot(RESULTS_COUNT_KEY, resultsCount, setIsAddingResult);
  const handleRemoveFixture = () =>
    removeSlot(FIXTURES_COUNT_KEY, fixturesCount, 'fixture');
  const handleRemoveResult = () =>
    removeSlot(RESULTS_COUNT_KEY, resultsCount, 'result');

  return (
    <section id="fixtures" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex items-end justify-between flex-wrap gap-6 reveal">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">
              // Schedule
            </div>
            <h2 className="mt-3 font-display text-6xl md:text-7xl leading-none">
              Fixtures &amp; Results
            </h2>
          </div>
          <div className="inline-flex border border-ink-950 rounded-md overflow-hidden">
            <button
              onClick={() => setTab('upcoming')}
              className={`px-5 py-3 text-sm font-bold uppercase tracking-widest transition-colors ${
                tab === 'upcoming'
                  ? 'bg-ink-950 text-cream-50'
                  : 'bg-cream-50 text-ink-950 hover:bg-cream-100'
              }`}
            >
              Upcoming · {fixturesCount}
            </button>
            <button
              onClick={() => setTab('results')}
              className={`px-5 py-3 text-sm font-bold uppercase tracking-widest border-l border-ink-950 transition-colors ${
                tab === 'results'
                  ? 'bg-ink-950 text-cream-50'
                  : 'bg-cream-50 text-ink-950 hover:bg-cream-100'
              }`}
            >
              Results · {resultsCount}
            </button>
          </div>
        </div>

        {/* League / session / year banner — applies to both fixtures and results */}
        <div className="reveal mt-8 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 py-3 border-2 border-ink-950 bg-cream-50 rounded-xl shadow-[4px_4px_0_#1A1A1A]">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-ember-500">
              Schedule for
            </span>
            <span className="hidden sm:inline w-px h-5 bg-ink-950/30" />
            <span className="font-display text-lg md:text-xl tracking-wider text-ink-950">
              <EditableText
                storageKey="fixtures_league"
                defaultValue="Premier League T20"
                type="text"
              />
            </span>
            <span className="text-ember-500">·</span>
            <span className="font-display text-lg md:text-xl tracking-wider text-ink-950">
              <EditableText
                storageKey="fixtures_session"
                defaultValue="Season 1"
                type="text"
              />
            </span>
            <span className="text-ember-500">·</span>
            <span className="font-display text-lg md:text-xl tracking-wider text-ink-950">
              <EditableText
                storageKey="fixtures_year"
                defaultValue={String(getCurrentYear())}
                type="year"
              />
            </span>
          </div>
        </div>

        <div className="mt-10 reveal">
          {tab === 'upcoming' ? (
            <div className="border border-ink-950 bg-cream-50 rounded-lg overflow-hidden shadow-[6px_6px_0_#1A1A1A]">
              {Array.from({ length: fixturesCount }, (_, i) => (
                <FixtureRow key={`fix-${i}`} slotIndex={i} />
              ))}
              <RowActions
                addLabel="Add Fixture"
                onAdd={handleAddFixture}
                isAdding={isAddingFixture}
                onRemove={handleRemoveFixture}
                canRemove={fixturesCount > 1}
              />
            </div>
          ) : (
            <>
              {/* Desktop / tablet — proper table */}
              <div className="hidden md:block overflow-x-auto border border-ink-950 bg-cream-50 rounded-lg shadow-[6px_6px_0_#1A1A1A]">
                <table className="w-full scoreboard">
                  <thead className="bg-ink-950 text-cream-50">
                    <tr className="text-left text-xs uppercase tracking-widest">
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4">Opponent</th>
                      <th className="px-5 py-4">DLCC</th>
                      <th className="px-5 py-4">Opp</th>
                      <th className="px-5 py-4">Overs</th>
                      <th className="px-5 py-4">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: resultsCount }, (_, i) => (
                      <ResultRow key={`res-${i}`} slotIndex={i} />
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={6} className="p-0">
                        <RowActions
                          addLabel="Add Result"
                          onAdd={handleAddResult}
                          isAdding={isAddingResult}
                          onRemove={handleRemoveResult}
                          canRemove={resultsCount > 1}
                        />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Mobile — stacked cards (one column) */}
              <div className="md:hidden border border-ink-950 bg-cream-50 rounded-lg shadow-[6px_6px_0_#1A1A1A] overflow-hidden">
                {Array.from({ length: resultsCount }, (_, i) => (
                  <ResultCard key={`res-card-${i}`} slotIndex={i} />
                ))}
                <RowActions
                  addLabel="Add Result"
                  onAdd={handleAddResult}
                  isAdding={isAddingResult}
                  onRemove={handleRemoveResult}
                  canRemove={resultsCount > 1}
                />
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
