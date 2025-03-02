// import styles from "./page.module.css";
'use client';
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

 const roomInputRef=useRef<HTMLInputElement>();
 const router=useRouter();


 const joinRoom=()=>{
  const value=roomInputRef?.current?.value;
   if(!value){
    alert('please enter room name !');
    return ;
   }
   router.push(`/room/${value}`);
 }

  return (
    <div
      style={{
        backgroundColor: "",
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "purple",
          height: "30%",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent:'space-between',
          padding:'2rem 0.5rem'
        }}
      >
        <h1 style={{ width: "fit-content", margin: "0 auto" }}>Chat App</h1>
        <div  style={{
          display: "flex",
          gap:'1rem'
        }}>
          <Input type="text" placeholder="Enter your room name here"  ref={roomInputRef}/>
          <Button size="medium" onClick={joinRoom}>Join Room</Button>
        </div>
      </div>
    </div>
  );
}
