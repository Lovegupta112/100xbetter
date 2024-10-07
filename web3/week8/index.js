const {Keypair,Connection,PublicKey,LAMPORTS_PER_SOL} =require('@solana/web3.js');

const rpcDevUrl='https://api.devnet.solana.com/';
const rpcLocalnetUrl='http://localhost:8899';

// show balance ------
const showBalance=async(publicKey)=>{

    const conn=new Connection(rpcLocalnetUrl,'confirmed');
    const accountInfo=await conn.getAccountInfo(publicKey);
    
    console.log('accountInfo: ',accountInfo," sol: ",accountInfo.lamports/LAMPORTS_PER_SOL);
}

// showBalance(new PublicKey('ECAggoZgrvmDybc2NkH7KphLLDc3D5opF6RDsXUuWyxo'));


// airdrop some sol -------

const airdropSol=async (publicKey,amount)=>{

    const conn=new Connection(rpcLocalnetUrl,'confirmed');
    const balanceInfo=await conn.getBalance(publicKey);
     
     console.log('balance Info: ',balanceInfo/LAMPORTS_PER_SOL);

     const signature=await conn.requestAirdrop(publicKey,amount*LAMPORTS_PER_SOL);
     console.log({signature});
    //   const res=await conn.confirmTransaction(signature);
    const latestBlockHash=await conn.getLatestBlockhash();
    console.log({latestBlockHash});

      const res=await conn.confirmTransaction({
        blockhash:latestBlockHash.blockhash,
        lastValidBlockHeight:latestBlockHash.lastValidBlockHeight,
        signature
      });

      console.log('res: ',res);
}


airdropSol(new PublicKey('ECAggoZgrvmDybc2NkH7KphLLDc3D5opF6RDsXUuWyxo'),3);