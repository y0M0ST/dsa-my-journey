import { describe, it, expect } from 'vitest'
import {
    countBits,
    countBitsDPLeastSignificant,
    countBitsDPKernighan,
    countBitsNaive,
} from './338-counting-bits.js'

describe('Pattern: Bitwise_Manipulation -> 338-counting-bits', () => {
    const implementations = [
        { name: 'countBits (Default)', fn: countBits },
        { name: 'countBitsDPLeastSignificant (DP LSB O(N))', fn: countBitsDPLeastSignificant },
        { name: 'countBitsDPKernighan (DP Kernighan O(N))', fn: countBitsDPKernighan },
        { name: 'countBitsNaive (O(N log N))', fn: countBitsNaive },
    ]

    describe.each(implementations)('$name', ({ fn }) => {
        it('tính đúng số lượng bit cho n = 2: [0, 1, 1]', () => {
            expect(fn(2)).toEqual([0, 1, 1])
        })

        it('tính đúng số lượng bit cho n = 5: [0, 1, 1, 2, 1, 2]', () => {
            expect(fn(5)).toEqual([0, 1, 1, 2, 1, 2])
        })

        it('xử lý giá trị biên n = 0: [0]', () => {
            expect(fn(0)).toEqual([0])
        })

        it('xử lý giá trị biên n = 1: [0, 1]', () => {
            expect(fn(1)).toEqual([0, 1])
        })

        it('xử lý n là lũy thừa của 2 (n = 16)', () => {
            const res = fn(16)
            expect(res.length).toBe(17)
            expect(res[16]).toBe(1)
            expect(res[15]).toBe(4) // 15 = 1111_2 -> 4 bits
        })
    })

    describe('3-way Equivalence Check', () => {
        it('cả 3 phương pháp cho ra cùng một mảng kết quả với n = 100', () => {
            const resLSB = countBitsDPLeastSignificant(100)
            const resKernighan = countBitsDPKernighan(100)
            const resNaive = countBitsNaive(100)

            expect(resLSB).toEqual(resKernighan)
            expect(resLSB).toEqual(resNaive)
        })
    })
})
