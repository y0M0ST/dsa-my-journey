import { describe, it, expect } from 'vitest';
import { lengthOfLongestSubstring } from './3-longest-substring.js';

describe('Pattern: Sliding_Window -> 3-longest-substring', () => {
  interface TestCase {
    s: string;
    expected: number;
    description: string;
  }

  const testCases: TestCase[] = [
    // 1. Các ví dụ mẫu chuẩn từ LeetCode
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
      description: 'LeetCode Ex 3: chuỗi "wke" độ dài 3 (không phải subsequence "pwke")',
    },

    // 2. Trường hợp biên (Edge cases) cơ bản
    {
      s: '',
      expected: 0,
      description: 'Edge case: chuỗi rỗng -> kết quả là 0',
    },
    {
      s: ' ',
      expected: 1,
      description: 'Edge case: chuỗi chỉ có 1 khoảng trắng -> kết quả là 1',
    },
    {
      s: 'a',
      expected: 1,
      description: 'Edge case: chuỗi chỉ có 1 ký tự -> kết quả là 1',
    },
    {
      s: 'au',
      expected: 2,
      description: 'Edge case: chuỗi 2 ký tự khác nhau -> độ dài 2',
    },
    {
      s: 'aa',
      expected: 1,
      description: 'Edge case: chuỗi 2 ký tự giống nhau -> độ dài 1',
    },

    // 3. Cú lừa nhảy con trỏ (Tricky sliding window cases)
    {
      s: 'abba',
      expected: 2,
      description: 'Bẫy kinh điển "abba": khi gặp "a" thứ 2, left không được lùi về index cũ',
    },
    {
      s: 'dvdf',
      expected: 3,
      description: 'Bẫy "dvdf": ký tự trùng ở giữa, chuỗi dài nhất là "vdf" độ dài 3',
    },
    {
      s: 'tmmzuxt',
      expected: 5,
      description: 'Bẫy "tmmzuxt": chuỗi dài nhất là "mzuxt" độ dài 5',
    },
    {
      s: 'anviaj',
      expected: 5,
      description: 'Bẫy "anviaj": chuỗi dài nhất là "nviaj" độ dài 5',
    },

    // 4. Ký tự đặc biệt, số và khoảng trắng
    {
      s: '   ',
      expected: 1,
      description: 'Chuỗi toàn khoảng trắng liên tiếp -> độ dài 1',
    },
    {
      s: '1234567890',
      expected: 10,
      description: 'Toàn chữ số không trùng lặp -> độ dài 10',
    },
    {
      s: 'a 1!b@1 a',
      expected: 6,
      description: 'Ký tự chữ, số, dấu câu và space xen kẽ -> chuỗi "!b@1 a" độ dài 6',
    },

    // 5. Trùng ở các vị trí đặc biệt
    {
      s: 'aab',
      expected: 2,
      description: 'Trùng ở đầu: "ab" độ dài 2',
    },
    {
      s: 'baa',
      expected: 2,
      description: 'Trùng ở đuôi: "ba" độ dài 2',
    },
    {
      s: 'abacaba',
      expected: 3,
      description: 'Nhiều đoạn lặp đối xứng -> lấy đoạn dài nhất 3 ("bac" hoặc "cab")',
    },

    // 6. Toàn bộ ký tự là duy nhất
    {
      s: 'abcdefghijklmnopqrstuvwxyz',
      expected: 26,
      description: 'Toàn bộ 26 ký tự alphabet không trùng lặp -> độ dài 26',
    },
  ];

  it.each(testCases)(
    '$description (s: "$s" -> expected: $expected)',
    ({ s, expected }) => {
      expect(lengthOfLongestSubstring(s)).toBe(expected);
    }
  );
});
