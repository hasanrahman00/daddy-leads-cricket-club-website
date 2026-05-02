import { useRef, useState } from 'react';
import { GALLERY } from '../data/content.js';
import { useTexts } from '../context/TextsProvider';
import { ensurePassword, saveValue } from '../lib/editableAuth.js';
import { fileToCompressedDataUrl } from '../lib/imageUpload.js';
import EditableText from './EditableText.jsx';

const DEFAULT_COUNT = 6;
const COUNT_KEY = 'gallery_count';

function captionSeed(slotIndex) {
  return GALLERY[slotIndex]?.tag || `Photo ${slotIndex + 1}`;
}

function GalleryTile({ slotIndex }) {
  const i = slotIndex + 1;
  const seed = captionSeed(slotIndex);
  const photoKey = `gallery_${i}_image`;
  const captionKey = `gallery_${i}_caption`;
  const { texts, setLocalText } = useTexts();
  const photoUrl = texts[photoKey] || '';
  const fileRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  // Open file picker synchronously to preserve user-gesture activation;
  // prompt for password after the user picks a file.
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
    const pw = await ensurePassword();
    if (!pw) return;
    setIsUploading(true);
    try {
      // Gallery tiles are landscape — allow slightly bigger long-edge
      const dataUrl = await fileToCompressedDataUrl(file, { maxDim: 1400, quality: 0.85 });
      const result = await saveValue(photoKey, dataUrl);
      if (result.ok) {
        setLocalText(photoKey, dataUrl);
      } else if (result.reason === 'locked' || result.reason === 'unauthorized') {
        window.alert('Session locked — re-enter your password and try again.');
      } else {
        console.error('GalleryTile upload failed', { photoKey, result });
        window.alert('Photo upload failed (' + (result.reason || 'unknown') + ').');
      }
    } catch (err) {
      console.error('GalleryTile upload error', err);
      window.alert('Could not process image: ' + (err?.message || 'unknown error'));
    } finally {
      setIsUploading(false);
    }
  };

  // Subtle on-tile gradient that varies per slot for the placeholder state
  const placeholderBg = `linear-gradient(${135 + slotIndex * 20}deg, #1A1A1A, #2A2A2A 60%, ${
    slotIndex % 2 === 0 ? '#C8553D' : '#C9A24A'
  })`;

  return (
    <article className="snap-start flex-none w-[280px] md:w-[320px] reveal">
      {/* Image area — clickable upload */}
      <button
        type="button"
        onClick={handleClick}
        disabled={isUploading}
        aria-label="Change gallery photo"
        title="Click to upload a photo"
        className="group relative w-full block overflow-hidden border-2 border-cream-50/15 hover:border-ember-500 rounded-2xl shadow-[5px_5px_0_rgba(251,241,229,0.15)] hover:shadow-[8px_8px_0_rgba(200,85,61,0.45)] hover:-translate-y-0.5 transition-all"
        style={{
          aspectRatio: '4 / 3',
          background: photoUrl ? '#1A1A1A' : placeholderBg,
        }}
      >
        {photoUrl && (
          <img
            src={photoUrl}
            alt={seed}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Photo number stamp */}
        <span
          className="absolute top-3 left-3 z-10 inline-flex items-center px-2 py-1 bg-cream-50 text-ink-950 text-[10px] font-bold uppercase tracking-[0.2em] border border-ink-950 rounded-sm"
        >
          #{String(i).padStart(2, '0')}
        </span>

        {/* Hover overlay (desktop) */}
        <span className="absolute inset-0 z-20 flex items-center justify-center bg-ink-950/0 group-hover:bg-ink-950/55 transition-colors opacity-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-cream-50 border-2 border-ink-950 text-ink-950 text-[10px] font-bold uppercase tracking-[0.2em] shadow-[3px_3px_0_#1A1A1A]">
            {isUploading ? 'Uploading…' : photoUrl ? '📷 Change' : '📷 Upload'}
          </span>
        </span>

        {/* Always-visible camera badge for touch / no-hover devices */}
        <span
          className="absolute bottom-2 right-2 z-30 inline-flex items-center gap-1.5 px-2.5 py-1 bg-ember-500 text-cream-50 text-[10px] font-bold uppercase tracking-[0.18em] border-2 border-cream-50 rounded-md shadow-md"
          aria-hidden="true"
        >
          {isUploading ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="animate-spin" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Uploading
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              {photoUrl ? 'Change' : 'Upload'}
            </>
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

      {/* Caption — editable text below the image */}
      <div className="mt-3 px-1">
        <div className="font-serif text-base md:text-lg leading-tight text-cream-50">
          <EditableText
            storageKey={captionKey}
            defaultValue={seed}
            type="text"
          />
        </div>
      </div>
    </article>
  );
}

function AddTileCard({ onAdd, isAdding }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      disabled={isAdding}
      className="snap-start flex-none w-[280px] md:w-[320px] reveal flex flex-col items-center justify-center gap-3 border-2 border-dashed border-cream-50/30 rounded-2xl hover:border-ember-500 hover:bg-cream-50/5 transition-all p-6 group"
      style={{ aspectRatio: '4 / 3' }}
      title="Add a new photo slot"
    >
      <div className="w-14 h-14 rounded-full border-2 border-dashed border-cream-50/40 group-hover:border-ember-500 flex items-center justify-center transition-colors">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cream-50/60 group-hover:text-ember-500 transition-colors"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </div>
      <div className="text-center">
        <div className="font-display text-xl text-cream-50 leading-none">
          {isAdding ? 'Adding…' : 'Add Photo'}
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.2em] font-bold text-cream-200">
          Click to create a new slot
        </div>
      </div>
    </button>
  );
}

export default function Gallery() {
  const { texts, setLocalText } = useTexts();
  const count =
    parseInt(texts[COUNT_KEY] ?? String(DEFAULT_COUNT), 10) || DEFAULT_COUNT;
  const [isAdding, setIsAdding] = useState(false);
  const scrollerRef = useRef(null);

  const scrollByCard = (direction) => {
    scrollerRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  const handleAdd = async () => {
    if (isAdding) return;
    const pw = await ensurePassword();
    if (!pw) return;
    const next = count + 1;
    const previous = count;
    setLocalText(COUNT_KEY, String(next));
    setIsAdding(true);
    const result = await saveValue(COUNT_KEY, String(next));
    setIsAdding(false);
    if (!result.ok) {
      setLocalText(COUNT_KEY, String(previous));
      window.alert('Could not add slot.');
    }
    requestAnimationFrame(() => {
      scrollerRef.current?.scrollTo({
        left: scrollerRef.current.scrollWidth,
        behavior: 'smooth',
      });
    });
  };

  const handleRemove = async () => {
    if (count <= 1) {
      window.alert('Cannot remove — at least one slot is required.');
      return;
    }
    const ok = window.confirm(
      `Remove the last photo slot (#${String(count).padStart(2, '0')})? Its content stays in storage and will reappear if you click +.`,
    );
    if (!ok) return;
    const pw = await ensurePassword();
    if (!pw) return;
    const next = count - 1;
    const previous = count;
    setLocalText(COUNT_KEY, String(next));
    const result = await saveValue(COUNT_KEY, String(next));
    if (!result.ok) {
      setLocalText(COUNT_KEY, String(previous));
      window.alert('Could not remove slot.');
    }
  };

  return (
    <section id="gallery" className="py-24 md:py-32 bg-ink-950 text-cream-50">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="reveal">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">
            // Gallery
          </div>
          <h2 className="mt-3 font-display text-6xl md:text-7xl leading-none">
            Moments from the middle.
          </h2>
        </div>

        {/* Horizontal carousel */}
        <div className="relative mt-12 -mx-5 md:-mx-8">
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll left"
            className="hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-cream-50 border-2 border-ink-950 shadow-[3px_3px_0_rgba(251,241,229,0.25)] hover:bg-ember-500 hover:text-cream-50 hover:-translate-y-[calc(50%+2px)] transition-all text-ink-950"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll right"
            className="hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-cream-50 border-2 border-ink-950 shadow-[3px_3px_0_rgba(251,241,229,0.25)] hover:bg-ember-500 hover:text-cream-50 hover:-translate-y-[calc(50%+2px)] transition-all text-ink-950"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          {/* Edge fades — fade to ink-950 */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
            style={{ background: 'linear-gradient(to right, #1A1A1A, transparent)' }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
            style={{ background: 'linear-gradient(to left, #1A1A1A, transparent)' }}
            aria-hidden="true"
          />

          <div
            ref={scrollerRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-pl-5 md:scroll-pl-8"
          >
            <div className="flex gap-5 px-5 md:px-8 pb-3 pt-2">
              {Array.from({ length: count }, (_, i) => (
                <GalleryTile key={`tile-${i}`} slotIndex={i} />
              ))}
              <AddTileCard onAdd={handleAdd} isAdding={isAdding} />
            </div>
          </div>
        </div>

        {/* Footer: scroll hint + remove button */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] font-bold text-cream-200">
          <span>← Scroll →</span>
          <span className="flex-1 h-px bg-cream-50/15" />
          <span>{count} {count === 1 ? 'photo' : 'photos'}</span>
          <button
            type="button"
            onClick={handleRemove}
            disabled={count <= 1}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] border-2 border-cream-50/40 bg-transparent text-cream-50 hover:bg-ember-500 hover:text-cream-50 hover:border-ember-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-cream-50/40 transition-colors rounded-md"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
            </svg>
            Remove Last
          </button>
        </div>

      </div>
    </section>
  );
}
