/**
 * Problem: 121-buy-sell-stock
 * Pattern: Sliding_Window
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function buySellStock(prices: number[]): number {
  let minPrice: number = Infinity
  let maxProfit: number = 0
  if(prices.length === 0) return 0
  for (let i = 0; i < prices.length; i++) {
    if (prices[i]! < minPrice) {
      minPrice = prices[i]!
    } else {
      let currentProfit = prices[i]! - minPrice
      if (currentProfit > maxProfit)
        maxProfit = currentProfit
    }
  }
  return maxProfit;
}
