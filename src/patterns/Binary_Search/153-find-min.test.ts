import { describe, it, expect } from 'vitest';
import { findMin, findMinRotated } from './153-find-min.js';

describe('Pattern: Binary_Search -> 153-find-min', () => {
  const testCases = [
    // Standard LeetCode examples
    { input: [3, 4, 5, 1, 2], expected: 1 },
    { input: [4, 5, 6, 7, 0, 1, 2], expected: 0 },
    { input: [11, 13, 15, 17], expected: 11 },

    // Edge cases: Mảng rỗng & 1 phần tử
    { input: [], expected: 0 },
    { input: [1], expected: 1 },
    { input: [-5], expected: -5 },

    // Edge cases: Mảng 2 phần tử (xoay và không xoay)
    { input: [1, 2], expected: 1 },
    { input: [2, 1], expected: 1 },
    { input: [-1, -2], expected: -2 },
    { input: [-2, -1], expected: -2 },

    // Edge cases: Mảng 3 phần tử (các vị trí xoay khác nhau)
    { input: [1, 2, 3], expected: 1 },
    { input: [3, 1, 2], expected: 1 },
    { input: [2, 3, 1], expected: 1 },

    // Edge cases: Mảng không hề bị xoay (Unrotated - O(1) early exit)
    { input: [1, 3, 4, 5], expected: 1 },
    { input: [2, 4, 6, 8, 10, 12], expected: 2 },
    { input: [-10, -5, 0, 5, 10], expected: -10 },

    // Edge cases: Xoay tại nhiều vị trí khác nhau
    { input: [5, 6, 7, 0, 1, 2, 3, 4], expected: 0 },
    { input: [4, 5, 6, 7, 8, 9, 1, 2, 3], expected: 1 },
    { input: [2, 3, 4, 5, 6, 7, 8, 1], expected: 1 },
    { input: [8, 1, 2, 3, 4, 5, 6, 7], expected: 1 },

    // Edge cases: Số âm và giá trị lớn
    { input: [-1, 0, 1, 2, -5, -4, -3, -2], expected: -5 },
    { input: [1000000, -1000000], expected: -1000000 },
  ];

  it.each(testCases)(
    'với input $input thì kết quả nhỏ nhất phải là $expected',
    ({ input, expected }) => {
      expect(findMin(input)).toEqual(expected);
      expect(findMinRotated(input)).toEqual(expected);
    }
  );
});
