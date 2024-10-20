import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const UserList = () => {
  // const [users,setUsers]=useState([]);

  // basic fetching
      // const getUsers=async()=>{
      //     const resp= await fetch('https://jsonplaceholder.typicode.com/users/');
      //     const data=await resp.json();
      //     setUsers(Array.isArray(data)?data:[data]);
      // }

  //   useEffect(() => {
  //      getUsers();
  //   }, []);

  //   console.log('users..',users);

  // using useFetch -----

  const [selectedUserId, setSelectedUserId] = useState(1);
  const {
    loading,
    data: users,
    error,
  } = useFetch(`https://jsonplaceholder.typicode.com/users/${selectedUserId}`,5);

  console.log("users..", users);

  return (
    <>
      <input
        type="number"
        min={1}
        max={10}
        onChange={(e) => setSelectedUserId(e.target.value)}
        value={selectedUserId}
      />
      {loading ? (
        <h5>Loading...</h5>
      ) : error ? (
        <>{error}</>
      ) : (
        users?.map((user) => <h2 key={user.email}>{user.username}</h2>)
      )}
    </>
  );
};

export default UserList;
