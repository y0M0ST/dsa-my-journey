/**
 * Problem: 21-merge-two-sorted-lists (Merge Two Sorted Lists)
 * Pattern: Linked_List (Dummy Head Node / Two Pointers Merging)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(1)
 *     + Khi một trong hai danh sách rỗng (list1 === null hoặc list2 === null),
 *       kết thúc ngay lập tức bằng Early Exit trả về danh sách còn lại trong O(1).
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(n + m)
 *     Trong đó n và m lần lượt là độ dài của list1 và list2.
 *     + Mỗi bước so sánh giá trị nút của 2 danh sách, chọn nút nhỏ hơn ghép vào đuôi và tiến con trỏ lên 1 nấc.
 *     + Mỗi nút từ list1 và list2 được duyệt tối đa 1 lần duy nhất.
 *     + Khi một trong 2 danh sách hết trước, nối toàn bộ phần còn lại của danh sách kia trong O(1).
 *
 * Space Complexity: O(1)
 *   - Sử dụng kỹ thuật In-place Pointer Splicing (tái sử dụng trực tiếp các node đã có trong bộ nhớ).
 *   - Chỉ tạo duy nhất một Dummy Head Node đóng vai trò mỏ neo khởi đầu, không cấp phát thêm node mới.
 *   - Không phát sinh Garbage Collection (GC) thrashing.
 */
import { ListNode } from '../../data_structures/linked_list/ListNode.js'

export function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // Early Exit: Một trong hai danh sách rỗng -> trả về danh sách còn lại
    if (list1 === null) return list2
    if (list2 === null) return list1

    // Dummy Head Node: "Bảo bối" triệt tiêu hoàn toàn edge case rỗng đầu hoặc phải kiểm tra head riêng
    const dummy = new ListNode(0)
    let current = dummy

    // Dùng 2 con trỏ lướt song song trên cả 2 danh sách
    while (list1 !== null && list2 !== null) {
        if (list1.val <= list2.val) {
            current.next = list1
            list1 = list1.next
        } else {
            current.next = list2
            list2 = list2.next
        }
        current = current.next
    }

    // Nối phần còn lại của danh sách chưa rỗng trong O(1)
    current.next = list1 ?? list2

    return dummy.next
}

// Export alias hỗ trợ các file test hoặc template generator
export const mergeTwoSortedLists = mergeTwoLists
