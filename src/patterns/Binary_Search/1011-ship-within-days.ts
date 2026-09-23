/**
 * Problem: 1011-ship-within-days
 * Pattern: Binary_Search
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 */
export function shipWithinDays(weights: number[], days: number): number {
  let low = Math.max(...weights);
  let high = weights.reduce((sum, w) => sum + w, 0);
  let result = high;
  const canShip = (capacity: number): boolean => {
    let currentDays = 1;
    let currentWeight = 0;

    for (const weight of weights) {
      if (currentWeight + weight > capacity) {
        currentDays++;
        currentWeight = 0; 
      }
      currentWeight += weight;
    }

    return currentDays <= days;
  };

  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);

    if (canShip(mid)) {
      result = mid;       
      high = mid - 1;
    } else {
      low = mid + 1;    
    }
  }

  return result;
}