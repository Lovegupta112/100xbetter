import { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const AirdropComp = ({setBalanceUpdated}) => {
  const [inputVal, setInputVal] = useState(0);
  const wallet = useWallet();
  const { connection } = useConnection();

  const airdropSol = async () => {
    try {
      console.log(wallet);
      console.log("connection: ", connection);
      const res = await connection.requestAirdrop(
        wallet.publicKey,
        inputVal * LAMPORTS_PER_SOL
      );
      console.log("res: ", res);
      setBalanceUpdated(true);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <input
        type="number"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button onClick={airdropSol}>Airdrop</button>
    </>
  );
};

export default AirdropComp;
