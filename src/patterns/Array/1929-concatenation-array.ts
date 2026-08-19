/**
 * Problem: 1929-concatenation-array
 * Pattern: Array
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 */
export function concatenationArray(nums: number[]): number[] {
  //Method 1. Oh yeahhh, with JS/TS I use spread oprator, I solve this problem in a single line of code
  // return [...nums, ...nums]
  // :)))) uh-huhhh so very very fastttt, but coding interview, i dont use this way :v
  // Method 2. I use classic way
  let newArr: number[] = []
  for (let i = 0; i < nums.length; i++) {
    newArr[i] = nums[i]!
    newArr[i + nums.length]! = nums[i]!
  }
  return newArr
  // alright, that so basic !!!

}
