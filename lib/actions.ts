"use server"; // Indicates that this code will run on the server side in a Next.js application

// Importing necessary dependencies and utilities
import { auth } from "@/auth"; // Importing authentication function to verify user session
import { writeCLient } from "@/sanity/lib/write-client"; // Importing write client for interacting with Sanity's database
import slugify from "slugify"; // Importing slugify for generating URL-friendly slugs from titles
import { parseServerActionResponse } from "./util"; // Importing a utility function to standardize server responses

/**
 * Function to create a startup pitch in the database
 * 
 * @param state - The state of the component (not used in this function)
 * @param form - The FormData object containing the form fields submitted by the user
 * @param pitch - The pitch content provided by the user
 * @returns A standardized response object indicating success or error
 */
export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  // Authenticate the user session
  const session = await auth();

  // If the user is not authenticated, return an error response
  if (!session)
    return parseServerActionResponse({
      error: "Not signed in", // Error message for unauthenticated access
      status: "ERROR", // Status indicating the failure
    });

  // Extracting form data while excluding the pitch from the resulting object
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  // Generate a slug from the title for URL usage
  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    // Constructing the startup object to be saved in the database
    const startup = {
      title, // Title of the startup
      description, // Description of the startup
      category, // Category under which the startup falls
      image: link, // Image link associated with the startup
      slug: { // Slug field for the startup
        _type: slug, // Type of the slug (used in Sanity)
        current: slug, // The slug string
      },
      author: { // Reference to the author of the startup
        _type: "reference", // Indicating this is a reference type
        _ref: session?.id, // Reference ID of the author from the session
      },
      pitch, // The pitch content provided by the user
    };

    // Creating the startup document in Sanity's database
    const result = await writeCLient.create({ _type: "startup", ...startup });

    // Returning a successful response containing the created startup details
    return parseServerActionResponse({
      ...result, // Include the result of the creation
      error: "", // No error
      status: "SUCCESS", // Status indicating successful creation
    });
  } catch (error) {
    // Log the error for debugging
    console.log(error);

    // Return an error response if the creation fails
    return parseServerActionResponse({
      error: JSON.stringify(error), // Stringifying the error for easy transmission
      status: "ERROR", // Status indicating the failure
    });
  }
};
