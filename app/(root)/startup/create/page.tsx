import { auth } from '@/auth'; // Importing the authentication function from the auth module
import StartupForm from '@/Components/StartupForm'; // Importing the StartupForm component for rendering the startup submission form

import { redirect } from 'next/navigation'; // Importing the redirect function to navigate the user
import React from 'react'; // Importing React

// Asynchronous page component for submitting a startup
const page = async () => {
  // Awaiting the authentication session to check if the user is signed in
  const session = await auth();

  // If there is no session (user is not signed in), display a message and redirect
  if (!session) {
    // Render a message indicating that the user is not signed in
    <p className='pink_container'>You are not signed in.</p>;
    
    // Redirect the user to the home page
    redirect(`/`);
  }

  // Return the main content of the page when the user is authenticated
  return (
    <>
      {/* Section for the page header */}
      <section className="pink_container !min-h-[230px]">
        <h1 className='heading'>Submit your startup</h1> {/* Heading for the startup submission */}
      </section>
      
      {/* Rendering the StartupForm component for users to submit their startup details */}
      <StartupForm />
    </>
  );
};

export default page; // Exporting the page component for use in the application
