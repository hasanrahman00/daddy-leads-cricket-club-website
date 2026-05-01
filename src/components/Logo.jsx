export default function Logo({ size = 'text-xl' }) {
  return (
    <a href="#top" className={`flex items-center gap-2 ${size} font-display tracking-wider`}>
      <span className="inline-flex items-center justify-center w-9 h-9 bg-ink-950 text-cream-50 font-display rounded-full border border-ink-950">
        DL
      </span>
      <span>
        Daddy Leads <span className="text-ember-500">CC</span>
      </span>
    </a>
  );
}
