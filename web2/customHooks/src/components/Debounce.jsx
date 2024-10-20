import {useState,useEffect} from 'react'
import useDebounce from '../../hooks/useDebounce';

const Debounce = () => {

    const [users,setUsers]=useState([]);

    const getUsers=async()=>{
        // const resp= await fetch('https://jsonplaceholder.typicode.com/users/');
        // const data=await resp.json();
        // setUsers(Array.isArray(data)?data:[data]);
    
    }

    useDebounce(getUsers,1000);


  return (
    <>
    <div>Debounce</div>
    <input
        type="number"
        min={1}
        max={10}
        onChange={(e) => setSelectedUserId(e.target.value)}
        value={selectedUserId}
      />
    {users?.map((user) => <h2 key={user.email}>{user.username}</h2>)}
    </>
  )
}

export default Debounce