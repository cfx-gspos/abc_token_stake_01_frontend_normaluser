import React, { ReactElement } from 'react';
// import { metaMask } from "@/src/connectors/metaMask"
// import { coinbaseWallet } from "@/src/connectors/coinbaseWallet"
// import { walletConnectV2 } from "@/src/connectors/walletConnectV2"
import { ModalType, useModalStore } from "@/src/store/modalSlice"
import { URI_AVAILABLE } from "@web3-react/walletconnect-v2"
import { useEffect } from "react"
import { useWeb3React } from "@web3-react/core"
import { ConnectChainID } from '../libs/chains';
import { useWeb3Store } from '../store/web3Slice';
import { eip6963Connection, getConnection } from '../connection';
import { Connection, ConnectionType } from '../connection/types';

export const Web3Context = React.createContext(null);
export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {


    const { chainId:ethChainId } = useWeb3React()
    const { fluentWeb3Context,fluentConnectWallet } = useWeb3Store()
    const app_connect_wallet = typeof window !== "undefined" && localStorage.getItem('app_connect_wallet');
    // let account=app_connect_wallet == 'fluent'?fluentWeb3Context?.account:ethAccount
    let chainId=app_connect_wallet == 'fluent'?fluentWeb3Context?.chainId:ethChainId

    const { type, close, setType } = useModalStore()

    // console.log({
    //     name_g: 'load-app-------------------------',
    //     chainId, account, provider, connector
    // })

    useEffect(() => {
        const connected = typeof window !== "undefined" && localStorage.getItem('app_connected')
        if (connected === '1') {
            if(app_connect_wallet == 'fluent'){
                fluentConnectWallet()
            }else{
                const connect_rnds = typeof window !== "undefined" && localStorage.getItem('app_connect_rnds')
                if (connect_rnds && connect_rnds !== '') {
                    eip6963Connection.selectRdns(connect_rnds)
                }
                
                const connectType = typeof window !== "undefined" && localStorage.getItem('app_connect_type')
                const ethsslConnection = getConnection(connectType as ConnectionType)
    
                if (ethsslConnection) {
                    ethsslConnection.overrideActivate?.(chainId ?? ConnectChainID)  //It has to be, otherwise it won't load the initial values.
    
                    connect(ethsslConnection)
                        .then((connected) => {
                            // if (!connected) throw new FailedToConnect()  
                        })
    
                }
            }
           

            // void metaMask.connectEagerly().then(() => {
            // }).catch(() => {
            //     console.debug('Failed to connect eagerly to metamask')
            // })

            // void coinbaseWallet.connectEagerly().then(() => {
            // }).catch(() => {
            //     console.debug('Failed to connect eagerly to coinbase wallet')
            // })

            // walletConnectV2.events.on(URI_AVAILABLE, (_uri: string) => {
            // })
        }
    }, [])

 

    useEffect(() => {
        if (chainId && chainId !== 0) {
            // const { setConnector } = useWeb3Store.getState()
            // if (account)
            //     setConnector(connector)

            if (chainId !== ConnectChainID && !type) {
                setType(ModalType.NetworkWarning)
            } else {
                if (type == ModalType.NetworkWarning)
                    close()
            }
        }
    }, [chainId])

    async function connect(connection: Connection) {
        try {
            if (connection.connector.connectEagerly) {
                await connection.connector.connectEagerly()
            } else {
                await connection.connector.activate()
            }
            // setEthConection(connection, chainId ?? DefaultChainId)
            return true
        } catch (error) {
            return false
        } finally {
        }
    }

    return (
        <Web3Context.Provider
            value={null}
        >
            {children}
        </Web3Context.Provider>
    );

};





