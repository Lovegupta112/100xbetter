const {PublicKey}=require('@solana/web3.js');
const {TOKEN_PROGRAM_ID,ASSOCIATED_TOKEN_PROGRAM_ID}=require('@solana/spl-token');

const userPublicKey=new PublicKey('ECAggoZgrvmDybc2NkH7KphLLDc3D5opF6RDsXUuWyxo');
const tokenMintAddress=new PublicKey('HnT2VHhxhiwJHX68z3SS9mfhZVqzAf3zr5TGe65MTpB2');
// function to find assocaited token address (program derived address) -----
const getAssociatedTokenAddress=(userPublicKey,tokenMintAddress)=>{
  
    const res=PublicKey.findProgramAddressSync(
        [
            userPublicKey.toBuffer(),
            tokenMintAddress.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer()
        ],

        ASSOCIATED_TOKEN_PROGRAM_ID
    )
    console.log('res..',res);
    return res;
  
}
const [associatedTokenAddress,bump]=getAssociatedTokenAddress(userPublicKey,tokenMintAddress);

console.log({associatedTokenAddress:associatedTokenAddress.toBase58(),bump});

const pda=PublicKey.createProgramAddressSync([
    userPublicKey.toBuffer(),
    tokenMintAddress.toBuffer(),
    TOKEN_PROGRAM_ID.toBuffer(),
    Buffer.from([bump])
],
ASSOCIATED_TOKEN_PROGRAM_ID
)

console.log({pda:pda.toBase58()})