import { describe, it, expect } from 'vitest'
import { findAnagrams } from './438-find-all-anagrams-in-a-string.js'

describe('Pattern: Sliding_Window -> 438-find-all-anagrams-in-a-string', () => {
    interface TestCase {
        s: string
        p: string
        expected: number[]
        description: string
    }

    const testCases: TestCase[] = [
        // 1. Các ví dụ mẫu chuẩn từ LeetCode
        {
            s: 'cbaebabacd',
            p: 'abc',
            expected: [0, 6],
            description: 'LeetCode Ex 1: Các vị trí bắt đầu anagram của "abc" là [0, 6]',
        },
        {
            s: 'abab',
            p: 'ab',
            expected: [0, 1, 2],
            description: 'LeetCode Ex 2: Cửa sổ trượt gối đầu "ab", "ba", "ab" liên tiếp',
        },

        // 2. Trường hợp biên (Edge cases) cơ bản
        {
            s: 'a',
            p: 'ab',
            expected: [],
            description: 'Edge case: Chuỗi s ngắn hơn p -> không thể có anagram',
        },
        {
            s: '',
            p: 'a',
            expected: [],
            description: 'Edge case: Chuỗi s rỗng -> kết quả là mảng rỗng',
        },
        {
            s: 'a',
            p: 'a',
            expected: [0],
            description: 'Edge case: Chuỗi s và p đều có 1 ký tự giống nhau',
        },
        {
            s: 'a',
            p: 'b',
            expected: [],
            description: 'Edge case: Chuỗi s và p có 1 ký tự nhưng khác nhau',
        },
        {
            s: 'ab',
            p: 'ba',
            expected: [0],
            description: 'Edge case: Chuỗi s và p cùng độ dài 2 và là anagram',
        },
        {
            s: 'ab',
            p: 'cd',
            expected: [],
            description: 'Edge case: Chuỗi s và p cùng độ dài nhưng khác ký tự',
        },

        // 3. Trùng lặp liên tiếp và cửa sổ trượt gối đầu (Overlapping Windows)
        {
            s: 'aaaa',
            p: 'aa',
            expected: [0, 1, 2],
            description: 'Ký tự giống nhau liên tiếp: các cửa sổ [0..1], [1..2], [2..3]',
        },
        {
            s: 'aaaaa',
            p: 'a',
            expected: [0, 1, 2, 3, 4],
            description: 'Tìm ký tự đơn "a" trong chuỗi toàn "a"',
        },
        {
            s: 'aaaaaaaaaa',
            p: 'aaaaa',
            expected: [0, 1, 2, 3, 4, 5],
            description: 'Chuỗi lặp kích thước lớn hơn: 10 chữ "a" với cửa sổ dài 5',
        },

        // 4. Ký tự lạ ngắt quãng cửa sổ (Disjoint Characters / Alien Characters)
        {
            s: 'abcdef',
            p: 'xyz',
            expected: [],
            description: 'Không có bất kỳ ký tự nào chung giữa s và p',
        },
        {
            s: 'abczcba',
            p: 'abc',
            expected: [0, 4],
            description: 'Ký tự lạ "z" ở giữa chia đôi hai vùng anagram hợp lệ',
        },
        {
            s: 'bacxabc',
            p: 'abc',
            expected: [0, 4],
            description: 'Ký tự lạ "x" nằm giữa hai anagram ở đầu và cuối chuỗi',
        },

        // 5. Chuỗi toàn bộ là Anagram hoặc vị trí đặc biệt
        {
            s: 'cba',
            p: 'abc',
            expected: [0],
            description: 'Toàn bộ chuỗi s đúng bằng anagram của p',
        },
        {
            s: 'baa',
            p: 'aa',
            expected: [1],
            description: 'Anagram chỉ xuất hiện ở phần đuôi của s',
        },
        {
            s: 'aab',
            p: 'aa',
            expected: [0],
            description: 'Anagram chỉ xuất hiện ở phần đầu của s',
        },
        {
            s: 'baa',
            p: 'a',
            expected: [1, 2],
            description: 'Tìm "a" ở các vị trí cuối chuỗi "baa"',
        },

        // 6. Tần suất ký tự phức tạp (Multiplicity & Tricky cases)
        {
            s: 'abababab',
            p: 'aaab',
            expected: [],
            description: 'Bẫy số lượng: xen kẽ "ab" không bao giờ gom đủ 3 chữ "a"',
        },
        {
            s: 'aabab',
            p: 'aab',
            expected: [0, 1],
            description: 'Bẫy tần suất: "aab" (0) và "aba" (1) đều là anagram của "aab"',
        },
        {
            s: 'abacbabc',
            p: 'abc',
            expected: [1, 2, 3, 5],
            description: 'Nhiều anagram gối đầu nhau liên tiếp: "bac", "acb", "cba" và "abc"',
        },
        {
            s: 'zyxwvutsrqponmlkjihgfedcba',
            p: 'abcdefghijklmnopqrstuvwxyz',
            expected: [0],
            description: 'Đầy đủ 26 chữ cái tiếng Anh đảo ngược thứ tự',
        },
    ]

    it.each(testCases)('$description (s: "$s", p: "$p" -> expected: $expected)', ({ s, p, expected }) => {
        expect(findAnagrams(s, p)).toEqual(expected)
    })
})
