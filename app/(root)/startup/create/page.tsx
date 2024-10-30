import { auth } from '@/auth'
import StartupForm from '@/Components/StartupForm'

import { redirect } from 'next/navigation'
import React from 'react'

const page =async  () => {

    const session = await auth()
    if (!session) {
    <p className='pink_container'>You are not signed in.</p>
        redirect(`/`);
        
       
    }
  return (
    <>
            <section className="pink_container !min-h-[230px]">
                <h1 className='heading'>Submit your startup</h1>
            </section>
            <StartupForm/>
    </>
  )
}

export default page
