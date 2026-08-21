import { describe, it, expect } from 'vitest';
import { longestCommonPrefix } from './14-longest-common-prefix.js';

describe('Pattern: Implementation -> 14-longest-common-prefix', () => {
  const testCases = [
    { input: [], expected: null },
    // TODO: Nhét thêm edge cases (mảng rỗng, số âm...) vào đây
  ];

  it.each(testCases)(
    'với input $input thì kết quả phải là $expected',
    ({ input, expected }) => {
      expect(longestCommonPrefix(input)).toEqual(expected);
    }
  );
});
