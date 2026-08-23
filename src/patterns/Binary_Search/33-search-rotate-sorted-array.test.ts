import { describe, it, expect } from 'vitest';
import { searchRotateSortedArray } from './33-search-rotate-sorted-array.js';

describe('Pattern: Binary_Search -> 33-search-rotate-sorted-array', () => {
  const testCases = [
    { input: [4, 5, 6, 7, 0, 1, 2], target: 5, expected: 1 },
    { input: [4, 5, 6, 7, 0, 1, 2], target: 1, expected: 5 },
    { input: [4, 5, 6, 7, 0, 1, 2], target: 7, expected: 3 },
    { input: [4, 5, 6, 7, 0, 1, 2], target: 0, expected: 4 },
    { input: [4, 5, 6, 7, 0, 1, 2], target: 3, expected: -1 },
    { input: [1], target: 1, expected: 0 },
    { input: [1], target: 0, expected: -1 },
    { input: [3, 1], target: 1, expected: 1 },
    { input: [3, 1], target: 3, expected: 0 },
    { input: [1, 2, 3, 4, 5], target: 4, expected: 3 },
  ];

  it.each(testCases)(
    'với mảng $input, tìm target = $target thì phải ra index $expected',
    ({ input, target, expected }) => {
      expect(searchRotateSortedArray(input, target)).toEqual(expected);
    }
  );
});