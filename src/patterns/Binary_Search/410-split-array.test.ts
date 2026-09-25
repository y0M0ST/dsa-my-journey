import { describe, it, expect } from 'vitest';
import { splitArray } from './410-split-array.js'; // Đảm bảo đường dẫn này đúng với dự án của bạn

describe('Pattern: Binary_Search -> 410-split-array', () => {
  const testCases = [
    // Ví dụ mẫu trên LeetCode
    { nums:, k: 2, expected: 18 },
    { nums:, k: 2, expected: 9 },

    // Trường hợp biên (Edge cases)
    { nums:, k: 3, expected: 4 },     // k bằng độ dài mảng (kết quả là phần tử lớn nhất)
    { nums:, k: 1, expected: 5 },           // Mảng chỉ có 1 phần tử
    { nums:, k: 1, expected: 100 },       // k = 1 (kết quả là tổng cả mảng)

    // Các phần tử giống nhau
    { nums:, k: 2, expected: 4 },
    { nums:, k: 4, expected: 2 },
  ];

  it.each(testCases)(
    'với nums = $nums và k = $k thì kết quả phải là $expected',
    ({ nums, k, expected }) => {
      expect(splitArray(nums, k)).toEqual(expected);
    }
  );
});
