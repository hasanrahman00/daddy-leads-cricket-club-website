import Logo from './Logo.jsx';
import { NAV } from '../data/content.js';
import { getCurrentYear } from '../lib/dateUtils.js';

const FOUNDER_SOCIALS = [
  { emoji: '🌐', label: 'hasanrahman.dev', href: 'https://www.hasanrahman.dev/' },
  { emoji: '💼', label: 'LinkedIn',        href: 'https://www.linkedin.com/in/sojib-rahman-510a353a6/' },
  { emoji: '𝕏',  label: 'X / Twitter',     href: 'https://x.com/hasanrahma00' },
  { emoji: '💬', label: 'Slack',           href: 'https://join.slack.com/t/vikileadsworkspace/shared_invite/zt-3pg9ypdae-wpriXr5uGhgoZHF9BmnEwg' },
  { emoji: '📧', label: 'hasan@hasanrahman.dev', href: 'mailto:hasan@hasanrahman.dev' },
  { emoji: '📱', label: '+880 188 578 1259',     href: 'https://wa.me/8801885781259' },
  { emoji: '📘', label: 'Facebook',         href: 'https://www.facebook.com/HAsanRahmaN4' },
];

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-cream-50 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Logo size="text-2xl" />
            <p className="mt-5 text-sm text-cream-200 max-w-xs leading-relaxed">
              Cream-and-black cricket since 2026. Sponsored by Daddy Leads (est. 2022).
            </p>
          </div>

          {/* Explore */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-ember-500">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="hover:text-ember-500 transition-colors">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-ember-500">Visit</div>
            <ul className="mt-4 space-y-2 text-sm text-cream-200">
              <li>Dhunat Cricket Club</li>
              <li>Saturdays · 10am training</li>
              <li>Match days · check fixtures</li>
            </ul>
          </div>

          {/* Connect with the founder */}
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-ember-500">
              Connect · Hasan Rahman
            </div>
            <ul className="mt-4 space-y-1.5 text-sm">
              {FOUNDER_SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="inline-flex items-center gap-2 px-2 py-1 -mx-2 rounded hover:bg-ember-500/15 hover:text-ember-500 transition-colors"
                  >
                    <span className="text-base leading-none w-5 text-center" aria-hidden="true">
                      {s.emoji}
                    </span>
                    <span className="truncate">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-cream-200/70 leading-relaxed">
              Founder of Daddy Leads · Available for hire
            </p>
          </div>
        </div>

        <div className="stitch h-[3px] mt-14" />

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-widest text-cream-200">
          <div>© {getCurrentYear()} Daddy Leads Cricket Club · All rights reserved</div>
          <div>Built cream-on-black ⚫ by the DLCC family</div>
        </div>
      </div>
    </footer>
  );
}
