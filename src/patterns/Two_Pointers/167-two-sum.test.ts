import { describe, it, expect } from 'vitest';
import { twoSum } from './167-two-sum.js';

describe('Pattern: Two_Pointers -> 167-two-sum', () => {
  const testCases = [
    // 1. Case cơ bản: 2 số nằm ở 2 đầu
    { numbers: [2, 7, 11, 15], target: 9, expected: [1, 2] },

    // 2. Case mảng có 3 phần tử, nghiệm nằm ở 2 đầu ngoài cùng
    { numbers: [2, 3, 4], target: 6, expected: [1, 3] },

    // 3. Case tối thiểu 2 phần tử (có số âm)
    { numbers: [-1, 0], target: -1, expected: [1, 2] },

    // 4. Case 2 số âm cộng lại với nhau
    { numbers: [-5, -3, -1, 0, 2, 4], target: -8, expected: [1, 2] },

    // 5. Case 2 số giống hệt nhau tạo thành target
    { numbers: [0, 0, 3, 4], target: 0, expected: [1, 2] },
    { numbers: [1, 2, 3, 4, 4, 9], target: 8, expected: [4, 5] },

    // 6. Case target là số âm với mảng trải dài từ âm sang dương
    { numbers: [-10, -5, 0, 3, 7], target: -2, expected: [2, 4] },
  ];

  it.each(testCases)(
    'với numbers = $numbers và target = $target thì kết quả phải là $expected',
    ({ numbers, target, expected }) => {
      expect(twoSum(numbers, target)).toStrictEqual(expected);
    }
  );
});