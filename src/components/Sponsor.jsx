import { useRef, useState } from 'react';
import { useTexts } from '../context/TextsProvider';
import { ensurePassword, saveValue } from '../lib/editableAuth.js';
import EditableText from './EditableText.jsx';

const WHATSAPP_URL = `https://wa.me/8801885781259?text=${encodeURIComponent(
  "Hi Daddy Leads CC — I'd like to talk about sponsoring the team for the 2026 season.",
)}`;

const JERSEY_KEY = 'sponsor_jersey_image';
const DEFAULT_JERSEY = '/jersey-front.svg';
const MAX_BYTES = 800 * 1024;
// Match the SVG's intrinsic aspect ratio (680 × 540) so uploads keep the same shape
const JERSEY_ASPECT = '680 / 540';

// Shared upload state — the image slot AND the explicit "Change Image" button
// both use the same hidden file input via this hook.
function useJerseyUpload() {
  const { texts, setLocalText } = useTexts();
  const uploaded = texts[JERSEY_KEY] || '';
  const fileRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const triggerUpload = async () => {
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
      window.alert('Image too large (max 800KB).');
      return;
    }
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = String(reader.result || '');
      const result = await saveValue(JERSEY_KEY, dataUrl);
      setIsUploading(false);
      if (result.ok) {
        setLocalText(JERSEY_KEY, dataUrl);
      } else {
        window.alert('Upload failed.');
      }
    };
    reader.onerror = () => {
      setIsUploading(false);
      window.alert('Could not read that file.');
    };
    reader.readAsDataURL(file);
  };

  return { uploaded, isUploading, triggerUpload, handleFile, fileRef };
}

function JerseyImageSlot({ upload }) {
  const { uploaded, isUploading, triggerUpload } = upload;
  const src = uploaded || DEFAULT_JERSEY;

  return (
    <button
      type="button"
      onClick={triggerUpload}
      disabled={isUploading}
      aria-label="Change jersey image"
      title="Click to upload your own jersey image"
      className="group relative block w-full overflow-hidden bg-cream-50"
      style={{ aspectRatio: JERSEY_ASPECT }}
    >
      <img
        src={src}
        alt="Daddy Leads Cricket Club — front jersey"
        className="absolute inset-0 w-full h-full object-contain"
      />
      <span className="absolute inset-0 z-10 flex items-center justify-center bg-ink-950/0 group-hover:bg-ink-950/55 transition-colors opacity-0 group-hover:opacity-100">
        <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-cream-50 border-2 border-ink-950 text-ink-950 text-[10px] font-bold uppercase tracking-[0.2em] shadow-[3px_3px_0_#1A1A1A]">
          {isUploading ? 'Uploading…' : uploaded ? '📷 Change Image' : '📷 Upload Image'}
        </span>
      </span>
    </button>
  );
}

function ChangeImageButton({ upload }) {
  const { isUploading, triggerUpload, uploaded } = upload;
  return (
    <button
      type="button"
      onClick={triggerUpload}
      disabled={isUploading}
      className="inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] bg-ink-950 text-cream-50 border-2 border-ink-950 hover:bg-ember-500 hover:border-ember-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-md shadow-[3px_3px_0_#C8553D] hover:shadow-[5px_5px_0_#1A1A1A] hover:-translate-y-0.5"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
      {isUploading ? 'Uploading…' : uploaded ? 'Change Image' : 'Upload Image'}
    </button>
  );
}

export default function Sponsor() {
  const upload = useJerseyUpload();

  return (
    <section
      id="sponsor"
      className="py-24 md:py-32 bg-cream-100 border-y border-ink-950"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-12 items-center">
        {/* Left — copy + WhatsApp */}
        <div className="reveal">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-ember-500">
            // Title Sponsor
          </div>
          <h2 className="mt-3 font-display text-6xl md:text-7xl leading-none">
            Powered by <span className="marker">Daddy Leads</span>.
          </h2>
          <p className="mt-6 text-lg text-ink-700 leading-relaxed">
            Daddy Leads (est. 2022) is the title sponsor of Daddy Leads CC
            (est. 2026) — same crest on the chest, same hustle on the field.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp mt-8 group max-w-md"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 bg-cream-50 border border-ink-950 text-[#25D366]">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </span>
            <span className="flex-1 text-left leading-tight">
              <span className="block text-[10px] uppercase tracking-[0.25em] text-ink-700 font-bold">
                Sponsorship Enquiry
              </span>
              <span className="block text-base">Chat on WhatsApp</span>
            </span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold text-ink-700">
            <span className="px-2 py-1 border border-ink-950 bg-cream-50">EST. 2022</span>
            <span className="px-2 py-1 border border-ink-950 bg-cream-50">
              <EditableText
                storageKey="sponsor_kit_label"
                defaultValue="2026 Kit"
                type="text"
              />
            </span>
            <span className="px-2 py-1 border border-ink-950 bg-cream-50">Cream · Black</span>
          </div>
        </div>

        {/* Right — uploadable jersey image (defaults to the SVG) */}
        <div className="reveal flex justify-center">
          <div className="relative w-full max-w-md">
            <div
              className="absolute inset-0 bg-ink-950 rounded-3xl translate-x-3 translate-y-3"
              aria-hidden="true"
            />
            <div className="relative bg-cream-50 border-2 border-ink-950 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0_#C8553D]">
              {/* Header strip */}
              <div className="flex items-center justify-between mb-4 text-[10px] uppercase tracking-[0.3em] font-bold">
                <span className="px-2 py-1 bg-ink-950 text-cream-50">Front · Crest</span>
                <span className="text-ink-700">
                  <EditableText
                    storageKey="sponsor_kit_label"
                    defaultValue="2026 Kit"
                    type="text"
                  />
                </span>
              </div>

              {/* Image slot */}
              <JerseyImageSlot upload={upload} />

              {/* Footer strip with explicit Change Image button */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <ChangeImageButton upload={upload} />
                <span className="px-3 py-1.5 bg-ember-500 text-cream-50 text-[10px] font-bold uppercase tracking-[0.3em] rounded-md">
                  Daddy Leads
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Single hidden file input shared by the slot AND the button */}
        <input
          ref={upload.fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={upload.handleFile}
        />
      </div>
    </section>
  );
}
