/**
 * Problem: 26-remove-duplicates-from-sorted-array
 * Pattern: Two Pointers
 * Time Complexity: O(N)
 * Space Complexity: O(1) - In-place modification
 */
export function removeDuplicates(nums: number[]): number {
  if (nums.length === 0) return 0
  let slow: number = 1
  for (let fast: number = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[fast - 1]) {
      nums[slow] = nums[fast]!
      slow++
    }
  }
  return slow
}
