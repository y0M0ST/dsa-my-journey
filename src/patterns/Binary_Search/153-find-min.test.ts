import { describe, it, expect } from 'vitest';
import { findMin } from './153-find-min.js';

describe('Pattern: Binary_Search -> 153-find-min', () => {
  const testCases = [
    { input: [5,6,7,0,1,2,3,4], expected: 0 },
    { input: [1,3,4,5], expected: 1 },
    { input: [], expected: 0 },
    { input: [1], expected: 1 },
    { input: [3,1], expected: 1 },
    { input: [4,5,6,1,2,3,7,8,9], expected: 1 },
  ];

  it.each(testCases)(
    'với input $input thì kết quả phải là $expected',
    ({ input, expected }) => {
      expect(findMin(input)).toEqual(expected);
    }
  );
});
