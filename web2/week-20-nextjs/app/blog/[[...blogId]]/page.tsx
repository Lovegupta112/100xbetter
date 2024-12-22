
// [...blog] for catching all routes but it won't catch localhost:3000/blog
// [[...blog]] for catching all routes including localhost:3000/blog

export default function ({params}:{
    params:{
        blogId:string[];
    }
}){

     const blogId=params.blogId;
     console.log('blogId...',blogId,typeof blogId);

    return <>
     <h3>hello this is blog page</h3>
     {blogId.length>0 && blogId.join(' ')}
    </>
}

