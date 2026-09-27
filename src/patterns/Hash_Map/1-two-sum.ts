/**
 * Problem: 1-two-sum
 * Pattern: Hash_Map
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]!;
    const complement = target - num;
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(num, i);
  }

  return [];
}
