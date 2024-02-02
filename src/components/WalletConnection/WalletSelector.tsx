import { Box, Button } from '@mui/material';
import { TxModalTitle } from '../FlowCommons/TxModalTitle';
import { Warning } from '../FlowCommons/Warning';
// import { walletConnectV2 as _walletConnectV2 } from '@/src/connectors/walletConnectV2';
// import { coinbaseWallet as _coinbaseWallet } from '@/src/connectors/coinbaseWallet';
// import { metaMask as _metaMask } from '@/src/connectors/metaMask';
import { WalletType } from '@/src/libs/networksConfig';
import { useWeb3Store } from '@/src/store/web3Slice';
import { Connector } from '@web3-react/types';
import { ConnectChainID } from '@/src/libs/chains';
import { useWeb3React } from "@web3-react/core";
import { useOrderedConnections } from './useOrderedConnections';
import { Connection } from '@/src/connection/types';
import { useTranslation } from 'react-i18next';

export type WalletRowProps = {
  walletName: string;
  walletType: WalletType;
  connect?: Connection;
  url: string;
}

const getWalletIcon = (walletType: WalletType) => {
  switch (walletType) {
    case WalletType.INJECTED:
      return (
        <img
          src={`/icons/wallets/metamask.svg`}
          width="24px"
          height="24px"
          alt={`browser wallet icon`}
        />
      );
    // case WalletType.WALLET_CONNECT:
    //   return (
    //     <img
    //       src={`/icons/wallets/walletConnect.svg`}
    //       width="24px"
    //       height="24px"
    //       alt={`browser wallet icon`}
    //     />
    //   );
    // case WalletType.WALLET_COINBASE:
    //   return (
    //     <img
    //       src={`/icons/wallets/coinbase.svg`}
    //       width="24px"
    //       height="24px"
    //       alt={`browser wallet icon`}
    //     />
    //   );
    // case WalletType.TORUS:
    //   return (
    //     <img
    //       src={`/icons/wallets/torus.svg`}
    //       width="24px"
    //       height="24px"
    //       alt={`browser wallet icon`}
    //     />
    //   );
    // case WalletType.FRAME:
    //   return (
    //     <img
    //       src={`/icons/wallets/frame.svg`}
    //       width="24px"
    //       height="24px"
    //       alt={`browser wallet icon`}
    //     />
    //   );
    case WalletType.OKX:
      return (
        <img
          src={`/icons/wallets/okx.png`}
          width="24px"
          height="24px"
          alt={`browser wallet icon`}
          style={{ 'borderRadius': '6px' }}
        />
      );
    case WalletType.FLUENT:
      return (
        <img
          src={`/icons/wallets/fluent.svg`}
          width="24px"
          height="24px"
          alt={`browser wallet icon`}
        />
      );
    default:
      return null;
  }
};


const WalletRow = ({ walletName, walletType, connect, url }: WalletRowProps) => {

  const { chainId } = useWeb3React()
  // const { connectWallet } = useWeb3Store(state => ({ connectWallet: state.connectWallet }));
  const { connectWallet, fluentConnectWallet } = useWeb3Store();

  const ethConnectWalletClick = async (connect?: Connection) => {

    if (walletType == WalletType.FLUENT) {
      const provider = window.conflux


      if (provider && provider.isFluent) {
        fluentConnectWallet() 
      } else {
        window.open(url, '_blank')
      }

    } else {
      if (!connect) {
        window.open(url, '_blank')
      } else {
        connectWallet(connect!, function () {
        }, chainId)
      }
    }
  };

  return (
    <Button
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        mb: '8px',
      }}
      size="large"
      onClick={() => ethConnectWalletClick(connect)}
      endIcon={getWalletIcon(walletType)}
    >
      {walletName}
    </Button>
  );
};

export enum ErrorType {
  UNSUPORTED_CHAIN,
  USER_REJECTED_REQUEST,
  UNDETERMINED_ERROR,
  NO_WALLET_DETECTED,
  NOT_ENOUGH_BALANCE
}

export enum CollateralType {
  ENABLED,
  DISABLED,
  UNAVAILABLE,
}


export const WalletSelector = () => {
  const { orderedConnections } = useOrderedConnections()

  // orderedConnections.map((cnn) => {
  //   const item = cnn.getProviderInfo()
  //   console.log({
  //     name: 'item---------',
  //     item
  //   })
  // })
  // console.log({
  //   orderedConnections
  // })

  const { t} = useTranslation();
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TxModalTitle title={t("Connect a wallet")} />
      {/* {error && <Warning severity="error">{handleBlocking()}</Warning>} */}
      <WalletRow
        key="MetaMask_wallet"
        walletName="MetaMask"
        walletType={WalletType.INJECTED}
        // connector={_metaMask}
        connect={orderedConnections.find((g) => g.getProviderInfo().name == 'MetaMask')}
        url="https://metamask.io/"
      />
      {/* <WalletRow
        key="walletlink_wallet"
        walletName="Coinbase Wallet"
        walletType={WalletType.WALLET_COINBASE}
        // connector={_coinbaseWallet}
      /> */}

      <WalletRow
        key="OKX_wallet"
        walletName="OKX Wallet"
        walletType={WalletType.OKX}
        connect={orderedConnections.find((g) => g.getProviderInfo().name == 'OKX Wallet')}
        url="https://www.okx.com/"
      />

      <WalletRow
        key="walletconnect_wallet"
        walletName="Fluent"
        walletType={WalletType.FLUENT}
        connect={orderedConnections.find((g) => g.getProviderInfo().name == 'Fluent')}
        url="https://fluentwallet.com/"
      />

      {/* <WalletRow
        key="walletlink_wallet"
        walletName="Coinbase Wallet"
        walletType={WalletType.WALLET_COINBASE}
        connector={_coinbaseWallet}
      /> */}
      {/* <WalletRow key="torus_wallet"
        walletName="Torus"
        walletType={WalletType.TORUS}
        connector={coinbaseWallet}
      />
      <WalletRow key="frame_wallet"
        walletName="Frame"
        walletType={WalletType.FRAME}
      /> */}


      {/* {validAddressError && (
        <Typography variant="helperText" color="error.main">
          <Trans>Please enter a valid wallet address.</Trans>
        </Typography>
      )}
      <Typography variant="description" sx={{ mt: '22px', mb: '30px', alignSelf: 'center' }}>
        <Trans>
          Need help connecting a wallet?{' '}
          <Link href="https://docs.aave.com/faq/troubleshooting" target="_blank" rel="noopener">
            Read our FAQ
          </Link>
        </Trans>
      </Typography>
      <Typography variant="helperText">
        <Trans>
          Wallets are provided by External Providers and by selecting you agree to Terms of those
          Providers. Your access to the wallet might be reliant on the External Provider being
          operational.
        </Trans>
      </Typography> */}
    </Box>
  );
};
