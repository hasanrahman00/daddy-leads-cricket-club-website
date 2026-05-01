import { useRef, useState } from 'react';
import { useTexts } from '../context/TextsProvider';
import { ensurePassword, saveValue } from '../lib/editableAuth.js';

const MAX_BYTES = 800 * 1024; // 800 KB upload cap

// Round (circular) player portrait. Click → file picker → base64-encoded
// photo saved via /api/text. Falls back to {initials} when no photo set.
export default function PlayerPhoto({ storageKey, initials = '??' }) {
  const { texts, setLocalText } = useTexts();
  const photoUrl = texts[storageKey] || '';
  const fileRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleClick = async () => {
    if (isUploading) return;
    const pw = await ensurePassword();
    if (!pw) return;
    fileRef.current?.click();
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      window.alert('Please pick an image file.');
      return;
    }
    if (file.size > MAX_BYTES) {
      window.alert('Photo is too large (max 800KB). Compress or pick a smaller one.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result || '');
      const result = await saveValue(storageKey, dataUrl);
      setIsUploading(false);
      if (result.ok) {
        setLocalText(storageKey, dataUrl);
      } else if (result.reason === 'locked' || result.reason === 'unauthorized') {
        window.alert('Session locked — re-enter your password and try again.');
      } else {
        window.alert('Photo upload failed.');
      }
    };
    reader.onerror = () => {
      setIsUploading(false);
      window.alert('Could not read that file.');
    };
    reader.readAsDataURL(file);
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

      {/* Hover overlay */}
      <span className="absolute inset-0 z-10 flex items-center justify-center bg-ink-950/0 group-hover:bg-ink-950/55 transition-colors opacity-0 group-hover:opacity-100">
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-cream-50 border border-ink-950 text-ink-950 text-[9px] font-bold uppercase tracking-[0.18em]">
          {isUploading ? 'Uploading…' : photoUrl ? '📷 Change' : '📷 Upload'}
        </span>
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
