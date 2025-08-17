import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "hqy2e0hu",
  dataset: "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

// Helper for generating optimized image URLs
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
