import { describe, it, expect } from 'vitest'
import {
    longestConsecutive,
    longestConsecutiveSet,
    longestConsecutiveSorting,
} from './128-longest-consecutive-sequence.js'

describe('Pattern: Hash_Map -> 128-longest-consecutive-sequence', () => {
    const implementations = [
        { name: 'longestConsecutive (Default)', fn: longestConsecutive },
        { name: 'longestConsecutiveSet (O(N) Optimal)', fn: longestConsecutiveSet },
        { name: 'longestConsecutiveSorting (O(N log N))', fn: longestConsecutiveSorting },
    ]

    describe.each(implementations)('$name', ({ fn }) => {
        it('tìm đúng chuỗi dài nhất cho mảng chuẩn [100, 4, 200, 1, 3, 2] -> 4 ([1, 2, 3, 4])', () => {
            expect(fn([100, 4, 200, 1, 3, 2])).toBe(4)
        })

        it('tìm đúng chuỗi dài nhất cho mảng có số trùng nhau: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] -> 9', () => {
            expect(fn([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])).toBe(9)
        })

        it('xử lý mảng rỗng [] -> 0', () => {
            expect(fn([])).toBe(0)
        })

        it('xử lý mảng 1 phần tử [42] -> 1', () => {
            expect(fn([42])).toBe(1)
        })

        it('xử lý mảng toàn phần tử trùng lặp [5, 5, 5, 5] -> 1', () => {
            expect(fn([5, 5, 5, 5])).toBe(1)
        })

        it('xử lý mảng chứa các số âm liên tiếp: [-5, -4, -3, 0, 1, 2, -2] -> 4 ([-5, -4, -3, -2])', () => {
            expect(fn([-5, -4, -3, 0, 1, 2, -2])).toBe(4)
        })

        it('xử lý mảng không có chuỗi nào dài hơn 1: [10, 30, 50, 70] -> 1', () => {
            expect(fn([10, 30, 50, 70])).toBe(1)
        })
    })

    describe('Equivalence Check', () => {
        it('hai phương pháp cho ra cùng kết quả trên nhiều bộ dữ liệu thử nghiệm', () => {
            const datasets = [
                [9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6],
                [1, 2, 0, 1],
                [100, 4, 200, 1, 3, 2],
                [-1, -2, -3, -4, -5],
                [10, 20, 30, 40],
            ]

            for (const data of datasets) {
                // clone mảng vì sorting sửa mảng tại chỗ
                const rSet = longestConsecutiveSet([...data])
                const rSort = longestConsecutiveSorting([...data])
                expect(rSet).toBe(rSort)
            }
        })
    })
})
