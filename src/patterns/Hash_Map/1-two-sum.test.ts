import { describe, it, expect } from 'vitest';
import { twoSum } from './1-two-sum.js';

describe('Pattern: Hash_Map -> 1-two-sum', () => {
  const testCases = [
    // 1. Case cơ bản: Đáp án nằm ngay đầu mảng
    { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },

    // 2. Case mảng chưa được sắp xếp (Phá nát hệ Two Pointers)
    { nums: [3, 2, 4], target: 6, expected: [1, 2] },

    // 3. Case có 2 phần tử giống hệt nhau tạo thành target
    { nums: [3, 3], target: 6, expected: [0, 1] },

    // 4. Edge case: Có chứa số âm và tổng là số âm
    { nums: [-1, -2, -3, -4, -5], target: -8, expected: [2, 4] },

    // 5. Edge case: Có chứa số 0
    { nums: [0, 4, 3, 0], target: 0, expected: [0, 3] },

    // 6. Case target ở tít cuối mảng
    { nums: [1, 5, 9, 12, 20, 25], target: 45, expected: [4, 5] }
  ];

  it.each(testCases)(
    'với mảng nums = $nums và target = $target thì phải trả về index $expected',
    ({ nums, target, expected }) => {
      // Dùng toEqual vì kết quả trả về là một mảng (Array)
      expect(twoSum(nums, target)).toEqual(expected);
    }
  );
});