import { useWallet,useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useState } from "react";

const TransferSol=()=>{

const {connection}=useConnection();
const wallet=useWallet();
const [receiverPubkey,setReceiverPubkey]=useState('');
const [amount,setAmount]=useState(0);

const sendSol=async()=>{
 try{
  console.log({receiverPubkey});
   const transaction=new Transaction();
   const toPubkey=new PublicKey(receiverPubkey);
   const instruction=SystemProgram.transfer({
    fromPubkey:wallet.publicKey,
    toPubkey,
    lamports:amount*LAMPORTS_PER_SOL
   })
   transaction.add(instruction);
   
   const res=wallet.sendTransaction(transaction,connection);

   console.log('confirm transaction...',res)
 }
 catch(error){
    console.log('Error: ',error);
 }
}

console.log({receiverPubkey});

    return (
        <>
        <input type="text" value={receiverPubkey} onChange={(e)=>setReceiverPubkey(e.target.value)} />
        <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} />
        <button onClick={sendSol}>Send Sol</button>
        </>
    );
}

export default TransferSol;