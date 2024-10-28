import SearchForm from "@/Components/SearchForm";
import Image from "next/image";


export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {

    const query=(await searchParams).query


  return (
    <>
    <section className="pink_container">
      <h1 className="heading">Pitch Your startup, <br /> connect with entrepreneurs</h1>

      <p className="sub-heading !max-w-3xl">
        Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Cometitions. 
      </p>
      <SearchForm query={query}/>
      
    </section>

    
    
    </>
  );
}
