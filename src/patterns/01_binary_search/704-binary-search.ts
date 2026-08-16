/**
 * Problem: 704-binary-search
 * Pattern: 01_binary_search
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function binarySearch(nums: number[], item: number): any {
    let left: number = 0
    let right: number = nums.length - 1
    while (left <= right) {
        const mid: number = Math.floor((right - left) / 2)
        const guess = nums[mid]
        if (guess === undefined) break
        if (guess === item) {
            return mid
        } else if (guess < item) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1;
}

