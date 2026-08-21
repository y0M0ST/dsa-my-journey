import { describe, it, expect } from 'vitest';
import { removeDuplicates } from './26-remove-duplicates.js';

describe('26. Remove Duplicates from Sorted Array (Slow & Fast Pointers)', () => {

  it('Case 1: Ví dụ cơ bản chuẩn LeetCode', () => {
    let nums = [1, 1, 2];
    const k = removeDuplicates(nums);
    expect(k).toBe(2);
    expect(nums.slice(0, k)).toEqual([1, 2]);
  });

  it('Case 2: Mảng dài ngoằng nhiều số trùng', () => {
    let nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    const k = removeDuplicates(nums);
    expect(k).toBe(5);
    expect(nums.slice(0, k)).toEqual([0, 1, 2, 3, 4]);
  });

  it('Case 3: Mảng ngoan ngoãn - không có số nào trùng (Best case)', () => {
    let nums = [1, 2, 3, 4, 5];
    const k = removeDuplicates(nums);
    expect(k).toBe(5);
    expect(nums.slice(0, k)).toEqual([1, 2, 3, 4, 5]);
  });

  it('Case 4: Mảng dị nhân - toàn anh em sinh đôi (Worst case)', () => {
    let nums = [7, 7, 7, 7, 7];
    const k = removeDuplicates(nums);
    expect(k).toBe(1);
    expect(nums.slice(0, k)).toEqual([7]);
  });

  it('Case 5: Mảng cô đơn chỉ có 1 con số (Edge case)', () => {
    let nums = [42];
    const k = removeDuplicates(nums);
    expect(k).toBe(1);
    expect(nums.slice(0, k)).toEqual([42]);
  });
});