import { describe, it, expect } from 'vitest';
import { trapRainWater } from './42-trap-rain-water.js';

describe('Pattern: Two_Pointers -> 42-trap-rain-water', () => {
  const testCases = [
    // 1. Case kinh điển 1 của đề bài LeetCode
    { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], expected: 6 },

    // 2. Case kinh điển 2 của đề bài LeetCode
    { height: [4, 2, 0, 3, 2, 5], expected: 9 },

    // 3. Case mặt đất bằng phẳng, không có rãnh để đọng nước
    { height: [3, 3, 3, 3], expected: 0 },

    // 4. Case sườn dốc (chỉ tăng dần hoặc chỉ giảm dần) -> Nước trôi tuột hết
    { height: [1, 2, 3, 4, 5], expected: 0 },
    { height: [5, 4, 3, 2, 1], expected: 0 },

    // 5. Case một vũng nước đơn giản ở giữa
    { height: [3, 0, 3], expected: 3 },
    { height: [5, 1, 4], expected: 3 },

    // 6. Case thung lũng sâu tít thò lò
    { height: [10, 0, 0, 0, 5], expected: 15 },

    // 7. Edge cases: Mảng rỗng hoặc không đủ 3 cột (không thể tạo thành vũng chứa nước)
    { height: [], expected: 0 },
    { height: [2], expected: 0 },
    { height: [2, 1], expected: 0 },
  ];

  it.each(testCases)(
    'với mảng địa hình height = $height thì lượng nước đọng lại phải là $expected',
    ({ height, expected }) => {
      expect(trapRainWater(height)).toBe(expected);
    }
  );
});