import { describe, it, expect } from 'vitest';
import { splitArray } from './410-split-array.js';

describe('Pattern: Binary_Search -> 410-split-array', () => {
  const testCases = [
    { input: [], expected: null },
    // TODO: Nhét thêm edge cases (mảng rỗng, số âm...) vào đây
  ];

  it.each(testCases)(
    'với input $input thì kết quả phải là $expected',
    ({ input, expected }) => {
      expect(splitArray(input)).toEqual(expected);
    }
  );
});
