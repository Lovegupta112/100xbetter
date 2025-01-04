import {
  createInitializeMint2Instruction,
  createMint,
  getMinimumBalanceForRentExemptMint,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  mintTo
} from "@solana/spl-token";
import { useState } from "react";
import { useWallet, useConnection} from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction,PublicKey } from "@solana/web3.js";

const TokenLaunchPad = () => {
  const [tokenInfo, setTokenInfo] = useState({
    name: "",
    symbol: "",
    url: "",
    supply: "",
  });

  const wallet = useWallet();
  const { connection } = useConnection();

  const createToken = async () => {
    console.log("tokenInfo: ", tokenInfo, wallet, connection);
    // const mintAddress=await createMint(connection,wallet.publicKey,wallet.publicKey,null,TOKEN_PROGRAM_ID);
    // console.log({mintAddress});
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const userPublicKey = wallet.publicKey;
    const keypair = Keypair.generate();

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: userPublicKey,
        newAccountPubkey: keypair.publicKey,
        lamports,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
      }),

      createInitializeMint2Instruction(
        keypair.publicKey,
        9,
        userPublicKey,
        userPublicKey,
        TOKEN_PROGRAM_ID
      )
    );
    const lateshBlock = await connection.getLatestBlockhash();
    transaction.recentBlockhash = lateshBlock.blockhash;
    transaction.feePayer = wallet.publicKey;
    transaction.partialSign(keypair);
    const res = await wallet.sendTransaction(transaction, connection);
    console.log("Res: ", res);



    const [associatedTokenAddress,bump]=PublicKey.findProgramAddressSync([
      keypair.publicKey.toBuffer(),
      userPublicKey.toBuffer(),
      TOKEN_PROGRAM_ID.toBuffer()
    ],
    ASSOCIATED_TOKEN_PROGRAM_ID
  )

   console.log("associatedTokenAddress: ",associatedTokenAddress);


   
  };

  const handleTokenInfo = (e) => {
    const { name, value } = e.target;

    if (name == "name") {
      setTokenInfo({ ...tokenInfo, name: value });
    } else if (name == "symbol") {
      setTokenInfo({ ...tokenInfo, symbol: value });
    } else if (name == "url") {
      setTokenInfo({ ...tokenInfo, url: value });
    } else if (name == "supply") {
      setTokenInfo({ ...tokenInfo, supply: value });
    }
  };

  return (
    <div className="launchPadDiv">
      <h1>Solana Launchpad</h1>
      <div
        style={{
          // border:'1px solid green',
          display: "flex",
          flexDirection: "column",
        }}
        className="tokenInputDiv"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={tokenInfo.name}
          onChange={handleTokenInfo}
        />
        <br />
        <input
          type="text"
          name="symbol"
          placeholder="Symbol"
          value={tokenInfo.symbol}
          onChange={handleTokenInfo}
        />
        <br />
        <input
          type="text"
          name="url"
          placeholder="Image Url"
          value={tokenInfo.url}
          onChange={handleTokenInfo}
        />
        <br />
        <input
          type="text"
          name="supply"
          placeholder="Initial Supply"
          value={tokenInfo.supply}
          onChange={handleTokenInfo}
        />
        <br />
        <button onClick={createToken}>Create a Token</button>
      </div>
    </div>
  );
};

export default TokenLaunchPad;
