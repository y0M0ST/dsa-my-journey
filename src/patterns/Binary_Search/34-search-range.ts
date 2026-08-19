/**
 * Problem: 34-search-range
 * Pattern: 01_binary_search
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
 */

export function searchRange(nums: number[], target: number): number[] {
  const findBound = (isFirst: boolean): number=> {
    let left: number = 0
    let right: number = nums.length - 1 //Because in array the first element has index 0
    let result = -1 //Default we can't not find anything
    while (left <= right) {
      let mid: number = Math.floor((right + left) / 2)
      //(7+0) / 2 = 3,5 => So i use method floor of Math to set 3.5 to 3
      if (nums[mid]! < target) {
        left = mid + 1 //move to right
      } else if (nums[mid]! > target) {
        right = mid - 1 //move to left
      } else {
        result = mid //We don't return mid here like like traditional Binary Search algorithm
        if (isFirst) { //And at here we countinue find the target number because we not sure that the target number is only one in array
          right = mid - 1
        } else {
          left = mid + 1
        }
      }
    }
    return result
  }

  const firstPos = findBound(true)
  if (firstPos === -1) return [-1, -1]
  const lastPos = findBound(false)
  return [firstPos, lastPos]


  // ! Tip: Another way to handle warning from TS at line 16 and 18 of this file
  // const val = nums[mid]
  // if (val === undefined) break // hoặc const val = nums[mid]!
  // if (val < target) { ... }

}