import EditableText from './EditableText.jsx';
import { getCurrentYear } from '../lib/dateUtils.js';

const CREAM = '#FBF1E5'; // tailwind theme cream-50 — used as wave-curve fill

const TICKER_ITEMS = [
  'CLUB EST. 2026',
  'COMPANY EST. 2022',
  'BAT · BALL · BROTHERHOOD',
  "A GENTLEMAN'S GAME",
  'CREAM ON BLACK',
  'DADDY LEADS CRICKET CLUB',
];
const TICKER_REPEAT = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

const WaveTop = () => (
  <div
    className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none"
    style={{ transform: 'translateY(-1px)' }}
    aria-hidden="true"
  >
    <svg
      className="relative block w-full h-[22px] md:h-[34px]"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      style={{ transform: 'rotate(180deg)' }}
    >
      <path
        d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"
        fill={CREAM}
      />
    </svg>
  </div>
);

const WaveBottom = () => (
  <div
    className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none"
    style={{ transform: 'translateY(1px)' }}
    aria-hidden="true"
  >
    <svg
      className="relative block w-full h-[22px] md:h-[34px]"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,0 C150,80 350,80 600,40 C850,0 1050,0 1200,40 L1200,120 L0,120 Z"
        fill={CREAM}
      />
    </svg>
  </div>
);

export default function StatsBar() {
  const currentYear = String(getCurrentYear());

  return (
    <section className="relative bg-ink-950 text-cream-50 overflow-hidden">
      <WaveTop />

      <div className="relative z-20 pt-20 pb-10 md:pt-24 md:pb-12 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="reveal text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-ember-500" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-ember-500 font-bold">
                The Numbers
              </span>
              <span className="h-px w-8 bg-ember-500" />
            </div>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl tracking-tight text-cream-50">
              <EditableText
                storageKey="stats_section_title"
                defaultValue="Total Matches, Wins and Losses"
                type="text"
              />
            </h2>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
            {/* Matches Played */}
            <div className="reveal text-center">
              <div className="font-display text-6xl md:text-7xl leading-none text-cream-50">
                <EditableText
                  storageKey="stat_matches_value"
                  defaultValue="08"
                  type="number"
                />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-cream-200 whitespace-nowrap">
                <EditableText
                  storageKey="stat_matches_label"
                  defaultValue="Matches Played"
                  type="text"
                />
              </div>
            </div>

            {/* Wins */}
            <div className="reveal text-center">
              <div className="font-display text-6xl md:text-7xl leading-none text-cream-50">
                <EditableText
                  storageKey="stat_wins_value"
                  defaultValue="05"
                  type="number"
                />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-cream-200 whitespace-nowrap">
                <EditableText
                  storageKey="stat_wins_label"
                  defaultValue="Wins"
                  type="text"
                />
              </div>
            </div>

            {/* Active Players */}
            <div className="reveal text-center">
              <div className="font-display text-6xl md:text-7xl leading-none text-cream-50">
                <EditableText
                  storageKey="stat_active_value"
                  defaultValue="22"
                  type="number"
                />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-cream-200 whitespace-nowrap">
                <EditableText
                  storageKey="stat_active_label"
                  defaultValue="Active Players"
                  type="text"
                />
              </div>
            </div>

            {/* Played Year — defaults to the current calendar year via dateUtils */}
            <div className="reveal text-center">
              <div className="font-display text-6xl md:text-7xl leading-none text-cream-50">
                <EditableText
                  storageKey="stat_year_value"
                  defaultValue={currentYear}
                  type="year"
                />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-cream-200 whitespace-nowrap">
                <EditableText
                  storageKey="stat_year_label"
                  defaultValue="Played Year"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* In-line ticker — sits inside the same black band, above the bottom curve.
          No separate bg/border needed since the section is already black. */}
      <div className="relative z-20 pb-10 md:pb-12 overflow-hidden">
        <div className="ticker whitespace-nowrap flex gap-12 font-display tracking-[0.2em] text-sm text-cream-50">
          {TICKER_REPEAT.map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{t}</span>
              <span className="text-ember-500">●</span>
            </span>
          ))}
        </div>
      </div>

      <WaveBottom />
    </section>
  );
}
