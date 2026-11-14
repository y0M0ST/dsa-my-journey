import { describe, it, expect } from 'vitest'
import {
    isAnagram,
    isAnagramCount,
    isAnagramSorting,
    isAnagramMap,
} from './242-valid-anagram.js'

describe('Pattern: Hash_Map -> 242-valid-anagram', () => {
    const implementations = [
        { name: 'isAnagram (Default)', fn: isAnagram },
        { name: 'isAnagramCount (O(1) Memory Buffer)', fn: isAnagramCount },
        { name: 'isAnagramSorting (Baseline)', fn: isAnagramSorting },
        { name: 'isAnagramMap (Unicode Map)', fn: isAnagramMap },
    ]

    describe.each(implementations)('$name', ({ fn }) => {
        it('trả về true cho cặp anagram tiêu chuẩn: s = "anagram", t = "nagaram"', () => {
            expect(fn('anagram', 'nagaram')).toBe(true)
        })

        it('trả về false cho cặp không phải anagram: s = "rat", t = "car"', () => {
            expect(fn('rat', 'car')).toBe(false)
        })

        it('trả về false ngay khi độ dài 2 chuỗi khác nhau: s = "a", t = "ab"', () => {
            expect(fn('a', 'ab')).toBe(false)
            expect(fn('abc', 'ab')).toBe(false)
        })

        it('xử lý chuỗi rỗng: s = "", t = "" -> true', () => {
            expect(fn('', '')).toBe(true)
        })

        it('xử lý chuỗi 1 ký tự', () => {
            expect(fn('z', 'z')).toBe(true)
            expect(fn('z', 'x')).toBe(false)
        })

        it('xử lý các từ có số lượng ký tự lặp lại khác nhau: s = "aa", t = "a"', () => {
            expect(fn('aa', 'a')).toBe(false)
            expect(fn('aacc', 'ccaa')).toBe(true)
        })
    })

    describe('Unicode & Equivalence Checks', () => {
        it('isAnagramMap hỗ trợ các ký tự Unicode tiếng Việt hoặc biểu tượng', () => {
            expect(isAnagramMap('hà nội', 'nội hà')).toBe(true)
            expect(isAnagramMap('🚀⭐', '⭐🚀')).toBe(true)
        })

        it('các phương pháp đồng nhất kết quả trên các trường hợp ASCII chuẩn', () => {
            const pairs: [string, string][] = [
                ['listen', 'silent'],
                ['hello', 'world'],
                ['fluster', 'restful'],
                ['apple', 'pale'],
                ['aabbcc', 'bbaacc'],
            ]

            for (const [s, t] of pairs) {
                expect(isAnagramCount(s, t)).toBe(isAnagramSorting(s, t))
                expect(isAnagramCount(s, t)).toBe(isAnagramMap(s, t))
            }
        })
    })
})
