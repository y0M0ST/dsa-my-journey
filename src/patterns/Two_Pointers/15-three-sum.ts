/**
 * Problem: 15-three-sum
 * Pattern: Two_Pointers
 * Time Complexity: O(n²)
 * Space Complexity: O(1) - Auxiliary space (excluding output array)
 */
export function threeSum(nums: number[]): number[][] {
  const snums: number[] = nums.sort((a, b) => a - b);
  const result: number[][] = [];

  for (let i = 0; i < snums.length - 2; i++) {
    if (snums[i]! > 0) break;
    if (i > 0 && snums[i] === snums[i - 1]) continue;

    let left: number = i + 1;
    let right: number = snums.length - 1;
    const target: number = -snums[i]!;

    while (left < right) {
      const sum: number = snums[left]! + snums[right]!;
      if (sum === target) {
        result.push([snums[i]!, snums[left]!, snums[right]!]);
        while (left < right && snums[left] === snums[left + 1]) {
          left++;
        }
        while (left < right && snums[right] === snums[right - 1]) {
          right--;
        }
        left++;
        right--;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}

