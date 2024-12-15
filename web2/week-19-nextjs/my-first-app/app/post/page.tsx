// "use client";
// import axios from "axios";
// import { useEffect,useState } from "react"


// export default function Post(){
    
//     const [posts,setPosts]=useState([]);

//     useEffect(()=>{
    
//        (async()=>{
    //            const res=await axios.get('https://jsonplaceholder.typicode.com/posts');
    //            setPosts(res.data);
    //        })()
    
    //     },[]);
    
    // return (
        //     <>
    //      {posts?.map((post:{userId:number;id:number;title:string;})=>(
        //         <li key={`${post.userId}-${post.id}`}>{post?.title}</li>
        //      ))}
        //     </>
        // )
        // }
        
import axios from "axios";

export default async function Post(){


      const res=await axios.get('https://jsonplaceholder.typicode.com/posts');
      const posts=res.data;
  
    return (
        <>
         {posts?.map((post:{userId:number;id:number;title:string;})=>(
            <li key={`${post.userId}${post.id}`}>{post?.title}</li>
         ))}
        </>
    )
}