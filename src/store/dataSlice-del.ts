
// import { create } from "zustand";
// import { useWeb3Store } from "./web3Slice-del";
// import ERC20ABI from '@/src/abis/erc20.json';
// import { CoingeckoPrice, abc_Price } from "../utils/price";
// import { BigNumber, ethers } from "ethers";
// import PoolABI from '@/src/abis/PpStakingPool2.json';
// import { Contract } from '@ethersproject/contracts'


// export interface PoolModal {
//   name: string;
//   months: number;
//   apr: string;
//   endTime: string;
//   totalStaked: string;
//   totalStakedUSD: string;
//   totalRewardsCfx: string;
//   totalRewardsCfxUSD: string;
//   myStaked: string;
//   myStakedUSD: string;
//   unstakeTime?: string;
// }

// export interface DataSlice {
//   abc_balance?: string;
//   abc_Price?: string;
//   cfx_Price?: string;
//   pools?: PoolModal[]
//   initData: () => void;
// }

// export const useDataStore = create<DataSlice>((set, get) => ({

//   initData: async () => {
//     const { getContract, account, provider } = useWeb3Store.getState()

//     try {

//       if (provider) {

//         const erc20Contract = getContract('0xDcebdA2fE31EA70871a62FD584B6D692ABde9727', ERC20ABI) //abc
//         const poolContract = getContract('0xe883cDc8EE220200F16f0D2009d1EB3557c5AaA4', PoolABI)
//         const poolCount = 3

//         let poolArray: PoolModal[] = new Array()
//         //================================================================
//         const cttBanlance = await poolContract.callStatic.getBalance().catch()
//         const stakingAddress = await poolContract.stakingPowerAddress().catch()

//         //池子锁仓时长
//         let tasksPool_Data: Contract[] = []
//         for (let index = 1; index <= poolCount; index++) {
//           const model = poolContract.pools(index).catch()
//           tasksPool_Data.push(model)
//         }
//         const [pl1_data, pl2_data, pl3_data] = await Promise.all(tasksPool_Data).catch()

//         //池子开始日期
//         let tasksPool_starttime: Contract[] = []
//         for (let index = 1; index <= poolCount; index++) {
//           const model = poolContract.startTimes(index).catch()
//           tasksPool_starttime.push(model)
//         }
//         const [pl1_starttime, pl2_starttime, pl3_starttime] = await Promise.all(tasksPool_starttime).catch()

//         //池子总供应
//         let tasksPool_totalSupply: Contract[] = []
//         for (let index = 1; index <= poolCount; index++) {
//           const model = poolContract.totalSupply(index).catch()
//           tasksPool_totalSupply.push(model)
//         }
//         const [pl1_totalSupply, pl2_totalSupply, pl3_totalSupply] = await Promise.all(tasksPool_totalSupply).catch()

//         //池子结束日期
//         let tasksPool_lockTime: Contract[] = []
//         for (let index = 1; index <= poolCount; index++) {
//           const model = poolContract.lockTimes(index).catch()
//           tasksPool_lockTime.push(model)
//         }
//         const [pl1_lockTime, pl2_lockTime, pl3_lockTime] = await Promise.all(tasksPool_lockTime).catch()

//         //池子已产生利息cfx
//         let tasksPool_rewardPerTokenStored: Contract[] = []
//         for (let index = 1; index <= poolCount; index++) {
//           const model = poolContract.rewardPerTokenStored(index).catch()
//           tasksPool_rewardPerTokenStored.push(model)
//         }
//         const [pl1_rewardPerTokenStored, pl2_rewardPerTokenStored, pl3_rewardPerTokenStored] = await Promise.all(tasksPool_rewardPerTokenStored).catch()

//         //池子当前利率
//         let tasksPool_rewardRate: Contract[] = []
//         for (let index = 1; index <= poolCount; index++) {
//           const model = poolContract.getCurPoolRewardRate(index).catch()
//           tasksPool_rewardRate.push(model)
//         }
//         const [pl1_rewardRate, pl2_rewardRate, pl3_rewardRate] = await Promise.all(tasksPool_rewardRate).catch()


//         //池子cfx奖励数量
//         let tasksPool_rewardCfxs: Contract[] = []
//         for (let index = 1; index <= poolCount; index++) {
//           const model = poolContract.poolRewardCfxs(index).catch()
//           tasksPool_rewardCfxs.push(model)
//         }
//         const [pl1_cfx, pl2_cfx, pl3_cfx] = await Promise.all(tasksPool_rewardCfxs).catch()

//         //已挖出
//         let tasksPool_hasMints: Contract[] = []
//         for (let index = 1; index <= poolCount; index++) {
//           const model = poolContract.hasMints(index).catch()
//           tasksPool_hasMints.push(model)
//         }
//         const [pl1_mint, pl2_mint, pl3_mint] = await Promise.all(tasksPool_hasMints).catch()

//         console.log({
//           name_abc: 'pool----------------------------------',
//           cttBanlance: ethers.utils.formatEther(cttBanlance),
//           stakingAddress,
//           p_data: {
//             pl1_data: pl1_data instanceof BigNumber ? pl1_data.toString() : '0',
//             pl2_data: pl2_data instanceof BigNumber ? pl2_data.toString() : '0',
//             pl3_data: pl3_data instanceof BigNumber ? pl3_data.toString() : '0',
//             data: secondsToDaysAndMonths(pl3_data instanceof BigNumber ? pl3_data.toNumber() : 0,)
//           },
//           p_startime: {
//             pl1_starttime: pl1_starttime instanceof BigNumber ? pl1_starttime.toString() : '0',
//             pl2_starttime: pl2_starttime instanceof BigNumber ? pl2_starttime.toString() : '0',
//             pl3_starttime: pl3_starttime instanceof BigNumber ? pl3_starttime.toString() : '0',
//             startTime: formatTimestampToDateTime(pl1_starttime instanceof BigNumber ? pl1_starttime.toNumber() : 0)
//           }
//           ,
//           p_totalSupply: {
//             pl1_totalSupply: pl1_totalSupply instanceof BigNumber ? pl1_totalSupply.toString() : '0',
//             pl2_totalSupply: pl2_totalSupply instanceof BigNumber ? pl2_totalSupply.toString() : '0',
//             pl3_totalSupply: pl3_totalSupply instanceof BigNumber ? pl3_totalSupply.toString() : '0',
//           }
//           ,
//           p_lockTime: {
//             pl1_lockTime: pl1_lockTime instanceof BigNumber ? pl1_lockTime.toString() : '0',
//             pl2_lockTime: pl2_lockTime instanceof BigNumber ? pl2_lockTime.toString() : '0',
//             pl3_lockTime: pl3_lockTime instanceof BigNumber ? pl3_lockTime.toString() : '0',
//             lockTime: formatTimestampToDateTime(pl1_lockTime instanceof BigNumber ? pl1_lockTime.toNumber() : 0)
//           }
//           ,
//           p_rewardPerTokenStored: {
//             pl1_rewardPerTokenStored: pl1_rewardPerTokenStored instanceof BigNumber ? pl1_rewardPerTokenStored.toString() : '0',
//             pl2_rewardPerTokenStored: pl2_rewardPerTokenStored instanceof BigNumber ? pl2_rewardPerTokenStored.toString() : '0',
//             pl3_rewardPerTokenStored: pl1_rewardPerTokenStored instanceof BigNumber ? pl3_rewardPerTokenStored.toString() : '0',
//           }
//           , p_rewardRate: {
//             pl1_rewardRate: pl1_rewardRate instanceof BigNumber ? pl1_rewardRate.toString() : '0',
//             pl2_rewardRate: pl2_rewardRate instanceof BigNumber ? pl2_rewardRate.toString() : '0',
//             pl3_rewardRate: pl3_rewardRate instanceof BigNumber ? pl3_rewardRate.toString() : '0',
//           }
//           , p_rewardCfx: {
//             pl1_cfx: pl1_cfx instanceof BigNumber ? pl1_cfx.toString() : '0',
//             pl2_cfx: pl2_cfx instanceof BigNumber ? pl2_cfx.toString() : '0',
//             pl3_cfx: pl3_cfx instanceof BigNumber ? pl3_cfx.toString() : '0',
//           },
//           p_hasMint: {
//             pl1_mint: pl1_mint instanceof BigNumber ? pl1_mint.toString() : '0',
//             pl2_mint: pl2_mint instanceof BigNumber ? pl2_mint.toString() : '0',
//             pl3_mint: pl3_mint instanceof BigNumber ? pl3_mint.toString() : '0',
//           }
//         })

        
//         //================================================================
//         if (account) {
//           const abcBanlance = await erc20Contract.balanceOf(account).catch()

//           //锁仓时间
//           let user_poolMints: Contract[] = []
//           for (let index = 1; index <= poolCount; index++) {
//             const model = poolContract.poolMints(index, account).catch()
//             user_poolMints.push(model)
//           }
//           const [u1_mint, u2_mint, u3_mint] = await Promise.all(user_poolMints).catch()

//           //锁仓金额
//           let user_balance: Contract[] = []
//           for (let index = 1; index <= poolCount; index++) {
//             const model = poolContract.balanceOf(account, index).catch()
//             user_balance.push(model)
//           }
//           const [u1_balance, u2_balance, u3_balance] = await Promise.all(user_balance).catch()

//           //在当前池子得到的未领取奖励 cfx
//           let user_poolRewards: Contract[] = []
//           for (let index = 1; index <= poolCount; index++) {
//             const model = poolContract.poolRewardEarned(account, index).catch()
//             user_poolRewards.push(model)
//           }
//           const [u1_poolReward, u2_poolReward, u3_poolReward] = await Promise.all(user_poolRewards).catch()

//           // //在当前池子的累计奖励
//           // let user_totalPoolRewards: Contract[] = []
//           // for (let index = 1; index <= poolCount; index++) {
//           //   const model = poolContract.totalPoolRewards(account, index).catch()
//           //   user_totalPoolRewards.push(model)
//           // }
//           // const [u1_totalPoolReward, u2_totalPoolReward, u3_totalPoolReward] = await Promise.all(user_totalPoolRewards).catch()

//           console.log({
//             name_abc: 'user----------------------------------',
//             abcBanlance: ethers.utils.formatEther(abcBanlance),
//             // stakingAddress,
//             u_mint: {
//               u1_mint: u1_mint instanceof BigNumber ? u1_mint.toString() : '0',
//               u2_mint: pl2_data instanceof BigNumber ? u2_mint.toString() : '0',
//               u3_mint: pl3_data instanceof BigNumber ? u3_mint.toString() : '0',
//             },
//             u_banlance: {
//               u1_balance: u1_balance instanceof BigNumber ? u1_balance.toString() : '0',
//               u2_balance: u2_balance instanceof BigNumber ? u2_balance.toString() : '0',
//               u3_balance: u3_balance instanceof BigNumber ? u3_balance.toString() : '0',
//             },
//             u_poolReward: {
//               u1_poolReward: u1_poolReward instanceof BigNumber ? u1_poolReward.toString() : '0',
//               u2_poolReward: u2_poolReward instanceof BigNumber ? u2_poolReward.toString() : '0',
//               u3_poolReward: u3_poolReward instanceof BigNumber ? u3_poolReward.toString() : '0',
//             },
//             // u_totalPoolReward: {
//             //   u1_totalPoolReward: u1_totalPoolReward instanceof BigNumber ? u1_totalPoolReward.toString() : '0',
//             //   u2_totalPoolReward: u2_totalPoolReward instanceof BigNumber ? u2_totalPoolReward.toString() : '0',
//             //   u3_totalPoolReward: u3_totalPoolReward instanceof BigNumber ? u3_totalPoolReward.toString() : '0',
//             // },


//           })

//           // try {
//           //   if (tasksUser.length > 0) {
//           //     Promise.all(tasksUser).then((taskRs) => {
//           //       const [_abc_balance, _pl1_balance, _pl2_balance, _pl3_balance, _pl4_balance] = taskRs

//           //       set({
//           //         abc_balance: _abc_balance instanceof ethers.BigNumber ? ethers.utils.formatEther(_abc_balance) : '0'
//           //       })

//           //       console.log({
//           //         pl1_balance: _pl1_balance instanceof ethers.BigNumber ? ethers.utils.formatEther(_pl1_balance) : '0',
//           //         pl2_balance: _pl2_balance instanceof ethers.BigNumber ? ethers.utils.formatEther(_pl2_balance) : '0',
//           //         pl3_balance: _pl3_balance instanceof ethers.BigNumber ? ethers.utils.formatEther(_pl3_balance) : '0',
//           //         pl4_balance: _pl4_balance instanceof ethers.BigNumber ? ethers.utils.formatEther(_pl4_balance) : '0',
//           //       })


//           //     }).catch()
//           //   }
//           // } catch (error) {

//           // }

//         } else {

//           if (get().abc_balance) {
//             set({
//               abc_balance: undefined
//             })
//           }
//         }

//         poolArray.push(pool_1)
//         poolArray.push(pool_2)
//         poolArray.push(pool_3)

//         set({
//           pools:poolArray
//         })

//         //================================================================
//         //get abc price
//         try {
//           abc_Price().then((rs) => {
//             set({ abc_Price: rs })
//           }).catch((error: any) => {

//           })
//           // setAbcPrice(abcPrice)

//         } catch (error) {
//           console.debug(`failed to fetch:`, error)
//         }

//         //get cfx price
//         try {
//           CoingeckoPrice('conflux-token').then((rs) => {
//             set({ cfx_Price: rs })
//           }).catch((error: any) => {
//             console.log(`failed to coingecko:`, error)
//           })
//         } catch (error) {
//           console.debug(`failed to coingecko:`, error)
//         }


//       }

//     } catch (error) {

//     }

//   }
// }))



// function secondsToDaysAndMonths(seconds: number) {

//   const secondsInMinute = 60;
//   const secondsInHour = 3600; // 1小时有3600秒
//   const secondsInDay = 86400; // 1天有86400秒
//   const secondsInMonth = 30.44 * secondsInDay; // 一个月大约是30.44天

//   const minutes = Math.floor(seconds / secondsInMinute);
//   const hours = Math.floor(seconds / secondsInHour);
//   const days = Math.floor(seconds / secondsInDay);
//   const months = Math.floor(seconds / secondsInMonth);

//   return { months, days, hours, minutes };
// }

// function formatTimestampToDateTime(timestamp: number) {
//   // 创建一个Date对象，传入时间戳（以毫秒为单位，所以要乘以1000）
//   const date = new Date(timestamp * 1000);

//   // 使用Date对象的方法获取年、月、日、小时、分钟和秒
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1; // 月份从0开始，所以要加1
//   const day = date.getDate();
//   const hours = date.getHours();
//   const minutes = date.getMinutes();
//   // const seconds = date.getSeconds();

//   // 创建一个格式化的时间字符串
//   const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}`;
//   return formattedTime
// }

