import { describe, it, expect } from 'vitest'
import {
    checkInclusion,
    checkInclusionMatches,
    checkInclusionArrayCompare,
} from './567-permutation-in-string.js'

describe('Pattern: Sliding_Window -> 567-permutation-in-string', () => {
    const implementations = [
        { name: 'checkInclusion (Default)', fn: checkInclusion },
        { name: 'checkInclusionMatches (O(1) Step Update)', fn: checkInclusionMatches },
        { name: 'checkInclusionArrayCompare (Baseline)', fn: checkInclusionArrayCompare },
    ]

    describe.each(implementations)('$name', ({ fn }) => {
        it('trả về true khi s2 chứa hoán vị của s1 ở đầu chuỗi (ví dụ: s1 = "ab", s2 = "eidbaooo")', () => {
            expect(fn('ab', 'eidbaooo')).toBe(true)
        })

        it('trả về false khi s2 không chứa hoán vị của s1 (ví dụ: s1 = "ab", s2 = "eidboaoo")', () => {
            expect(fn('ab', 'eidboaoo')).toBe(false)
        })

        it('trả về false khi s1 dài hơn s2', () => {
            expect(fn('hello', 'hi')).toBe(false)
        })

        it('trả về true khi hai chuỗi giống hệt nhau', () => {
            expect(fn('abc', 'abc')).toBe(true)
        })

        it('trả về true khi s2 là chuỗi đảo ngược chính xác của s1', () => {
            expect(fn('abcdef', 'fedcba')).toBe(true)
        })

        it('xử lý chuỗi một ký tự', () => {
            expect(fn('a', 'a')).toBe(true)
            expect(fn('a', 'b')).toBe(false)
            expect(fn('z', 'xyz')).toBe(true)
        })

        it('xử lý chuỗi có các ký tự trùng lặp dày đặc', () => {
            expect(fn('adc', 'dcda')).toBe(true)
            expect(fn('hello', 'ooolleoooleh')).toBe(false)
            expect(fn('abb', 'bba')).toBe(true)
        })
    })

    describe('Equivalence Check', () => {
        it('cả hai phương pháp đồng nhất kết quả trên các trường hợp biên ngẫu nhiên', () => {
            const cases = [
                ['ab', 'eidbaooo'],
                ['ab', 'eidboaoo'],
                ['ky', 'ainwkbykoolp'],
                ['a', 'b'],
                ['rv', 'wrv'],
                ['trinitrophenylmethylnitramine', 'dinitrophenylhydrazine'],
            ]

            for (const [s1, s2] of cases) {
                expect(checkInclusionMatches(s1!, s2!)).toBe(checkInclusionArrayCompare(s1!, s2!))
            }
        })
    })
})
