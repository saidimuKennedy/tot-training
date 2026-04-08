const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";

export function cloudinaryVideoUrl(publicId: string) {
  return `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${publicId}.mp4`;
}

export function cloudinaryPosterUrl(publicId: string) {
  return `https://res.cloudinary.com/${cloudName}/video/upload/so_1,f_jpg/${publicId}.jpg`;
}
