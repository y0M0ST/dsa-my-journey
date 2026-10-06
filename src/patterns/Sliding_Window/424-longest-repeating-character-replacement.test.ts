import { describe, it, expect } from 'vitest'
import { characterReplacement } from './424-longest-repeating-character-replacement.js'

describe('Pattern: Sliding_Window -> 424-longest-repeating-character-replacement', () => {
    interface TestCase {
        s: string
        k: number
        expected: number
        description: string
    }

    const testCases: TestCase[] = [
        // 1. Các ví dụ mẫu chuẩn từ LeetCode
        {
            s: 'ABAB',
            k: 2,
            expected: 4,
            description: 'LeetCode Ex 1: Thay hai chữ "A" thành "B" (hoặc ngược lại) để thành "BBBB"',
        },
        {
            s: 'AABABBA',
            k: 1,
            expected: 4,
            description: 'LeetCode Ex 2: Thay chữ "B" ở giữa cụm "AABA" thành "A" để thành "AAAA"',
        },

        // 2. Trường hợp biên (Edge cases) cơ bản
        {
            s: '',
            k: 2,
            expected: 0,
            description: 'Edge case: Chuỗi rỗng -> kết quả là 0',
        },
        {
            s: 'A',
            k: 0,
            expected: 1,
            description: 'Edge case: Chuỗi 1 ký tự với k = 0 -> không cần thay thế, độ dài là 1',
        },
        {
            s: 'A',
            k: 1,
            expected: 1,
            description: 'Edge case: Chuỗi 1 ký tự với k = 1 -> độ dài tối đa vẫn là 1',
        },
        {
            s: 'AB',
            k: 1,
            expected: 2,
            description: 'Edge case: Chuỗi 2 ký tự khác nhau, k = 1 -> thay 1 ký tự được 2',
        },

        // 3. Trường hợp k = 0 (Không được phép thay thế bất kỳ ký tự nào)
        {
            s: 'ABBB',
            k: 0,
            expected: 3,
            description: 'Trường hợp k = 0: Chuỗi con ký tự trùng lặp dài nhất là "BBB" (độ dài 3)',
        },
        {
            s: 'AAABBC',
            k: 0,
            expected: 3,
            description: 'Trường hợp k = 0: Chuỗi "AAA" dài nhất (độ dài 3)',
        },
        {
            s: 'ABCDE',
            k: 0,
            expected: 1,
            description: 'Trường hợp k = 0 với các ký tự đều khác nhau -> độ dài 1',
        },

        // 4. Trường hợp k lớn hơn hoặc bằng độ dài chuỗi (Có thể thay thế toàn bộ)
        {
            s: 'ABCDE',
            k: 5,
            expected: 5,
            description: 'Trường hợp k >= s.length: Có thể biến toàn bộ chuỗi thành cùng 1 ký tự',
        },
        {
            s: 'XYZ',
            k: 10,
            expected: 3,
            description: 'Trường hợp k vượt xa s.length -> độ dài tối đa là s.length = 3',
        },

        // 5. Chuỗi toàn bộ ký tự giống nhau hoặc khác nhau hoàn toàn
        {
            s: 'AAAA',
            k: 2,
            expected: 4,
            description: 'Tất cả ký tự giống nhau sẵn: Không tốn lượt thay thế nào, độ dài là 4',
        },
        {
            s: 'BBBBB',
            k: 0,
            expected: 5,
            description: 'Tất cả ký tự giống nhau và k = 0 -> độ dài toàn chuỗi là 5',
        },
        {
            s: 'ABCDE',
            k: 1,
            expected: 2,
            description: 'Tất cả ký tự khác nhau, k = 1 -> chọn bất kỳ 1 ký tự thay thế để đạt độ dài 2',
        },
        {
            s: 'ABCDE',
            k: 2,
            expected: 3,
            description: 'Tất cả ký tự khác nhau, k = 2 -> thay 2 ký tự để đạt độ dài 3',
        },

        // 6. Cửa sổ trượt với nhiều ký tự và phân bố đa dạng
        {
            s: 'BAAAB',
            k: 2,
            expected: 5,
            description: 'Hai ký tự B ở hai đầu, k = 2 -> thay 2 chữ B thành A được chuỗi "AAAAA" độ dài 5',
        },
        {
            s: 'ABBBBA',
            k: 1,
            expected: 5,
            description: 'Ký tự chủ đạo "B" ở giữa (4 chữ B), k = 1 -> mở rộng thêm 1 ký tự bên cạnh thành 5',
        },
        {
            s: 'KAAABBB',
            k: 1,
            expected: 4,
            description: 'Cạnh tranh giữa "AAA" và "BBB", k = 1 -> tối đa tạo được cụm 4',
        },
        {
            s: 'AAAAABBBBCBB',
            k: 4,
            expected: 10,
            description: 'Thay 4 ký tự trong cụm "BBBBCBB" (6 ký tự B) bằng 4 ký tự thay thế đạt 10',
        },
        {
            s: 'EOEMQLLQ',
            k: 2,
            expected: 4,
            description: 'Trường hợp chuỗi ký tự phân tán, k = 2 -> tối đa là 4',
        },

        // 7. Chuỗi xen kẽ lặp lại nhiều lần
        {
            s: 'ABABABAB',
            k: 2,
            expected: 5,
            description: 'Chuỗi xen kẽ "ABABABAB", k = 2 -> tạo được cụm 5 ký tự liên tiếp',
        },
        {
            s: 'AABABAB',
            k: 2,
            expected: 6,
            description: 'Chuỗi "AABABAB", k = 2 -> cụm "AABABA" thay 2 chữ B được "AAAAAA" độ dài 6',
        },
    ]

    it.each(testCases)(
        '$description (s: "$s", k: $k -> expected: $expected)',
        ({ s, k, expected }) => {
            expect(characterReplacement(s, k)).toBe(expected)
        }
    )
})
