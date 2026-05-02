import { useRef, useState } from 'react';
import { useTexts } from '../context/TextsProvider';
import { ensurePassword, saveValue } from '../lib/editableAuth.js';
import { fileToCompressedDataUrl } from '../lib/imageUpload.js';

// Round (circular) player portrait. Click → file picker → photo is
// auto-compressed (any format/size) and saved via /api/text.
// Falls back to {initials} when no photo set.
export default function PlayerPhoto({ storageKey, initials = '??' }) {
  const { texts, setLocalText } = useTexts();
  const photoUrl = texts[storageKey] || '';
  const fileRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  // Open the file picker SYNCHRONOUSLY inside the click handler so we keep
  // the browser's user-gesture activation. Password is prompted *after* the
  // user picks a file (browsers block file dialogs opened after `await`).
  const handleClick = () => {
    if (isUploading) return;
    fileRef.current?.click();
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      window.alert('Please pick an image file (jpg, png, webp, heic, gif, etc.).');
      return;
    }

    // Now prompt for password (after the picker has closed)
    const pw = await ensurePassword();
    if (!pw) return;

    setIsUploading(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file, { maxDim: 800, quality: 0.85 });
      const result = await saveValue(storageKey, dataUrl);
      if (result.ok) {
        setLocalText(storageKey, dataUrl);
      } else if (result.reason === 'locked' || result.reason === 'unauthorized') {
        window.alert('Session locked — re-enter your password and try again.');
      } else if (result.reason === 'invalid') {
        window.alert('Image still too large after compression. Try a smaller one.');
      } else {
        console.error('PlayerPhoto upload failed', { storageKey, result });
        window.alert('Photo upload failed (' + (result.reason || 'unknown') + ').');
      }
    } catch (err) {
      console.error('PlayerPhoto upload error', err);
      window.alert('Could not process image: ' + (err?.message || 'unknown error'));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isUploading}
      aria-label="Change player photo"
      title="Click to upload a photo"
      className="group relative w-28 h-28 md:w-32 md:h-32 mx-auto rounded-full overflow-hidden border-4 border-ink-950 shadow-[4px_4px_0_#1A1A1A] hover:shadow-[6px_6px_0_#1A1A1A] hover:-translate-y-0.5 transition-all"
      style={{
        background:
          'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 60%, #C8553D 100%)',
      }}
    >
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={initials}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <span
          className="absolute inset-0 flex items-center justify-center text-cream-50 font-display"
          style={{ fontSize: '2.4rem', letterSpacing: '0.05em' }}
        >
          {initials}
        </span>
      )}

      {/* Hover overlay (desktop) */}
      <span className="absolute inset-0 z-10 flex items-center justify-center bg-ink-950/0 group-hover:bg-ink-950/55 transition-colors opacity-0 group-hover:opacity-100">
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-cream-50 border border-ink-950 text-ink-950 text-[9px] font-bold uppercase tracking-[0.18em]">
          {isUploading ? 'Uploading…' : photoUrl ? '📷 Change' : '📷 Upload'}
        </span>
      </span>

      {/* Always-visible camera badge — so touch users see the affordance */}
      <span
        className="absolute bottom-0 right-0 z-20 w-9 h-9 rounded-full bg-ember-500 border-[3px] border-cream-50 flex items-center justify-center shadow-md"
        aria-hidden="true"
      >
        {isUploading ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="animate-spin text-cream-50"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cream-50"
            aria-hidden="true"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        )}
      </span>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </button>
  );
}
