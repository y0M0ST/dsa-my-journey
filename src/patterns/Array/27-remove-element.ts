/**
 * Problem: 27-remove-element
 * Pattern: Array
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 */
export function removeElement(nums: number[], val: number): number {
  if (nums.length === 0) return 0
  let slow: number = 0
  for (let fast: number = 0; fast < nums.length; fast++) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast]!
      slow++
    }
  }
  return slow
};
