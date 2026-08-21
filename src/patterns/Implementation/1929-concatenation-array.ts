/**
 * Problem: 1929-concatenation-array
 * Pattern: Implementation
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
export function concatenationArray(nums: number[]): number[] {
  //Method 1. Oh yeahhh, with JS/TS I use spread oprator, I solve this problem in a single line of code
  // return [...nums, ...nums]
  // :)))) uh-huhhh so very very fastttt, but coding interview, i dont use this way :v
  // Method 2. I use classic way
  // let newArr: number[] = []
  // for (let i = 0; i < nums.length; i++) {
  //   newArr[i] = nums[i]!
  //   newArr[i + nums.length] = nums[i]!
  // }
  // return newArr
  // alright, that so basic !!!
  // Method 3. I use Dynamic Array
  // With Dynamic Array 2 have two mini method
  // 3.1. I use two loop to solved
  // let newArr: number[] = []
  // for (let j = 0; j < 2; j++){
  //   for (let i = 0; i < nums.length; i++){
  //     newArr.push(nums[i]!)
  //   }
  // }
  // return newArr
  // 3.2. I use only 1 loop
  let newArr: number[] = []
  for (let i = 0; i < 2 * nums.length; i++){
    newArr.push(nums[i % nums.length]!)
  }
  return newArr
}
