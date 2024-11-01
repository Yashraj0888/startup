import 'server-only'; // Importing the server-only directive, indicating that this code should only run on the server
import { defineLive } from 'next-sanity'; // Importing the defineLive function from the next-sanity package
import { client } from '@/sanity/lib/client'; // Importing the Sanity client instance

// Defining live data fetching capabilities using the Sanity client
export const { sanityFetch, SanityLive } = defineLive({ client });
