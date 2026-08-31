import { describe, it, expect } from 'vitest';
import { reverseLinkedList } from './206-reverse-linked-list.js';
import { ListNode } from '../../data_structures/linked_list/ListNode.js';

// Helper 1: Biến mảng [1, 2, 3] thành Linked List (1 -> 2 -> 3 -> null)
function arrayToList(arr: number[]): ListNode | null {
  if (arr.length === 0) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Helper 2: Biến Linked List thành mảng để Vitest so sánh (toEqual) cho dễ
function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

describe('Pattern: Linked_List -> 206-reverse-linked-list', () => {
  const testCases = [
    // 1. Case cơ bản: List 5 phần tử
    { input: [1, 2, 3, 4, 5], expected: [5, 4, 3, 2, 1] },

    // 2. Case ngắn: List 2 phần tử
    { input: [1, 2], expected: [2, 1] },

    // 3. Edge case: List rỗng (null)
    { input: [], expected: [] },

    // 4. Edge case: List chỉ có 1 phần tử (Head cũng là Tail)
    { input: [7], expected: [7] }
  ];

  it.each(testCases)(
    'với input $input thì kết quả đảo ngược phải là $expected',
    ({ input, expected }) => {
      // Ép Array thành Linked List trước khi đưa vào hàm của bà
      const listInput = arrayToList(input);

      // Chạy hàm reverse
      const reversedList = reverseLinkedList(listInput);

      // Ép ngược kết quả về lại Array để so sánh với expected
      expect(listToArray(reversedList)).toEqual(expected);
    }
  );
});