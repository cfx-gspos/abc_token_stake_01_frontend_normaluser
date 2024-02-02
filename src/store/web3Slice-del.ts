// import { create, StateCreator } from "zustand";
// import { getNetworkConfig, WalletType } from "../libs/networksConfig";
// import {
//   CHAINS,
//   ConnectChainID,
//   ERC20TokenType,
//   getAddChainParameters,
// } from "../libs/chains";
// import detectEthereumProvider from '@metamask/detect-provider';
// import detectProvider from "@fluent-wallet/detect-provider";
// import { ContractInterface, ethers } from "ethers";
// import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers"; 
// import { Contract } from "@ethersproject/contracts";

// export interface Web3Slice {
//   isWalletModalOpen: boolean;
//   setWalletModalOpen: (open: boolean) => void;
//   connected: boolean;
//   chainId: number | undefined;
//   account: string | undefined;
//   // walletBalances?: {};
//   provider?: JsonRpcProvider; 
//   connectWallet: (walletType: WalletType) => Promise<void>;
//   disconnectWallet: () => Promise<void>;
//   addERC20Token: (token: ERC20TokenType) => Promise<void>;
//   switchNetwork: (newChainId: number) => Promise<void>;
//   getContract: (contractAddress: string, ABI: ContractInterface) => Contract
// }

// export const useWeb3Store = create<Web3Slice>((set, get) => ({
//   isWalletModalOpen: false,
//   setWalletModalOpen(open: boolean) {
//     set({ isWalletModalOpen: open });
//   },
//   connected: false,
//   // setConnected(connedted: boolean) {
//   //   set({ connected: connedted });
//   // },
//   // setChainId(chainId: number) {
//   //   set({ chainId: chainId });
//   // },
//   chainId: undefined,
//   account: undefined,
//   // provider: new ethers.providers.JsonRpcProvider(
//   //   CHAINS[ConnectChainID].urls[0]
//   // ),
//   async connectWallet(walletType: WalletType) {
//     localStorage.setItem("walletType", walletType);

//     switch (walletType) {
//       case WalletType.INJECTED:
//       case WalletType.OKX:
//         if (typeof window.ethereum === "undefined") {
//           window.open("https://metamask.io/download/", "_blank");
//         } else {
//           try {
//             // await window.ethereum.enable();
//             const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

//             const _chainId = await window.ethereum.request({
//               method: "eth_chainId",
//             });
//             // console.log(`App::useEfect init`, parseInt(_chainId, 16));
//             //App::useEffect setup active provider listeners.
//             if (_accounts.length > 0) {
//               set({
//                 account: _accounts[0],
//                 connected: true,
//                 chainId: parseInt(_chainId, 16),
//               });
//               localStorage.setItem("walletLogin", "1");
//             }

//             // const provider = await detectEthereumProvider();
//             // set({
//             //   provider: provider, 
//             // });

//             const onChainChanged = (chain: any) => {
//               // console.log(`App::useEfect on 'onChainChanged'`, parseInt(chain, 16));
//               set({
//                 chainId: parseInt(chain, 16),
//               });
//             };

//             const onAccountsChanged = (accounts: string[]) => {
//               // console.log(`App::useEfect on 'accountsChanged'`, accounts);
//               if (accounts && accounts.length > 0) {
//                 set({
//                   account: accounts[0],
//                 });
//               } else {
//                 set({
//                   account: undefined,
//                   connected: false,
//                   chainId: undefined
//                 });
//                 localStorage.removeItem("walletLogin");
//               }
//             };

//             window.ethereum?.on("chainChanged", onChainChanged);
//             window.ethereum?.on("accountsChanged", onAccountsChanged);
//           } catch (error) {
//             console.error("Error connecting to MetaMask:", error);
//           }
//         }

//         break;
//       case WalletType.FLUENT:
//         if (
//           typeof window.ethereum === "undefined" ||
//           window.ethereum.isFluent === false
//         ) {
//           window.open("https://fluentwallet.com/", "_blank");
//         } else {
//           try {

//             // await window.ethereum.enable();
//             const _accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
//             // const provider = new ethers.providers.Web3Provider(window.ethereum);  
//             // const accounts = await provider.listAccounts();
//             // console.log(`App::useEfect init`, accounts);

//             const _chainId = await window.ethereum.request({
//               method: "eth_chainId",
//             });
//             // console.log(`App::useEfect init`, parseInt(_chainId, 16));
//             //App::useEffect setup active provider listeners.
//             if (_accounts.length > 0) {
//               set({
//                 account: _accounts[0],
//                 connected: true,
//                 chainId: parseInt(_chainId, 16),
//               });
//               localStorage.setItem("walletLogin", "1");
//             }

//             const onChainChanged = (chain: any) => {
//               // console.log(`App::useEfect on 'onChainChanged'`, parseInt(chain, 16));
//               set({
//                 chainId: parseInt(chain, 16),
//               });
//             };

//             const onAccountsChanged = (accounts: string[]) => {
//               // console.log(`App::useEfect on 'accountsChanged'`, accounts);
//               if (accounts && accounts.length > 0) {
//                 set({
//                   account: accounts[0],
//                 });
//               } else {
//                 set({
//                   account: undefined,
//                   connected: false,
//                   chainId: undefined,
//                 });
//                 localStorage.removeItem("walletLogin");
//               }
//             };

//             window.ethereum?.on("chainChanged", onChainChanged);
//             window.ethereum?.on("accountsChanged", onAccountsChanged);

//             // await window.ethereum.enable();

//             // const _chainId = await window.ethereum.request({
//             //   method: "eth_chainId",
//             // });

//             // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
//             // console.log(
//             //   `App::useEfect on init`,
//             //   accounts
//             // );

//             // if (accounts.length> 0) {
//             //   set({
//             //     account: window.ethereum?.selectedAddress,
//             //     connected: true,
//             //     chainId: parseInt(_chainId, 16),
//             //   });
//             //   localStorage.setItem("walletLogin", "1");
//             // }

//             // const handleChainChanged=(chainId: any)=> {
//             //   console.log(
//             //     `App::useEfect on 'onChainChanged'`,
//             //     chainId
//             //   );
//             //   set({
//             //     chainId: parseInt(chainId, 16),
//             //   });
//             // }
//             // window.ethereum.on("chainChanged", handleChainChanged);

//             // let currentAccount:string = '';
//             // const  handleAccountsChanged=(accounts: string[] | any[])=> {
//             //   console.log(`App::useEfect on 'accountsChanged'`, accounts);

//             //   if (accounts.length === 0) {
//             //     set({
//             //       account: "",
//             //       connected: false,
//             //       chainId: 0,
//             //     });
//             //     localStorage.removeItem("walletLogin");
//             //   } else if (accounts[0] !== currentAccount) {
//             //     currentAccount = accounts[0];
//             //     set({
//             //       account: currentAccount,
//             //     });
//             //   }
//             // }

//             // window.ethereum.request({ method: 'eth_accounts' })
//             //   .then(handleAccountsChanged)
//             //   .catch((err: any) => {

//             //   });

//             // window.ethereum.on('accountsChanged', handleAccountsChanged);


//           } catch (error) {
//             console.error("Error connecting to Fluent:", error);
//           }
//         }

//         break;
//       // case WalletType.OKX:
//       //   // https://www.okx.com/web3
//       //   break;
//     }
//     set({ isWalletModalOpen: false });
//   },
//   async disconnectWallet() {
//     localStorage.removeItem("walletLogin");
//     localStorage.removeItem("walletType");

//     set({
//       account: undefined,
//       connected: false,
//       chainId: undefined,
//     });
//   },
//   async switchNetwork(newChainId: number) {
//     const injectedProvider = (window as any).ethereum;
//     if (window && injectedProvider) {
//       try {
//         await injectedProvider.send("wallet_switchEthereumChain", [
//           { chainId: `0x${newChainId.toString(16)}` },
//         ]);
//       } catch (switchError) {
//         const networkInfo = getNetworkConfig(newChainId);

//         try {
//           try {
//             await injectedProvider.send("wallet_addEthereumChain", [
//               {
//                 chainId: `0x${newChainId.toString(16)}`,
//                 chainName: networkInfo.name,
//                 nativeCurrency: {
//                   symbol: networkInfo.baseAssetSymbol,
//                   decimals: networkInfo.baseAssetDecimals,
//                 },
//                 rpcUrls: [
//                   ...networkInfo.publicJsonRPCUrl,
//                   networkInfo.publicJsonRPCWSUrl,
//                 ],
//                 blockExplorerUrls: [networkInfo.explorerLink],
//               },
//             ]);
//           } catch (error) { }
//         } catch (addError) { }
//       }

//       set({
//         chainId: newChainId,
//         isWalletModalOpen: false,
//       });
//     }
//   },
//   async addERC20Token({ address, symbol, decimals, image }: ERC20TokenType) {
//     const injectedProvider = (window as any).ethereum;
//     if (window && injectedProvider) {
//       if (
//         address.toLowerCase() !==
//         "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase()
//       ) {
//         await injectedProvider.request({
//           method: "wallet_watchAsset",
//           params: {
//             type: "ERC20",
//             options: {
//               address,
//               symbol,
//               decimals,
//               image,
//             },
//           },
//         });
//       }
//     }
//   },
//   getContract(contractAddress, ABI): Contract {
//     return new Contract(contractAddress, ABI, get().provider)
//     // return new Contract(contractAddress, ABI, getProviderOrSigner(get().provider, get().account) as any)
//   }
// }));

// // // account is optional
// // function getProviderOrSigner(provider: JsonRpcProvider, account?: string): JsonRpcProvider | JsonRpcSigner {
// //   return account ? getSigner(provider, account) : provider
// // }

// // // account is not optional
// // function getSigner(provider: JsonRpcProvider, account: string): JsonRpcSigner {
// //   return provider.getSigner(account).connectUnchecked()
// // }