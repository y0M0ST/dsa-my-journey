import { describe, it, expect } from 'vitest';
import { searchRotateSortedArray, search, searchRotatedArray } from './33-search-rotate-sorted-array.js';

describe('Pattern: Binary_Search -> 33-search-rotate-sorted-array', () => {
  const testCases = [
    // Standard LeetCode examples
    { input: [4, 5, 6, 7, 0, 1, 2], target: 5, expected: 1 },
    { input: [4, 5, 6, 7, 0, 1, 2], target: 1, expected: 5 },
    { input: [4, 5, 6, 7, 0, 1, 2], target: 7, expected: 3 },
    { input: [4, 5, 6, 7, 0, 1, 2], target: 0, expected: 4 },
    { input: [4, 5, 6, 7, 0, 1, 2], target: 3, expected: -1 },

    // Boundary early exit checks: Trúng 2 đầu mút
    { input: [4, 5, 6, 7, 0, 1, 2], target: 4, expected: 0 },
    { input: [4, 5, 6, 7, 0, 1, 2], target: 2, expected: 6 },

    // Gap pruning: Target lọt vào khoảng hở (last, first)
    { input: [4, 5, 6, 7, 0, 1, 2], target: 3, expected: -1 },
    { input: [6, 7, 8, 1, 2], target: 4, expected: -1 },
    { input: [6, 7, 8, 1, 2], target: 5, expected: -1 },

    // Edge cases: Mảng rỗng & 1 phần tử
    { input: [], target: 5, expected: -1 },
    { input: [1], target: 1, expected: 0 },
    { input: [1], target: 0, expected: -1 },

    // Edge cases: Mảng 2 phần tử (xoay và không xoay)
    { input: [3, 1], target: 1, expected: 1 },
    { input: [3, 1], target: 3, expected: 0 },
    { input: [3, 1], target: 2, expected: -1 },
    { input: [1, 3], target: 1, expected: 0 },
    { input: [1, 3], target: 3, expected: 1 },
    { input: [1, 3], target: 2, expected: -1 },

    // Edge cases: Mảng không hề bị xoay (Unrotated Sorted Array)
    { input: [1, 2, 3, 4, 5], target: 4, expected: 3 },
    { input: [1, 2, 3, 4, 5], target: 1, expected: 0 },
    { input: [1, 2, 3, 4, 5], target: 5, expected: 4 },
    { input: [1, 2, 3, 4, 5], target: 0, expected: -1 },
    { input: [1, 2, 3, 4, 5], target: 6, expected: -1 },

    // Edge cases: Điểm gãy (Pivot) ở các vị trí khác nhau
    { input: [5, 1, 2, 3, 4], target: 1, expected: 1 },
    { input: [5, 1, 2, 3, 4], target: 5, expected: 0 },
    { input: [8, 9, 2, 3, 4], target: 9, expected: 1 },
    { input: [2, 3, 4, 5, 1], target: 1, expected: 4 },

    // Edge cases: Mảng có số âm
    { input: [4, 5, -2, -1, 0, 1, 2], target: -2, expected: 2 },
    { input: [4, 5, -2, -1, 0, 1, 2], target: 0, expected: 4 },
    { input: [4, 5, -2, -1, 0, 1, 2], target: -3, expected: -1 },
    { input: [4, 5, -2, -1, 0, 1, 2], target: 6, expected: -1 },
  ];

  it.each(testCases)(
    'với mảng $input, tìm target = $target thì phải ra index $expected',
    ({ input, target, expected }) => {
      expect(searchRotateSortedArray(input as number[], target)).toEqual(expected);
      // Đảm bảo các aliases đồng nhất
      expect(search(input as number[], target)).toEqual(expected);
      expect(searchRotatedArray(input as number[], target)).toEqual(expected);
    }
  );
});