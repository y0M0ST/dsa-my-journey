import { describe, it, expect } from 'vitest'
import {
    binarySearchClassic,
    lowerBound,
    upperBound,
    binarySearchOnAnswer,
} from './binary_search.js'

describe('Canonical Binary Search Templates & Variations', () => {
    describe('1. binarySearchClassic', () => {
        const sorted = [1, 3, 5, 7, 9, 11, 13]

        it('tìm thấy phần tử ở đầu mảng', () => {
            expect(binarySearchClassic(sorted, 1)).toBe(0)
        })

        it('tìm thấy phần tử ở giữa mảng', () => {
            expect(binarySearchClassic(sorted, 7)).toBe(3)
        })

        it('tìm thấy phần tử ở cuối mảng', () => {
            expect(binarySearchClassic(sorted, 13)).toBe(6)
        })

        it('trả về -1 khi target nhỏ hơn mọi phần tử trong mảng', () => {
            expect(binarySearchClassic(sorted, 0)).toBe(-1)
        })

        it('trả về -1 khi target lớn hơn mọi phần tử trong mảng', () => {
            expect(binarySearchClassic(sorted, 15)).toBe(-1)
        })

        it('trả về -1 khi target nằm trong khoảng giá trị nhưng không tồn tại', () => {
            expect(binarySearchClassic(sorted, 6)).toBe(-1)
        })

        it('xử lý mảng rỗng [] trả về -1', () => {
            expect(binarySearchClassic([], 5)).toBe(-1)
        })

        it('xử lý mảng 1 phần tử', () => {
            expect(binarySearchClassic([42], 42)).toBe(0)
            expect(binarySearchClassic([42], 99)).toBe(-1)
        })

        it('hoạt động chính xác với mảng chứa số âm', () => {
            const negatives = [-20, -15, -10, -5, 0, 5]
            expect(binarySearchClassic(negatives, -10)).toBe(2)
            expect(binarySearchClassic(negatives, -1)).toBe(-1)
        })
    })

    describe('2. lowerBound (First index where nums[i] >= target)', () => {
        const nums = [1, 2, 4, 4, 4, 6, 8]

        it('tìm vị trí xuất hiện đầu tiên của giá trị trùng lặp', () => {
            // Giá trị 4 xuất hiện tại index 2, 3, 4 -> lowerBound phải trả về 2
            expect(lowerBound(nums, 4)).toBe(2)
        })

        it('trả về index chèn khi target không tồn tại nhưng nằm xen kẽ', () => {
            // target = 3 -> phần tử đầu tiên >= 3 là nums[2] (4) -> trả về 2
            expect(lowerBound(nums, 3)).toBe(2)
            // target = 5 -> phần tử đầu tiên >= 5 là nums[5] (6) -> trả về 5
            expect(lowerBound(nums, 5)).toBe(5)
        })

        it('trả về 0 khi target nhỏ hơn hoặc bằng phần tử nhỏ nhất', () => {
            expect(lowerBound(nums, 1)).toBe(0)
            expect(lowerBound(nums, 0)).toBe(0)
            expect(lowerBound(nums, -10)).toBe(0)
        })

        it('trả về nums.length khi target lớn hơn mọi phần tử', () => {
            expect(lowerBound(nums, 9)).toBe(nums.length)
            expect(lowerBound(nums, 100)).toBe(nums.length)
        })

        it('xử lý mảng rỗng trả về 0', () => {
            expect(lowerBound([], 5)).toBe(0)
        })
    })

    describe('3. upperBound (First index where nums[i] > target)', () => {
        const nums = [1, 2, 4, 4, 4, 6, 8]

        it('trả về index ngay sau phần tử cuối cùng của giá trị trùng lặp', () => {
            // Giá trị 4 xuất hiện tại [2, 3, 4] -> phần tử đầu tiên > 4 là nums[5] (6) -> trả về 5
            expect(upperBound(nums, 4)).toBe(5)
        })

        it('trả về số lượng phần tử <= target khi kết hợp với lowerBound', () => {
            // Đếm tần suất xuất hiện của 4: upperBound(4) - lowerBound(4) = 5 - 2 = 3
            const count = upperBound(nums, 4) - lowerBound(nums, 4)
            expect(count).toBe(3)
        })

        it('trả về 0 khi target nhỏ hơn phần tử nhỏ nhất', () => {
            expect(upperBound(nums, 0)).toBe(0)
            expect(upperBound(nums, -5)).toBe(0)
        })

        it('trả về nums.length khi target lớn hơn hoặc bằng phần tử lớn nhất', () => {
            expect(upperBound(nums, 8)).toBe(nums.length)
            expect(upperBound(nums, 9)).toBe(nums.length)
        })

        it('xử lý mảng rỗng trả về 0', () => {
            expect(upperBound([], 10)).toBe(0)
        })
    })

    describe('4. binarySearchOnAnswer', () => {
        it('tìm căn bậc hai nguyên nhỏ nhất sao cho k^2 >= N (ví dụ N = 50 -> k = 8)', () => {
            const N = 50
            const isFeasible = (k: number) => k * k >= N
            const minK = binarySearchOnAnswer(1, N, isFeasible)
            expect(minK).toBe(8)
            expect(8 * 8).toBeGreaterThanOrEqual(N)
            expect(7 * 7).toBeLessThan(N)
        })

        it('mô phỏng Koko Eating Bananas: tìm tốc độ ăn nhỏ nhất để ăn hết [3, 6, 7, 11] chuối trong 8 giờ', () => {
            const piles = [3, 6, 7, 11]
            const h = 8
            const canFinish = (speed: number) => {
                let hours = 0
                for (const pile of piles) {
                    hours += Math.ceil(pile / speed)
                }
                return hours <= h
            }

            const minSpeed = binarySearchOnAnswer(1, 11, canFinish)
            expect(minSpeed).toBe(4)
        })

        it('xử lý dải giá trị [low, high] khi nghiệm nằm ở đúng biên dưới low', () => {
            const isFeasible = (val: number) => val >= 10
            expect(binarySearchOnAnswer(10, 50, isFeasible)).toBe(10)
        })

        it('xử lý dải giá trị [low, high] khi nghiệm nằm ở đúng biên trên high', () => {
            const isFeasible = (val: number) => val >= 50
            expect(binarySearchOnAnswer(10, 50, isFeasible)).toBe(50)
        })
    })
})
