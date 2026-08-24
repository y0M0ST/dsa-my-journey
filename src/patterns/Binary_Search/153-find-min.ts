/**
 * Problem: 153-find-min
 * Pattern: Binary_Search
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function findMin(nums: number[]): number {
  let left: number = 0
  let right: number = nums.length - 1
  if (nums.length === 0) return 0
  while (left < right) {
    let mid: number = left + Math.floor((right - left) / 2)
    if (nums[mid] > nums[right]) {
      left = mid + 1
    } else {
      right = mid
    }
  }  
  return nums[left]

}
