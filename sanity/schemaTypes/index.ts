import { type SchemaTypeDefinition } from 'sanity'; // Import SchemaTypeDefinition type from the Sanity library to define the schema structure.
import { author } from './author'; // Import the 'author' schema definition from the author module.
import { startup } from './startup'; // Import the 'startup' schema definition from the startup module.
import { playlist } from './playlist'; // Import the 'playlist' schema definition from the playlist module.

// Define the main schema object which includes all the document types for the Sanity studio.
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, startup, playlist], // An array containing the document types defined in the imported modules.
};
