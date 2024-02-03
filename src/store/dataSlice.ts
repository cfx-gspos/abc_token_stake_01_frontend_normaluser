
import { create } from "zustand";
import ERC20ABI from '@/src/abis/erc20.json';
import { CoingeckoPrice, abc_Price } from "../utils/price";
import { BigNumber, ethers } from "ethers";
import PoolABI from '@/src/abis/PpStakingPool2.json';
import { Contract } from '@ethersproject/contracts'
import { BigNumber as BigNumberJS } from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { CHAINS, ConnectChainID } from "../libs/chains";

export const abcAddress = '0xDcebdA2fE31EA70871a62FD584B6D692ABde9727'
export const poolAddress = '0xa792111cb7b143CdF2EbCDF6b9716b357869a2F1'

export const poolTimes = [
    { name: '1 month', value: 1, pool_id: 1 },
    { name: '3 months', value: 3, pool_id: 2 },
    { name: '6 months', value: 6, pool_id: 3 },
    { name: '12 months', value: 12, pool_id: 4 }
]


export interface PoolModal {
    pool_id: number;
    name: string;
    months: number;
    apr: string;
    endTime: string;
    totalStaked: string;
    totalStakedUSD: string;
    totalRewardsCfx: string;
    totalRewardsCfxUSD: string;
    myStaked?: string;
    myStakedUSD?: string;
    unstakeTime?: string;
    rewardEarned?: string;
    isStart?: boolean;
    isEnd?: boolean;
}

export interface DataSlice {
    abc_balance?: string;
    abc_Price?: string;
    cfx_Price?: string;
    pools?: PoolModal[];
    initData: (account?: string, provider?: Web3Provider) => void;
    getPoolModal?: PoolModal;
    setPoolModal: (pool?: PoolModal) => void;
}

export const useDataStore = create<DataSlice>((set, get) => ({

    initData: async (account, provider) => {

        //================================================================
        //get abc price
        try {
            abc_Price().then((rs) => {
                set({ abc_Price: rs })
            }).catch((error: any) => {

            })
            // setAbcPrice(abcPrice)

        } catch (error) {
            console.debug(`failed to fetch:`, error)
        }

        //get cfx price
        try {
            CoingeckoPrice('conflux-token').then((rs) => {
                set({ cfx_Price: rs })
            }).catch((error: any) => {
                console.log(`failed to coingecko:`, error)
            })
        } catch (error) {
            console.debug(`failed to coingecko:`, error)
        }

        const seconds_in_a_year = 365.25 * 24 * 60 * 60;

        try {

            // if (!provider) {
            //     provider = (new JsonRpcProvider(CHAINS[ConnectChainID].urls[0])) as Web3Provider
            // }
            provider = (new JsonRpcProvider(CHAINS[ConnectChainID].urls[0])) as Web3Provider

            if (provider) {
                const erc20Contract = new Contract(abcAddress, ERC20ABI, provider) //abc
                const poolContract = new Contract(poolAddress, PoolABI, provider)
                const poolCount = 2

                let poolArray: PoolModal[] = new Array()
                for (let index = 1; index <= poolCount; index++) {
                    let tasksPool: Contract[] = []
                    //1、池子锁仓时长
                    const poolData = poolContract.pools(index).catch()
                    tasksPool.push(poolData)
                    //2、池子开始日期
                    const startTime = poolContract.startTimes(index).catch()
                    tasksPool.push(startTime)
                    //3、池子已质押量
                    const totalSupply = poolContract.totalSupply(index).catch()
                    tasksPool.push(totalSupply)
                    //4、池子结束日期
                    const lockTime = poolContract.lockTimes(index).catch()
                    tasksPool.push(lockTime)
                    // //5、池子已产生利息cfx
                    // const rewardPerTokenStored = poolContract.rewardPerTokenStored(index).catch()
                    // tasksPool.push(rewardPerTokenStored)
                    //6、池子当前利率
                    const curPoolRewardRate = poolContract.getCurPoolRewardRate(index).catch()
                    tasksPool.push(curPoolRewardRate)
                    //7、池子cfx奖励数量
                    const poolRewardCfx = poolContract.poolRewardCfxs(index).catch()
                    tasksPool.push(poolRewardCfx)
                    //8、已挖出
                    const hasMint = poolContract.hasMints(index).catch()
                    tasksPool.push(hasMint)

                    // const [_poolData, _startTime, _totalSupply, _lockTime,_curPoolRewardRate, _poolRewardCfx, _hasMint]
                    //     = await Promise.all(tasksPool)

                    // console.log({
                    //     _poolData:secondsToDaysAndMonths(_poolData instanceof BigNumber ? _poolData.toNumber() : 0),
                    //     _startTime: formatTimestampToDateTime(_startTime instanceof BigNumber ? _startTime.toNumber() : 0),
                    //     _totalSupply: _totalSupply instanceof BigNumber ? _totalSupply.toString() : '0',
                    //     _lockTime: formatTimestampToDateTime(_lockTime instanceof BigNumber ? _lockTime.toNumber() : 0),
                    //     _curPoolRewardRate:_curPoolRewardRate instanceof BigNumber ? ethers.utils.formatEther(_curPoolRewardRate) : '0',
                    //     _poolRewardCfx: _poolRewardCfx instanceof BigNumber ? _poolRewardCfx.toString() : '0',
                    //     _hasMint: _hasMint instanceof BigNumber ? _hasMint.toString() : '0',
                    // })

                    // // const [_poolData, _startTime, _totalSupply, _lockTime, _rewardPerTokenStored, _curPoolRewardRate, _poolRewardCfx, _hasMint]
                    // //     = await Promise.all(tasksPool).catch()

                    const [_poolData, _startTime, _totalSupply, _lockTime, _curPoolRewardRate, _poolRewardCfx, _hasMint]
                        = await Promise.all(tasksPool).catch()

                    const APR_per_second = _curPoolRewardRate instanceof BigNumber ? ethers.utils.formatEther(_curPoolRewardRate) : '0'
                    const APR_annualized = Number(APR_per_second) * seconds_in_a_year
                    // const APR_annualized = Math.pow(1 + Number(APR_per_second), seconds_in_a_year) - 1;


                    // console.log({
                    //     name_abc: `${index}--pool----------------------------------`,
                    //     _poolData: secondsToDaysAndMonths(_poolData instanceof BigNumber ? _poolData.toNumber() : 0),
                    //     _poolData2: _poolData instanceof BigNumber ? _poolData.toNumber() : 0,
                    //     _startTime: formatTimestampToDateTime(_startTime instanceof BigNumber ? _startTime.toNumber() : 0),
                    //     _startTime2: _startTime instanceof BigNumber ? _startTime.toNumber() : 0,
                    //     _totalSupply: _totalSupply instanceof BigNumber ? _totalSupply.toString() : '0',
                    //     _lockTime: formatTimestampToDateTime(_lockTime instanceof BigNumber ? _lockTime.toNumber() : 0),
                    //     _lockTime2: _lockTime instanceof BigNumber ? _lockTime.toNumber() : 0,
                    //     // _rewardPerTokenStored: _rewardPerTokenStored instanceof BigNumber ? _rewardPerTokenStored.toString() : '0',
                    //     _curPoolRewardRate1: _curPoolRewardRate instanceof BigNumber ? ethers.utils.formatEther(_curPoolRewardRate) : '0',
                    //     _curPoolRewardRate: APR_annualized,
                    //     _poolRewardCfx: _poolRewardCfx instanceof BigNumber ? _poolRewardCfx.toString() : '0',
                    //     _hasMint: _hasMint instanceof BigNumber ? _hasMint.toString() : '0',
                    // })

                    const currentDate = new Date();
                    const currentTimestampInSeconds = Math.floor(currentDate.getTime() / 1000);
                    // console.log({
                    //     name_abc: `${index}--pool----------------------------------`, 
                    //     _startTime: _startTime.toNumber(), 
                    //     _lockTime: _lockTime.toNumber(),
                    //     _currentTime:currentTimestampInSeconds
                    // })

                    const r_month = secondsToDaysAndMonths(_poolData instanceof BigNumber ? _poolData.toNumber() : 0)
                    const r_totalSupply = _totalSupply instanceof BigNumber ? ethers.utils.formatEther(_totalSupply) : '0'
                    const r_poolRewardCfx = _poolRewardCfx instanceof BigNumber ? ethers.utils.formatEther(_poolRewardCfx) : '0'

                    let _pool: PoolModal = {
                        pool_id: index,
                        name: r_month.months > 1 ? `${r_month.months} months` : `1 month`,
                        months: r_month.months == 0 ? 1 : r_month.months,
                        apr: APR_annualized.toString(),
                        endTime: formatTimestampToDateTime(_lockTime instanceof BigNumber ? _lockTime.toNumber() : 0),
                        totalStaked: r_totalSupply,
                        totalStakedUSD: new BigNumberJS(r_totalSupply).multipliedBy(get().abc_Price ?? 0).toString(),
                        totalRewardsCfx: r_poolRewardCfx,
                        totalRewardsCfxUSD: new BigNumberJS(r_poolRewardCfx).multipliedBy(get().cfx_Price ?? 0).toString(),
                        isStart: (currentTimestampInSeconds - _startTime.toNumber()) > 0, //合约创建的时候也是UTC+8时间戳
                        isEnd: (currentTimestampInSeconds - _lockTime.toNumber()) > 0,
                    }


                    if (account) {
                        let tasksUser: Contract[] = []
                        // //可mint时间
                        // const poolMint = poolContract.poolMints(index, account).catch()
                        // tasksUser.push(poolMint)
                        //锁仓数量
                        const balance = poolContract.balanceOf(account, index).catch()
                        tasksUser.push(balance)
                        //在当前池子得到的未领取奖励 cfx
                        const rewardEarned = poolContract.poolRewardEarned(account, index).catch()
                        tasksUser.push(rewardEarned)

                        // const [_poolMint, _balance, _rewardEarned] = await Promise.all(tasksUser).catch()
                        const [_balance, _rewardEarned] = await Promise.all(tasksUser).catch()


                        // console.log({
                        //     name_abc: `${index}--user----------------------------------`,
                        //     _poolMint: _poolMint instanceof BigNumber ? _poolMint.toString() : '0',
                        //     _rewardPerTokenStored: _balance instanceof BigNumber ? _balance.toString() : '0',
                        //     _rewardEarned: _rewardEarned instanceof BigNumber ? _rewardEarned.toString() : '0',
                        // })

                        const r_balance = _balance instanceof BigNumber ? ethers.utils.formatEther(_balance) : '0'
                        _pool = {
                            ..._pool,
                            myStaked: r_balance,
                            myStakedUSD: new BigNumberJS(r_balance).multipliedBy(get().abc_Price ?? 0).toString(),
                            rewardEarned: _rewardEarned instanceof BigNumber ? ethers.utils.formatEther(_rewardEarned) : '0'
                            // unstakeTime: string;
                        }
                    }

                    poolArray.push(_pool)
                }


                // console.log({
                //     name_abc: 'pool----------------------------------',
                //     poolArray
                // })

                //================================================================
                // const cttBanlance = await poolContract.callStatic.getBalance().catch()
                // const stakingAddress = await poolContract.stakingPowerAddress().catch()

                //================================================================
                if (account) {
                    const abcBanlance = await erc20Contract.balanceOf(account).catch()
                    set({
                        abc_balance: ethers.utils.formatEther(abcBanlance),
                        pools: poolArray
                    })
                } else {
                    set({
                        abc_balance: undefined,
                        pools: poolArray
                    })
                }

            }

        } catch (error) {

        }

    },
    setPoolModal(pool) {
        set({ getPoolModal: pool });
    },
}))



function secondsToDaysAndMonths(seconds: number) {

    const secondsInMinute = 60;
    const secondsInHour = 3600; // 1小时有3600秒
    const secondsInDay = 86400; // 1天有86400秒
    const secondsInMonth = 30.44 * secondsInDay; // 一个月大约是30.44天

    const minutes = Math.floor(seconds / secondsInMinute);
    const hours = Math.floor(seconds / secondsInHour);
    const days = Math.floor(seconds / secondsInDay);
    const months = Math.floor(seconds / secondsInMonth);

    return { months, days, hours, minutes };
}

function formatTimestampToDateTime(timestamp: number) {
    // 创建一个Date对象，传入时间戳（以毫秒为单位，所以要乘以1000）
    const date = new Date(timestamp * 1000);

    // 使用Date对象的方法获取年、月、日、小时、分钟和秒
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月份从0开始，所以要加1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // const seconds = date.getSeconds();

    // 创建一个格式化的时间字符串
    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedTime
}

