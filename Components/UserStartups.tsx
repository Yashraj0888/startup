import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard,{StartupTypeCard} from './StartupCard'

const UserStartups = async ({id}:{id:string}) => {
  const startup = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id})
  return (
    <>
   { startup.length>0? startup.map((startup:StartupTypeCard)=>(
      <StartupCard post={startup} key={startup._id}/>
    ) ):(
      <p className='no-result'>No posts Yet</p>
    )}
    </>
  )
}

export default UserStartups
