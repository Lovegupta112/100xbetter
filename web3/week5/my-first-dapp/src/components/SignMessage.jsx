import {useWallet} from '@solana/wallet-adapter-react';
import { useState } from 'react';
import {ed25519} from '@noble/curves/ed25519';

const SignMessage=()=>{

     const wallet=useWallet();

     const [input,setInput]=useState('');

     console.log('wallet: ',wallet);
     

    async function signMessage(){
       try{
          const encodedMessage=new TextEncoder().encode(input);
          console.log("encodedMessage: ",encodedMessage, "input: ",input);
         const signature=await wallet.signMessage(encodedMessage);
         console.log('signature..',signature);
         
         const res=ed25519.verify(signature,encodedMessage,wallet.publicKey.toBytes());
         console.log('res..',res);
         if(!res){
             throw new Error('Invalid message signature !');
         }
       }
       catch(error){
         console.log('Error: ',error);
       }
     }

    return(
        <>
       <h1>Sign Message</h1>
       <input  value={input} onChange={(e)=>setInput(e.target.value)}/>
       <button onClick={signMessage}>Sign Message</button>
        </>
    );
}


export default SignMessage;