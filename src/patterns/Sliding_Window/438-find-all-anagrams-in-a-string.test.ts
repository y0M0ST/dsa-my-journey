import { describe, it, expect } from 'vitest';
import { findAnagrams } from './438-find-all-anagrams-in-a-string.js';

describe('Pattern: Sliding_Window -> 438-find-all-anagrams-in-a-string', () => {
  it('LeetCode Ex 1: s = "cbaebabacd", p = "abc" -> [0, 6]', () => {
    expect(findAnagrams('cbaebabacd', 'abc')).toEqual([0, 6]);
  });

  it('LeetCode Ex 2: s = "abab", p = "ab" -> [0, 1, 2]', () => {
    expect(findAnagrams('abab', 'ab')).toEqual([0, 1, 2]);
  });
});
