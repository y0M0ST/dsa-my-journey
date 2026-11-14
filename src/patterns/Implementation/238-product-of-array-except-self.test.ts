import { describe, it, expect } from 'vitest'
import {
    productExceptSelf,
    productExceptSelfOptimal,
    productExceptSelfPrefixSuffix,
} from './238-product-of-array-except-self.js'

describe('Pattern: Implementation -> 238-product-of-array-except-self', () => {
    const implementations = [
        { name: 'productExceptSelf (Default)', fn: productExceptSelf },
        { name: 'productExceptSelfOptimal (O(1) Aux Space)', fn: productExceptSelfOptimal },
        { name: 'productExceptSelfPrefixSuffix (O(N) Aux Space)', fn: productExceptSelfPrefixSuffix },
    ]

    describe.each(implementations)('$name', ({ fn }) => {
        it('tính đúng tích cho mảng dương cơ bản [1, 2, 3, 4] -> [24, 12, 8, 6]', () => {
            expect(fn([1, 2, 3, 4])).toEqual([24, 12, 8, 6])
        })

        it('xử lý chính xác mảng chứa đúng một số 0: [-1, 1, 0, -3, 3] -> [0, 0, 9, 0, 0]', () => {
            expect(fn([-1, 1, 0, -3, 3])).toEqual([0, 0, 9, 0, 0])
        })

        it('xử lý chính xác mảng chứa từ 2 số 0 trở lên (tất cả kết quả phải bằng 0)', () => {
            expect(fn([0, 4, 0])).toEqual([0, 0, 0])
            expect(fn([0, 0])).toEqual([0, 0])
        })

        it('xử lý mảng chỉ có 2 phần tử [5, 10] -> [10, 5]', () => {
            expect(fn([5, 10])).toEqual([10, 5])
        })

        it('xử lý mảng chứa các số âm xen kẽ: [-2, 3, -4] -> [-12, 8, -6]', () => {
            expect(fn([-2, 3, -4])).toEqual([-12, 8, -6])
        })

        it('xử lý mảng toàn số 1', () => {
            expect(fn([1, 1, 1, 1])).toEqual([1, 1, 1, 1])
        })
    })

    describe('Equivalence Check', () => {
        it('hai phương pháp cho kết quả đồng nhất trên các bộ dữ liệu ngẫu nhiên', () => {
            const datasets = [
                [2, 3, 4, 5],
                [1, -1, 1, -1],
                [10, 0, 5, 2],
                [-5, -4, -3, -2, -1],
            ]

            for (const data of datasets) {
                const r1 = productExceptSelfOptimal(data)
                const r2 = productExceptSelfPrefixSuffix(data)
                expect(r1).toEqual(r2)
            }
        })
    })
})
