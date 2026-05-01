import { useEffect, useRef, useState } from 'react';
import { useTexts } from '../context/TextsProvider';
import { ensurePassword, saveValue } from '../lib/editableAuth.js';

// Click → small "+ delta" input → on save, adds delta to current total.
// Display shows: {emoji} {total} {label}
//
// Use for stats that grow over time (runs, wickets, matches won, etc.)
export default function AccumulatorStat({
  storageKey,
  defaultValue = '0',
  emoji = '',
  label = '',
}) {
  const { texts, setLocalText } = useTexts();
  const totalStr = texts[storageKey] ?? String(defaultValue);
  const total = parseInt(totalStr, 10) || 0;

  const [isEditing, setIsEditing] = useState(false);
  const [delta, setDelta] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isEditing) return;
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [isEditing]);

  const beginEdit = async (e) => {
    if (isEditing || isSaving) return;
    e.preventDefault();
    e.stopPropagation();
    const pw = await ensurePassword();
    if (!pw) return;
    setDelta('');
    setIsEditing(true);
  };

  const cancel = () => {
    setIsEditing(false);
    setDelta('');
  };

  const save = async () => {
    if (isSaving) return;
    const trimmed = String(delta ?? '').trim();
    if (trimmed === '') {
      setIsEditing(false);
      return;
    }
    if (!/^-?\d+$/.test(trimmed)) {
      window.alert('Please enter a whole number (positive or negative).');
      return;
    }
    const d = parseInt(trimmed, 10);
    const newTotal = total + d;

    setIsSaving(true);
    const result = await saveValue(storageKey, String(newTotal));
    setIsSaving(false);

    if (result.ok) {
      setLocalText(storageKey, String(newTotal));
      setIsEditing(false);
      setDelta('');
    } else if (result.reason === 'locked' || result.reason === 'unauthorized') {
      window.alert('Session locked — re-enter your password and try again.');
      setIsEditing(false);
    } else {
      window.alert('Save failed.');
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      save();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    }
  };

  if (isEditing) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="text-base">{emoji}</span>
        <span className="font-display text-base text-ink-700">{total}</span>
        <span className="text-ink-700 font-bold">+</span>
        <input
          ref={inputRef}
          type="number"
          step="1"
          inputMode="numeric"
          placeholder="0"
          value={delta}
          disabled={isSaving}
          onChange={(e) => setDelta(e.target.value)}
          onBlur={save}
          onKeyDown={handleKey}
          className="font-display text-base text-ink-950 bg-cream-50 border-2 border-dashed border-ember-500 rounded-sm px-2 py-1 outline-none w-16 text-center"
          style={{ fontSize: '16px', opacity: isSaving ? 0.6 : 1 }}
        />
        <span className="text-[11px] uppercase tracking-wider text-ink-700">{label}</span>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={beginEdit}
      title={`Click to add to ${label}`}
      className="group inline-flex items-center gap-1.5 cursor-pointer rounded-sm px-1 py-0.5 transition-colors hover:bg-ember-500/15 hover:outline-1 hover:outline-dashed hover:outline-ember-500 hover:outline-offset-2"
    >
      <span className="text-base leading-none" aria-hidden="true">{emoji}</span>
      <b className="font-display text-base text-ink-950">{total}</b>
      <span className="text-[11px] uppercase tracking-wider text-ink-700">{label}</span>
    </button>
  );
}
