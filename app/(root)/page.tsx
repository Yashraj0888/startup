import { auth } from "@/auth";
import SearchForm from "@/Components/SearchForm";
import StartupCard,{StartupTypeCard} from "@/Components/StartupCard";

import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { log } from "console";
import Image from "next/image";



export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {

    const query=(await searchParams).query

    const params={search:query || null};

    const session = await auth()

    console.log(session?.id)


    const {data:posts}=await sanityFetch({query:STARTUPS_QUERY,params})

   


  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Pitch Your startup, <br /> connect with entrepreneurs</h1>

      <p className="sub-heading !max-w-3xl">
        Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Cometitions. 
      </p>
      <SearchForm query={query}/>
      
    </section>

    <section className="section_container">
      <p className="text-30-semibold">
        {query?`Search results for ${query}`:'All Startups'}
      </p>
      <ul className="mt-7 card_grid">
        {posts?.length >0?  (
          posts.map((post:StartupTypeCard) =>
            <StartupCard key={post._id} post={post} />
          )
        ):
        <p className="no-result">No results found with {query}.</p>}
      </ul>
    </section>
    <SanityLive/>

    
    
    </>
  );
}
