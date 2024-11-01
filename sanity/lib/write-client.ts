import 'server-only'; // Indicate that this module is meant to run only on the server side, preventing it from being included in client-side bundles.

import { createClient } from 'next-sanity'; // Import the `createClient` function from the `next-sanity` package, which allows us to establish a connection with the Sanity backend for data operations.

import { apiVersion, dataset, projectId, token } from '../env'; // Import configuration values from the `env` module. These values are essential for connecting to a specific Sanity project.

export const writeCLient = createClient({ // Create and export a Sanity client instance for writing data to the Sanity backend.
  projectId, // The unique identifier for the Sanity project.
  dataset, // The specific dataset to interact with (e.g., production or development).
  apiVersion, // The version of the Sanity API to use, ensuring compatibility with your queries and mutations.
  useCdn: false, // Set to false for write operations to ensure that data is retrieved directly from the Sanity API and not from a potentially stale CDN cache.
  token, // The authentication token that allows for secure write operations to the Sanity project.
});

// Check if the authentication token is missing; if so, throw an error.
if (!writeCLient.config().token) { // Retrieve the token from the client's configuration.
    throw new Error('Missing SANITY_WRITE_TOKEN'); // If the token is not present, throw an error to prevent unauthorized write attempts.
}
