import { describe, it, expect } from 'vitest'
import { maxSlidingWindow } from './239-sliding-window-maximum.js'

describe('Pattern: Sliding_Window -> 239-sliding-window-maximum', () => {
    interface TestCase {
        nums: number[]
        k: number
        expected: number[]
        description: string
    }

    const testCases: TestCase[] = [
        {
            nums: [1, 3, -1, -3, 5, 3, 6, 7],
            k: 3,
            expected: [3, 3, 5, 5, 6, 7],
            description: 'LeetCode Ex 1: Cửa sổ trượt kích thước k = 3',
        },
        {
            nums: [1],
            k: 1,
            expected: [1],
            description: 'LeetCode Ex 2: Mảng 1 phần tử với k = 1',
        },
    ]

    it.each(testCases)(
        '$description (nums: $nums, k: $k -> expected: $expected)',
        ({ nums, k, expected }) => {
            expect(maxSlidingWindow(nums, k)).toEqual(expected)
        }
    )
})
