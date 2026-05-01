import { useEffect, useRef, useState } from 'react';
import { useTexts } from '../context/TextsProvider';
import {
  ensurePassword,
  getValidPassword,
  refreshUnlock,
  clearUnlock,
} from '../lib/editableAuth.js';

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const TYPED_INPUT = {
  number: 'number',
  year: 'number',
  date: 'date',
  time: 'time',
  month: 'month',
};

function formatDisplay(raw, type) {
  if (raw == null || raw === '') return raw;

  if (type === 'date') {
    const m = String(raw).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return raw;
    const monthIdx = parseInt(m[2], 10) - 1;
    if (monthIdx < 0 || monthIdx > 11) return raw;
    return `${MONTHS_SHORT[monthIdx]} ${m[3]}`;
  }

  if (type === 'month') {
    const m = String(raw).match(/^(\d{4})-(\d{2})$/);
    if (!m) return raw;
    const monthIdx = parseInt(m[2], 10) - 1;
    if (monthIdx < 0 || monthIdx > 11) return raw;
    return `${MONTHS_SHORT[monthIdx]} ${m[1]}`;
  }

  return raw;
}

// Visual treatment shared by both input and contentEditable edit modes.
// Bold border + tinted background so it's obvious what you're editing.
const EDIT_OUTLINE = '3px dashed #C44229';
const EDIT_BG = 'rgba(196, 66, 41, 0.18)';
const EDIT_OUTLINE_OFFSET = '3px';

export default function EditableText({
  storageKey,
  defaultValue,
  defaultText, // back-compat alias
  type = 'text',
  className = '',
  as: Tag = 'span',
  min,
  max,
  options, // for type="select" — array of strings (or {value, label} objects)
}) {
  const fallback = defaultValue ?? defaultText ?? '';
  const { texts, setLocalText } = useTexts();
  const stored = texts[storageKey];
  const value = stored != null ? stored : fallback;

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [isSaving, setIsSaving] = useState(false);
  const editRef = useRef(null);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (!isEditing) return;
    const el = editRef.current;
    if (!el) return;
    el.focus();
    if (el.tagName === 'INPUT') {
      el.select();
    } else {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, [isEditing]);

  const beginEdit = async (e) => {
    if (isEditing || isSaving) return;
    e.preventDefault();
    e.stopPropagation();
    const pw = await ensurePassword();
    if (!pw) return;
    setDraft(value);
    setIsEditing(true);
  };

  const readDraftValue = () => {
    const el = editRef.current;
    if (!el) return draft;
    if (el.tagName === 'INPUT') return el.value;
    return el.innerText;
  };

  const save = async (explicitValue) => {
    if (isSaving) return;
    const raw = explicitValue !== undefined ? explicitValue : readDraftValue();
    const next = String(raw ?? '').trim();

    if (!next || next === value) {
      setIsEditing(false);
      return;
    }
    if ((type === 'year' || type === 'number') && !/^-?\d+$/.test(next)) {
      window.alert('Please enter a valid number.');
      return;
    }
    if (type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(next)) {
      window.alert('Please pick a valid date.');
      return;
    }
    if (type === 'time' && !/^\d{2}:\d{2}$/.test(next)) {
      window.alert('Please pick a valid time.');
      return;
    }

    const pw = getValidPassword();
    if (!pw) {
      // Idle timeout expired between begin-edit and save — lock and bail.
      setIsEditing(false);
      window.alert('Session locked (idle timeout). Click again and re-enter your password.');
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Edit-Password': pw },
        body: JSON.stringify({ key: storageKey, value: next }),
      });
      if (res.ok) {
        setLocalText(storageKey, next);
        refreshUnlock();
        setIsEditing(false);
      } else if (res.status === 401) {
        clearUnlock();
        window.alert('Password rejected. Try again.');
      } else {
        window.alert('Save failed.');
      }
    } catch {
      window.alert('Network error. Edit not saved.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      save();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsEditing(false);
    }
  };

  if (isEditing) {
    // Select dropdown — fixed list of options, auto-saves on change.
    if (type === 'select' && Array.isArray(options)) {
      const normalized = options.map((o) =>
        typeof o === 'string' ? { value: o, label: o } : o,
      );
      return (
        <Tag
          className={className}
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <select
            ref={editRef}
            value={draft ?? ''}
            disabled={isSaving}
            onChange={(e) => {
              setDraft(e.target.value);
              save(e.target.value);
            }}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsEditing(false);
            }}
            style={{
              font: 'inherit',
              color: 'inherit',
              background: EDIT_BG,
              border: EDIT_OUTLINE,
              borderRadius: '3px',
              padding: '4px 8px',
              outline: 'none',
              opacity: isSaving ? 0.6 : 1,
              cursor: 'pointer',
              textTransform: 'inherit',
              letterSpacing: 'inherit',
              fontSize: 'max(1em, 16px)',
              minHeight: '36px',
            }}
          >
            {normalized.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </Tag>
      );
    }

    // Free text → contentEditable so width auto-grows and inherits all tracking/font.
    if (type === 'text') {
      return (
        <Tag
          ref={editRef}
          contentEditable={!isSaving}
          suppressContentEditableWarning
          onBlur={save}
          onKeyDown={handleKey}
          onInput={(e) => setDraft(e.currentTarget.innerText)}
          className={className}
          style={{
            outline: EDIT_OUTLINE,
            outlineOffset: EDIT_OUTLINE_OFFSET,
            background: EDIT_BG,
            borderRadius: '3px',
            padding: '0 4px',
            cursor: isSaving ? 'progress' : 'text',
            opacity: isSaving ? 0.6 : 1,
            display: 'inline-block',
            minWidth: '1ch',
            whiteSpace: 'pre',
          }}
        >
          {value}
        </Tag>
      );
    }

    // Typed values → native input (numpad / date / time pickers on mobile)
    const inputType = TYPED_INPUT[type] || 'text';
    const widthCh =
      type === 'year' ? 7 : type === 'number' ? 6 : null;

    const computedMin = min ?? (type === 'year' ? 1900 : undefined);
    const computedMax = max ?? (type === 'year' ? 2100 : undefined);

    return (
      <Tag
        className={className}
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        <input
          ref={editRef}
          type={inputType}
          value={draft ?? ''}
          min={computedMin}
          max={computedMax}
          step={type === 'year' || type === 'number' ? 1 : undefined}
          disabled={isSaving}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={save}
          onKeyDown={handleKey}
          style={{
            font: 'inherit',
            color: 'inherit',
            background: EDIT_BG,
            border: EDIT_OUTLINE,
            borderRadius: '3px',
            padding: '4px 8px',
            margin: 0,
            outline: 'none',
            minWidth: 0,
            width: widthCh ? `${widthCh}ch` : 'auto',
            opacity: isSaving ? 0.6 : 1,
            textAlign: 'inherit',
            letterSpacing: 'inherit',
            textTransform: 'inherit',
            lineHeight: 'inherit',
            fontSize: 'max(1em, 16px)',
            minHeight: '36px',
          }}
        />
      </Tag>
    );
  }

  return (
    <Tag
      onClick={beginEdit}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          beginEdit(e);
        }
      }}
      title={`Click to edit (${type})`}
      className={`${className} cursor-pointer rounded-sm transition-colors hover:bg-ember-500/15 hover:outline-1 hover:outline-dashed hover:outline-ember-500 hover:outline-offset-2`}
    >
      {formatDisplay(value, type)}
    </Tag>
  );
}
