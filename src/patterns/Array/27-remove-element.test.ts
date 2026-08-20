import { describe, it, expect } from 'vitest';
import { removeElement } from './27-remove-element.js';

describe('27. Remove Element (Slow & Fast Pointers)', () => {

  it('Case 1: Ví dụ 1 chuẩn LeetCode - Rác nằm ở 2 đầu', () => {
    let nums = [3, 2, 2, 3];
    const val = 3; // Lệnh truy nã con số 3
    const k = removeElement(nums, val);

    expect(k).toBe(2); // Giữ lại được 2 số
    expect(nums.slice(0, k)).toEqual([2, 2]); // Khúc đầu mảng phải dồn lại đúng 2 số này
  });

  it('Case 2: Ví dụ 2 LeetCode - Rác nằm xen kẽ từa lưa', () => {
    let nums = [0, 1, 2, 2, 3, 0, 4, 2];
    const val = 2; // Truy nã số 2
    const k = removeElement(nums, val);

    expect(k).toBe(5);
    // Nhờ Thỏ và Rùa chạy cùng chiều, nên thứ tự mấy số còn sống bị giữ nguyên
    expect(nums.slice(0, k)).toEqual([0, 1, 3, 0, 4]);
  });

  it('Case 3: Mảng trong sạch - Không có phần tử nào bị dính lời nguyền (Best case)', () => {
    let nums = [1, 3, 5, 7];
    const val = 9; // Tìm số 9 để xóa mà hổng có
    const k = removeElement(nums, val);

    expect(k).toBe(4);
    expect(nums.slice(0, k)).toEqual([1, 3, 5, 7]); // Nguyên vẹn 100%
  });

  it('Case 4: Mảng thảm họa - Toàn rác, bay sạch không còn 1 mống (Worst case)', () => {
    let nums = [4, 4, 4, 4];
    const val = 4;
    const k = removeElement(nums, val);

    expect(k).toBe(0); // Rùa không nhích được bước nào
    expect(nums.slice(0, k)).toEqual([]); // Trắng tay
  });

  it('Case 5: Mảng rỗng không có gì (Edge case)', () => {
    let nums: number[] = [];
    const val = 1;
    const k = removeElement(nums, val);

    expect(k).toBe(0);
    expect(nums.slice(0, k)).toEqual([]);
  });
});