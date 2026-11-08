import { describe, it, expect } from 'vitest'
import {
    searchMatrix,
    searchMatrixFlattened,
    searchMatrixTwoPass,
    searchMatrixStaircase,
} from './74-search-a-2d-matrix.js'

describe('Pattern: Binary_Search -> 74-search-a-2d-matrix', () => {
    const matrixStandard = [
        [1, 3, 5, 7],
        [10, 11, 16, 20],
        [23, 30, 34, 60],
    ]

    const implementations = [
        { name: 'searchMatrix (Default)', fn: searchMatrix },
        { name: 'searchMatrixFlattened (Virtual 1D)', fn: searchMatrixFlattened },
        { name: 'searchMatrixTwoPass (Row + Col BS)', fn: searchMatrixTwoPass },
        { name: 'searchMatrixStaircase (Staircase Search)', fn: searchMatrixStaircase },
    ]

    describe.each(implementations)('$name', ({ fn }) => {
        it('tìm thấy số 3 tồn tại trong ma trận chuẩn', () => {
            expect(fn(matrixStandard, 3)).toBe(true)
        })

        it('trả về false khi số 13 không tồn tại trong ma trận chuẩn', () => {
            expect(fn(matrixStandard, 13)).toBe(false)
        })

        it('xử lý ma trận 1x1 [ [1] ] tìm 1 và 0', () => {
            expect(fn([[1]], 1)).toBe(true)
            expect(fn([[1]], 0)).toBe(false)
            expect(fn([[1]], 2)).toBe(false)
        })

        it('xử lý ma trận 1 hàng nhiều cột [ [1, 3, 5, 7] ]', () => {
            expect(fn([[1, 3, 5, 7]], 5)).toBe(true)
            expect(fn([[1, 3, 5, 7]], 4)).toBe(false)
        })

        it('xử lý ma trận nhiều hàng 1 cột [ [1], [3], [5] ]', () => {
            expect(fn([[1], [3], [5]], 3)).toBe(true)
            expect(fn([[1], [3], [5]], 2)).toBe(false)
        })

        it('tìm thấy phần tử ở các vị trí góc biên cực trị (Góc trên-trái, Góc dưới-phải)', () => {
            expect(fn(matrixStandard, 1)).toBe(true)
            expect(fn(matrixStandard, 60)).toBe(true)
        })

        it('trả về false khi target nhỏ hơn số nhỏ nhất hoặc lớn hơn số lớn nhất', () => {
            expect(fn(matrixStandard, -10)).toBe(false)
            expect(fn(matrixStandard, 100)).toBe(false)
        })
    })

    describe('3-way Equivalence Check', () => {
        it('cả 3 phương pháp cho ra kết quả đồng nhất trên mọi target', () => {
            const targets = [-1, 1, 2, 3, 5, 7, 8, 10, 11, 16, 17, 20, 23, 30, 34, 50, 60, 61]
            for (const t of targets) {
                const f = searchMatrixFlattened(matrixStandard, t)
                const p = searchMatrixTwoPass(matrixStandard, t)
                const s = searchMatrixStaircase(matrixStandard, t)

                expect(f).toBe(p)
                expect(s).toBe(p)
            }
        })
    })
})
