export async function downscaleImage(file: File, maxDim = 2000): Promise<File> {
  if (!file.type.startsWith('image/')) return file
  const bitmap = await createImageBitmap(file)
  const { width, height } = bitmap
  const scale = Math.min(1, maxDim / Math.max(width, height))
  if (scale === 1) return file

  const canvas = document.createElement('canvas')
  canvas.width = Math.round(width * scale)
  canvas.height = Math.round(height * scale)
  const ctx = canvas.getContext('2d')
  if (!ctx) return file
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  const blob: Blob = await new Promise((resolve) => canvas.toBlob(b => resolve(b as Blob), file.type || 'image/jpeg', 0.9))
  return new File([blob], file.name, { type: blob.type })
}

