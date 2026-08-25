/**
 * Problem: 875-koko-eating-bananas
 * Pattern: Binary_Search
 * Time Complexity: O(nlogn)
 * Space Complexity: O(1)
 */
export function kokoEatingBananas(piles: number[], h: number): number {
  const checkSpeed = (k: number): boolean => {
    let totalHours = 0
    for (let pile of piles) {
      let time: number = Math.ceil(pile / k)
      totalHours += time
    }
    return totalHours <= h
  }
  let left: number = 1
  let right: number = Math.max(...piles)

  while (left <= right) {
    let mid: number = left + Math.floor((right - left) / 2)
    if (checkSpeed(mid)) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }

  
  return left;
}
