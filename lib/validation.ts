import { z } from "zod"; // Importing the Zod library for schema validation

// Defining a Zod schema for form validation
export const formSchema = z.object({
  // Field for the title of the startup
  title: z.string() // The title must be a string
    .min(3) // Minimum length of 3 characters
    .max(100), // Maximum length of 100 characters
  
  // Field for the description of the startup
  description: z.string() // The description must be a string
    .min(20) // Minimum length of 20 characters
    .max(500), // Maximum length of 500 characters
  
  // Field for the category of the startup
  category: z.string() // The category must be a string
    .min(3) // Minimum length of 3 characters
    .max(20), // Maximum length of 20 characters
  
  // Field for the link to an image
  link: z.string() // The link must be a string
    .url() // The link must be a valid URL
    .refine(async (url) => { // Additional validation to check if the URL points to an image
      try {
        // Perform a HEAD request to the URL to fetch headers without downloading the resource
        const res = await fetch(url, { method: "HEAD" });
        // Get the content type from the response headers
        const contentType = res.headers.get("content-type");
        // Check if the content type starts with "image/"
        return contentType?.startsWith("image/");
      } catch {
        return false; // Return false if there is an error during the fetch (e.g., network issue)
      }
    }),
  
  // Field for the pitch of the startup
  pitch: z.string() // The pitch must be a string
    .min(10), // Minimum length of 10 characters
});
