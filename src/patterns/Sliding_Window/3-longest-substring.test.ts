import { describe, it, expect } from 'vitest';
import { lengthOfLongestSubstring } from './3-longest-substring.js';

describe('Pattern: Sliding_Window -> 3-longest-substring', () => {
  interface TestCase {
    s: string;
    expected: number;
    description: string;
  }

  const testCases: TestCase[] = [
    {
      s: 'abcabcbb',
      expected: 3,
      description: 'LeetCode Ex 1: chuỗi "abc" độ dài 3',
    },
    {
      s: 'bbbbb',
      expected: 1,
      description: 'LeetCode Ex 2: chuỗi toàn ký tự lặp "b" độ dài 1',
    },
    {
      s: 'pwwkew',
      expected: 3,
      description: 'LeetCode Ex 3: chuỗi "wke" độ dài 3',
    },
  ];

  it.each(testCases)(
    '$description (s: "$s" -> expected: $expected)',
    ({ s, expected }) => {
      expect(lengthOfLongestSubstring(s)).toBe(expected);
    }
  );
});
