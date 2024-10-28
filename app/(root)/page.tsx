import SearchForm from "@/Components/SearchForm";
import StartupCard from "@/Components/StartupCard";
import Image from "next/image";


export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {

    const query=(await searchParams).query
    const posts =[{ 
      _createdAt:new Date(),
      views:55,
      likes:10,
      author:{_id:1,name:'Yash'},
      _id:1,
      image:'https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod facilisis nulla, sed suscipit est mattis at.',
      category:'Robots',
      title:'We Robots'
    }]


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
          posts.map((post, index) =>
            <StartupCard key={post._id} post={post} />
          )
        ):
        <p className="no-result">No results found with {query}.</p>}
      </ul>
    </section>

    
    
    </>
  );
}
