import { describe, it, expect } from 'vitest';
import { searchInsertPosition } from './35-search-insert-position.js';

describe('Pattern: Binary_Search -> 35-search-insert-position', () => {
  const testCases = [
    { input: [1, 3, 5, 7, 9], target: 4, expected: 2 },
    { input: [1, 3, 5, 6], target: 5, expected: 2 },
    { input: [1, 3, 5, 6], target: 2, expected: 1 },
    { input: [1, 3, 5, 6], target: 7, expected: 4 },
    { input: [1, 3, 5, 6], target: 0, expected: 0 },
    { input: [1, 3], target: 3, expected: 1 },
    { input: [], target: 5, expected: 0 },
  ];

  it.each(testCases)(
    'với mảng $input, target = $target thì chèn vào index $expected',
    ({ input, target, expected }) => {
      expect(searchInsertPosition(input as number[], target)).toEqual(expected);
    }
  );
});