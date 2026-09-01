import { describe, it, expect } from 'vitest';
import { threeSum } from './15-three-sum.js';

describe('Pattern: Two_Pointers -> 15-three-sum', () => {
  const testCases = [
    // 1. Case cơ bản: Có 2 bộ ba khác nhau
    { input: [-1, 0, 1, 2, -1, -4], expected: [[-1, -1, 2], [-1, 0, 1]] },

    // 2. Case mảng rỗng (Edge case)
    { input: [], expected: [] },

    // 3. Case mảng không đủ 3 phần tử (Edge case)
    { input: [0, 1], expected: [] },

    // 4. Case mảng toàn số 0 (Dễ bị lặp vô tận nếu né trùng sai)
    { input: [0, 0, 0, 0], expected: [[0, 0, 0]] },

    // 5. Case không tìm thấy nghiệm nào
    { input: [1, 2, -2, -1], expected: [] },

    // 6. Case có nhiều số trùng nhau, đòi hỏi phải skip duplicate chuẩn xác
    { input: [-2, 0, 0, 2, 2], expected: [[-2, 0, 2]] },

    // 7. Case toàn số âm (chắc chắn không thể có tổng = 0)
    { input: [-3, -2, -1], expected: [] },
  ];

  it.each(testCases)(
    'với input $input thì kết quả phải là $expected',
    ({ input, expected }) => {
      // Dùng toEqual để so sánh sâu (deep equality) cấu trúc mảng 2 chiều
      expect(threeSum(input)).toEqual(expected);
    }
  );
});