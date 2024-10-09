import { PoolModal, useDataStore } from "@/src/store/dataSlice";
import { PooItem } from "./PooItem";
import BigNumber from "bignumber.js";
import { ModalType, useModalStore } from "@/src/store/modalSlice";
import { useEffect } from "react";
import PoolABI from '@/src/abis/PpStakingPool2.json';
import { useDataContext } from "@/src/hooks/useDataContext";
import { Box, Divider, ListItem, Skeleton, useMediaQuery } from "@mui/material";
import { ListColumn } from "../FlowCommons/ListColumn";
import { Row } from "../FlowCommons/Row";
import { useWeb3React } from "@web3-react/core";
import { useWeb3Store } from "@/src/store/web3Slice";


export function PoolsList() {

    const { chainId: ethChainId, account: ethAccount } = useWeb3React()
    const { fluentWeb3Context, browserWeb3Context } = useWeb3Store()
    const app_connect_wallet = typeof window !== "undefined" && localStorage.getItem('app_connect_wallet');

    const account = app_connect_wallet == 'fluent' ? fluentWeb3Context?.account : app_connect_wallet == 'browser' ? browserWeb3Context?.account : ethAccount
    const chainId = app_connect_wallet == 'fluent' ? fluentWeb3Context?.chainId : app_connect_wallet == 'browser' ? browserWeb3Context?.chainId : ethChainId


    const { setWalletModalOpen } = useWeb3Store()
    const { setType } = useModalStore()
    // const { abc_Price: abcPrice, abc_balance: abcBalance, cfx_Price: cfxPrice } = useDataStore()
    const {
        pools,
        abc_balance: abcBalance,
        // abc_Price: abcPrice,
        // cfx_Price: cfxPrice,
        setPoolModal
    } = useDataStore.getState()


    // console.log({
    //     PoolABI,
    // })

    function openStake(pool: PoolModal) {
        // console.log({
        //     pool
        // })
        if (account) {
            // localStorage.setItem('stake_duration', pool.months.toString())
            // localStorage.setItem('stake_apr', pool.apr.toString())
            // localStorage.setItem('stake_pool_id', pool.pool_id.toString())
            setPoolModal(pool)
            setType(ModalType.Stake)
        }
        else {
            setWalletModalOpen(true)
        }

    }
    function openUnStake(pool: PoolModal) {
        if (account) {
            setPoolModal(pool)
            setType(ModalType.UNStake)
        }
        else {
            setWalletModalOpen(true)
        }

    }
    function openClaim(pool: PoolModal) {
        if (account) {
            setPoolModal(pool)
            setType(ModalType.StakeRewardsClaim)
        }
        else {
            setWalletModalOpen(true)
        }

    }

    //TODO：pools map 
    // const pools: PoolModal[] = [
    //     {
    //         name: '1 month',
    //         months: 1,
    //         apr: '0.012',
    //         endTime: '2023-12-1 12:30',
    //         totalStaked: '2340',
    //         totalStakedUSD: new BigNumber(2340).multipliedBy(abcPrice!).toString(),
    //         totalRewardsCfx: '5000',
    //         totalRewardsCfxUSD: new BigNumber(5000).multipliedBy(cfxPrice!).toString(),
    //         myStaked: '1005',
    //         myStakedUSD: new BigNumber(2340).multipliedBy(abcPrice!).toString(),
    //         unstakeTime: '2023-12-1 12:30',
    //     },
    //     {
    //         name: '3 months',
    //         months: 3,
    //         apr: '0.051',
    //         endTime: '2024-2-1 12:30',
    //         totalStaked: '23405',
    //         totalStakedUSD: new BigNumber(23405).multipliedBy(abcPrice!).toString(),
    //         totalRewardsCfx: '10000',
    //         totalRewardsCfxUSD: new BigNumber(10000).multipliedBy(cfxPrice!).toString(),
    //         myStaked: '0',
    //         myStakedUSD: new BigNumber(0).multipliedBy(abcPrice!).toString(),
    //     },
    //     {
    //         name: '6 months',
    //         months: 6,
    //         apr: '0.0666',
    //         endTime: '2024-8-1 12:30',
    //         totalStaked: '782340',
    //         totalStakedUSD: new BigNumber(782340).multipliedBy(abcPrice!).toString(),
    //         totalRewardsCfx: '15000',
    //         totalRewardsCfxUSD: new BigNumber(15000).multipliedBy(cfxPrice!).toString(),
    //         myStaked: '0',
    //         myStakedUSD: new BigNumber(0).multipliedBy(abcPrice!).toString(),
    //     },
    //     {
    //         name: '12 months',
    //         months: 12,
    //         apr: '0.1',
    //         endTime: '2024-12-31 12:00',
    //         totalStaked: '7823405',
    //         totalStakedUSD: new BigNumber(7823405).multipliedBy(abcPrice!).toString(),
    //         totalRewardsCfx: '20000',
    //         totalRewardsCfxUSD: new BigNumber(20000).multipliedBy(cfxPrice!).toString(),
    //         myStaked: '0',
    //         myStakedUSD: new BigNumber(0).multipliedBy(abcPrice!).toString(),
    //     },
    // ]

    const isMobile = useMediaQuery('(max-width:1204px)');

    return (
        <div className="abc-pool-box"
            // sx={(theme) => ({
            //     margin: '48px 0 24px 0', 
            //     borderRadius: { xs: 0, xsm: '6px' },
            //     border:`1px solid ${theme.palette.divider}`,
            //     p: { xs: 0, xsm: 4 },
            //     background: 'rgb(196,222,252,0.05)',
            // })}
            style={{
                // border:`1px solid #EAEBEF`,
            }}
        >

            {
                pools ?
                    <>
                        {pools.map((p, ix) => (
                            <PooItem key={ix} pool={p}
                                account={account}
                                chainId={chainId}
                                abcBalance={abcBalance}
                                openStake={openStake}
                                openUnStake={openUnStake}
                                openClaim={openClaim}
                                hideBottom={ix === pools.length - 1 ? true : false} />
                        ))}
                    </> :
                    <>
                        {
                            !isMobile ?
                                <>
                                    <PoolListItemLoader />
                                    <PoolListItemLoader />
                                    <PoolListItemLoader />
                                </>
                                :
                                <>
                                    <PoolListMobileItemLoader />
                                    <PoolListMobileItemLoader />
                                    <PoolListMobileItemLoader />
                                </>
                        }

                    </>
            }

        </div>
    )
}


const PoolListItemLoader = () => {
    return (
        <ListItem>
            <ListColumn isRow maxWidth={280}>
                <Skeleton variant="circular" width={32} height={32} />
                <Box sx={{ pl: 3.5, overflow: 'hidden' }}>
                    <Skeleton width={75} height={24} />
                </Box>
            </ListColumn>

            <ListColumn>
                <Skeleton width={70} height={24} />
            </ListColumn>

            <ListColumn>
                <Skeleton width={70} height={24} />
            </ListColumn>

            <ListColumn>
                <Skeleton width={70} height={24} />
            </ListColumn>

            <ListColumn>
                <Skeleton width={70} height={24} />
            </ListColumn>

            <ListColumn maxWidth={95} minWidth={95} align="right">
                <Skeleton width={74} height={38} />
            </ListColumn>
        </ListItem>
    );
};


const PoolListMobileItemLoader = () => {
    return (
        <>
            {/* <Divider /> */}
            <Box sx={{ px: 4, pt: 4, pb: 6, background: '#FFF', borderRadius: '6px', margin: '10px 0 20px 0' }}>
                <Row caption={<Skeleton width={100} height={20} />} captionVariant="description" mb={3}>
                    <Skeleton width={45} height={20} />
                </Row>
                <Row
                    caption={<Skeleton width={100} height={20} />}
                    captionVariant="description"
                    mb={3}
                    align="flex-start"
                >
                    <Skeleton width={45} height={20} />
                </Row>

                <Row caption={<Skeleton width={100} height={20} />} captionVariant="description" mb={3}>
                    <Skeleton width={45} height={20} />
                </Row>


                <Row
                    sx={{
                        justifyContent: 'center'
                    }}
                >
                    <Skeleton width="50%" height={38} />
                </Row>


            </Box>
        </>

    );
};
