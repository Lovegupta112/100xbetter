import {ConnectionProvider,WalletProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider,WalletMultiButton} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import TokenLaunchPad from './components/TokenLaunchPad';

function App() {

  // const rpcUrl=clusterApiUrl('devnet');
 const rpcUrl='https://api.devnet.solana.com';

  return (
    <ConnectionProvider endpoint={rpcUrl}>
      <WalletProvider wallets={[]} autoConnect>
           <WalletModalProvider>
           <div style={{
            position:'absolute',
            top:'5px',
            right:'5px'
           }}>
           <WalletMultiButton/>
           </div>
            <TokenLaunchPad/>
           </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
export default App;
