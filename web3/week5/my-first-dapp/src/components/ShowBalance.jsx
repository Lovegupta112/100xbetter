import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useWallet ,useConnection } from "@solana/wallet-adapter-react"; 

const ShowBalance=({balanceUpdated})=>{

    const [balance,setBalance]=useState(0);
    const wallet=useWallet();
    const {connection}=useConnection();
  console.log('9.',wallet,connection);
   
   async function getBalance(){
       try{
            const res=await connection.getBalance(wallet.publicKey);
             console.log('res..',res);
             const sol=res ? res/LAMPORTS_PER_SOL :0;
             setBalance(sol);
       }
       catch(error){
        console.log('error: ',error);
       }
    }

useEffect(()=>{
getBalance();

},[balanceUpdated,wallet]);


    return (
        <>
         <h1>Balance: {balance} sol </h1>
        </>
    );
}

export default ShowBalance;