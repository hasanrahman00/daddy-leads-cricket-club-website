export default function Ticker() {
  const items = [
    'CLUB EST. 2026',
    'COMPANY EST. 2022',
    'BAT · BALL · BROTHERHOOD',
    "A GENTLEMAN'S GAME",
    'CREAM ON BLACK',
    'DADDY LEADS CRICKET CLUB',
  ];
  const repeat = [...items, ...items, ...items, ...items];
  return (
    <div className="bg-ink-950 text-cream-50 py-3 overflow-hidden border-y border-ink-950">
      <div className="ticker whitespace-nowrap flex gap-12 font-display tracking-[0.2em] text-sm">
        {repeat.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{t}</span>
            <span className="text-ember-500">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}
