import { Suspense } from "react"; // Importing Suspense for handling loading states in React components
import { client } from "@/sanity/lib/client"; // Importing the client to interact with Sanity CMS
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries"; // Importing queries for fetching data from Sanity
import { notFound } from "next/navigation"; // Importing a helper function to trigger a 404 not found page

import Link from "next/link"; // Importing Link component for client-side navigation
import Image from "next/image"; // Importing Image component for optimized image rendering

import markdownit from "markdown-it"; // Importing markdown-it for parsing Markdown content
import { formatDate } from "@/lib/util"; // Importing utility function for formatting dates
import { Skeleton } from "@/Components/ui/skeleton"; // Importing Skeleton component for loading placeholders
import View from "@/Components/View"; // Importing a custom View component for displaying views related to the post

const md = markdownit(); // Initializing the markdown-it parser

// Enabling experimental support for Partial Prerendering
export const experimental_ppr = true;

// Main page component that handles asynchronous data fetching and rendering
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id; // Awaiting and extracting the 'id' parameter from the URL

  // Fetching the startup post and a playlist of editor picks simultaneously
  const [post] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }), // Fetching the specific startup post by ID
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks-new" }), // Fetching a playlist with a specific slug
  ]);

  // If no post is found, trigger a 404 not found page
  if (!post) return notFound();

  // Parsing the Markdown content of the post's pitch
  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      {/* Section for the post header with date and title */}
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p> {/* Displaying the formatted creation date */}
        <h1 className="heading">{post.title}</h1> {/* Displaying the post title */}
        <p className="sub-heading !max-w-5xl">{post.description}</p> {/* Displaying the post description */}
      </section>

      {/* Main content section for the post details */}
      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl" // Displaying the post image with styles
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          {/* Author and category section */}
          <div className="flex-between gap-5 ">
            <Link
              href={`/user/${post.author?._id}`} // Link to the author's profile
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image} // Displaying the author's avatar
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg" // Styles for the avatar
              />

              <div>
                <p className="text-20-medium">{post.author.name}</p> {/* Displaying the author's name */}
                <p className="text-16-medium !text-black-300">
                  @{post.author.username} {/* Displaying the author's username */}
                </p>
              </div>
            </Link>

            <p className="font-medium text-[12px] sm:text-[17px] bg-primary-100 px-4 py-2 sm:px-3 sm:py-1.5 rounded-full ">
              {post.category} {/* Displaying the post category */}
            </p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3> {/* Section header for pitch details */}
          {parsedContent ? (
            // Rendering the parsed Markdown content, or a fallback message if no content is available
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }} // Setting HTML content directly (be cautious with this approach)
            />
          ) : (
            <p className="no-result">No details provided</p> // Fallback message for no details
          )}
        </div>

        <hr className="divider" /> {/* Divider for visual separation */}

        {/* Suspense wrapper for lazy loading the View component */}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} /> {/* Rendering the View component and passing the post ID */}
        </Suspense>
      </section>
    </>
  );
};

export default Page; // Exporting the Page component for use in other parts of the application
