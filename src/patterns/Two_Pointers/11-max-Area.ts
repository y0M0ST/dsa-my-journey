/**
 * Problem: 11-max-Area
 * Pattern: Two_Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function maxArea(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const currentWidth = right - left;
    const currentHeight = Math.min(height[left], height[right]);
    const currentWater = currentWidth * currentHeight;

    maxWater = Math.max(maxWater, currentWater);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}

