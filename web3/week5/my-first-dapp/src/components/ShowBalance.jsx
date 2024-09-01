import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

const ShowBalance=({accountInfo})=>{

    return (
        <>
         <h1>Balance: {accountInfo?.lamports/LAMPORTS_PER_SOL || 0}</h1>
        </>
    );
}

export default ShowBalance;