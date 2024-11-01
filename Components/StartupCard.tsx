'use client' // Indicates this component is a client component in Next.js
import { cn, formatDate } from '@/lib/util' // Importing utility functions for class name handling and date formatting
import { EyeIcon } from 'lucide-react' // Importing Eye icon from lucide-react library
import Image from 'next/image' // Importing Next.js Image component for optimized images
import Link from 'next/link' // Importing Link component for client-side navigation
import React from 'react' // Importing React for using JSX
import { Button } from './ui/button' // Importing custom Button component for styled buttons
import { Author, Startup } from '@/sanity/types' // Importing types for Author and Startup from Sanity
import { Skeleton } from './ui/skeleton' // Importing Skeleton component for loading placeholders

// Defining a type for the Startup card that omits the 'author' field from Startup type
export type StartupTypeCard = Omit<Startup, 'author'> & { author?: Author }

// Defining the StartupCard component, which takes a post prop of type StartupTypeCard
const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  // Destructuring fields from the post prop for easier access
  const { _createdAt, views, author, _id, image, description, category, title } = post

  return (
    <li className="startup-card group"> {/* Main container for each startup card */}
        {/* Section displaying the post creation date and view count */}
        <div className="flex-between">
            <p className="startup_card_date">
                {formatDate(_createdAt)} {/* Formatting and displaying the creation date */}
            </p>
            {/* View count with an eye icon */}
            <div className='flex gap-1.5'>
              <EyeIcon className='size-6 text-primary' /> {/* Eye icon indicating views */}
              <span className='text-16-medium'>{views}</span> {/* Displaying the number of views */}
            </div>
        </div>

        {/* Section for author name and startup title */}
        <div className='flex-between mt-5 gap-5'>
          <div className='flex-1'>
            <Link href={`/startup/${author?._id}`}>
              <p className='text-16-medium line-clamp-1'>{author?.name}</p> {/* Link to author's profile */}
            </Link>
            <Link href={`/startup/${_id}`}>
              <h3 className=' text-30-semibold line-clamp-1'>{title}</h3> {/* Link to the startup details */}
            </Link>
          </div>
          {/* Link to author's profile image with rounded styling */}
          <Link href={`/users/${author?._id}`}>
            <Image src={author?.image!} alt={author?.name!} width={48} height={48} className='rounded-full' />
          </Link>
        </div>

        {/* Description and main image for the startup */}
        <Link href={`/startup/${_id}`}>
          <p className='startup-card_desc'>{description}</p> {/* Brief description of the startup */}
          <img src={image} alt="" className='startup-card_img' /> {/* Image associated with the startup */}
        </Link>

        {/* Section for category link and button to view details */}
        <div className='flex-between gap-3 mt-5'>
          <Link href={`/?query=${category?.toLowerCase()}`}>
            <p className='text-16-medium'>{category}</p> {/* Link to filter by category */}
          </Link>
          <Button className='startup-card_btn' asChild> {/* Styled button for viewing details */}
            <Link href={`/startup/${_id}`}>Details</Link> {/* Link to the startup's detail page */}
          </Button>
        </div>
    </li>
  )
}

// Skeleton loading component for the StartupCard
export const StartupCardSkeleton = () => (
  <>
    {/* Mapping over an array to generate multiple skeleton placeholders */}
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn('skeleton', index)}> {/* Unique key for each skeleton item */}
        <Skeleton className='startup-card_skeleton' /> {/* Skeleton component representing loading state */}
      </li>
    ))}
  </>
)

export default StartupCard // Exporting the StartupCard component for use in other parts of the application
