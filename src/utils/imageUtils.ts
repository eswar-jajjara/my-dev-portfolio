
export function getRandomImageUrl(imageUrls: string[]): string {
  if (imageUrls.length === 0) {
    return '';
  }
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
}
