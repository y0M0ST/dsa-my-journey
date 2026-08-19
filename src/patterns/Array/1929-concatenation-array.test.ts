import { describe, it, expect } from 'vitest';
import { concatenationArray } from './1929-concatenation-array.js';

describe('1929. Concatenation of Array', () => {
  it('Case 1: Ví dụ cơ bản chuẩn LeetCode', () => {
    expect(concatenationArray([1, 2, 1])).toEqual([1, 2, 1, 1, 2, 1]);
  });

  it('Case 2: Mảng dài hơn chút xíu coi có vấp không', () => {
    expect(concatenationArray([1, 3, 2, 1])).toEqual([1, 3, 2, 1, 1, 3, 2, 1]);
  });

  it('Case 3: Mảng cô đơn chỉ có đúng 1 phần tử (Edge case)', () => {
    expect(concatenationArray([5])).toEqual([5, 5]);
  });

  it('Case 4: Mảng chứa số âm và số 0', () => {
    expect(concatenationArray([0, -1, 4])).toEqual([0, -1, 4, 0, -1, 4]);
  });

  it('Case 5: Mảng toàn số giống hệt nhau', () => {
    expect(concatenationArray([7, 7, 7])).toEqual([7, 7, 7, 7, 7, 7]);
  });
});