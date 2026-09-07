import { describe, it, expect } from 'vitest';
import { singleNumber } from './136-single-number.js';

describe('Pattern: Bitwise_Manipulation -> 136-single-number', () => {
  const testCases = [
    // 1. Case cơ bản: Số FA nằm ở cuối
    { input: [2, 2, 1], expected: 1 },

    // 2. Case cơ bản: Số FA nằm kẹt ở giữa
    { input: [4, 1, 2, 1, 2], expected: 4 },

    // 3. Edge case: Mảng chỉ có đúng 1 phần tử (FA từ trong trứng)
    { input: [1], expected: 1 },

    // 4. Edge case: Mảng chứa số 0 (Test tính chất A ^ 0 = A)
    { input: [0, 1, 0], expected: 1 },

    // 5. Edge case: Toàn số âm (XOR vẫn xử đẹp số âm dưới dạng bit)
    { input: [-1, -1, -2], expected: -2 },

    // 6. Case dài ngoằng lộn xộn để test hiệu năng O(N)
    { input: [17, 12, 5, 12, 5, 9, 17], expected: 9 },
  ];

  it.each(testCases)(
    'với input $input thì số ế duy nhất phải là $expected',
    ({ input, expected }) => {
      // Dùng toBe cho primitive type (number) thay vì toEqual
      expect(singleNumber(input)).toBe(expected);
    }
  );
});