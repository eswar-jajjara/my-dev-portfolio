
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'lmcy71tt',
  dataset: 'production',
  useCdn: true, // set to `false` for fresh data
  apiVersion: '2024-07-21',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
