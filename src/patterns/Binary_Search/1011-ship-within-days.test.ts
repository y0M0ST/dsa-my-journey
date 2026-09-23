import { describe, it, expect } from 'vitest';
import { shipWithinDays } from './1011-ship-within-days.js';

describe('Pattern: Binary_Search -> 11-ship-within-days', () => {
  const testCases = [
    // 1. LeetCode Example 1
    {
      weights: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      days: 5,
      expected: 15,
      description: 'Ví dụ 1: 10 kiện hàng chia 5 ngày -> tải trọng tối thiểu 15',
    },

    // 2. LeetCode Example 2
    {
      weights: [3, 2, 2, 4, 1, 4],
      days: 3,
      expected: 6,
      description: 'Ví dụ 2: 6 kiện hàng chia 3 ngày -> tải trọng tối thiểu 6',
    },

    // 3. LeetCode Example 3
    {
      weights: [1, 2, 3, 1, 1],
      days: 4,
      expected: 3,
      description: 'Ví dụ 3: 5 kiện hàng chia 4 ngày -> tải trọng tối thiểu 3',
    },

    // 4. Edge case: Chở hết trong 1 ngày (days = 1) -> tải trọng bằng tổng weights
    {
      weights: [1, 2, 3, 4, 5],
      days: 1,
      expected: 15,
      description: 'Edge case: Chở trong đúng 1 ngày -> tải trọng bằng tổng khối lượng (15)',
    },

    // 5. Edge case: Số ngày bằng số kiện hàng (days = weights.length) -> tải trọng bằng max(weights)
    {
      weights: [5, 4, 3, 2, 1],
      days: 5,
      expected: 5,
      description: 'Edge case: Mỗi ngày chở 1 kiện -> tải trọng bằng kiện nặng nhất (5)',
    },

    // 6. Edge case: Chỉ có đúng 1 kiện hàng duy nhất
    {
      weights: [10],
      days: 1,
      expected: 10,
      description: 'Edge case: Đúng 1 kiện hàng duy nhất -> tải trọng bằng 10',
    },

    // 7. Edge case: Tất cả các kiện hàng nặng bằng nhau
    {
      weights: [5, 5, 5, 5],
      days: 2,
      expected: 10,
      description: 'Edge case: Các kiện hàng đều nhau -> tải trọng tối thiểu 10',
    },

    // 8. Edge case: Kiện hàng siêu to ở giữa
    {
      weights: [1, 1, 20, 1, 1],
      days: 3,
      expected: 20,
      description: 'Edge case: Có 1 kiện nặng đột biến ở giữa -> tải trọng tối thiểu là 20',
    },
  ];

  it.each(testCases)(
    '$description (weights: $weights, days: $days -> expected: $expected)',
    ({ weights, days, expected }) => {
      expect(shipWithinDays(weights, days)).toBe(expected);
    }
  );
});
