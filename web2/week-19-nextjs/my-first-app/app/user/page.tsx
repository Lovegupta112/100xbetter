import axios from "axios";


async function getUserDetails(){

    const res=await axios.get('https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details');
    const data=res.data;
    // setTimeout(()=>{
    //     console.log('loading....34.');
    // },10000)
     return data;
}

export default async function User(){
  
 const data=await getUserDetails();
    console.log('data',data);

    return (
        <div className="p-1">
         <span>Name:</span> {data.name}
         <span>Email:</span> {data.email}
        </div>
    )
}

