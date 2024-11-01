import { createClient } from 'next-sanity'; // Import the createClient function from the next-sanity package

// Importing environment variables for API configuration
import { apiVersion, dataset, projectId } from '../env';

// Creating a Sanity client instance with specific configurations
export const client = createClient({
  projectId, // The unique identifier for your Sanity project
  dataset, // The dataset you are targeting within the Sanity project
  apiVersion, // The API version to use; helps in managing breaking changes
  useCdn: true, // Enables the Content Delivery Network (CDN) for faster responses
  // Set to false if you are statically generating pages, using Incremental Static Regeneration (ISR),
  // or implementing tag-based revalidation to ensure you always fetch the latest data
});
