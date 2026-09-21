/**
 * Problem: 11-ship-within-days
 * Pattern: Binary_Search
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 */
export function shipWithinDays(weights: number[], days: number): number {
  // Khoảng tìm kiếm: 
  // - Tối thiểu (low) phải bằng gói hàng nặng nhất để có thể chở được nó.
  // - Tối đa (high) là tổng tất cả các gói hàng (chở hết trong 1 ngày).
  let low = Math.max(...weights);
  let high = weights.reduce((sum, w) => sum + w, 0);
  let result = high;

  // Hàm kiểm tra xem với sức chứa 'capacity' thì có thể giao hết trong 'days' ngày không
  const canShip = (capacity: number): boolean => {
    let currentDays = 1;
    let currentWeight = 0;

    for (const weight of weights) {
      if (currentWeight + weight > capacity) {
        currentDays++;
        currentWeight = 0; // Chuyển sang ngày mới
      }
      currentWeight += weight;
    }

    return currentDays <= days;
  };

  // Tìm kiếm nhị phân
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);

    if (canShip(mid)) {
      result = mid;       // Thu hẹp phạm vi để tìm sức chứa nhỏ hơn
      high = mid - 1;
    } else {
      low = mid + 1;      // Sức chứa quá nhỏ, cần tăng lên
    }
  }

  return result;
}