/**
 * Problem: 141 - Linked List Cycle
 * Pattern: Linked_List (Floyd's Tortoise & Hare / Two Pointers)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Meta / Google):
 * - Đây là bài toán kinh điển đặt nền móng cho toàn bộ nhánh thuật toán Fast & Slow Pointers.
 * - Thường được người phỏng vấn dùng để kiểm tra:
 *   1. Khả năng phát hiện chu trình mà KHÔNG được cấp phát thêm bộ nhớ ($O(1)$ auxiliary space).
 *   2. Chứng minh toán học tại sao hai con trỏ rùa và thỏ chắc chắn sẽ gặp nhau nếu có chu trình.
 *   3. Xử lý các cạm bẫy Null Pointer Exception khi `fast` hoặc `fast.next` là `null`.
 *
 * Bản chất toán học của thuật toán Floyd's Cycle-Finding:
 * - Giả sử danh sách có phần đầu không chu trình dài $k$ nodes và chu trình có chu vi $C$ nodes.
 * - Con trỏ Chậm (`slow`) đi mỗi lượt 1 bước: $v_{\text{slow}} = 1$.
 * - Con trỏ Nhanh (`fast`) đi mỗi lượt 2 bước: $v_{\text{fast}} = 2$.
 * - Vận tốc tương đối: $v_{\text{rel}} = v_{\text{fast}} - v_{\text{slow}} = 2 - 1 = 1 \text{ node/bước}$.
 * - Khi cả hai cùng nằm trong vòng lặp, mỗi bước khoảng cách giữa chúng giảm đi đúng 1 node theo modulo $C$.
 *   Vì khoảng cách nguyên giảm dần từng đơn vị 1, chúng BẮT BUỘC phải chạm nhau tại khoảng cách 0
 *   (không thể nhảy qua mặt nhau).
 * - Số bước tối đa để gặp nhau là $k + C = O(N)$.
 *
 * So sánh các phương pháp:
 * 1. Con trỏ Rùa và Thỏ (Floyd's Two Pointers): Time $O(N)$, Space $O(1)$.
 * 2. Hash Set lưu vết tham chiếu (Set Memory Tracking): Time $O(N)$, Space $O(N)$.
 */

import { ListNode } from '../../data_structures/linked_list/ListNode.js'

/**
 * Cách 1: Thuật toán Floyd's Tortoise and Hare (Tối ưu tuyệt đối O(1) không gian bộ nhớ).
 *
 * @param head Node đầu danh sách liên kết
 * @returns boolean true nếu danh sách có chu trình lặp vô tận
 */
export function hasCycleFloyd(head: ListNode | null): boolean {
    if (head === null || head.next === null) {
        return false
    }

    let slow: ListNode | null = head
    let fast: ListNode | null = head

    while (fast !== null && fast.next !== null) {
        slow = slow!.next
        fast = fast.next.next

        // Nếu hai con trỏ trỏ về cùng một địa chỉ ô nhớ
        if (slow === fast) {
            return true
        }
    }

    return false
}

/**
 * Cách 2: Lưu vết con trỏ bằng Hash Set (Set Tracking).
 *
 * @param head Node đầu danh sách liên kết
 * @returns boolean true nếu danh sách có chu trình
 */
export function hasCycleSet(head: ListNode | null): boolean {
    const visited = new Set<ListNode>()
    let current: ListNode | null = head

    while (current !== null) {
        if (visited.has(current)) {
            return true
        }
        visited.add(current)
        current = current.next
    }

    return false
}

/**
 * Hàm giải chính theo chuẩn LeetCode 141.
 * Mặc định sử dụng thuật toán Floyd's Tortoise and Hare.
 */
export const hasCycle = hasCycleFloyd
