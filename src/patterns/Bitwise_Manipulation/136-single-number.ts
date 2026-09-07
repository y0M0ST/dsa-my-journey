/**
 * Problem: 136-single-number
 * Pattern: Bitwise_Manipulation
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function singleNumber(nums: number[]): number {
  let result = 0;
  for (let num of nums) {
    result ^= num;
  }
  return result;
}
