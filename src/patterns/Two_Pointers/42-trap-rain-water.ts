/**
 * Problem: 42-trap-rain-water
 * Pattern: Two_Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Invariant & Core Intuition:
 * - Nuoc dong tai vi tri i: min(leftMax, rightMax) - height[i]
 * - Ranh gioi ben thap hon se quyet dinh muc nuoc dong, vi vay ta duyet tu ben thap hon.
 * - leftMax: Cot cao nhat tu trai qua; rightMax: Cot cao nhat tu phai qua.
 */
export function trapRainWater(height: number[]): number {
  if (!height || height.length === 0) {
    return 0;
  }
  let left = 0;
  let right = height.length - 1;
  let leftMax = height[left]!;
  let rightMax = height[right]!;
  let totalWater = 0;

  while (left < right) {
    if (leftMax < rightMax) {
      left++;
      leftMax = Math.max(leftMax, height[left]!);
      totalWater += leftMax - height[left]!;
    } else {
      right--;
      rightMax = Math.max(rightMax, height[right]!);
      totalWater += rightMax - height[right]!;
    }
  }
  return totalWater;
}
