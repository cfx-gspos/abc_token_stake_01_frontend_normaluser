
export interface EarnedData {
    name: string;
    amount: string;
}

export interface LPTokenInfo {
    name: string;
    decimals: number; 
    isActive: boolean;
    type: string;
    earned: EarnedData[];
    symbols: string[];
    addLiquidity?:string;
};


export const configLPTokenInfo: Record<string, LPTokenInfo> = {
    // ['0x905dfcd5649217c42684f23958568e533c711aa3']: {
    //     name: 'ETH-USDC',
    //     symbols: ['eth', 'usdc'],
    //     decimals: 18, 
    //     isActive: true,
    //     type: 'Auto-Compounding',
    //     earned: [{ name: 'OFI', amount: '0' }],
    //     addLiquidity:'https://www.sushi.com/earn/42161:0x905dfcd5649217c42684f23958568e533c711aa3/add',
    // }

     ['0x6d2faf643fe564e0204f35e38d1a1b08d9620d14']: {
        name: 'ETH-UNI',
        symbols: ['eth', 'uni'],
        decimals: 18, 
        isActive: true,
        type: 'Auto-Compounding',
        earned: [{ name: 'OFI', amount: '0' }],
        addLiquidity:'https://app.sushi.com/legacy/add/ETH/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984?chainId=5',
    }

}


export interface TokenInfo {
    address: string;
    decimals: number; 
    symbols: string;
};

export const configTokenInfo:Record<string, TokenInfo>={
    // ["ETH"]:{
    //     address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    //     decimals: 18,
    //     symbols: 'eth',
    // },
    // ["USDC"]:{
    //     address: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    //     decimals: 6,
    //     symbols: 'usdc',
    // }

    ["ETH"]:{
        address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
        decimals: 18,
        symbols: 'eth',
    },
    ["UNI"]:{
        address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
        decimals: 18,
        symbols: 'uni',
    }
}