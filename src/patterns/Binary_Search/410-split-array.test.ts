import { describe, it, expect } from 'vitest';
import { splitArray } from './410-split-array.js';

describe('Pattern: Binary_Search -> 410-split-array', () => {
  interface TestCase {
    nums: number[];
    k: number;
    expected: number;
    description: string;
  }

  const testCases: TestCase[] = [
    // Ví dụ mẫu trên LeetCode
    {
      nums: [7, 2, 5, 10, 8],
      k: 2,
      expected: 18,
      description: 'LeetCode Ex 1: Chia [7,2,5] và [10,8] -> tổng lớn nhất nhỏ nhất là 18',
    },
    {
      nums: [1, 2, 3, 4, 5],
      k: 2,
      expected: 9,
      description: 'LeetCode Ex 2: Chia [1,2,3] và [4,5] -> tổng lớn nhất nhỏ nhất là 9',
    },

    // Trường hợp biên (Edge cases)
    {
      nums: [1, 4, 3],
      k: 3,
      expected: 4,
      description: 'Edge case: k = độ dài mảng -> kết quả là phần tử lớn nhất (4)',
    },
    {
      nums: [5],
      k: 1,
      expected: 5,
      description: 'Edge case: Mảng chỉ có 1 phần tử -> kết quả là chính phần tử đó (5)',
    },
    {
      nums: [10, 20, 30, 40],
      k: 1,
      expected: 100,
      description: 'Edge case: k = 1 -> kết quả là tổng toàn bộ mảng (100)',
    },

    // Các phần tử giống nhau
    {
      nums: [2, 2, 2, 2],
      k: 2,
      expected: 4,
      description: 'Mảng có phần tử đồng đều, k = 2 -> [2, 2] và [2, 2] -> 4',
    },
    {
      nums: [2, 2, 2, 2],
      k: 4,
      expected: 2,
      description: 'Mảng có phần tử đồng đều, k = n -> mỗi mảng con 1 phần tử -> 2',
    },

    // Mảng chứa số 0
    {
      nums: [0, 0, 0, 0],
      k: 2,
      expected: 0,
      description: 'Mảng toàn số 0 -> tổng lớn nhất là 0',
    },

    // Phần tử lệch lớn (Outlier)
    {
      nums: [1, 1, 100, 1, 1],
      k: 3,
      expected: 100,
      description: 'Có 1 phần tử đột biến lớn ở giữa -> kết quả bị chặn dưới bởi 100',
    },

    // Dãy tăng dần chia thành nhiều mảng con
    {
      nums: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      k: 5,
      expected: 11,
      description: 'Dãy 1..9 chia thành 5 mảng con -> tổng lớn nhất là 11',
    },
  ];

  it.each(testCases)(
    '$description (k: $k -> expected: $expected)',
    ({ nums, k, expected }) => {
      expect(splitArray(nums, k)).toBe(expected);
    }
  );
});

