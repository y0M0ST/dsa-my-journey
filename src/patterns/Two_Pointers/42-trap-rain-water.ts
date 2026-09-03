/**
 * Problem: 42-trap-rain-water
 * Pattern: Two_Pointers
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 */
export function trapRainWater(height: number[]): number | null {
  if (!Array.isArray(height) || height.length === 0) return null;
  if (height.some(h => h < 0)) return null;

  let total = 0;
  for (let i = 0; i < height.length; i++) {
    let leftMax = 0;
    for (let l = 0; l <= i; l++) {
      leftMax = Math.max(leftMax, height[l]);
    }
    let rightMax = 0;
    for (let r = i; r < height.length; r++) {
      rightMax = Math.max(rightMax, height[r]);
    }
    total += Math.min(leftMax, rightMax) - height[i];
  }
  return total;
}
