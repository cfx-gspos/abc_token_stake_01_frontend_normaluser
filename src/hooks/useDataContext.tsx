import React, { ReactElement, createContext, useContext, useEffect, useState } from 'react';
import { useCurrentTimestamp } from '../utils/useCurrentTimestamp';
import { useDataStore } from '../store/dataSlice';
// import dayjs from 'dayjs'; 
import { useWeb3React } from '@web3-react/core';
import { useWeb3Store } from '../store/web3Slice';

//
export const DataContext = React.createContext({} as { currentTime: number });

//
export const DataContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
 
  const { chainId:ethChainId, account:ethAccount, provider, connector } = useWeb3React()
  const { fluentWeb3Context } = useWeb3Store()
  const app_connect_wallet = typeof window !== "undefined" && localStorage.getItem('app_connect_wallet');
  let account=app_connect_wallet == 'fluent'?fluentWeb3Context?.account:ethAccount
  let chainId=app_connect_wallet == 'fluent'?fluentWeb3Context?.chainId:ethChainId

  const currentTime = useCurrentTimestamp(5);
  const { initData } = useDataStore.getState()
  // const { initData } = useDataStore()

  // useEffect(() => {
  //   initData(account, provider)
  // }, [chainId])


  useEffect(() => {
    initData(account, provider)
  }, [currentTime,chainId])


  return (
    <DataContext.Provider
      value={{
        currentTime
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);