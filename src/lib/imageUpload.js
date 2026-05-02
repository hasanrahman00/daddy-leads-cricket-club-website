// Take a File from <input type="file"> and return a compressed JPEG data URL.
// Auto-resizes huge phone photos so any format/size works without the user
// having to compress them first. Output is typically 100–300KB regardless
// of input size, which fits comfortably in our /api/text store.
export async function fileToCompressedDataUrl(file, opts = {}) {
  const { maxDim = 1200, quality = 0.85 } = opts;

  // 1. Read the raw file as a data URL
  const rawDataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.readAsDataURL(file);
  });

  // 2. Load into an Image so we can read its natural dimensions
  const img = await new Promise((resolve, reject) => {
    const i = new Image();
    i.onload = () => resolve(i);
    i.onerror = () => reject(new Error('Browser could not render that image format.'));
    i.src = rawDataUrl;
  });

  // 3. Compute resized dimensions (preserves aspect ratio)
  let { naturalWidth: w, naturalHeight: h } = img;
  if (w > maxDim || h > maxDim) {
    if (w >= h) {
      h = Math.round(h * (maxDim / w));
      w = maxDim;
    } else {
      w = Math.round(w * (maxDim / h));
      h = maxDim;
    }
  }

  // 4. Draw to canvas + export as JPEG
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable.');
  // White background prevents transparent PNG → black JPEG glitch
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);

  return canvas.toDataURL('image/jpeg', quality);
}
