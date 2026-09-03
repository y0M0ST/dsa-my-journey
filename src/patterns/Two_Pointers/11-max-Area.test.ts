import { describe, it, expect } from 'vitest';
import { maxArea } from './11-max-Area.js';

describe('Pattern: Two_Pointers -> 11-container-with-most-water', () => {
  const testCases = [
    { height: [1, 8, 6, 2, 5, 4, 8, 3, 7], expected: 49 },
    { height: [1, 1], expected: 1 },
    { height: [0, 2], expected: 0 },
    { height: [1000, 1, 1, 1, 1000], expected: 4000 },
    { height: [5, 4, 3, 2, 1], expected: 6 },
    { height: [2, 2, 2, 2, 2], expected: 8 },
  ];

  it.each(testCases)(
    'với mảng các bức tường $height thì lượng nước chứa lớn nhất phải là $expected',
    ({ height, expected }) => {
      expect(maxArea(height)).toBe(expected);
    }
  );
});