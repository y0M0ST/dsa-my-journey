/**
 * Problem: 34-search-range
 * Pattern: Binary_Search
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

export function searchRange(nums: number[], target: number): number[] {
  const findBound = (isFirst: boolean): number => {
    let left: number = 0;
    let right: number = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid: number = left + Math.floor((right - left) / 2);
      if (nums[mid]! < target) {
        left = mid + 1;
      } else if (nums[mid]! > target) {
        right = mid - 1;
      } else {
        result = mid;
        if (isFirst) {
          right = mid - 1;
        } else {
          left = mid + 1;
        }
      }
    }
    return result;
  };

  const firstPos = findBound(true);
  if (firstPos === -1) return [-1, -1];
  const lastPos = findBound(false);
  return [firstPos, lastPos];
}