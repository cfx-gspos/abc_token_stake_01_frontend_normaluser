import { ModalType, useModalStore } from "@/src/store/modalSlice";
import { CogIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import { Box, Button, Collapse, Link, Paper, SvgIcon, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useState } from 'react';
import { ListItem } from "../FlowCommons/ListItem";
import { ListColumn } from "../FlowCommons/ListColumn";
import { FormattedNumber } from "../primitives/FormattedNumber";
import { TextWithTooltip } from "../FlowCommons/TextWithTooltip";
import { MultiTokenIcon, SingleTokenIcon } from "../primitives/SingleTokenIcon";
import { useDataContext } from "@/src/hooks/useDataContext";
import dayjs from "dayjs";
// import { PoolModal } from "./PoolsList";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { PoolModal } from "@/src/store/dataSlice";
import { useTranslation } from "react-i18next";

interface PoolAssetsItemProps {
    pool: PoolModal;
    hideBottom?: boolean;
    account?: string;
    chainId?: number;
    abcBalance?: string;
    openStake: (pool: PoolModal) => void;
    openUnStake: (pool: PoolModal) => void;
    openClaim: (pool: PoolModal) => void;
}

export const PooItem = ({
    pool,
    hideBottom,
    account,
    chainId,
    abcBalance,
    openStake,
    openUnStake,
    openClaim,
}: PoolAssetsItemProps) => {

    // const setType = useModalStore(state => state.setType)
    // const { Contract, setSelectToken } = usePoolDataStore(state => ({ Contract: state.Contract, setSelectToken: state.setSelectToken }))
    // const { currentTime } = useDataContext()

    const [checked, setChecked] = useState(false);
    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    const { t } = useTranslation();

    return <div className="abc-pool-item">
        <ListItem
            className="item-row"
            minHeight={76}
            onClick={() => handleChange}
            sx={{
                borderBottom: `${!hideBottom ? '1px solid ' : '0'}`,
            }}
            button
            data-cy={`poolListItemListItem_${'1'}`}
        >
            {/* ------------1--name-------------- */}
            <div className="abc-list-column">

                <div className="info"
                >
                    {/* <MultiTokenIcon symbols={['abc','usdt']} sx={{ width: '1.1em', height: '1.1em' }} /> */}
                    <Box sx={{
                        display: 'inline-flex',
                        position: 'relative',

                    }}>
                        {['cfx', 'abc-logo'].map((symbol, ix) => (
                            <SingleTokenIcon
                                key={symbol}
                                symbol={symbol}
                                sx={{
                                    ml: ix === 0 ? 0 : `calc(-1 * 0.5em)`,
                                    mt: ix === 0 ? 0 : `calc(1 * 0.4em)`,
                                    width: ix === 0 ? '1.1em' : `0.8em`,
                                    height: ix === 0 ? '1.1em' : `0.8em`,
                                }}
                            />
                        ))}
                    </Box>
                    <Box sx={{
                        display: { xs: 'flex', xsm: 'block' },
                        width: { xs: '100%' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Typography variant="main16">
                            {pool.name}
                        </Typography>
                        <Typography
                            component="span"
                            variant={'subheader2'}
                            color={'text.secondary'}
                        >
                            {t('Earn')} CFX
                        </Typography>
                    </Box>
                </div>

            </div>

            {/* ------------2--totalRewardsCfx-------------- */}
            <div className="abc-list-column">
                <Box
                    sx={{
                        display: { xs: 'flex', xsm: 'block' },
                        width: { xs: '100%' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: { xs: 3, xsm: 0 },
                    }}
                >
                    <Typography
                        variant={'subheader2'}
                        color={'text.secondary'}
                        sx={{
                            mb: 2
                        }}
                    >
                        {t('Earnable')}
                    </Typography>
                    <Box>
                        {/* <FormattedNumber
                            value={pool.totalRewardsCfx}
                            // symbol={'CFX'}
                            variant="subheader2"
                        /> */}
                        <FormattedNumber
                            value={pool.totalRewardsCfx}
                            visibleDecimals={2}
                            symbol={'CFX'}
                            variant="main16"
                        />
                    </Box>
                    {/* <Box>
                        <FormattedNumber
                            value={pool.totalRewardsCfxUSD}
                            symbol={'usd'}
                            variant="subheader2"
                        />
                    </Box> */}
                </Box>
            </div>


            {/* ------------3--totalStaked-------------- */}
            <div className="abc-list-column">
                <Box
                    sx={{
                        display: { xs: 'flex', xsm: 'block' },
                        width: { xs: '100%' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: { xs: 3, xsm: 0 },
                    }}
                >
                    <Typography
                        variant={'subheader2'}
                        color={'text.secondary'}
                        sx={{
                            mb: 2
                        }}
                    >
                        {t('Total staked')}
                    </Typography>
                    <Box>
                        <FormattedNumber
                            value={pool.totalStaked}
                            visibleDecimals={2}
                            symbol={'ABC'}
                            variant="main16"
                        />
                    </Box>
                    {/* <Box>
                        <FormattedNumber
                            value={pool.totalStakedUSD}
                            symbol={'usd'}
                            variant="main16"
                        />
                    </Box> */}
                </Box>
            </div>


            {/* ------------4--apr-------------- */}
            <div className="abc-list-column">
                <Box
                    sx={{
                        display: { xs: 'flex', xsm: 'block' },
                        width: { xs: '100%' },
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        mb: { xs: 3, xsm: 0 },
                    }}
                >
                    <Typography
                        variant={'subheader2'}
                        color={'text.secondary'}
                        sx={{
                            mb: 2
                        }}
                    >
                        APR
                    </Typography>
                    <FormattedNumber
                        value={pool.apr}
                        compact={false}
                        percent
                        variant="main16"
                    />
                </Box>
            </div>

            {/* ------------5--end Time-------------- */}
            <div className="abc-list-column">
                <Box
                    sx={{
                        display: { xs: 'flex', xsm: 'block' },
                        width: { xs: '100%' },
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        mb: { xs: 3, xsm: 0 },
                    }}
                >
                    <Typography
                        variant={'subheader2'}
                        color={'text.secondary'}
                        sx={{
                            mb: 2
                        }}
                    >
                        {/* {t('End Time')} */}
                        Start&End Time
                    </Typography>
                    <Box sx={{
                        display:'flex',
                        flexDirection:'column'
                    }}>
                        <Typography  variant="main16">
                            {
                                pool.startTime
                            }
                        </Typography>
                        <Typography  variant="main16">
                            {
                                pool.endTime
                            }
                            {/* {dayjs
                        .unix(pool.endTime)
                        .format('DD/MM/YYYY HH:mm')
                    } */}
                        </Typography>
                    </Box>

                </Box>
            </div>

            {/* ------------6--opt-------------- */}
            <div className="abc-list-column abc-center">
                <Button className="detail-btn"
                    sx={{
                        color: '#571AFF',
                        borderRadius: '36px',
                        backgroundColor: 'rgb(87,26,255,0.08)',
                        height: '36px',
                        width: '110px',
                        gap: '4px',
                        fontSize: '14px',
                        '&:hover': {
                            backgroundColor: 'rgb(87,26,255,0.08)',
                        }
                    }}
                    onClick={handleChange}
                    endIcon={
                        checked ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                    }
                >
                    {t('Details')}
                </Button>
            </div>


        </ListItem>


        <Collapse className="abc-collapse" in={checked} sx={{

        }}>

            <div className="collapse-box">

                <div className="button-box" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    padding: '20px 20px',

                }}>

                    {/* <Box sx={{
                        flex: '1',
                        gap: '6px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>

                        <Typography
                            //    variant="subheader2"
                            color={'text.secondary'}
                        >
                            ABC Balance
                        </Typography>
                        <Box sx={{
                            mt: 1
                        }}>
                            <FormattedNumber
                                value={pool.myStaked ?? '0'}
                                variant="main16"
                            />
                        </Box>
                        <Box>
                            <FormattedNumber
                                value={pool.myStakedUSD ?? '0'}
                                symbol={'usd'}
                            // variant="subheader2"
                            />
                        </Box>

                    </Box> */}

                    <Box sx={{
                        flex: '1',
                        gap: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <Typography
                            //    variant="subheader2"
                            color={'text.secondary'}
                        >
                            ABC {t('Balance')}
                        </Typography>
                        <Box sx={{
                            mt: 1
                        }}>
                            <FormattedNumber value={!abcBalance ? 0 : abcBalance.toString()} />
                        </Box>
                        <Button
                            variant="gradient"
                            // variant={!account ? "contained" : "gradient"}
                            sx={{
                                flex: '1',
                                borderRadius: '40px',
                                minWidth: '60%'
                            }}
                            onClick={() => { openStake(pool) }}
                        >
                            {t('Stake')}
                        </Button>
                    </Box>

                    {/* <Box sx={{
                        flex: '1',
                        gap: '6px',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>

                        <Typography
                            //    variant="subheader2"
                            color={'text.secondary'}
                        >
                            Unstake Time
                        </Typography>

                        <Typography variant="main16"
                            sx={{
                                mt: 1
                            }}>
                            {pool.unstakeTime ?? '--'}
                        </Typography>

                        <Link target={'_blank'} href={`#`} underline={'none'}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                mt: 1,
                                gap: '6px'
                            }}>
                            <Typography
                                variant="subheader2"
                                color={'text.secondary'}
                            >
                                View Contract
                            </Typography>
                            <SvgIcon sx={{
                                width: '16px'
                            }}>
                                <ExternalLinkIcon />
                            </SvgIcon>
                        </Link>


                    </Box> */}

                </div>


                <div className="button-box" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'start',
                    padding: '20px 20px',

                }}>

                    <Box sx={{
                        flex: '1',
                        gap: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <Typography
                            //    variant="subheader2"
                            color={'text.secondary'}
                        >
                            {t('My Staked')} ABC
                        </Typography>
                        <Box sx={{
                            mt: 1
                        }}>
                            <FormattedNumber
                                value={pool.myStaked ?? '0'}
                                visibleDecimals={4}
                                variant="main16"
                            />
                        </Box>
                        <Button
                            // variant="gradient"
                            variant={Number(pool.myStaked) > 0 && pool.isEnd == true ? "gradient" : "contained"}
                            sx={{
                                flex: '1',
                                borderRadius: '40px',
                                minWidth: '80%'
                            }}
                            onClick={() => { openUnStake(pool) }}
                            disabled={Number(pool.myStaked) > 0 && pool.isEnd == true ? false : true}
                        >
                            {t('UnStake')}
                        </Button>
                    </Box>


                    <Box sx={{
                        flex: '1',
                        gap: '6px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                        <Typography
                            //    variant="subheader2"
                            color={'text.secondary'}
                        >
                            {t('Claimable')} CFX
                        </Typography>
                        <Box sx={{
                            mt: 1
                        }}>
                            <FormattedNumber
                                value={pool.rewardEarned ?? '0'}
                                visibleDecimals={4}
                                variant="main16"
                            />
                        </Box>

                        {/* <Button
                            variant="contained"
                            // variant={!account ? "contained" : "gradient"}
                            sx={{
                                flex: '1',
                                borderRadius: '40px',
                                minWidth: '60%'
                            }}
                            onClick={() => { openClaim(pool) }}
                            disabled={Number(pool.rewardEarned) > 0 ? false : true}
                        >
                            Claim
                        </Button> */}

                    </Box>


                </div>
            </div>

        </Collapse >

    </div >
}