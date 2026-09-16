/**
 * Problem: 42-trap-rain-water
 * Pattern: Two_Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function trapRainWater(height: number[]): number {
  if (!height || height.length === 0) {
    return 0;
  }
  let left = 0;
  let right = height.length - 1;
  let leftMax = height[left];
  let rightMax = height[right];
  let totalWater = 0;
  while (left < right) {
    if (leftMax < rightMax) {
      left++;
      leftMax = Math.max(leftMax, height[left]);
      totalWater += leftMax - height[left];
    } else {
      right--;
      rightMax = Math.max(rightMax, height[right]);
      totalWater += rightMax - height[right];
    }
  }
  return totalWater;
}

// LC42 — TRAPPING RAIN WATER

// Water at i:
// min(maxLeft, maxRight) - height[i]

// Goal:
// O(N²) → O(N)
// O(N)  → O(1) space

// Variables:
// left
// right
// leftMax
// rightMax
// water

// Start:
// left = 0
// right = n - 1

// Loop:
// while (left < right)

//   If:
//   leftMax <= rightMax
//     ↓
// process left
//     ↓
// leftMax = max(leftMax, height[left])
// water += leftMax - height[left]
// left++

// Else:
// process right
//     ↓
// rightMax = max(rightMax, height[right])
// water += rightMax - height[right]
// right--

// Key invariant:
// leftMax = max seen from left
// rightMax = max seen from right

// Core idea:
// smaller boundary determines water level

