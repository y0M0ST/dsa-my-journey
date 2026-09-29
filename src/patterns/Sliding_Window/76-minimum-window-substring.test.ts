import { describe, it, expect } from 'vitest';
import { minWindow } from './76-minimum-window-substring.js';

describe('Pattern: Sliding_Window -> 76-minimum-window-substring', () => {
  interface TestCase {
    s: string;
    t: string;
    expected: string;
    description: string;
  }

  const testCases: TestCase[] = [
    {
      s: 'ADOBECODEBANC',
      t: 'ABC',
      expected: 'BANC',
      description: 'LeetCode Ex 1: Cửa sổ ngắn nhất chứa đủ A, B, C là BANC',
    },
    {
      s: 'a',
      t: 'a',
      expected: 'a',
      description: 'LeetCode Ex 2: Chuỗi 1 ký tự trùng khớp',
    },
    {
      s: 'a',
      t: 'aa',
      expected: '',
      description: 'LeetCode Ex 3: Chuỗi nguồn không đủ số lượng ký tự',
    },
  ];

  it.each(testCases)(
    '$description (s: "$s", t: "$t" -> expected: "$expected")',
    ({ s, t, expected }) => {
      expect(minWindow(s, t)).toBe(expected);
    }
  );
});
