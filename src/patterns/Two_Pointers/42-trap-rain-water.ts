/**
 * Problem: 42-trap-rain-water
 * Pattern: Two_Pointers
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 */
export function trapRainWater(height: number[]): number | null {
  if (!Array.isArray(height) || height.length === 0) return null;
  if (height.some(h => h < 0)) return null;

  const n = height.length;
  const leftMax: number[] = new Array(n).fill(0);
  const rightMax: number[] = new Array(n).fill(0);

  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i]);
  }

  rightMax[n - 1] = height[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i]);
  }

  let total = 0;
  for (let i = 0; i < n; i++) {
    total += Math.min(leftMax[i], rightMax[i]) - height[i];
  }
  return total;
}
