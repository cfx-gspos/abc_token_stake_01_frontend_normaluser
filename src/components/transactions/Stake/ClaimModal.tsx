
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



export const ClaimModal = () => {

    const { chainId, account, provider, connector } = useWeb3React()
    const { type, close } = useModalStore()
    const { getPoolModal,initData } = useDataStore.getState()

    const [disabled, setDisabled] = useState(false)



    const handleClaimClick = async () => {

        const poolContract = new Contract(poolAddress, PoolABI, provider!.getSigner(account).connectUnchecked()) // 

        setDisabled(true)

        try {
            // 调用代币合约的 getPoolReward 方法并发送交易
            //   const estimateGas=  await poolContract.estimateGas.getPoolReward(getPoolModal!.pool_id)
            //   console.log({
            //     estimateGas
            //   })

            await poolContract.getPoolReward(getPoolModal!.pool_id).then(async (tx: any) => {
                const receipt = await tx.wait()
                if (receipt.status === 1) {
                    toastInfo(true, 'Claimed Successful')
                    close()

                    initData(account, provider)
                } else {
                    toastInfo(false, 'Claimed Failure')
                }
            }).catch((r: any) => {
                if (r.error.code === -32015 || r.error.data.code == -32015) {
                    toastInfo(false, ' Has Locked')
                } else {
                   
                }
            });


        } catch (r) {
            toastInfo(false, 'Cancel Claimed')
            console.log({
                name_g: 'error-----------------------',
                r
            })
        }

        setDisabled(false)
    }




    return (
        <BasicModal open={type === ModalType.StakeRewardsClaim} contentMaxWidth={480} setOpen={close}>
            <TxModalTitle title={`Claim`} symbol={'ABC'} />


            <Box>
                <TxModalDetails>
                    <DetailsNumberLine
                        description={<>Reward</>}
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
                        onClick={handleClaimClick}
                        size="large"
                        sx={{ minHeight: '44px', borderRadius: '40px' }}
                    >
                        {disabled ?
                            <>
                                <CircularProgress color="inherit" size="16px" sx={{ mr: 2 }} />
                                <>Claimed</>
                            </> : 'Claim'}
                    </Button>

                </>
            </Box>

        </BasicModal>
    );
};
