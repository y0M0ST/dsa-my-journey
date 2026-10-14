import { describe, it, expect } from 'vitest'
import { maxSlidingWindow } from './239-sliding-window-maximum.js'

describe('Pattern: Sliding_Window -> 239-sliding-window-maximum', () => {
    interface TestCase {
        nums: number[]
        k: number
        expected: number[]
        description: string
    }

    const testCases: TestCase[] = [
        // 1. Các ví dụ mẫu chuẩn từ LeetCode
        {
            nums: [1, 3, -1, -3, 5, 3, 6, 7],
            k: 3,
            expected: [3, 3, 5, 5, 6, 7],
            description: 'LeetCode Ex 1: Cửa sổ trượt kích thước k = 3 thông thường',
        },
        {
            nums: [1],
            k: 1,
            expected: [1],
            description: 'LeetCode Ex 2: Mảng 1 phần tử với k = 1',
        },

        // 2. Trường hợp biên (Edge cases) cơ bản
        {
            nums: [],
            k: 0,
            expected: [],
            description: 'Edge case: Mảng rỗng và k = 0',
        },
        {
            nums: [1, -1],
            k: 1,
            expected: [1, -1],
            description: 'Edge case: k = 1 -> kết quả chính là bản sao của mảng nums',
        },
        {
            nums: [4, 2, 8, 1, 3],
            k: 5,
            expected: [8],
            description: 'Edge case: k bằng đúng độ dài mảng -> chỉ có 1 cửa sổ duy nhất trả về max toàn mảng',
        },
        {
            nums: [9, 3],
            k: 2,
            expected: [9],
            description: 'Edge case: Mảng 2 phần tử với k = 2',
        },

        // 3. Mảng gồm các phần tử bằng nhau hoàn toàn
        {
            nums: [7, 7, 7, 7, 7],
            k: 3,
            expected: [7, 7, 7],
            description: 'Tất cả phần tử bằng nhau -> max mỗi cửa sổ luôn là giá trị đó',
        },

        // 4. Mảng đơn điệu tăng dần (Strictly increasing)
        {
            nums: [1, 2, 3, 4, 5, 6],
            k: 3,
            expected: [3, 4, 5, 6],
            description: 'Mảng tăng dần -> max luôn là phần tử mới nhất vừa nạp vào bên phải',
        },

        // 5. Mảng đơn điệu giảm dần (Strictly decreasing)
        {
            nums: [9, 8, 7, 6, 5, 4],
            k: 3,
            expected: [9, 8, 7, 6],
            description: 'Mảng giảm dần -> max luôn là phần tử cũ nhất ở đầu cửa sổ',
        },

        // 6. Toàn bộ là số âm
        {
            nums: [-7, -8, -7, -5, -7, -1, -6],
            k: 3,
            expected: [-7, -5, -5, -1, -1],
            description: 'Mảng toàn số âm -> xử lý giá trị âm chính xác không nhầm với 0',
        },

        // 7. Số âm, số dương và số 0 đan xen
        {
            nums: [-4, 2, -5, 3, 6],
            k: 3,
            expected: [2, 3, 6],
            description: 'Âm dương đan xen với k = 3',
        },
        {
            nums: [9, 10, 9, -7, -4, -8, 2, -6],
            k: 5,
            expected: [10, 10, 9, 2],
            description: 'Mảng dài với cửa sổ k = 5 âm dương kết hợp',
        },

        // 8. Đỉnh núi và thung lũng (Peaks and Valleys)
        {
            nums: [1, 3, 1, 2, 0, 5],
            k: 3,
            expected: [3, 3, 2, 5],
            description: 'Biến thiên đồi núi xen kẽ',
        },
        {
            nums: [10, 1, 1, 1, 1],
            k: 3,
            expected: [10, 1, 1],
            description: 'Phần tử cực đại ở đầu trượt ra khỏi cửa sổ ngay sau bước đầu tiên',
        },

        // 9. Cửa sổ kích thước k = 4 phức tạp
        {
            nums: [5, 3, 4, 2, 6, 1, 8, 7, 9],
            k: 4,
            expected: [5, 6, 6, 8, 8, 9],
            description: 'Cửa sổ k = 4 trên dãy số có nhiều đỉnh cục bộ',
        },
    ]

    it.each(testCases)(
        '$description (nums: $nums, k: $k -> expected: $expected)',
        ({ nums, k, expected }) => {
            expect(maxSlidingWindow(nums, k)).toEqual(expected)
        }
    )
})
