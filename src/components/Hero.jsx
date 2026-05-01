import EditableText from './EditableText';

const WHATSAPP_NUMBER = '8801885781259';
const WHATSAPP_DISPLAY = '+880 188 578 1259';
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Daddy Leads CC — I'd like to talk about sponsoring the team for the 2026 season."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 grain overflow-hidden">
      {/* Faint horizontal pinstripes for depth */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #1A1A1A 0 1px, transparent 1px 80px)'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12 items-center">
        {/* ----- LEFT COLUMN ----- */}
        <div className="md:col-span-7 reveal">
          {/* Live status pill — tournament · session · year */}
          <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 mb-7 px-4 py-2 border border-ink-950 bg-cream-50 text-[11px] font-bold uppercase tracking-[0.25em] shadow-[3px_3px_0_#1A1A1A]">
            <span className="pulse-dot inline-block w-2 h-2 rounded-full bg-ember-500" />
            <EditableText
              storageKey="hero_tournament"
              defaultValue="Premier League T20"
              type="text"
            />
            <span className="text-ember-500">·</span>
            <EditableText
              storageKey="hero_session"
              defaultValue="Season 1"
              type="text"
            />
            <span className="text-ember-500">·</span>
            <EditableText
              storageKey="hero_year"
              defaultValue="2026"
              type="year"
            />
          </div>

          {/* Title block with red period flourish */}
          <h1 className="font-display leading-[0.85] tracking-tight text-[15vw] md:text-[8.5rem]">
            <span className="block">BAT<span className="text-ember-500">.</span></span>
            <span className="block">BALL<span className="text-ember-500">.</span></span>
            <span className="block">
              <span className="marker">BROTHERHOOD</span>
              <span className="text-ember-500">.</span>
            </span>
          </h1>

          {/* Tagline — labelled italic with hairline rule */}
          <div className="mt-8 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-ember-500">
              Motto
            </span>
            <span className="h-px w-6 bg-ink-950/40" />
            <p className="italic font-serif text-ink-900 text-base md:text-lg">
              a gentleman's game
            </p>
          </div>

          {/* Description */}
          <p className="mt-6 max-w-lg text-[15px] md:text-base text-ink-800 leading-relaxed">
            Founded <strong className="font-bold text-ink-950">2026</strong>, backed by{' '}
            <strong className="font-bold text-ink-950">Daddy Leads</strong>
            <span className="text-ink-700"> · est. 2022</span>.
          </p>

          {/* CTA cluster */}
          <div className="mt-10 flex flex-wrap items-stretch gap-4">
            <a href="#fixtures" className="btn-primary inline-flex items-center gap-2">
              View Fixtures
              <Arrow />
            </a>
            <a href="#join" className="btn-ghost">
              Join the Club
            </a>
          </div>

          {/* WhatsApp sponsor CTA — its own emphasised row */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-5 group max-w-md"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 bg-cream-50 border border-ink-950 text-[#25D366]">
              <WhatsAppIcon />
            </span>
            <span className="flex-1 text-left leading-tight">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-ink-700 font-bold">
                Sponsorship Enquiry
              </span>
              <span className="block text-base">Chat on WhatsApp · {WHATSAPP_DISPLAY}</span>
            </span>
            <Arrow />
          </a>

          {/* Mini fact strip — Squad / Total Leagues Played / SaaS Products */}
          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg border-t border-ink-950 pt-6 text-center">
            <div>
              <div className="font-display text-3xl leading-none">
                <EditableText
                  storageKey="stat_squad_value"
                  defaultValue="22"
                  type="number"
                />
              </div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-ink-700 mt-1 whitespace-nowrap">
                <EditableText
                  storageKey="stat_squad_label"
                  defaultValue="Squad"
                  type="text"
                />
              </div>
            </div>
            <div>
              <div className="font-display text-3xl leading-none">
                <EditableText
                  storageKey="stat_leagues_value"
                  defaultValue="1"
                  type="number"
                />
              </div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-ink-700 mt-1 whitespace-nowrap">
                <EditableText
                  storageKey="stat_leagues_label"
                  defaultValue="Total Leagues Played"
                  type="text"
                />
              </div>
            </div>
            <div>
              <div className="font-display text-3xl leading-none">
                <EditableText
                  storageKey="stat_saas_value"
                  defaultValue="13"
                  type="number"
                />
              </div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-ink-700 mt-1 whitespace-nowrap">
                <EditableText
                  storageKey="stat_saas_label"
                  defaultValue="SaaS Products"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ----- RIGHT COLUMN — THE BALL ----- */}
        <div className="md:col-span-5 reveal">
          <div className="relative mx-auto max-w-md">
            {/* The ball */}
            <div className="relative aspect-square">
              {/* Circular wreath text rotating around the ball — sized to the ball, not the column */}
              <div className="absolute -inset-8 spin-slow pointer-events-none" aria-hidden="true">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                  style={{ overflow: 'visible' }}
                >
                  <defs>
                    {/* Radius 195 — comfortably outside the ball (which inscribes the viewBox) */}
                    <path id="ring" d="M 200,200 m -195,0 a 195,195 0 1,1 390,0 a 195,195 0 1,1 -390,0" />
                  </defs>
                  <text style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px', letterSpacing: '0.35em', fill: '#1A1A1A', opacity: 0.55 }}>
                    <textPath href="#ring" startOffset="0">
                      DADDY LEADS · CRICKET CLUB · EST. 2026 · A GENTLEMAN'S GAME ·{' '}
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Drop-shadow */}
              <div className="absolute inset-2 rounded-full bg-ink-950 translate-x-3 translate-y-4 opacity-90" />

              {/* Ball body */}
              <div className="relative aspect-square rounded-full overflow-hidden border border-ink-950 ball-leather shadow-[12px_12px_0_#1A1A1A]">
                {/* Soft top-left highlight */}
                <div className="absolute top-[8%] left-[12%] w-[40%] h-[28%] rounded-full bg-cream-50 opacity-[0.08] blur-2xl" />

                {/* Seam — twin parallel lines */}
                <div className="ball-seam">
                  <div className="ball-stitch" style={{ top: 0, height: '4px' }} />
                  <div className="ball-stitch" style={{ bottom: 0, height: '4px' }} />
                </div>

                {/* Center crest */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-cream-50 text-center px-8">
                  <div className="font-display text-7xl md:text-8xl tracking-wide leading-none">DL</div>
                  <div className="mt-2 text-[11px] uppercase tracking-[0.4em] text-cream-200">
                    Cricket Club
                  </div>
                  <div className="mt-4 px-3 py-1 bg-ember-500 text-cream-50 text-[10px] uppercase tracking-[0.3em] font-bold border border-cream-50/20">
                    Est. 2026
                  </div>
                </div>
              </div>

              {/* Floating tag — Season 1 stamp */}
              <div className="absolute -top-3 -right-3 md:-right-6 rotate-[12deg] bg-ember-500 text-cream-50 px-4 py-2 font-display tracking-[0.2em] text-sm border border-ink-950 shadow-[4px_4px_0_#1A1A1A]">
                <EditableText storageKey="season_stamp" defaultValue="🥇 Champion" type="text" />
              </div>

              {/* Floating tag — Captain's number patch */}
              <div className="absolute -bottom-4 -left-4 md:-left-10 -rotate-[6deg] bg-cream-50 border border-ink-950 px-4 py-3 shadow-[5px_5px_0_#1A1A1A] flex items-center gap-3">
                <div>
                  <div className="text-[9px] uppercase tracking-[0.25em] text-ink-700">Captain</div>
                  <div className="font-display text-3xl leading-none">#01</div>
                </div>
                <div className="h-10 w-px bg-ink-950" />
                <div>
                  <div className="font-serif text-sm leading-tight">H. Rahman</div>
                  <div className="text-[10px] uppercase tracking-widest text-ink-700">Right-hand bat</div>
                </div>
              </div>
            </div>

            {/* Next-match card under the ball */}
            <div className="mt-12 border border-ink-950 bg-cream-50 p-4 shadow-[6px_6px_0_#1A1A1A] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-[0.25em] text-ember-500 font-bold">
                  Next Match
                </div>
                <div className="font-serif text-base md:text-lg leading-tight mt-1">
                  <EditableText
                    storageKey="next_match_home"
                    defaultValue="DLCC"
                    type="text"
                  />{' '}
                  <span className="text-ink-700">vs</span>{' '}
                  <EditableText
                    storageKey="next_match_away"
                    defaultValue="Riverside Royals"
                    type="text"
                  />
                </div>
                <div className="text-xs text-ink-700 flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                  <EditableText
                    storageKey="next_match_date"
                    defaultValue="2026-05-09"
                    type="date"
                  />
                  <span aria-hidden>·</span>
                  <EditableText
                    storageKey="next_match_time"
                    defaultValue="14:00"
                    type="time"
                  />
                  <span aria-hidden>·</span>
                  <EditableText
                    storageKey="next_match_venue"
                    defaultValue="Dhunat"
                    type="text"
                  />
                </div>
              </div>
              <a
                href="#fixtures"
                className="shrink-0 text-[11px] uppercase tracking-widest font-bold border-b-2 border-ember-500 pb-0.5"
              >
                Details →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
