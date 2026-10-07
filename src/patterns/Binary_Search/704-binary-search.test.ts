import { describe, it, expect } from 'vitest';
import { binarySearch, search } from './704-binary-search.js';

describe('Pattern: Binary_Search -> 704-binary-search', () => {
  const testCases = [
    // Case chuẩn LeetCode
    { input: [1, 3, 5, 7, 9, 11, 13, 15], target: 9, expected: 4 },
    { input: [1, 3, 5, 7, 9, 11, 13, 15], target: 13, expected: 6 },
    { input: [-1, 0, 3, 5, 9, 12], target: 9, expected: 4 },
    { input: [-1, 0, 3, 5, 9, 12], target: 2, expected: -1 },

    // Boundary early exit checks: Trúng 2 đầu mút
    { input: [1, 3, 5, 7, 9, 11, 13, 15], target: 1, expected: 0 },
    { input: [1, 3, 5, 7, 9, 11, 13, 15], target: 15, expected: 7 },

    // Boundary early exit checks: Nằm ngoài khoảng [min, max]
    { input: [1, 3, 5, 7, 9, 11, 13, 15], target: 0, expected: -1 },
    { input: [1, 3, 5, 7, 9, 11, 13, 15], target: 100, expected: -1 },
    { input: [1, 3, 5, 7, 9, 11, 13, 15], target: 2, expected: -1 },

    // Edge cases: Mảng rỗng & 1 phần tử
    { input: [], target: 5, expected: -1 },
    { input: [5], target: 5, expected: 0 },
    { input: [5], target: 1, expected: -1 },
    { input: [5], target: 10, expected: -1 },

    // Edge cases: Mảng 2 phần tử
    { input: [2, 8], target: 2, expected: 0 },
    { input: [2, 8], target: 8, expected: 1 },
    { input: [2, 8], target: 5, expected: -1 },

    // Edge cases: Toàn số âm
    { input: [-20, -15, -10, -5, -1], target: -10, expected: 2 },
    { input: [-20, -15, -10, -5, -1], target: -30, expected: -1 },
    { input: [-20, -15, -10, -5, -1], target: 0, expected: -1 },
  ];

  it.each(testCases)(
    'Tìm số $target trong mảng $input thì index phải là $expected',
    ({ input, target, expected }) => {
      expect(binarySearch(input, target)).toEqual(expected);
      // Đảm bảo alias `search` đồng nhất
      expect(search(input, target)).toEqual(expected);
    }
  );
});