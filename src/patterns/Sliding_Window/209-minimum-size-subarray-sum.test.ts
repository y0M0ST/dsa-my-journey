import { describe, it, expect } from 'vitest'
import { minSubArrayLen } from './209-minimum-size-subarray-sum.js'

describe('Pattern: Sliding_Window -> 209-minimum-size-subarray-sum', () => {
    interface TestCase {
        target: number
        nums: number[]
        expected: number
        description: string
    }

    const testCases: TestCase[] = [
        // 1. Các ví dụ mẫu chuẩn từ LeetCode
        {
            target: 7,
            nums: [2, 3, 1, 2, 4, 3],
            expected: 2,
            description:
                'LeetCode Ex 1: Mảng [2,3,1,2,4,3] với target = 7 -> subarray ngắn nhất là [4,3] độ dài 2',
        },
        {
            target: 4,
            nums: [1, 4, 4],
            expected: 1,
            description: 'LeetCode Ex 2: Mảng [1,4,4] với target = 4 -> phần tử đơn [4] độ dài 1',
        },
        {
            target: 11,
            nums: [1, 1, 1, 1, 1, 1, 1, 1],
            expected: 0,
            description: 'LeetCode Ex 3: Tổng toàn bộ mảng (8) < target (11) -> trả về 0',
        },

        // 2. Trường hợp biên (Edge cases) cơ bản
        {
            target: 5,
            nums: [],
            expected: 0,
            description: 'Edge case: Mảng rỗng -> không có subarray nào, trả về 0',
        },
        {
            target: 5,
            nums: [5],
            expected: 1,
            description: 'Edge case: Mảng 1 phần tử bằng đúng target -> độ dài 1',
        },
        {
            target: 5,
            nums: [9],
            expected: 1,
            description: 'Edge case: Mảng 1 phần tử lớn hơn target -> độ dài 1',
        },
        {
            target: 5,
            nums: [4],
            expected: 0,
            description: 'Edge case: Mảng 1 phần tử nhỏ hơn target -> không đủ, trả về 0',
        },
        {
            target: 10,
            nums: [1, 2, 3, 4],
            expected: 4,
            description: 'Edge case: Tổng toàn bộ mảng vừa khớp đúng target -> độ dài n = 4',
        },
        {
            target: 100,
            nums: [1, 2, 3, 4, 5],
            expected: 0,
            description: 'Edge case: Tổng toàn bộ mảng nhỏ hơn target rất nhiều -> trả về 0',
        },
        {
            target: 1,
            nums: [1, 2, 3],
            expected: 1,
            description:
                'Edge case: Target = 1 với mảng số nguyên dương -> phần tử đơn lẻ đầu tiên đủ luôn',
        },

        // 3. Vị trí của Subarray tối ưu (Position Variations)
        {
            target: 8,
            nums: [8, 1, 2, 3, 4],
            expected: 1,
            description: 'Subarray tối ưu nằm ở ngay đầu mảng [8]',
        },
        {
            target: 15,
            nums: [1, 2, 8, 7, 3, 2],
            expected: 2,
            description: 'Subarray tối ưu [8, 7] nằm ở chính giữa mảng',
        },
        {
            target: 10,
            nums: [1, 2, 3, 4, 10],
            expected: 1,
            description: 'Subarray tối ưu nằm ở cuối mảng [10]',
        },
        {
            target: 7,
            nums: [2, 1, 1, 1, 3, 7],
            expected: 1,
            description: 'Đầu mảng có cửa sổ dài [2,1,1,1,3] nhưng cuối mảng có [7] tối ưu hơn',
        },
        {
            target: 6,
            nums: [6, 1, 1, 1, 1, 2],
            expected: 1,
            description:
                'Đầu mảng có [6] tối ưu ngay từ đầu, sau đó không có subarray nào ngắn hơn',
        },

        // 4. Mảng đặc biệt: Trùng lặp & Đơn điệu (Duplicates & Monotonic properties)
        {
            target: 6,
            nums: [2, 2, 2, 2, 2],
            expected: 3,
            description: 'Mảng các phần tử bằng nhau [2,2,2,2,2], target 6 -> cần 3 phần tử',
        },
        {
            target: 13,
            nums: [1, 2, 3, 4, 5, 6, 7],
            expected: 2,
            description: 'Mảng tăng dần đều: subarray tối ưu ở cuối [6, 7]',
        },
        {
            target: 13,
            nums: [7, 6, 5, 4, 3, 2, 1],
            expected: 2,
            description: 'Mảng giảm dần đều: subarray tối ưu ở đầu [7, 6]',
        },
        {
            target: 5,
            nums: [2, 3, 1, 2, 3, 1],
            expected: 2,
            description: 'Nhiều subarray có cùng độ dài tối thiểu [2,3], [3,1], [2,3]',
        },

        // 5. Co rút cửa sổ mạnh (Fast Shrinking & Large values)
        {
            target: 50,
            nums: [1, 2, 1, 1, 1, 100],
            expected: 1,
            description: 'Số cực lớn ở cuối mảng [100] nuốt trọn cả cửa sổ dài phía trước',
        },
        {
            target: 15,
            nums: [5, 1, 3, 5, 10, 7, 4, 9, 2, 8],
            expected: 2,
            description: 'Mảng nhiều biến động: subarray [10, 7] hoặc [7, 9] cho độ dài 2',
        },
        {
            target: 1000000000,
            nums: [1000000000],
            expected: 1,
            description: 'Giá trị lớn đạt giới hạn 10^9 theo ràng buộc đề bài',
        },
        {
            target: 20,
            nums: [5, 1, 3, 5, 6],
            expected: 5,
            description: 'Cần toàn bộ mảng 5 phần tử để đạt tổng 20',
        },
    ]

    it.each(testCases)(
        '$description (target: $target, nums: $nums -> expected: $expected)',
        ({ target, nums, expected }) => {
            expect(minSubArrayLen(target, nums)).toBe(expected)
        }
    )
})
