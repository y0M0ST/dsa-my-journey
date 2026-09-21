import { describe, it, expect } from 'vitest';
import { shipWithinDays } from './11-ship-within-days.js';

describe('Pattern: Binary_Search -> 11-ship-within-days', () => {
  const testCases = [
    { input: [], expected: null },
    // TODO: Nhét thêm edge cases (mảng rỗng, số âm...) vào đây
  ];

  it.each(testCases)(
    'với input $input thì kết quả phải là $expected',
    ({ input, expected }) => {
      expect(shipWithinDays(input)).toEqual(expected);
    }
  );
});
