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
    // 1. Các ví dụ mẫu chuẩn từ LeetCode
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
      description: 'LeetCode Ex 3: Chuỗi nguồn s không đủ số lượng ký tự t yêu cầu',
    },

    // 2. Trường hợp biên (Edge cases) cơ bản
    {
      s: '',
      t: 'a',
      expected: '',
      description: 'Edge case: Chuỗi nguồn s rỗng -> không thể có cửa sổ',
    },
    {
      s: 'a',
      t: '',
      expected: '',
      description: 'Edge case: Chuỗi mục tiêu t rỗng -> trả về rỗng',
    },
    {
      s: 'abc',
      t: 'abcd',
      expected: '',
      description: 'Edge case: Chuỗi t dài hơn s -> không thể chứa đủ',
    },

    // 3. Phân biệt hoa - thường (Case Sensitivity)
    {
      s: 'a',
      t: 'A',
      expected: '',
      description: 'Case sensitivity: Ký tự thường và hoa là khác nhau (a != A)',
    },
    {
      s: 'aA',
      t: 'aa',
      expected: '',
      description: 'Case sensitivity: Cần 2 chữ a thường nhưng chỉ có 1 a thường và 1 A hoa',
    },
    {
      s: 'aAbc',
      t: 'abc',
      expected: 'aAbc',
      description: 'Case sensitivity: Ký tự hoa xen kẽ không thoả mãn ký tự thường',
    },

    // 4. Ký tự trùng lặp nhiều lần (Duplicates in t)
    {
      s: 'aa',
      t: 'aa',
      expected: 'aa',
      description: 'Cần đúng 2 chữ a và chuỗi s có vừa vặn 2 chữ a',
    },
    {
      s: 'aaa',
      t: 'aa',
      expected: 'aa',
      description: 'Cần 2 chữ a nhưng s có 3 chữ a -> co cửa sổ lấy 2 chữ',
    },
    {
      s: 'baacab',
      t: 'aabc',
      expected: 'baac',
      description: 'Cần 2 chữ a, 1 b, 1 c -> cửa sổ "baac" (độ dài 4) thoả mãn tối ưu',
    },
    {
      s: 'aabdec',
      t: 'aabc',
      expected: 'aabdec',
      description: 'Cần 2 chữ a, 1 b, 1 c -> toàn bộ chuỗi "aabdec" (độ dài 6)',
    },

    // 5. Vị trí cửa sổ ở các vị trí đặc biệt
    {
      s: 'abcXYZ',
      t: 'abc',
      expected: 'abc',
      description: 'Cửa sổ tối ưu nằm ngay đầu chuỗi',
    },
    {
      s: 'XYZabc',
      t: 'abc',
      expected: 'abc',
      description: 'Cửa sổ tối ưu nằm ngay cuối chuỗi',
    },
    {
      s: 'abcdef',
      t: 'fedcba',
      expected: 'abcdef',
      description: 'Toàn bộ chuỗi s chính là cửa sổ tối ưu',
    },

    // 6. Không có kết quả nào thoả mãn
    {
      s: 'helloworld',
      t: 'xyz',
      expected: '',
      description: 'Không chứa bất kỳ ký tự nào của t -> trả về rỗng',
    },

    // 7. Cửa sổ có nhiều ứng viên, chọn cửa sổ ngắn nhất
    {
      s: 'bba',
      t: 'ab',
      expected: 'ba',
      description: 'Có 2 cửa sổ "bba" (3) và "ba" (2) -> chọn "ba"',
    },
    {
      s: 'bdab',
      t: 'ab',
      expected: 'ab',
      description: 'Cửa sổ "dab" (3) vs "ab" (2) -> chọn "ab"',
    },
    {
      s: 'cabwefgewcwaefgcf',
      t: 'cae',
      expected: 'cwae',
      description: 'Nhiều cụm rải rác phức tạp -> tìm được "cwae" độ dài 4',
    },
  ];

  it.each(testCases)(
    '$description (s: "$s", t: "$t" -> expected: "$expected")',
    ({ s, t, expected }) => {
      expect(minWindow(s, t)).toBe(expected);
    }
  );
});
