const {
  createMint,
  createAssociatedTokenAccount,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  mintTo,
  getOrCreateAssociatedTokenAccount,
} = require("@solana/spl-token");
const {
  Connection,
  Keypair,
  clusterApiUrl,
  TOKEN_PROGRAM_ID,
} = require("@solana/web3.js");

// const rpcUrl = "https://api.devnet.solana.com";

const payer = Keypair.fromSecretKey(
  Uint8Array.from([
    15, 208, 11, 193, 15, 27, 89, 150, 216, 65, 223, 238, 192, 195, 239, 204,
    242, 42, 170, 91, 138, 231, 30, 176, 109, 159, 78, 218, 179, 162, 61, 240,
    196, 4, 68, 218, 43, 195, 62, 184, 103, 38, 34, 34, 224, 252, 245, 12, 230,
    202, 175, 4, 192, 69, 228, 67, 114, 123, 85, 185, 84, 247, 234, 172,
  ])
);

const connection = new Connection(clusterApiUrl("devnet"));

const createMintAddress = async () => {
  try {
    // const conn = new Connection(rpcUrl, "confirmed");

    // const res = await createMint(conn, payer, payer, null, 6, TOKEN_PROGRAM_ID);
    const mint = await createMint(
      connection,
      payer,
      payer.publicKey,
      null,
      6,
      TOKEN_PROGRAM_ID
    );
    console.log({ mintAddress: mint.toBase58() });
    return mint;
  } catch (error) {
    console.log("error: ", error);
  }
};

const createToken = async (mintAddress) => {
  try {
    //  const associatedTokenAddress= await createAssociatedTokenAccount(
    //     connection,
    //     payer,
    //     mintAddress,
    //     payer.publicKey,
    //     ASSOCIATED_TOKEN_PROGRAM_ID
    //       );
    const associatedTokenAddress = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mintAddress,
      payer.publicKey
    );
    console.log(
      "associatedTokenAddress..",
      associatedTokenAddress.toBase58(),
      associatedTokenAddress.address
    );

    const res1 = await mintTo(
      connection,
      payer,
      mintAddress,
      associatedTokenAddress,
      payer,
      100
    );
    console.log("res1...", res1);
  } catch (error) {
    console.log("Error: ", error);
  }
};


const main = async () => {
  const mintAddress = await createMintAddress();
  await createToken(mintAddress);
};

main();
