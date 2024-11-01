import { defineField, defineType } from "sanity"; // Import functions to define schema fields and types from the Sanity library.

// Define the 'playlist' schema type, representing a document in the Sanity content studio.
export const playlist = defineType({
  name: "playlist", // The internal name of the schema, used in queries and references.
  title: "Playlist", // The title displayed in the Sanity Studio interface.
  type: "document", // Specifies that this schema type is a document.
  fields: [ // Array of fields that will be part of the playlist document.
    defineField({
      name: "title", // The name of the field.
      type: "string", // The data type of the field, in this case, a string.
    }),
    defineField({
      name: "slug", // Field to create a URL-friendly version of the title.
      type: "slug", // The data type for slugs, which are typically used in URLs.
      options: {
        source: "title", // Automatically generate the slug from the title field.
      },
    }),
    defineField({
      name: "select", // Name of the field for selecting associated startups.
      type: "array", // Indicates that this field will hold an array of items.
      of: [{type:'reference',to:[{type:'startup'}]}] // Defines the array items as references to 'startup' documents.
    }),
  ],
});
