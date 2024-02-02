import axios from "axios";

/**
 * 
 * @param apiId  Coingecko API_ID
 * @returns 
 */
export async function CoingeckoPrice(apiId: string) {
    if (!apiId) return 0;
    try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(
            apiId
        )}&vs_currencies=usd`
        return (await axios.get(url)).data[apiId].usd
    } catch (error) {
        return 0;
    }

}

/**
 * 
 * @returns 
 */
export async function abc_Price() {
    const abcPrice = await fetch('https://confluxpos.cn/abc_price.json', { credentials: 'omit' }).then(response => response.json())
    return abcPrice['price']
}