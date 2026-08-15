import { describe, it, expect } from 'vitest';
import { binarySearch } from './704-binary-search.js';

describe('Pattern: 01_binary_search -> 704-binary-search', () => {
  // Setup đạn dược (Test Cases) chuẩn chỉnh
  const testCases = [
    { input: [1, 3, 5, 7, 9, 11, 13, 15], target: 9, expected: 4 }, // Tìm thấy 9 ở vị trí số 4
    { input: [1, 3, 5, 7, 9, 11, 13, 15], target: 13, expected: 6 }, // Tìm thấy 13 ở vị trí số 6
    { input: [1, 3, 5, 7, 9, 11, 13, 15], target: 2, expected: -1 }, // Số 2 không có mặt -> trả về -1
    { input: [], target: 5, expected: -1 }, // Mảng rỗng -> trả về -1
  ];

  it.each(testCases)(
    'Tìm số $target trong mảng $input thì index phải là $expected',
    ({ input, target, expected }) => {
      // Gọi hàm truyền đủ 2 biến: input và target
      expect(binarySearch(input, target)).toEqual(expected);
    }
  );
});