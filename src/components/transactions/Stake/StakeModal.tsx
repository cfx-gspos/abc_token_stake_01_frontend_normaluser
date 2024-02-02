
import { ModalType, useModalStore } from '@/src/store/modalSlice';
import { parseUnits } from '@ethersproject/units';
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Web3 from "web3";
import { AssetInput } from '../../FlowCommons/AssetInput';
import { TxModalTitle } from '../../FlowCommons/TxModalTitle';
import { BasicModal } from '../../primitives/BasicModal';
import { DetailsNumberLine, TxModalDetails } from '../../FlowCommons/TxModalDetails';
import { Row } from '../../FlowCommons/Row';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import { abc_Price } from '@/src/utils/price';
import { useDataContext } from '@/src/hooks/useDataContext';
import { abcAddress, poolAddress, poolTimes, useDataStore } from '@/src/store/dataSlice';
import ERC20ABI from '@/src/abis/erc20.json';
import PoolABI from '@/src/abis/PpStakingPool2.json';
import { Contract } from "@ethersproject/contracts";
import { useWeb3React } from '@web3-react/core';
import { toast } from 'react-toastify';
import { CHAINS, ConnectChainID } from '@/src/libs/chains';
import { toastInfo } from '@/src/libs/toastAlert';
import { useWeb3Store } from '@/src/store/web3Slice';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { useTranslation } from 'react-i18next';

enum ErrorType {
  NOT_SELEDT_TIME,
  NOT_VALID_AMOUNT,
  NOT_ENOUGH_BALANCE
}

export const StakeModal = () => {
  const { t } = useTranslation();

  const { type, close } = useModalStore()
  // const { provider, account, chainId, getContract } = useWeb3Store()

  const { chainId: ethChainId, account: ethAccount, provider: ethProvider } = useWeb3React()
  const { fluentWeb3Context } = useWeb3Store()
  const app_connect_wallet = typeof window !== "undefined" && localStorage.getItem('app_connect_wallet');
  let account = app_connect_wallet == 'fluent' ? fluentWeb3Context?.account : ethAccount
  let chainId = app_connect_wallet == 'fluent' ? fluentWeb3Context?.chainId : ethChainId

  const [isApproveLP, setApproveLP] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [amount, setAmount] = useState<string>();
  const [selectTime, setSelectTime] = useState<{ name: string, value: number, pool_id: number }>()

  const { abc_Price: abcPrice, abc_balance: abcBalance, getPoolModal, initData } = useDataStore.getState()


  // const provide = useMemo(() => {
  //   const web3 = new Web3(provider);
  //   return new Contract(abcAddress, ERC20ABI, get().provider)
  // }, [])

  //get approve balance
  useEffect(() => {
    (async () => {
      if (account && chainId === ConnectChainID) {
        setTimeout(async () => {
          const provider = (new JsonRpcProvider(CHAINS[ConnectChainID].urls[0])) as Web3Provider
          const erc20Contract = new Contract(abcAddress, ERC20ABI, provider) //abc
          const _allowance = await erc20Contract.allowance(account, poolAddress)
          const allowanBanlce = ethers.utils.formatEther(_allowance)
          // console.log({
          //   allowanBanlce
          // })
          setApproveLP(Number(allowanBanlce) > 1000)
        }, 2000);
      }
    })()

  }, [account, chainId])


  // const duration = typeof window !== "undefined" ? localStorage.getItem('stake_duration') : undefined
  // const stake_apr = typeof window !== "undefined" ? localStorage.getItem('stake_apr') : '0'

  useEffect(() => {

    const time = getPoolModal?.months
      ? poolTimes.filter((g) => g.value.toString() === getPoolModal?.months.toString())[0]
      : undefined;
    setSelectTime(time)

  }, [getPoolModal])

  const [blockingError, setBlockingError] = useState<ErrorType>()

  const handleChange = (value: string) => {
    if (value === '-1') {
      setAmount(abcBalance);
    } else {
      setAmount(value);
    }

    if (blockingError === ErrorType.NOT_VALID_AMOUNT) {
      setBlockingError(undefined)
    }
  };


  const ApproveLP = async () => {
    setDisabled(true)
    try {
      const approvalAmount = ethers.utils.parseUnits('112100000000000000', 18);

      if (app_connect_wallet == 'fluent') {
        const signer = new ethers.providers.Web3Provider(fluentWeb3Context?.provider).getSigner();

        const erc20Contract = new Contract(abcAddress, ERC20ABI, signer);
        const transactionParameters = {
          from: account,
          to: abcAddress,
          data: erc20Contract.interface.encodeFunctionData('approve', [poolAddress, approvalAmount]),
        };

        // 发送交易
        const transactionHash = await fluentWeb3Context?.provider.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        });

        // console.log("交易哈希：", transactionHash);

        // 等待交易收据
        await fluentWeb3Context?.provider.request({
          method: 'eth_getTransactionReceipt',
          params: [transactionHash],
        });

        toastInfo(true, 'Approve Successful')
        setApproveLP(true)


      } else {
        const erc20Contract = new Contract(abcAddress, ERC20ABI, ethProvider!.getSigner(account).connectUnchecked()) //abc 
        const tx = await erc20Contract.approve(poolAddress, approvalAmount);
        const receipt = await tx.wait();
        if (receipt.status === 1) {
          toastInfo(true, 'Approve Successful')
          setApproveLP(true)
        } else {
          toastInfo(false, 'Approve Failure')
        }
      }

    } catch (error) {
      toastInfo(false, 'Cancel Approve')
      console.log({
        error
      })
    }

    setDisabled(false)
  }

  const handleStakeClick = async () => {
    if (!amount) return setBlockingError(ErrorType.NOT_VALID_AMOUNT)
    if (!selectTime) return setBlockingError(ErrorType.NOT_SELEDT_TIME)
    if (parseFloat(amount) > parseFloat(abcBalance!)) return setBlockingError(ErrorType.NOT_ENOUGH_BALANCE)
    const stakeAmount = ethers.utils.parseUnits(amount.toString(), 18);
    setDisabled(true)

    if (app_connect_wallet == 'fluent') {
      try {
        const signer = new ethers.providers.Web3Provider(fluentWeb3Context?.provider).getSigner();
        const poolContract = new ethers.Contract(poolAddress, PoolABI, signer);

        const transactionParameters = {
          from: account,
          to: poolAddress,
          data: poolContract.interface.encodeFunctionData('stake', [stakeAmount, getPoolModal?.pool_id]),
        };
        const transactionHash = await fluentWeb3Context?.provider.request({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
        });

        console.log("交易哈希：", transactionHash);

        await fluentWeb3Context?.provider.request({
          method: 'eth_getTransactionReceipt',
          params: [transactionHash],
        });

        toastInfo(true, 'Stake Successful')
        // localStorage.setItem('stake_duration', '')
        // localStorage.setItem('stake_apr', '0')

        setAmount('')
        setSelectTime(undefined)
        setBlockingError(undefined)

        close()

        initData(account, ethProvider)
      } catch (error) {
        toastInfo(false, 'Cancel Stake')
        console.error('Cancel Stake', error);
      }

    } else {


      try {
        const poolContract = new Contract(poolAddress, PoolABI, ethProvider!.getSigner(account).connectUnchecked()) // 
        // 调用代币合约的 stake 方法并发送交易
        // const tx = await poolContract.stake(stakeAmount, selectTime.pool_id);
        // const receipt = await tx.wait();
        // if (receipt.status === 1) {
        //   toastInfo(true, 'Stake Successful')

        //   localStorage.setItem('stake_duration', '')
        //   localStorage.setItem('stake_apr', '0')

        //   setAmount('')
        //   setSelectTime(undefined)
        //   setBlockingError(undefined)

        //   close()

        //   initData(account, provider)
        // } else {
        //   toastInfo(false, 'Stake Failure')
        // }

        await poolContract.stake(stakeAmount, getPoolModal?.pool_id).then(async (tx: any) => {
          const receipt = await tx.wait()
          if (receipt.status === 1) {
            toastInfo(true, 'Stake Successful')
            // localStorage.setItem('stake_duration', '')
            // localStorage.setItem('stake_apr', '0')

            setAmount('')
            setSelectTime(undefined)
            setBlockingError(undefined)

            close()

            initData(account, ethProvider)
          } else {

            toastInfo(false, 'Stake Failure')
          }
        }).catch((r: any) => {
          if (r.error.code === -32015 || r.error.data.code == -32015) {
            if (!getPoolModal?.isStart)
              toastInfo(false, 'Not start')
            else if (getPoolModal?.isEnd)
              toastInfo(false, 'End')
          } else {
            toastInfo(false, 'Stake Failure')
          }
        })

      } catch (error) {

        toastInfo(false, 'Cancel Stake')
        console.error('Cancel Stake', error);
      }
    }


    // console.log({
    //   _amount: stakeAmount.toString(),
    //   _pool_id: selectTime.pool_id,
    // });


    setDisabled(false)
  }

  function handleSelectTime(time: { name: string, value: number, pool_id: number }) {
    setSelectTime(time)
    if (blockingError === ErrorType.NOT_SELEDT_TIME) {
      setBlockingError(undefined)
    }
  }

  const amountUSD = useMemo(() => {
    if (amount) {
      const x = new BigNumber(amount)
      const y = x.multipliedBy(abcPrice ?? 0)
      return y.toString()
    }
    else
      return '0'
  }, [abcPrice, amount])


  return (
    <BasicModal open={type === ModalType.Stake} contentMaxWidth={480} setOpen={close}>
      <TxModalTitle title={t(`Stake`)} symbol={'ABC'} />

      <Box>
        <AssetInput
          value={amount!}
          onChange={handleChange}
          usdValue={amountUSD.toString()}
          symbol={'abc'}
          assets={[
            {
              balance: abcBalance?.toString(),
              symbol: 'abc',
            },
          ]}

          // isMaxSelected={isMaxSelected}
          maxValue={abcBalance?.toString()}
        />

        {blockingError === ErrorType.NOT_VALID_AMOUNT && (
          <Alert severity="error" sx={{ margin: '10px 0 0 0', borderRadius: '20px' }}>Please enter a valid amount!</Alert>
        )}
        {blockingError === ErrorType.NOT_ENOUGH_BALANCE && (
          <Alert severity="error" sx={{ margin: '10px 0 0 0', borderRadius: '20px' }}>Not enough balance on your wallet!</Alert>
        )}

        <Box sx={{ pt: 5 }}>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            <>{t('Duration')}</>
          </Typography>
          <Box
            sx={(theme) => ({
              p: 3,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '4px',
              '.MuiBox-root:last-of-type': {
                mb: 0,
              },
            })}
          >
            <Stack direction="row" spacing={1}>
              {poolTimes.map((item) => (
                <Button
                  key={item.value}
                  sx={{
                    borderRadius: '30px',
                    margin: '0px 4px'
                  }}
                  size="medium"
                  variant={selectTime === item ? 'gradient' : 'outlined'}
                  onClick={() => { handleSelectTime(item) }}
                >
                  {item.name}
                </Button>
              ))}
            </Stack>
          </Box>

        </Box>

        {blockingError === ErrorType.NOT_SELEDT_TIME && (
          <Alert severity="error" sx={{ margin: '10px 0 0 0', borderRadius: '20px' }}>Please select a time period!</Alert>
        )}

        <TxModalDetails>
          <DetailsNumberLine
            description={<>{t('Staking')} APR</>}
            // value={Number(stakeData?.stakeApy || '0') / 10000}  
            value={Number(getPoolModal?.apr)}
            percent
          />
        </TxModalDetails>

      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 12 }}>
        {
          !isApproveLP ? <>
            <Button variant="gradient"
              disabled={disabled}
              onClick={ApproveLP}
              size="large"
              sx={{ minHeight: '44px', borderRadius: '40px' }}
            >
              {disabled ?
                <>
                  <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />
                  <>{t('Approve')}</>
                </> : <>{t('Approve')}</>}
            </Button>

          </> :
            <>
              <Button
                variant={"gradient"} //
                disabled={disabled}
                onClick={handleStakeClick}
                size="large"
                sx={{ minHeight: '44px', borderRadius: '40px' }}
              >
                {disabled ?
                  <>
                    <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />
                    <>{t('Stake')}</>
                  </> :    <>{t('Stake')}</>}
              </Button>

            </>
        }

      </Box>

    </BasicModal>
  );
};
