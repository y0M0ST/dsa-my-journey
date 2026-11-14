import { describe, it, expect } from 'vitest'
import {
    hammingWeight,
    hammingWeightKernighan,
    hammingWeightShift,
    hammingWeightBitHacks,
} from './191-number-of-1-bits.js'

describe('Pattern: Bitwise_Manipulation -> 191-number-of-1-bits', () => {
    const implementations = [
        { name: 'hammingWeight (Default)', fn: hammingWeight },
        { name: 'hammingWeightKernighan (O(K))', fn: hammingWeightKernighan },
        { name: 'hammingWeightShift (O(32))', fn: hammingWeightShift },
        { name: 'hammingWeightBitHacks (SWAR O(1))', fn: hammingWeightBitHacks },
    ]

    describe.each(implementations)('$name', ({ fn }) => {
        it('đếm đúng số lượng bit 1 cho số 11 (nhị phân 1011 -> 3 bits)', () => {
            expect(fn(11)).toBe(3)
        })

        it('đếm đúng số lượng bit 1 cho số 128 (nhị phân 10000000 -> 1 bit)', () => {
            expect(fn(128)).toBe(1)
        })

        it('đếm đúng số lượng bit 1 cho số 0 (không có bit nào bật -> 0 bit)', () => {
            expect(fn(0)).toBe(0)
        })

        it('đếm đúng cho số 2147483645 (nhị phân có 30 bits 1)', () => {
            expect(fn(2147483645)).toBe(30)
        })

        it('đếm đúng cho mặt nạ toàn bộ 32 bits bật 0xFFFFFFFF (4294967295 -> 32 bits)', () => {
            expect(fn(0xffffffff)).toBe(32)
        })

        it('xử lý chính xác các lũy thừa của 2 (powers of two)', () => {
            for (let i = 0; i < 31; i++) {
                expect(fn(1 << i)).toBe(1)
            }
        })
    })

    describe('3-way Equivalence & Consistency Check', () => {
        it('cả 3 phương pháp cho ra cùng một kết quả trên tập mẫu đa dạng', () => {
            const numbers = [0, 1, 2, 3, 7, 15, 255, 1023, 65535, 12345678, 0xaaaaaaaa, 0x55555555]
            for (const n of numbers) {
                const k = hammingWeightKernighan(n)
                const s = hammingWeightShift(n)
                const b = hammingWeightBitHacks(n)

                expect(k).toBe(s)
                expect(b).toBe(s)
            }
        })
    })
})
