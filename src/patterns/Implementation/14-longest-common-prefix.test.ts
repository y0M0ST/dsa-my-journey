import { describe, it, expect } from 'vitest';
import { longestCommonPrefix } from './14-longest-common-prefix.js';

describe('Pattern: Implementation -> 14-longest-common-prefix', () => {
  const testCases = [
    { input: [], expected: "" },
    { input: ["flower", "flow", "flight"], expected: "fl" },
    { input: ["dog", "racecar", "car"], expected: "" },
    { input: ["alone"], expected: "alone" },
    { input: ["flower", "", "flight"], expected: "" },
    { input: ["test", "test", "test"], expected: "test" },
    { input: ["ab", "abc", "abcd"], expected: "ab" },
  ];

  it.each(testCases)(
    'với input $input thì kết quả phải là "$expected"',
    ({ input, expected }) => {
      expect(longestCommonPrefix(input)).toEqual(expected);
    }
  );
});