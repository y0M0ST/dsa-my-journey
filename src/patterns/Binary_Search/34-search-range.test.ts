import { describe, it, expect } from 'vitest';
import { searchRange, findFirstAndLastPosition } from './34-search-range.js';

describe('Pattern: Binary_Search -> 34-search-range', () => {
  const testCases = [
    // Standard LeetCode examples
    { input: [5, 7, 7, 8, 8, 10], target: 8, expected: [3, 4] },
    { input: [5, 7, 7, 8, 8, 10], target: 6, expected: [-1, -1] },
    { input: [], target: 0, expected: [-1, -1] },

    // Boundary early exit checks: Nằm ngoài khoảng [first, last]
    { input: [5, 7, 7, 8, 8, 10], target: 4, expected: [-1, -1] },
    { input: [5, 7, 7, 8, 8, 10], target: 12, expected: [-1, -1] },

    // Boundary checks: Trúng 2 đầu mút
    { input: [5, 7, 7, 8, 8, 10], target: 5, expected: [0, 0] },
    { input: [5, 7, 7, 8, 8, 10], target: 10, expected: [5, 5] },
    { input: [8, 8, 8, 9, 10], target: 8, expected: [0, 2] },
    { input: [5, 6, 8, 8, 8], target: 8, expected: [2, 4] },

    // Edge cases: Mảng 1 phần tử
    { input: [1], target: 1, expected: [0, 0] },
    { input: [1], target: 2, expected: [-1, -1] },

    // Edge cases: Mảng dị nhân - toàn số giống hệt nhau
    { input: [2, 2, 2, 2, 2], target: 2, expected: [0, 4] },
    { input: [2, 2, 2, 2, 2], target: 3, expected: [-1, -1] },

    // Edge cases: Có đúng 1 phần tử lọt thỏm giữa bầy số khác
    { input: [1, 2, 3, 4, 5], target: 3, expected: [2, 2] },
    { input: [1, 2, 3, 4, 5], target: 1, expected: [0, 0] },
    { input: [1, 2, 3, 4, 5], target: 5, expected: [4, 4] },

    // Edge cases: Mảng có số âm
    { input: [-10, -5, -5, -5, 0, 3], target: -5, expected: [1, 3] },
    { input: [-10, -5, 0, 3], target: -10, expected: [0, 0] },
    { input: [-10, -5, 0, 3], target: -20, expected: [-1, -1] },
    { input: [-10, -5, 0, 3], target: 10, expected: [-1, -1] },
  ];

  it.each(testCases)(
    'với mảng $input, target = $target thì dải vị trí phải là $expected',
    ({ input, target, expected }) => {
      expect(searchRange(input as number[], target)).toEqual(expected);
      // Đảm bảo alias `findFirstAndLastPosition` đồng nhất
      expect(findFirstAndLastPosition(input as number[], target)).toEqual(expected);
    }
  );
});