import NextAuth from "next-auth"; // Import NextAuth for handling authentication
import GitHub from "next-auth/providers/github"; // Import GitHub provider for OAuth authentication
import { client } from "./sanity/lib/client"; // Import the Sanity client for querying the database
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries"; // Import the query to fetch author details from Sanity
import { writeCLient } from "./sanity/lib/write-client"; // Import the write client for creating new authors in Sanity

// Initialize NextAuth with configuration
export const { handlers, auth, signIn, signOut } = NextAuth({
  // Specify the authentication providers
  providers: [GitHub],
  
  // Define callbacks to handle various events during authentication
  callbacks: {
    // This callback is called whenever a user attempts to sign in
    async signIn({ user: { name, email, image }, profile: { id, login, bio } }) {
      // Fetch the existing user from Sanity using the GitHub ID
      const existingUser = await client
        .withConfig({ useCdn: false }) // Disable CDN for real-time data fetching
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id, // Use the GitHub ID to find the user
        });

      // If the user does not exist in Sanity, create a new user
      if (!existingUser) {
        await writeCLient.create({
          _type: "author", // Specify the document type
          id, // GitHub ID
          name, // User's name
          username: login, // GitHub username
          email, // User's email
          image, // URL of the user's profile image
          bio: bio || "", // User's bio (default to an empty string if not provided)
        });
      }

      // Return true to indicate a successful sign-in
      return true;
    },

    // This callback is called when creating the JWT token
    async jwt({ token, account, profile }) {
      // Check if the account and profile are available
      if (account && profile) {
        // Fetch the user from Sanity to get the unique user ID
        const user = await client
          .withConfig({ useCdn: false }) // Disable CDN for real-time data fetching
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id, // Use the GitHub ID to find the user
          });

        // Add the user ID to the token for future reference
        token.id = user?._id; // Store the Sanity document ID in the token
      }

      // Return the updated token
      return token;
    },

    // This callback is called whenever a session is created
    async session({ session, token }) {
      // Attach the user ID from the token to the session object
      Object.assign(session, { id: token.id });
      
      // Return the updated session
      return session;
    },
  },
});
