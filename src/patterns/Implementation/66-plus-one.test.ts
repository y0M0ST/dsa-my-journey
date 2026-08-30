import { describe, it, expect } from 'vitest';
import { plusOne } from './66-plus-one.js';

describe('Pattern: Implementation -> 66-plus-one', () => {
  const testCases = [
    // 1. Case cơ bản học sinh giỏi: Không có nhớ
    { input: [1, 2, 3], expected: [1, 2, 4] },
    { input: [4, 3, 2, 1], expected: [4, 3, 2, 2] },

    // 2. Case nhớ 1 nhịp ở đuôi
    { input: [1, 2, 9], expected: [1, 3, 0] },

    // 3. Case mảng chỉ có 1 phần tử (tối thiểu theo constraint)
    { input: [0], expected: [1] },
    { input: [5], expected: [6] },

    // 4. Case "tràn viền" 1 phần tử
    { input: [9], expected: [1, 0] },

    // 5. Boss cuối: Toàn bộ là số 9 (buộc phải nới rộng size mảng thêm 1)
    { input: [9, 9, 9], expected: [1, 0, 0, 0] },

    // 6. Case nhớ liên hoàn domino nhưng ngắt quãng ở đầu
    { input: [8, 9, 9, 9], expected: [9, 0, 0, 0] },
  ];

  it.each(testCases)(
    'với input $input thì kết quả phải là $expected',
    ({ input, expected }) => {
      // Dùng toStrictEqual thay cho toEqual để check strict type của Array cho chắc cốp
      expect(plusOne(input)).toStrictEqual(expected);
    }
  );
});