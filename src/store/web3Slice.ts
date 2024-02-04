import { create, StateCreator } from "zustand";
import { getNetworkConfig, WalletType } from "../libs/networksConfig";
import {
    CHAINS,
    ConnectChainID,
    ERC20TokenType,
    getAddChainParameters,
} from "../libs/chains";
// import detectEthereumProvider from '@metamask/detect-provider';
// import detectProvider from "@fluent-wallet/detect-provider";
// import { ContractInterface, ethers } from "ethers";
// import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
// import { Contract } from "@ethersproject/contracts";
import { WalletConnect } from "@web3-react/walletconnect-v2";
// import { useWeb3React } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { Connection } from "../connection/types";
import { didUserReject } from "../connection/utils";
import { getConnection } from "../connection";
import detectProvider from "@fluent-wallet/detect-provider";

type ConnectorCallback = () => void;
type FluentModals = {
    account?: string;
    chainId?: number;
    provider?: any;
}

export interface Web3Slice {
    isWalletModalOpen: boolean;
    setWalletModalOpen: (open: boolean) => void;
    // connected: boolean;
    // chainId: number | undefined;
    // account: string | undefined;
    // // walletBalances?: {};
    // provider?: JsonRpcProvider;
    // connector?: Connector;
    // setConnector: (_connector: Connector) => void;
    connectWallet: (connection: Connection, onSuccess?: () => void, newChainId?: number) => Promise<void>;
    disconnectWallet: (connector: Connector) => Promise<void>;
    addERC20Token: (token: ERC20TokenType) => Promise<void>;
    switchNetwork: (connector: Connector, chainId: number) => Promise<void>;
    // switchNetwork: (newChainId: number) => Promise<void>;
    // getContract: (contractAddress: string, ABI: ContractInterface) => Contract
    fluentConnectWallet: () => Promise<void>;
    fluentWeb3Context?: FluentModals;

}

export const useWeb3Store = create<Web3Slice>((set, get) => ({
    isWalletModalOpen: false,
    setWalletModalOpen(open: boolean) {
        set({ isWalletModalOpen: open });
    },
    // setConnector(_connector) {
    //     set({
    //         connector: _connector
    //     });
    // },
    async connectWallet(connection, onSuccess, newChainId) {
        // if (connector instanceof WalletConnect) {
        //     await connector.activate(newChainId)
        // } else {
        //     await connector.activate(getAddChainParameters(newChainId!))
        // }

        // localStorage.setItem('sg_connected', '1');

        // if (callback) callback()
        // set({
        //     isWalletModalOpen: false,
        //     connector: connector
        // });

        try {

            const oAct = connection.overrideActivate?.(newChainId ?? ConnectChainID)
            if (oAct) {
                return
            }
            await connection.connector.activate()
            if (onSuccess) onSuccess()

            const { rdns, name } = connection.getProviderInfo()
            localStorage.setItem('app_connected', '1');
            localStorage.setItem('app_connect_wallet', name);
            localStorage.setItem('app_connect_rnds', rdns ?? '');
            localStorage.setItem('app_connect_type', connection.type);

            set({
                isWalletModalOpen: false,
            });

        } catch (error) {
            // Gracefully handles errors from the user rejecting a connection attempt
            if (didUserReject(connection, error)) {
                return
            }
            // TODO(WEB-1859): re-add special treatment for already-pending injected errors & move debug to after didUserReject() check 
            console.error(error)
        }
    },
    async disconnectWallet(connector) {

        // if (connector?.deactivate) {
        //     void connector.deactivate()
        // } else {
        //     void connector!.resetState()
        // }
        // localStorage.removeItem('sg_connected');
        const app_connect_wallet = localStorage.getItem('app_connect_wallet');
        if (app_connect_wallet == 'fluent') {
            localStorage.removeItem('app_connected');
            localStorage.removeItem('app_connect_wallet');
            set({
                fluentWeb3Context: undefined
            });
        } else {
            if (connector) {
                connector.deactivate?.()
                connector.resetState()
                localStorage.removeItem('app_connected');
                localStorage.removeItem('app_connect_wallet');
                localStorage.removeItem('app_connect_type');
            }
        }

    },
    async addERC20Token({ address, symbol, decimals, image }: ERC20TokenType) {
        const injectedProvider = (window as any).ethereum;
        if (window && injectedProvider) {
            if (
                address.toLowerCase() !==
                "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase()
            ) {
                await injectedProvider.request({
                    method: "wallet_watchAsset",
                    params: {
                        type: "ERC20",
                        options: {
                            address,
                            symbol,
                            decimals,
                            image,
                        },
                    },
                });
            }
        }
    },
    async switchNetwork(connector, chainId) {
        const app_connect_wallet = localStorage.getItem('app_connect_wallet');
        if (app_connect_wallet == 'fluent') {
            try {
                const info = getNetworkConfig(chainId);

                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: `0x${chainId.toString(16)}`, // Hexadecimal representation of the chainId
                            chainName: info.name,
                            nativeCurrency: {
                                symbol: info.baseAssetSymbol,
                                decimals: info.baseAssetDecimals,
                            },
                            rpcUrls: info.publicJsonRPCUrl[0],
                            blockExplorerUrls: [info.explorerLink],
                        },
                    ],
                });

                const provider = await detectProvider({
                    injectFlag: "conflux",
                    defaultWalletFlag: "isFluent",
                })

                const accounts = await (provider as any).request({ method: 'eth_requestAccounts' })
                    .catch((err: { code: number; }) => {
                        if (err.code === 4001) {
                            console.log('Please connect to Fluent Wallet.');
                        } else {
                            console.error(err);
                        }
                    });


                set({
                    fluentWeb3Context: {
                        account: accounts[0],
                        chainId,
                        provider
                    }
                });


            } catch (error) {
                throw error;
            }
        } else {
            try {
                //   if (
                //     [
                //     //   walletConnectV2Connection.connector,
                //       // uniwalletWCV2ConnectConnection.connector,
                //       // networkConnection.connector,
                //       // deprecatedNetworkConnection.connector,
                //     ].includes(connector)
                //   ) {
                //     await connector.activate(chainId)
                //   } else { 
                const info = getNetworkConfig(chainId);
                const addChainParameter = {
                    chainId,
                    chainName: info.name,
                    rpcUrls: info.publicJsonRPCUrl,
                    nativeCurrency: {
                        symbol: info.baseAssetSymbol,
                        decimals: info.baseAssetDecimals,
                    },
                    blockExplorerUrls: [info.explorerLink],
                }
                await connector.activate(addChainParameter)
                //   }

            } catch (error) {
                // In activating a new chain, the connector passes through a deactivated state.
                // If we fail to switch chains, it may remain in this state, and no longer be usable.
                // We defensively re-activate the connector to ensure the user does not notice any change.
                try {
                    await connector.activate()
                } catch (error) {
                    console.error('Failed to re-activate connector', error)
                }
                throw error
            } finally {
                // dispatch(endSwitchingChain())

                //   const connection = getConnection(connector)
                //   if (connection) {
                //     set({
                //       ethConnection: connection,
                //       ethWalletLoaded: true,
                //       erc20Provider: {
                //         network: networkConfigs[chainId]
                //       }
                //     })

                //   }

            }
        }


    },
    async fluentConnectWallet() {

        const provider = await detectProvider({
            injectFlag: "conflux",
            defaultWalletFlag: "isFluent",
        })
        if (provider) {
            // console.log('Conflux successfully detected!')


            // const chainId = await window.ethereum.request({ method: 'eth_chainId' });


            // window.ethereum.on('chainChanged', function (rs: any) {
            //     console.log({
            //         rs
            //     })

            // });


            // window.ethereum.request({ method: 'eth_accounts' })
            //     .then(function(accounts: string | any[]){
            //         console.log({
            //             eth_accounts:accounts
            //         })
            //     })
            //     .catch((err: any) => {
            //         console.error(err);
            //     });

            // window.ethereum.on('accountsChanged', handleAccountsChanged);
            const chainId = await (provider as any).request({ method: 'eth_chainId' });

             await (provider as any).request({ method: 'eth_requestAccounts' })
             .then((accounts:any)=>{
                set({
                    fluentWeb3Context: {
                        account: accounts[0],
                        chainId: parseInt(chainId, 16),
                        provider
                    },
                    isWalletModalOpen: false,
                });
    
                localStorage.setItem('app_connected', '1');
                localStorage.setItem('app_connect_wallet', 'fluent');
             })
                .catch((err: { code: number; }) => {
                    if (err.code === 4001) {
                        console.log('Please connect to Fluent Wallet.');
                    } else {
                        console.error(err);
                    }
                });

        

            // await (provider as any).on('accountsChanged', function (accounts: any) {
            //     console.log({
            //         eth_accounts: accounts
            //     })
            // });

            // console.log({
            //     // chainId,
            //     chainId2: parseInt(chainId, 16),
            //     accounts
            // })

            window.ethereum.on('accountsChanged', (_accounts: any) => {
                set({
                    fluentWeb3Context: {
                        account: _accounts[0],
                        chainId: parseInt(chainId, 16),
                        provider
                    }
                });
            });

         

        }
        // const provider = window.conflux

        // provider.on('accountsChanged', (accounts: string | any[]) => {
        //     // console.log('accountsChanged, accounts = ', accounts)
        //     // if (!accounts.length) return unAuthed()
        //     // authed(accounts[0])
        // })

        // provider.on('chainChanged', (chainId: any) => {
        //     // getElement('chainId').innerHTML = chainId
        //     // provider.request({method: 'cfx_netVersion'}).then(networkId => {
        //     //   getElement('networkId').innerHTML = networkId
        //     // })
        // })

        //   provider.request({method: 'wallet_getFluentMetadata'}).then(({version:any}) => {
        //     // getElement('version').innerHTML = version
        //   })

        // const [chainIdHex, alreadyAuthedAddresses] = await Promise.all([
        //     provider.request({ method: 'cfx_chainId' }),

        //     provider.request({
        //         method: 'cfx_accounts',
        //     }),
        // ])

        // const chainId = parseInt(chainIdHex, 16);

        // console.log({
        //     chainId, alreadyAuthedAddresses
        // })

        //     provider
        //     .request({method: 'cfx_chainId'})
        //     .then((idResult: any) => {
        //         console.log({
        //             idResult
        //         })
        //     })

        //   provider
        //     .request({method: 'cfx_netVersion'})
        //     .then((netResult: any) => {
        //         console.log({
        //             netResult
        //         })
        //     })

        //     provider
        //         .request({
        //             method: 'cfx_requestAccounts',
        //         })
        //         .then((address: any) => {

        //             console.log({
        //                 address
        //             })

        //         })
        //         .catch((error: { message: any; }) => console.error('error', error.message || error))



    }

}));

