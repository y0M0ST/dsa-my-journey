import { describe, it, expect } from 'vitest'
import {
    groupAnagrams,
    groupAnagramsSorting,
    groupAnagramsCount,
    groupAnagramsPrime,
} from './49-group-anagrams.js'

/**
 * Helper chuẩn hóa kết quả nhóm để so sánh không phụ thuộc thứ tự:
 * Mỗi nhóm được sort các từ, và toàn bộ danh sách nhóm được sort theo từ đầu tiên.
 */
function normalizeGroups(groups: string[][]): string[][] {
    return groups
        .map((group) => [...group].sort())
        .sort((a, b) => (a[0] || '').localeCompare(b[0] || ''))
}

describe('Pattern: Hash_Map -> 49-group-anagrams', () => {
    const implementations = [
        { name: 'groupAnagrams (Default)', fn: groupAnagrams },
        { name: 'groupAnagramsSorting (O(N * K log K))', fn: groupAnagramsSorting },
        { name: 'groupAnagramsCount (O(N * K))', fn: groupAnagramsCount },
        { name: 'groupAnagramsPrime (Prime Factorization)', fn: groupAnagramsPrime },
    ]

    describe.each(implementations)('$name', ({ fn }) => {
        it('nhóm chính xác các từ hoán vị cơ bản trong ví dụ LeetCode 1', () => {
            const input = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
            const expected = [['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']]
            expect(normalizeGroups(fn(input))).toEqual(normalizeGroups(expected))
        })

        it('xử lý chuỗi rỗng [""]', () => {
            const input = ['']
            const expected = [['']]
            expect(normalizeGroups(fn(input))).toEqual(normalizeGroups(expected))
        })

        it('xử lý chuỗi một ký tự ["a"]', () => {
            const input = ['a']
            const expected = [['a']]
            expect(normalizeGroups(fn(input))).toEqual(normalizeGroups(expected))
        })

        it('xử lý mảng gồm nhiều từ không có hoán vị nào trùng nhau', () => {
            const input = ['abc', 'def', 'ghi']
            const expected = [['abc'], ['def'], ['ghi']]
            expect(normalizeGroups(fn(input))).toEqual(normalizeGroups(expected))
        })

        it('xử lý các từ chứa ký tự lặp lại (kiểm tra delimiter trap & prime exponent)', () => {
            const input = ['bdddddddddd', 'bbbbbbbbbbc', 'cbbbbbbbbbb', 'ddddddddddb']
            const expected = [
                ['bbbbbbbbbbc', 'cbbbbbbbbbb'],
                ['bdddddddddd', 'ddddddddddb'],
            ]
            expect(normalizeGroups(fn(input))).toEqual(normalizeGroups(expected))
        })

        it('xử lý các từ dài kiểm tra BigInt an toàn chống tràn số với Prime factorization', () => {
            const input = ['zzzzzzzzzz', 'zzzzzzzzzz', 'aaaaaaaaaa']
            const expected = [['aaaaaaaaaa'], ['zzzzzzzzzz', 'zzzzzzzzzz']]
            expect(normalizeGroups(fn(input))).toEqual(normalizeGroups(expected))
        })
    })

    describe('3-way Equivalence & Algorithmic Consistency', () => {
        it('cả 3 phương pháp cho ra kết quả đồng nhất trên tập dữ liệu đa dạng', () => {
            const dataset = [
                'listen',
                'silent',
                'enlist',
                'rat',
                'tar',
                'art',
                'hello',
                'world',
                '',
                'a',
                'b',
                'ab',
                'ba',
            ]
            const resSorting = normalizeGroups(groupAnagramsSorting(dataset))
            const resCount = normalizeGroups(groupAnagramsCount(dataset))
            const resPrime = normalizeGroups(groupAnagramsPrime(dataset))

            expect(resCount).toEqual(resSorting)
            expect(resPrime).toEqual(resSorting)
        })
    })
})
