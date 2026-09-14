/**
 * Problem: 42-trap-rain-water
 * Pattern: Two_Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function trapRainWater(height: number[]): number {
  if (!height || height.length < 3) return 0;

  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let total = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        total += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        total += rightMax - height[right];
      }
      right--;
    }
  }

  return total;
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

