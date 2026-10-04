import { describe, it, expect } from 'vitest'
import { minSubArrayLen } from './209-minimum-size-subarray-sum.js'

describe('Pattern: Sliding_Window -> 209-minimum-size-subarray-sum', () => {
    it('LeetCode Ex 1: target = 7, nums = [2,3,1,2,4,3] -> 2', () => {
        expect(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])).toBe(2)
    })

    it('LeetCode Ex 2: target = 4, nums = [1,4,4] -> 1', () => {
        expect(minSubArrayLen(4, [1, 4, 4])).toBe(1)
    })

    it('LeetCode Ex 3: target = 11, nums = [1,1,1,1,1,1,1,1] -> 0', () => {
        expect(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1])).toBe(0)
    })
})
