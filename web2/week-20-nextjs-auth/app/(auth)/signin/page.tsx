'use client';
import axios from "axios";
import { useRef } from "react";

export default function (){

    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);

    const handleSubmit=async ()=>{
      try{

        const emailInputElm=emailRef.current;
        const passwordInputElm=passwordRef.current;
        let data={
            email:'',
            password:''
        }
         if(emailInputElm && passwordInputElm){
            
          data={
            email:emailInputElm.value,
            password:passwordInputElm.value,
        }
         }

       
        console.log('19..',data);
         const res=await axios.post('/api/v1/auth/signin',
            data);
          const token=res.data.token;
        localStorage.setItem('token',token);
         console.log('res..',res);
      }
      catch(error){
         console.log('error: ',error);
      }
    }

    
    return (
        <div className="flex flex-col border mx-auto w-1/2 border-blue-600 p-3 items-center content-center">
          Email: <input ref={emailRef} type="text" placeholder="enter email" className="text-black"/> <br />
         Password: <input type="password" ref={passwordRef} placeholder="enter password" className="text-black"/><br />
         <button className="border bg-purple-500 px-4 py-2 active:bg-purple-900" onClick={handleSubmit}>Submit</button>
        </div>
    )
}