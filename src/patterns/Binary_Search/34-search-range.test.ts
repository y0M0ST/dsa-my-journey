import { describe, it, expect } from 'vitest';
import { searchRange } from './34-search-range.js';

describe('34. Find First and Last Position of Element', () => {
  it('Case 1: Mảng bình thường, có 2 phần tử target nằm cạnh nhau', () => {
    expect(searchRange([5, 7, 7, 8, 8, 10], 8)).toEqual([3, 4]);
  });

  it('Case 2: Tìm con số không hề tồn tại trong mảng', () => {
    expect(searchRange([5, 7, 7, 8, 8, 10], 6)).toEqual([-1, -1]);
  });

  it('Case 3: Mảng rỗng không có gì', () => {
    expect(searchRange([], 0)).toEqual([-1, -1]);
  });

  it('Case 4: Mảng có 1 phần tử và đúng là mục tiêu luôn', () => {
    expect(searchRange([1], 1)).toEqual([0, 0]);
  });

  it('Case 5: Mảng dị nhân - toàn số giống hệt nhau', () => {
    expect(searchRange([2, 2, 2, 2, 2], 2)).toEqual([0, 4]);
  });

  it('Case 6: Có đúng 1 phần tử lọt thỏm giữa bầy số khác', () => {
    expect(searchRange([1, 2, 3, 4, 5], 3)).toEqual([2, 2]);
  });
});