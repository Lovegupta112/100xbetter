import {ConnectionProvider,WalletProvider} from '@solana/wallet-adapter-react';
import {WalletMultiButton,WalletDisconnectButton,WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import '@solana/wallet-adapter-react-ui/styles.css';
import AirdropComp from './components/AirdropComp';
import TransferSol from './components/TransferSol';

function App() {

  // const endpoint='https://api.devnet.solana.com'
  const endpoint='https://solana-devnet.g.alchemy.com/v2/i7z_ek2AVttiON2GwnXyl_MbLawE2-ML'

  return (
    <>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
           <div>
           <WalletMultiButton />
           <WalletDisconnectButton />
           </div>
            {/* Your app's components go here, nested within the context providers. */}
            <AirdropComp />
            <TransferSol />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
