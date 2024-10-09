import { WalletModal } from '@/src/components/WalletConnection/WalletModal'
import '@/styles/globals.css?v=2'
import type { AppProps } from 'next/app'
import { AppGlobalStyles } from '@/src/utils/AppGlobalStyles'
import { SwitchNetworkModal } from '@/src/dialog/SwitchNetworkModal'
import { StakeModal } from '@/src/components/transactions/Stake/StakeModal'
import { DataContextProvider, useDataContext } from '@/src/hooks/useDataContext'

import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
// import type { CoinbaseWallet } from '@web3-react/coinbase-wallet'
// import type { MetaMask } from '@web3-react/metamask'
// import { WalletConnect } from '@web3-react/walletconnect-v2'
// import { hooks as coinbaseWalletHooks, coinbaseWallet } from '../src/connectors/coinbaseWallet'
// import { hooks as metaMaskHooks, metaMask } from '../src/connectors/metaMask'
// import { hooks as walletConnectV2Hooks, walletConnectV2 } from '../src/connectors/walletConnectV2'
import { Web3ContextProvider } from '@/src/hooks/Web3Provider'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClaimModal } from '@/src/components/transactions/Stake/ClaimModal'
import { UnStakeModal } from '@/src/components/transactions/Stake/UnStakeModal'
import { connections } from '@/src/connection'
import { Connector } from '@web3-react/types' 
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import enTranslations from '@/src/locales/en.json';
import zhTranslations from '@/src/locales/zh.json';

declare global {
  interface Window {
    // ethereum: any;
    metamask: any;
    fluent: any;
    okxwallet: any;
    conflux: any;
  }
}

// const connectors: [MetaMask | WalletConnect | CoinbaseWallet, Web3ReactHooks][] = [
//   [metaMask, metaMaskHooks],
//   [walletConnectV2, walletConnectV2Hooks],
//   [coinbaseWallet, coinbaseWalletHooks],
// ]



export default function App({ Component, pageProps }: AppProps) {
  const connectors = connections.map<[Connector, Web3ReactHooks]>(({ hooks, connector }) => [connector, hooks])

  // useEffect(() => {
  //   FluentWallet()
  // }, [])

  // async function FluentWallet() {
  //   const provider = await detectProvider({
  //     injectFlag: "conflux",
  //     defaultWalletFlag: "isFluent",
  //   }) 
  //   await (provider as any).on('accountsChanged', function (accounts: any) {
  //     console.log({
  //       eth_accounts: accounts
  //     })
  //   }) 
  // }

  // Configure i18next
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: enTranslations },
        zh: { translation: zhTranslations },
      },
      lng: 'en', // Default language
      interpolation: {
        escapeValue: false, // React already escapes by default
      },
    });

  return (
    <Web3ReactProvider connectors={connectors}>
      <Web3ContextProvider>
        <AppGlobalStyles>
          {/* <ConnectEagerly /> */}
          <DataContextProvider>
            <>
              <Component {...pageProps} />
              <WalletModal />
              <StakeModal />
              <UnStakeModal />
              <ClaimModal />
            </>
          </DataContextProvider>
          {/* <DepositModal/>
        <WithDrawModal/> */}
          <SwitchNetworkModal />

          <ToastContainer />
        </AppGlobalStyles>
      </Web3ContextProvider>
    </Web3ReactProvider>
  )

}
