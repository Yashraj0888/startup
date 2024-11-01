// Import necessary dependencies and components
import React from 'react'
import Ping from './Ping' // Importing the Ping component for visual indication
import { client } from '@/sanity/lib/client' // Importing the Sanity client for fetching data
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries' // Importing the query for startup views
import { writeCLient } from '@/sanity/lib/write-client' // Importing the write client for updating data
import { unstable_after as after } from 'next/server' // Importing the unstable_after function for handling post-fetch operations

// View component to display and update views for a specific startup
const View = async ({ id }: { id: string }) => {
  // Fetching the total views for the specified startup
  const { views: totalViews } = await client
    .withConfig({ useCdn: false }) // Disabling CDN to ensure fresh data
    .fetch(STARTUP_VIEWS_QUERY, { id })

  // Incrementing the view count in the database after the component is rendered
  after(async () => await writeCLient.patch(id) // Patching the document with the new view count
    .set({ views: totalViews + 1 }) // Setting the views to the current count + 1
    .commit()
  )

  return (
    <div className='view-container'> {/* Container for the view component */}
      <div className='absolute -top-2 -right-2'> {/* Positioning the Ping component */}
        <Ping /> {/* Rendering the Ping component */}
      </div>
      <p className='view-text'> {/* Text displaying the total views */}
        <span className='font-black'>Views: {totalViews} </span> {/* Displaying the views count */}
      </p>
    </div>
  )
}

export default View // Exporting the View component for use in other parts of the application
