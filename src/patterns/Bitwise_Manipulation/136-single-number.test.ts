import { describe, it, expect } from 'vitest';
import { singleNumber } from './136-single-number.js';

describe('Pattern: Bitwise_Manipulation -> 136-single-number', () => {
  const testCases = [
    { input: [2, 2, 1], expected: 1 },
    { input: [4, 1, 2, 1, 2], expected: 4 },
    { input: [1], expected: 1 },
    { input: [0, 1, 0], expected: 1 },
    { input: [-1, -1, -2], expected: -2 },
    { input: [17, 12, 5, 12, 5, 9, 17], expected: 9 },
  ];

  it.each(testCases)(
    'với input $input thì số ế duy nhất phải là $expected',
    ({ input, expected }) => {
      expect(singleNumber(input)).toBe(expected);
    }
  );
});