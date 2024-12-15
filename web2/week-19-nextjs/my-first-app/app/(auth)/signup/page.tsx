"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Signup(){

    const [userInfo,setUserInfo]=useState({
        name:'',
        email:'',
        password:''
    });

    const router=useRouter();

    const handleChange=(event:ChangeEvent<HTMLInputElement>)=>{
        let name=event.target.name;
        let value=event.target.value;
        if(name==='fullname'){
            setUserInfo({...userInfo,name:value})
        }
        else if(name==='email'){
            setUserInfo({...userInfo,email:value});
        }
        else if(name==='password'){
            setUserInfo({...userInfo,password:value});
        }
    }
    const handleSignup=async()=>{
         const res=await axios.post('/api/v1/user',{
            name:userInfo.name,
            email:userInfo.email,
            password:userInfo.password
         });
         console.log('res..',res);
         if(res.status==200){
             router.push('/signin');
         }
    }

    return (
        <>
        <input type="text" name="fullname" className="text-black" placeholder="Enter your name"  onChange={handleChange}/> <br />
        <input type="text" name="email" className="text-black" placeholder="Enter your email" onChange={handleChange} /> <br />
        <input type="text" name="password" className="text-black" placeholder="Enter your password" onChange={handleChange} /> <br />
         <button onClick={handleSignup}>Sign Up</button>
        </>
    )
}


