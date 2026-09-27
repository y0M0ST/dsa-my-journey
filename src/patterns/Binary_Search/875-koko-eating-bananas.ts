/**
 * Problem: 875-koko-eating-bananas
 * Pattern: Binary_Search
 * Time Complexity: O(n * log(M)) - With n = piles.length, M = max(piles)
 * Space Complexity: O(1)
 */
export function kokoEatingBananas(piles: number[], h: number): number {
  const checkSpeed = (k: number): boolean => {
    let totalHours = 0;
    for (const pile of piles) {
      const time: number = Math.ceil(pile / k);
      totalHours += time;
    }
    return totalHours <= h;
  };

  let left: number = 1;
  let right: number = Math.max(...piles);

  while (left <= right) {
    const mid: number = left + Math.floor((right - left) / 2);
    if (checkSpeed(mid)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
