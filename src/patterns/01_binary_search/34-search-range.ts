/**
 * Problem: 34-search-range
 * Pattern: 01_binary_search
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 */

export function searchRange(nums: number[], target: number): number[] {
  const findBound = (isFirst: boolean): number => {
    let left: number = 0
    let right: number = nums.length - 1
    let result: number = -1
    while (left <= right) {
      let mid = Math.floor((right + left) / 2)
      if (nums[mid] < target) {
        left = mid + 1
      } else if (nums[mid] > target) {
        right = mid - 1
      } else {
        result = mid
        if (isFirst) {
          right = mid - 1
        } else {
          left = mid + 1
        }
      }
    }
    return result
  }

  const firstPos = findBound(true)
  if (firstPos === -1) {
    return [-1, -1]
  }

  const lastPos = findBound(false)

  return [firstPos, lastPos]
}