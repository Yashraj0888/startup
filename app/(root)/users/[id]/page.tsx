import { auth } from "@/auth"; // Importing the authentication function to check user session
import { client } from "@/sanity/lib/client"; // Importing the Sanity client to fetch user data
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries"; // Importing the query to fetch author details by ID
import { notFound } from "next/navigation"; // Importing the notFound function to handle 404 cases
import Image from "next/image"; // Importing the Image component from Next.js for optimized images
import UserStartups from "@/Components/UserStartups"; // Importing the UserStartups component to display startups by the user
import { Suspense } from "react"; // Importing Suspense for loading states in React
import { Skeleton } from "@/Components/ui/skeleton"; // Importing Skeleton component for placeholder UI
import { StartupCardSkeleton } from "@/Components/StartupCard"; // Importing a skeleton component for startup cards

// Enabling experimental features for server components
export const experimental_ppr = true;

// Asynchronous page component for displaying user profile and their startups
const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id; // Awaiting params to get the user ID from the route
  const session = await auth(); // Awaiting the authentication session to check if the user is signed in

  // Fetching the user details from the Sanity database using the author ID
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  
  // If the user does not exist, return a 404 not found page
  if (!user) return notFound();

  // Render the user profile and their startups
  return (
    <>
      <section className="profile_container"> {/* Main container for the profile */}
        <div className="profile_card"> {/* Card for displaying user profile information */}
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name} {/* Displaying the user's name */}
            </h3>
          </div>

          {/* Displaying the user's profile image */}
          <Image
            src={user.image}
            alt={user.name} // Using the user's name as the alt text for accessibility
            width={220}
            height={220}
            className="profile_image" // Custom styling for the profile image
          />

          <p className="text-30-extrabold mt-7 text-center">
            @{user?.username} {/* Displaying the user's username */}
          </p>
          <p className="mt-1 text-center text-14-normal">{user?.bio}</p> {/* Displaying the user's bio */}
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5"> {/* Container for user startups */}
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"} Startups {/* Conditional rendering based on the session ID */}
          </p>
          <ul className="card_grid-sm"> {/* Grid layout for displaying startup cards */}
            <Suspense fallback={ <StartupCardSkeleton/>}> {/* Suspense to handle loading state */}
              <UserStartups id={id} /> {/* Component to fetch and display the user's startups */}
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};

export default Page; // Exporting the Page component for use in the application
