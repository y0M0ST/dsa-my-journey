/**
 * Problem: 209-minimum-size-subarray-sum
 * Pattern: Sliding_Window
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function minSubArrayLen(target: number, nums: number[]): number {
    let left = 0
    let currentSum = 0
    let minLen = Infinity

    for (let right = 0; right < nums.length; right++) {
        currentSum += nums[right]!

        while (currentSum >= target) {
            minLen = Math.min(minLen, right - left + 1)
            currentSum -= nums[left]!
            left++
        }
    }

    return minLen === Infinity ? 0 : minLen
}

export const minimumSizeSubarraySum = minSubArrayLen
