
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
import { ConnectChainID } from '@/src/libs/chains';
import { toastInfo } from '@/src/libs/toastAlert';
import { useWeb3Store } from '@/src/store/web3Slice';
import { useTranslation } from 'react-i18next';



export const UnStakeModal = () => {
    const { t} = useTranslation();

    const { chainId: ethChainId, account: ethAccount, provider: ethProvider } = useWeb3React()
    const { fluentWeb3Context } = useWeb3Store()
    const app_connect_wallet = typeof window !== "undefined" && localStorage.getItem('app_connect_wallet');
    let account = app_connect_wallet == 'fluent' ? fluentWeb3Context?.account : ethAccount
    // let chainId = app_connect_wallet == 'fluent' ? fluentWeb3Context?.chainId : ethChainId


    const { type, close } = useModalStore()
    const { getPoolModal, initData } = useDataStore.getState()

    const [disabled, setDisabled] = useState(false)


    const handleUnStakeClick = async () => {
        setDisabled(true)
        if (app_connect_wallet == 'fluent') {
            try {
                const signer = new ethers.providers.Web3Provider(fluentWeb3Context?.provider).getSigner();
                const poolContract = new ethers.Contract(poolAddress, PoolABI, signer);

                const transactionParameters = {
                    from: account,
                    to: poolAddress,
                    data: poolContract.interface.encodeFunctionData('exit', [getPoolModal?.pool_id]),
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

                toastInfo(true, 'UnStaked Successful')
                close()

                initData(account)

            } catch (error) {
                toastInfo(false, 'Cancel UnStaked')
                console.log({
                    name_g: 'error-----------------------',
                    error
                })
            }
        } else {
            const poolContract = new Contract(poolAddress, PoolABI, ethProvider!.getSigner(account).connectUnchecked()) //  
            try {
                // 调用代币合约的 exit 方法并发送交易
                await poolContract.exit(getPoolModal!.pool_id).then(async (tx: any) => {
                    const receipt = await tx.wait()
                    if (receipt.status === 1) {
                        toastInfo(true, 'UnStaked Successful')
                        close()

                        initData(account)
                    } else {
                        toastInfo(false, 'UnStaked Failure')
                    }
                }).catch((r: any) => {
                    if (r.error.code === -32015 || r.error.data.code == -32015) {
                        toastInfo(false, ' Has Locked')
                    } else {

                    }
                })


            } catch (r) {
                toastInfo(false, 'Cancel UnStaked')
                console.log({
                    name_g: 'error-----------------------',
                    r
                })
            }
        }

        setDisabled(false)
    }




    return (
        <BasicModal open={type === ModalType.UNStake} contentMaxWidth={480} setOpen={close}>
            <TxModalTitle title={t(`UnStake`)} symbol={'ABC'} />

            <Box>
                <TxModalDetails>
                    <DetailsNumberLine
                        description={<>{t('Stake')}</>}
                        value={Number(getPoolModal?.myStaked)}
                        symbol='ABC'
                    />
                    <DetailsNumberLine
                        description={<>{t('Reward')}</>}
                        value={Number(getPoolModal?.rewardEarned)}
                        visibleDecimals={4}
                        symbol='CFX'
                    />
                </TxModalDetails>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 12 }}>
                <>
                    <Button
                        variant={"gradient"} //
                        disabled={disabled}
                        onClick={handleUnStakeClick}
                        size="large"
                        sx={{ minHeight: '44px', borderRadius: '40px' }}
                    >
                        {disabled ?
                            <>
                                <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />
                                <>{t('UnStake')}</>
                            </> : <>{t('UnStake')}</>}
                    </Button>

                </>
            </Box>

        </BasicModal>
    );
};
