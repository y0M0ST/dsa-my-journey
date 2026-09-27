/**
 * Problem: 1929-concatenation-array
 * Pattern: Implementation
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function concatenationArray(nums: number[]): number[] {
  const n = nums.length;
  const newArr: number[] = [];
  for (let i = 0; i < 2 * n; i++) {
    newArr.push(nums[i % n]!);
  }
  return newArr;
}
