import type { AddEthereumChainParameter } from '@web3-react/types'

export const ConnectChainID: number =1030 // 71 //1030;

// export enum ChainIdETH {
//     Mainnet = 1,
//     Arbitrum_One = 42161,
//     Arbitrum_Goerli = 421613,
//     OKExChain_Mainnet = 66
// }

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
}
 
const CFX: AddEthereumChainParameter['nativeCurrency'] = {
  name: 'CFX',
  symbol: 'CFX',
  decimals: 18,
}

export interface BasicChainInformation {
  urls: string[]
  name: string,  
  blockExplorerUrls:string[]|undefined
}

export interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter['nativeCurrency']
  blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
  iconUrls:AddEthereumChainParameter["iconUrls"]
}

function isExtendedChainInformation(
  chainInformation: ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  
  return !!chainInformation.nativeCurrency
}


export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId]
  if (isExtendedChainInformation(chainInformation)) {
      return {
          chainId,
          chainName: chainInformation.name,
          nativeCurrency: chainInformation.nativeCurrency,
          rpcUrls: chainInformation.urls,
          blockExplorerUrls: chainInformation.blockExplorerUrls,
      }
  } else {
      return chainId
  }
}

const getInfuraUrlFor = (network: string) =>
  process.env.infuraKey ? `https://${network}.infura.io/v3/${process.env.infuraKey}` : undefined
const getAlchemyUrlFor = (network: string) =>
  process.env.alchemyKey ? `https://${network}.alchemyapi.io/v2/${process.env.alchemyKey}` : undefined

  export type ChainConfig = { [chainId: number]: ExtendedChainInformation }

export const MAINNET_CHAINS: ChainConfig = {
  1: {
    urls: [getInfuraUrlFor('mainnet') as string, getAlchemyUrlFor('eth-mainnet') as string, 'https://cloudflare-eth.com'].filter(Boolean),
    name: 'Mainnet',
    blockExplorerUrls: ['https://etherscan.io'],
    iconUrls:['/icons/networks/ethereum.svg']
  }, 
  1030: {
    urls: ['https://evm.confluxrpc.com'],
    name: 'Conflux eSpace',
    nativeCurrency: CFX,
    blockExplorerUrls: ['https://evm.confluxscan.net'],
    iconUrls:['/icons/networks/conflux.png']
  },
}

export const TESTNET_CHAINS: ChainConfig = {
  5: {
    urls: [getInfuraUrlFor('goerli') as string].filter(Boolean),
    name: 'Görli',
    blockExplorerUrls: ['https://goerli.etherscan.io'],
    iconUrls:['/icons/networks/ethereum.svg']
  }, 
  71: {
    urls: ['https://evmtestnet.confluxrpc.com'],
    name: 'Conflux eSpace Testnet',
    nativeCurrency: CFX,
    blockExplorerUrls: ['https://evmtestnet.confluxscan.net'],
    iconUrls:['/icons/networks/conflux.png']
  },
}

export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
}

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
  (accumulator, chainId) => {
    const validURLs: string[] = CHAINS[Number(chainId)].urls

    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs
    }

    return accumulator
  },
  {}
)

export type ERC20TokenType = {
  address: string;
  symbol: string;
  decimals: number;
  image?: string;
  aToken?: boolean;
};