import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

/**
 * Navbar component renders the navigation bar with options to log in/out,
 * and links to navigate between pages. Displays different options based on user session status.
 */
const Navbar = async () => {
  // Fetch the current session to check if the user is logged in
  const session = await auth();

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        {/* Logo linking back to the home page */}
        <Link href="/">
          <Image src='/logo.png' alt="logo" width={144} height={30}/>
        </Link>

        {/* Right side of the navbar, showing different options based on session */}
        <div className='flex items-center gap-5 text-black'>
          {session && session.user ? (
            <>
              {/* Link to create a startup pitch, visible to logged-in users */}
              <Link href='/startup/create'>
                <span className='max-sm:hidden'>Create</span>
                <BadgePlus className='size-6 sm:hidden'/>
              </Link>
              
              {/* Logout button that triggers the signOut action */}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className='max-sm:hidden'>Logout</span>
                  <LogOut className='size-6 sm:hidden text-red-500'/>
                </button>
              </form>

              {/* Link to the user's profile page, showing the user’s avatar */}
              <Link href={`/users/${session?.id}`}>
                <Avatar className='size-10'>
                  <AvatarImage 
                    src={session?.user?.image || ''}  // Display user's profile image if available
                    alt={session?.user?.name || ''}   // Display user's name if available
                  /> 
                  <AvatarFallback>AV</AvatarFallback> 
                </Avatar>
              </Link>
            </>
          ) : (
            // Login button for users who are not signed in
            <form
              action={async () => {
                "use server";
                await signIn("github");  // Sign in using GitHub provider
              }}
              method="POST" // Ensuring the POST method for form submission
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
