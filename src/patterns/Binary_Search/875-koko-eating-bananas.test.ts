import { describe, it, expect } from 'vitest';
import { kokoEatingBananas } from './875-koko-eating-bananas.js';

describe('Pattern: Binary_Search -> 875-koko-eating-bananas', () => {
  const testCases = [
    { piles: [3, 6, 7, 11], h: 8, expected: 4 },
    { piles: [30, 11, 23, 4, 20], h: 5, expected: 30 },
    { piles: [30, 11, 23, 4, 20], h: 6, expected: 23 },
    { piles: [3132, 2, 3], h: 1000000000, expected: 1 },
    { piles: [10, 10, 10], h: 3, expected: 10 },
  ];

  it.each(testCases)(
    'với input $input thì kết quả phải là $expected',
    ({ piles, h, expected }) => {
      expect(kokoEatingBananas(piles, h)).toEqual(expected);
    }
  );
});
