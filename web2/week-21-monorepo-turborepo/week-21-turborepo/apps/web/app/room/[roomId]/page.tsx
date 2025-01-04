// import styles from "./page.module.css";
'use client';
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import { useRef } from "react";

export default function RoomChat() {

 
    const chatRefInput=useRef<HTMLInputElement>();

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
          height: "80%",
          width: "70%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ width: "fit-content", margin: "0 auto" }}>Chat App</h1>
         <div style={{flexGrow:1,backgroundColor: "royalblue",}}>
          hll
         </div>
        <div  style={{
          display: "flex",
        }}>
          <Input type="text" placeholder="Enter your message here" ref={chatRefInput} />
          <Button size="medium" onClick={()=>{
            
          }}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
