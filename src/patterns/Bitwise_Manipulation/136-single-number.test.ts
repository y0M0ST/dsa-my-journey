import { describe, it, expect } from 'vitest';
import { singleNumber } from './136-single-number.js';

describe('Pattern: Bitwise_Manipulation -> 136-single-number', () => {
  const testCases = [
    { input: [], expected: null },
    // TODO: Nhét thêm edge cases (mảng rỗng, số âm...) vào đây
  ];

  it.each(testCases)(
    'với input $input thì kết quả phải là $expected',
    ({ input, expected }) => {
      expect(singleNumber(input)).toEqual(expected);
    }
  );
});
