/**
 * Problem: 206-reverse-linked-list
 * Pattern: Linked_List
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
import { ListNode } from "../../data_structures/linked_list/ListNode.js";

export function reverseLinkedList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current: ListNode | null = head
  while (current !== null) {
    let nextTemp: ListNode | null = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp
  }
  return prev;
}
