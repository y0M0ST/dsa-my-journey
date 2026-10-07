import { describe, it, expect } from 'vitest';
import { searchInsertPosition, searchInsert } from './35-search-insert-position.js';

describe('Pattern: Binary_Search -> 35-search-insert-position', () => {
  const testCases = [
    // Standard LeetCode examples
    { input: [1, 3, 5, 7, 9], target: 4, expected: 2 },
    { input: [1, 3, 5, 6], target: 5, expected: 2 },
    { input: [1, 3, 5, 6], target: 2, expected: 1 },
    { input: [1, 3, 5, 6], target: 7, expected: 4 },
    { input: [1, 3, 5, 6], target: 0, expected: 0 },
    { input: [1, 3], target: 3, expected: 1 },
    { input: [1, 3], target: 2, expected: 1 },

    // Boundary early exit checks: Trùng hoặc vượt 2 đầu mút
    { input: [1, 3, 5, 6], target: 1, expected: 0 },
    { input: [1, 3, 5, 6], target: 6, expected: 3 },
    { input: [1, 3, 5, 6], target: -5, expected: 0 },
    { input: [1, 3, 5, 6], target: 10, expected: 4 },

    // Edge case: Mảng rỗng
    { input: [], target: 5, expected: 0 },

    // Edge case: Mảng 1 phần tử
    { input: [5], target: 5, expected: 0 },
    { input: [5], target: 2, expected: 0 },
    { input: [5], target: 8, expected: 1 },

    // Edge case: Mảng 2 phần tử
    { input: [2, 7], target: 1, expected: 0 },
    { input: [2, 7], target: 2, expected: 0 },
    { input: [2, 7], target: 5, expected: 1 },
    { input: [2, 7], target: 7, expected: 1 },
    { input: [2, 7], target: 9, expected: 2 },

    // Edge case: Mảng có số âm
    { input: [-10, -5, 0, 4, 8], target: -7, expected: 1 },
    { input: [-10, -5, 0, 4, 8], target: -10, expected: 0 },
    { input: [-10, -5, 0, 4, 8], target: -15, expected: 0 },
    { input: [-10, -5, 0, 4, 8], target: 8, expected: 4 },
    { input: [-10, -5, 0, 4, 8], target: 12, expected: 5 },
  ];

  it.each(testCases)(
    'với mảng $input, target = $target thì chèn vào index $expected',
    ({ input, target, expected }) => {
      expect(searchInsertPosition(input as number[], target)).toEqual(expected);
      // Đảm bảo alias `searchInsert` đồng nhất
      expect(searchInsert(input as number[], target)).toEqual(expected);
    }
  );
});