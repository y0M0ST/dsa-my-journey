/**
 * Problem: 19 - Remove Nth Node From End of List
 * Pattern: Linked_List (Dummy Head Sentinel & Fast-Slow Runner Gap)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Meta / Google):
 * - Đây là bài toán kinh điển kiểm tra hai kỹ thuật cốt lõi trong danh sách liên kết:
 *   1. Kỹ thuật con trỏ tạo khoảng cách so le (Two Pointers Runner with Gap $N + 1$):
 *      Cho phép tìm và xóa phần tử tính từ đuôi chỉ trong DUY NHẤT một lượt duyệt (One-Pass $O(L)$).
 *   2. Kỹ thuật Dummy Head Node (Sentinel Node):
 *      Loại bỏ hoàn toàn trường hợp biên nguy hiểm nhất: Xóa chính node đầu danh sách (`head`),
 *      giúp mã nguồn đồng nhất và không cần rẽ nhánh `if/else`.
 *
 * Bản chất toán học & Cơ chế con trỏ:
 * - Danh sách có tổng chiều dài $L$. Node thứ $n$ tính từ đuôi nằm ở vị trí $L - n + 1$ (1-indexed).
 * - Bằng cách cho `fast` đi trước `slow` đúng $n + 1$ bước (bắt đầu từ Dummy Node):
 *   Khi `fast` chạm tới mốc kết thúc `null` (đã đi hết $L + 1$ bước),
 *   con trỏ `slow` đã đi được:
 *   $$\text{steps}_{\text{slow}} = (L + 1) - (n + 1) = L - n$$
 *   $\implies$ `slow` đang đứng chính xác ngay tại node PHÍA TRƯỚC node cần xóa!
 * - Thao tác xóa tại chỗ: `slow.next = slow.next.next`.
 *
 * Đánh giá độ phức tạp:
 * 1. Fast-Slow Gap One-Pass: Time $O(L)$, Space $O(1)$.
 * 2. Two-Pass Length Calculation: Time $O(L)$, Space $O(1)$.
 */

import { ListNode } from '../../data_structures/linked_list/ListNode.js'

/**
 * Cách 1: Duyệt 1 lượt duy nhất bằng Fast-Slow Pointer kết hợp khoảng cách N + 1 và Dummy Head (Optimal).
 *
 * @param head Node đầu danh sách liên kết
 * @param n Vị trí thứ n tính từ đuôi cần xóa (1-indexed)
 * @returns Node đầu của danh sách sau khi đã xóa
 */
export function removeNthFromEndTwoPointers(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0, head)
    let fast: ListNode | null = dummy
    let slow: ListNode | null = dummy

    // Cho fast đi trước n + 1 bước để tạo khoảng cách
    for (let i = 0; i <= n; i++) {
        if (fast === null) {
            return head
        }
        fast = fast.next
    }

    // Cùng tịnh tiến cả fast và slow cho đến khi fast chạm null
    while (fast !== null) {
        fast = fast.next
        slow = slow!.next
    }

    // slow đang đứng trước node cần xóa, thực hiện ngắt kết nối
    if (slow !== null && slow.next !== null) {
        slow.next = slow.next.next
    }

    return dummy.next
}

/**
 * Cách 2: Duyệt 2 lượt tính tổng chiều dài L (Two-Pass Baseline).
 *
 * @param head Node đầu danh sách
 * @param n Vị trí
 * @returns Node đầu
 */
export function removeNthFromEndLength(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0, head)
    let length = 0
    let cur: ListNode | null = head

    while (cur !== null) {
        length++
        cur = cur.next
    }

    let steps = length - n
    cur = dummy
    while (steps > 0) {
        cur = cur!.next
        steps--
    }

    if (cur !== null && cur.next !== null) {
        cur.next = cur.next.next
    }

    return dummy.next
}

/**
 * Hàm giải chính theo chuẩn LeetCode 19.
 * Mặc định sử dụng thuật toán Two Pointers One-Pass.
 */
export const removeNthFromEnd = removeNthFromEndTwoPointers
