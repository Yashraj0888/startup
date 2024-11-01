import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard,{StartupTypeCard} from './StartupCard'

const UserStartups = async ({ id }: { id: string }) => {
  // Fetching startups from Sanity using the author ID
  const startup = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id })

  return (
    <>
      {/* Conditional rendering based on the length of the startup array */}
      {startup.length > 0 ? (
        // Mapping through the startups to render a StartupCard for each
        startup.map((startup: StartupTypeCard) => (
          <StartupCard post={startup} key={startup._id} /> // Rendering StartupCard with each startup's data
        ))
      ) : (
        // Displaying a message when there are no startups
        <p className='no-result'>No posts Yet</p>
      )}
    </>
  )
}

export default UserStartups // Exporting the UserStartups component for use in other parts of the application
