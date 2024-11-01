import { auth } from "@/auth"; // Importing the authentication function to check user session
import SearchForm from "@/Components/SearchForm"; // Importing the SearchForm component for user input
import StartupCard, { StartupTypeCard } from "@/Components/StartupCard"; // Importing StartupCard for displaying individual startup data

import { sanityFetch, SanityLive } from "@/sanity/lib/live"; // Importing functions for data fetching from Sanity
import { STARTUPS_QUERY } from "@/sanity/lib/queries"; // Importing the query for fetching startups
import { log } from "console"; // Importing console logging (not utilized in this code)
import Image from "next/image"; // Importing the Image component from Next.js for optimized images

// Asynchronous Home component for displaying the startup pitch page
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    // Awaiting the searchParams to get the query string for searching startups
    const query = (await searchParams).query;

    // Preparing parameters for the data fetch, defaulting to null if no query is provided
    const params = { search: query || null };

    // Checking the user session to determine if the user is authenticated
    const session = await auth();

    // Logging the user's session ID for debugging purposes
    console.log(session?.id);

    // Fetching startup data from Sanity using the STARTUPS_QUERY and params
    const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

    // Rendering the component
    return (
        <>
            <section className="pink_container"> {/* Section for the introductory content */}
                <h1 className="heading">Pitch Your startup, <br /> connect with entrepreneurs</h1> {/* Main heading */}
                <p className="sub-heading !max-w-3xl"> {/* Subheading with a maximum width */}
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions. 
                </p>
                <SearchForm query={query} /> {/* Search form component for user input */}
            </section>

            <section className="section_container"> {/* Section for displaying search results or all startups */}
                <p className="text-30-semibold"> {/* Conditional text based on whether a query exists */}
                    {query ? `Search results for ${query}` : 'All Startups'}
                </p>
                <ul className="mt-7 card_grid"> {/* Grid layout for displaying startup cards */}
                    {posts?.length > 0 ? ( // Check if there are any posts
                        posts.map((post: StartupTypeCard) => // Map through posts to create StartupCard components
                            <StartupCard key={post._id} post={post} />
                        )
                    ) : (
                        <p className="no-result">No results found with {query}.</p> // Message if no results are found
                    )}
                </ul>
            </section>
            <SanityLive /> {/* Component for real-time updates from Sanity */}
        </>
    );
}
