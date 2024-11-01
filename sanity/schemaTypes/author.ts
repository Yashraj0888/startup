import { UserIcon } from "lucide-react"; // Import the UserIcon component from the lucide-react library for use as an icon in the Sanity schema.

import { defineField, defineType } from "sanity"; // Import necessary functions from the Sanity package to define the schema for a document.

export const author = defineType({ // Define a new document type named 'author'.
    name: 'author', // The name of the document type, which will be used in the Sanity studio.
    type: 'document', // Specify that this is a document type.
    title: 'Author', // The title that will be displayed in the Sanity studio interface.
    icon: UserIcon, // Assign the imported UserIcon to this document type for visual representation in the Sanity studio.

    fields: [ // Define the fields that will be part of the 'author' document.
        defineField({ // Define the 'id' field for the author.
            name: 'id', // The name of the field used in the document.
            type: 'string', // The data type of the field, which is a string.
        }),
        defineField({ // Define the 'name' field for the author.
            name: 'name', 
            type: 'string',
        }),
        defineField({ 
            name: 'username', // The name of the field used in the document.
            type: 'string',
        }),
        defineField({ // De
            name: 'email', 
            type: 'string',
        }),
        defineField({ // De
            name: 'image', 
            type: 'url', 
        }),
        defineField({
            name: 'bio', 
            type: 'text',
        }),
    ],

    preview: { // Define the preview settings for the author document.
        select: { // Specify the fields to display in the preview.
            title: 'name', // Use the 'name' field as the title for the preview.
        },
    },
});
