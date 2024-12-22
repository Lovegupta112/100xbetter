
export default function page({params}:any){

    const postId=params.postId;

    return <>
      <h1>hi there , {postId}</h1>
    </>
}