// Drop your photo at public/founder.jpg (or .png — update the const below).
const FOUNDER_IMG = '/founder.jpg';

const Arrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

// Social brand glyphs — inline SVGs so no extra deps / network calls
const SocialIcons = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[18px] h-[18px]">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43A2.06 2.06 0 1 1 5.34 3.3a2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[16px] h-[16px]">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  slack: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[18px] h-[18px]">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[18px] h-[18px]">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[18px] h-[18px]">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-[18px] h-[18px]">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  website: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[18px] h-[18px]">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

const SOCIAL_LINKS = [
  {
    name: 'Website',
    href: 'https://www.hasanrahman.dev/',
    icon: SocialIcons.website,
    hover: 'hover:bg-ember-500',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sojib-rahman-510a353a6/',
    icon: SocialIcons.linkedin,
    hover: 'hover:bg-[#0A66C2]',
  },
  {
    name: 'X / Twitter',
    href: 'https://x.com/hasanrahma00',
    icon: SocialIcons.twitter,
    hover: 'hover:bg-ink-950',
  },
  {
    name: 'Slack',
    href: 'https://join.slack.com/t/vikileadsworkspace/shared_invite/zt-3pg9ypdae-wpriXr5uGhgoZHF9BmnEwg',
    icon: SocialIcons.slack,
    hover: 'hover:bg-[#4A154B]',
  },
  {
    name: 'Email',
    href: 'mailto:hasan@hasanrahman.dev',
    icon: SocialIcons.email,
    hover: 'hover:bg-ember-500',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/8801885781259',
    icon: SocialIcons.whatsapp,
    hover: 'hover:bg-[#25D366]',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/HAsanRahmaN4',
    icon: SocialIcons.facebook,
    hover: 'hover:bg-[#1877F2]',
  },
];

export default function Founder() {
  return (
    <section id="founder" className="relative py-20 md:py-28 overflow-hidden">
      {/* Faint horizontal pinstripes for subtle texture, matching Hero */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #1A1A1A 0 1px, transparent 1px 80px)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
        {/* Eyebrow */}
        <div className="reveal text-[11px] font-bold uppercase tracking-[0.3em] text-ember-500">
          // Founder
        </div>

        {/* Headline */}
        <h2 className="reveal mt-4 font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
          Built by hand. Captained by hustle.
        </h2>

        {/* Portrait + availability dot */}
        <div className="reveal mt-12 flex justify-center">
          <div className="relative inline-block">
            {/* Soft glow behind */}
            <div
              className="absolute -inset-4 rounded-full bg-ember-500/15 blur-2xl"
              aria-hidden="true"
            />
            {/* Hand-drawn ring orbit */}
            <div
              className="absolute -inset-3 rounded-full border-2 border-dashed border-ink-950/30"
              aria-hidden="true"
            />

            {/* Photo */}
            <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-ink-950 bg-cream-100 shadow-[8px_8px_0_#1A1A1A]">
              <img
                src={FOUNDER_IMG}
                alt="Hasan Rahman, founder of Daddy Leads"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  // Graceful fallback if /founder.jpg doesn't exist yet
                  const el = e.currentTarget;
                  el.style.display = 'none';
                  const wrap = el.parentElement;
                  if (wrap && !wrap.querySelector('.fallback-initials')) {
                    const span = document.createElement('div');
                    span.className =
                      'fallback-initials w-full h-full flex items-center justify-center font-display text-5xl md:text-6xl text-ink-950';
                    span.textContent = 'HR';
                    wrap.appendChild(span);
                  }
                }}
              />
            </div>

            {/* Availability indicator — layered pings + glow for a "live" feel */}
            <span
              className="absolute bottom-2 right-2 md:bottom-3 md:right-3 flex w-6 h-6 md:w-7 md:h-7"
              aria-label="Available — live"
              title="Available — live"
            >
              {/* Outer pulsing ring */}
              <span className="animate-ping absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-60" />
              {/* Second offset pulse for layered breathing effect */}
              <span
                className="animate-ping absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-40"
                style={{ animationDelay: '0.6s', animationDuration: '1.4s' }}
              />
              {/* Solid dot with green glow */}
              <span
                className="relative inline-flex w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-500 border-[3px] border-cream-50"
                style={{
                  boxShadow:
                    '0 0 14px rgba(34, 197, 94, 0.9), 0 0 4px rgba(34, 197, 94, 1)',
                }}
              />
            </span>

            {/* "LIVE" floating tag */}
            <span
              className="absolute top-1 right-1 md:-top-2 md:-right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500 text-cream-50 text-[9px] font-bold uppercase tracking-[0.2em] border-2 border-cream-50 shadow-md rotate-[8deg]"
              aria-hidden="true"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cream-50 animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {/* Status pill */}
        <div className="reveal mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-ink-950 bg-cream-50 text-[11px] font-bold uppercase tracking-[0.25em] shadow-[3px_3px_0_#1A1A1A]">
            <span className="pulse-dot inline-block w-2 h-2 rounded-full bg-green-500" />
            <span>Hasan Rahman</span>
            <span className="text-ember-500">·</span>
            <span>Available for hire</span>
          </div>
        </div>

        {/* Social icons */}
        <div className="reveal mt-6 flex flex-wrap items-center justify-center gap-3">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              aria-label={s.name}
              title={s.name}
              className={`group inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-ink-950 bg-cream-50 text-ink-950 ${s.hover} hover:text-cream-50 hover:scale-110 transition-all duration-200 shadow-[3px_3px_0_#1A1A1A]`}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Bio — three short beats with bolded anchors for scannability */}
        <div className="reveal mt-10 max-w-2xl mx-auto space-y-5 text-left md:text-center text-base md:text-[17px] text-ink-700 leading-relaxed">
          <p>
            Started freelancing in <strong className="text-ink-950 font-semibold">August 2020</strong> during
            the pandemic — left the <strong className="text-ink-950 font-semibold">University of Chittagong</strong> to
            go full-time. Began as a lead-generation and data-entry expert.
          </p>
          <p>
            As software demand exploded, I switched lanes to engineering — picking up{' '}
            <strong className="text-ink-950 font-semibold">Python, Node, React, automation, AI &amp; databases</strong>{' '}
            along the way.
          </p>
          <p>
            Today I build prospecting and automation tools.{' '}
            <strong className="text-ink-950 font-semibold">14 SaaS products shipped</strong>, all chasing one mission:{' '}
            <span className="marker font-semibold text-ink-950">hit $1M ARR as an indie hacker.</span>
          </p>
        </div>

        {/* CTA cluster */}
        <div className="reveal mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:contact@daddy-leads.com"
            className="btn-primary inline-flex items-center gap-2"
          >
            Hire Me
            <Arrow />
          </a>
          <a href="#join" className="btn-ghost">
            View Projects
          </a>
        </div>

        {/* Section divider — ember stitch line */}
        <div className="reveal mt-16 md:mt-20 stitch h-[2px]" aria-hidden="true" />
      </div>
    </section>
  );
}
