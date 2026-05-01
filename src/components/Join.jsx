import { useState } from 'react';

const WHATSAPP_NUMBER = '8801885781259';

function buildWhatsAppUrl(form) {
  const lines = [
    "Hi Daddy Leads CC — I'd like to join the club!",
    '',
    `Name: ${form.name || '—'}`,
    `Phone: ${form.phone || '—'}`,
    `Preferred Role: ${form.role || '—'}`,
    '',
    'Cricket Background:',
    form.message || '—',
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

const ROLES = [
  'Batter',
  'Bowler · Pace',
  'Bowler · Spin',
  'All-rounder',
  'Wicket Keeper',
  'Just here to support',
];

export default function Join() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    role: 'Batter',
    message: '',
  });

  const submit = (e) => {
    e.preventDefault();
    const url = buildWhatsAppUrl(form);
    window.open(url, '_blank', 'noopener');
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setForm({ name: '', phone: '', role: 'Batter', message: '' });
  };

  return (
    <section id="join" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-12 gap-12">
        {/* Left — pitch + contact details */}
        <div className="md:col-span-5 reveal">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">
            // Join the Club
          </div>
          <h2 className="mt-3 font-display text-6xl md:text-7xl leading-none">
            Pull on the
            <br />
            cream &amp; black.
          </h2>
          <p className="mt-6 text-lg text-ink-700 max-w-md leading-relaxed">
            Trials run every other Sunday at <strong className="text-ink-950">Dhunat</strong>.
            Membership is <strong className="text-ink-950">free</strong> — drop your details and we'll
            confirm your slot on WhatsApp within 24 hours.
          </p>

          <div className="mt-10 space-y-3">
            <div className="flex items-center gap-3 px-4 py-3 bg-cream-50 border border-ink-950 rounded-md text-sm">
              <span className="text-ember-500 text-lg">📍</span>
              <span><strong>Dhunat Cricket Club</strong> · Saturdays 10am</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-cream-50 border border-ink-950 rounded-md text-sm">
              <span className="text-ember-500 text-lg">🏏</span>
              <span><strong>Trials</strong> every other Sunday · 11am sharp</span>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 bg-cream-50 border border-ink-950 rounded-md text-sm hover:bg-[#25D366]/10 hover:border-[#25D366] transition-colors"
            >
              <span className="text-[#25D366] text-lg">💬</span>
              <span><strong>WhatsApp</strong> · +880 188 578 1259</span>
            </a>
          </div>
        </div>

        {/* Right — form */}
        <div className="md:col-span-7 reveal">
          <form
            onSubmit={submit}
            className="border-2 border-ink-950 bg-cream-50 p-7 md:p-10 shadow-[8px_8px_0_#1A1A1A] rounded-2xl"
          >
            {sent ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏆</div>
                <div className="font-display text-5xl">Welcome aboard.</div>
                <p className="mt-4 text-ink-700 max-w-md mx-auto leading-relaxed">
                  Thanks <strong className="text-ink-950">{form.name || 'champ'}</strong> — we just opened
                  WhatsApp with your details pre-filled. Hit{' '}
                  <strong className="text-ink-950">Send</strong> there to deliver the request.
                  We'll reply within 24 hours.
                </p>
                <a
                  href={buildWhatsAppUrl(form)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp mt-8 inline-flex"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Reopen WhatsApp
                </a>
                <button
                  onClick={reset}
                  type="button"
                  className="mt-4 btn-ghost text-sm block mx-auto"
                >
                  Submit another
                </button>
              </div>
            ) : (
              <>
                {/* Form header */}
                <div className="mb-6 pb-5 border-b border-ink-950/15">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-ember-500">
                    Trial Request · Step 1 of 1
                  </div>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl text-ink-950 leading-tight">
                    Tell us about yourself.
                  </h3>
                </div>

                {/* Name (full width — most important) */}
                <div className="mb-5">
                  <label className="text-[11px] uppercase tracking-[0.18em] font-bold text-ink-950">
                    Full Name <span className="text-ember-500">*</span>
                  </label>
                  <input
                    required
                    className="input mt-2"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Hasan Rahman"
                  />
                </div>

                {/* Phone + Role on one row */}
                <div className="grid md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.18em] font-bold text-ink-950">
                      Phone (WhatsApp) <span className="text-ember-500">*</span>
                    </label>
                    <input
                      required
                      className="input mt-2"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+880 1XX XXX XXXX"
                      inputMode="tel"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.18em] font-bold text-ink-950">
                      Preferred Role <span className="text-ember-500">*</span>
                    </label>
                    <select
                      className="input mt-2"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                    >
                      {ROLES.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Background */}
                <div className="mb-7">
                  <label className="text-[11px] uppercase tracking-[0.18em] font-bold text-ink-950">
                    Cricket Background
                    <span className="ml-2 text-[10px] font-normal tracking-normal text-ink-700 normal-case">
                      (optional but helpful)
                    </span>
                  </label>
                  <textarea
                    rows="4"
                    className="input mt-2 resize-none"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Years played, leagues, best score, anything else worth telling us…"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-whatsapp w-full md:w-auto inline-flex items-center gap-3 group"
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 bg-cream-50 border border-ink-950 text-[#25D366]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                  </span>
                  Send Trial Request via WhatsApp
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
                <p className="mt-4 text-xs text-ink-700 leading-relaxed">
                  Submitting opens WhatsApp with your details pre-filled — just hit{' '}
                  <strong>Send</strong>. No spam, no signup, free membership.
                </p>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
