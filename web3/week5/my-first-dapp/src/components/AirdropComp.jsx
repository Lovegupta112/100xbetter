import { useState } from "react";
import { useWallet,useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import ShowBalance from "./ShowBalance";

const AirdropComp=()=>{

    const [inputVal,setInputVal]=useState(0);
    const [accountInfo,setAccountInfo]=useState(JSON.parse(localStorage.getItem('accountInfo')) || {});
    const wallet=useWallet();
    const {connection}=useConnection();
    


    const airdropSol=async()=>{
     try{
        console.log(wallet);
        console.log('connection: ',connection);
      const res= await  connection.requestAirdrop(wallet.publicKey,inputVal*LAMPORTS_PER_SOL);
      const res1=await connection.getAccountInfo(wallet.publicKey,"confirmed");
      setAccountInfo(res1);
      localStorage.setItem('accountInfo',JSON.stringify(res1));
      console.log('res: ',res," res1: ",res1);
     }
     catch(error){
        console.log('Error: ',error);
     }
    }

    return (
        <>
         <input  type="number" value={inputVal} onChange={(e)=>setInputVal(e.target.value)}/>
          <button onClick={airdropSol}>Airdrop</button>
          <ShowBalance  accountInfo={accountInfo}/>
        </>
    );
}

export default AirdropComp;