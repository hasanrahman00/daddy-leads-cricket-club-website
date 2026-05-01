export const NAV = [
  { id: 'about',    label: 'About'    },
  { id: 'squad',    label: 'Squad'    },
  { id: 'fixtures', label: 'Fixtures' },
  { id: 'gallery',  label: 'Gallery'  },
  { id: 'sponsor',  label: 'Sponsor'  },
];

// Inaugural-season stats — club founded 2026
export const STATS = [
  { num: '08',   label: 'Matches Played' },
  { num: '05',   label: 'Wins'           },
  { num: '22',   label: 'Active Players' },
  { num: '2026', label: 'Founding Year'  },
];

export const PLAYERS = [
  { name: 'Hasan Rahman',  role: 'Captain · Right-hand bat',    runs: 412, wickets: 4,  no: '01', initials: 'HR' },
  { name: 'Imran Sheikh',  role: 'Vice Captain · All-rounder',  runs: 287, wickets: 11, no: '07', initials: 'IS' },
  { name: 'Asad Khan',     role: 'Opener · Right-hand bat',     runs: 356, wickets: 1,  no: '11', initials: 'AK' },
  { name: 'Bilal Ahmed',   role: 'Wicket Keeper · Finisher',    runs: 198, wickets: 0,  no: '23', initials: 'BA' },
  { name: 'Omar Tariq',    role: 'Spinner · Off break',         runs: 64,  wickets: 17, no: '17', initials: 'OT' },
  { name: 'Zayd Malik',    role: 'Pace · Right-arm fast',       runs: 38,  wickets: 21, no: '44', initials: 'ZM' },
  { name: 'Saad Iqbal',    role: 'Middle order · Power hitter', runs: 244, wickets: 2,  no: '33', initials: 'SI' },
  { name: 'Faisal Noor',   role: 'All-rounder · Left-arm spin', runs: 176, wickets: 12, no: '08', initials: 'FN' },
];

export const FIXTURES = [
  { date: 'MAY 09', time: '14:00', opp: 'Riverside Royals',    venue: 'Home · Dhunat Cricket Club', comp: 'Premier League' },
  { date: 'MAY 16', time: '11:00', opp: 'Northgate Tigers',    venue: 'Away · Northgate Oval',  comp: 'Premier League' },
  { date: 'MAY 23', time: '13:30', opp: 'Eastside Eagles',     venue: 'Home · Dhunat Cricket Club', comp: 'T20 Cup R16'    },
  { date: 'MAY 30', time: '15:00', opp: 'Westbridge Warriors', venue: 'Away · Westbridge Park', comp: 'Premier League' },
  { date: 'JUN 06', time: '12:00', opp: 'Highgate Hurricanes', venue: 'Home · Dhunat Cricket Club', comp: 'T20 Cup QF'     },
];

export const RESULTS = [
  { date: 'APR 25', opp: 'Southfield Strikers',   us: 184, them: 162, overs: '20', result: 'WON',  margin: 'by 22 runs'   },
  { date: 'APR 18', opp: 'Crestview Cougars',     us: 217, them: 219, overs: '20', result: 'LOST', margin: 'by 2 wickets' },
  { date: 'APR 11', opp: 'Bayside Blasters',      us: 201, them: 145, overs: '20', result: 'WON',  margin: 'by 56 runs'   },
  { date: 'APR 04', opp: 'Greenfield Gladiators', us: 156, them: 154, overs: '20', result: 'WON',  margin: 'by 4 wickets' },
];

export const NEWS = [
  {
    tag: 'INAUGURAL SEASON',
    title: "Daddy Leads CC kicks off 2026 with a 22-run debut win",
    excerpt: "An imperious 112 off 64 from skipper Hasan Rahman laid the foundation for a 22-run win at Dhunat in our first-ever league fixture. Faisal's 4-19 sealed it.",
    date: 'April 26, 2026',
  },
  {
    tag: 'CLUB',
    title: 'Founding squad of 22 confirmed for inaugural year',
    excerpt: "We're delighted to announce the full 22-man squad that will represent the cream and black across the 2026 Premier League and T20 Cup campaigns.",
    date: 'April 12, 2026',
  },
  {
    tag: 'COMMUNITY',
    title: 'Free coaching clinic for under-14s — sign up open',
    excerpt: 'Six weekend sessions running through the summer. Open to all skill levels. Limited to 30 spots, first come first served.',
    date: 'April 03, 2026',
  },
];

export const GALLERY = [
  { tag: 'vs Bayside',     n: 1 },
  { tag: 'Net Session',    n: 2 },
  { tag: 'Jersey Reveal',  n: 3 },
  { tag: 'Trophy Day',     n: 4 },
  { tag: 'Hasan 100*',     n: 5 },
  { tag: 'Pre-season',     n: 6 },
];

export const FAQ_ITEMS = [
  { q: 'Where and when do you train?',     a: 'Every Saturday morning at 10am at Dhunat Cricket Club, plus a Wednesday evening net session 6pm–8pm during the season.' },
  { q: 'Is there a membership fee?',        a: 'No — membership is completely free. Daddy Leads sponsors all ground hire, league fees, and kit costs so players can focus on the game.' },
  { q: 'How do I join the club?',           a: 'Just send us a message on WhatsApp at +880 188 578 1259 with your name, preferred role, and a quick line about your cricket background. We reply within 24 hours and book you in for the next trial.' },
  { q: "What's the trial process like?",    a: 'Two-hour open net followed by a short match scenario. We score every trial across batting, bowling, fielding, and attitude — no pressure, just a chance to play.' },
  { q: 'Do you accept under-18 players?',   a: 'Yes for our youth squad (U14 and U17). The senior side is 18+. Contact us on WhatsApp with the player\'s age and we\'ll route you correctly.' },
];

// Daddy Leads — the company that founded and sponsors the club (founded 2022)
export const PRODUCTS = [
  { name: 'LinkedIn Sales Nav Scraper', desc: 'Pull verified leads & contact data straight from Sales Navigator searches.', icon: 'in' },
  { name: 'Apollo Scraper',             desc: 'Export full Apollo lists with emails, phones, and firmographics on tap.', icon: 'AP' },
  { name: 'ZoomInfo Scraper',           desc: 'Bypass quotas and pull bulk B2B contact records with full enrichment.',    icon: 'ZI' },
  { name: 'Lusha Scraper',              desc: 'Direct-dial phones and personal emails extracted at scale from Lusha.',    icon: 'LU' },
  { name: 'Crunchbase Scraper',         desc: 'Funding, exits, and founder data — full Crunchbase profiles, structured.', icon: 'CB' },
  { name: 'Map Scraper',                desc: 'Local business data from Google Maps — name, address, phone, reviews.',    icon: 'MP' },
  { name: 'SERP Scraper',               desc: 'Google search-results data on demand for content, SEO, and prospecting.',  icon: 'SR' },
  { name: 'Custom AI Scraper',          desc: 'AI agents we train on your target site — bespoke pipelines, any source.',  icon: 'AI' },
  { name: 'Email Enricher',             desc: 'Add verified work emails to any list of names + companies in seconds.',    icon: 'E+' },
  { name: 'Email Validator',            desc: 'Catch-all detection, syntax, MX, SMTP — keep bounce rates under 2%.',      icon: 'E?' },
  { name: 'Domain Enricher',            desc: 'Tech stack, traffic estimates, and decision-makers behind any domain.',    icon: 'D+' },
  { name: 'Domain Monitors',            desc: 'Watch domains for blacklists, DNS issues, and inbox-deliverability drops.', icon: 'DM' },
  { name: 'Cold Outreach',              desc: 'Done-for-you sequences across email + LinkedIn — campaign to closed deal.', icon: 'CO' },
];
