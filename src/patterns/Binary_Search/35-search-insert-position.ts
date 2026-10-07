/**
 * Problem: 35-search-insert-position (Search Insert Position)
 * Pattern: Binary_Search (Lower Bound Search / Invariant Property)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(1)
 *     + Mảng rỗng hoặc khi target nằm ở các vị trí biên:
 *       * `target <= nums[0]`: Trả về ngay index 0 (chèn vào đầu mảng).
 *       * `target > nums[n - 1]`: Trả về ngay index n (chèn vào cuối mảng).
 *       * `target === nums[n - 1]`: Trả về ngay index n - 1.
 *     + Khi target trùng khớp với phần tử tại vị trí `mid` ngay lần lặp đầu tiên.
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(log n)
 *     + Sau khi cắt tỉa 2 đầu mút, không gian tìm kiếm được thu hẹp vào đoạn [1, n - 2].
 *     + Sử dụng phép toán dịch bit không dấu `(left + right) >>> 1` thay cho `Math.floor`
 *       giúp tối ưu hiệu năng vi xử lý và an toàn chống tràn số 32-bit.
 *
 * Space Complexity: O(1)
 *   - Thuật toán hoạt động hoàn toàn tại chỗ (in-place) với các con trỏ nguyên thủy,
 *     không cấp phát thêm bất kỳ bộ nhớ phụ nào.
 */
export function searchInsertPosition(nums: number[], target: number): number {
    const n = nums.length
    if (n === 0) return 0

    const first = nums[0]!
    const last = nums[n - 1]!

    // Tối ưu trường hợp biên (Boundary Checks - O(1) Early Exits)
    if (target <= first) return 0
    if (target > last) return n
    if (target === last) return n - 1

    // Target chắc chắn nằm trong khoảng mở (first, last)
    // Thu hẹp không gian tìm kiếm nhị phân vào đoạn [1, n - 2]
    let left = 1
    let right = n - 2

    while (left <= right) {
        // Phép dịch bit không dấu: nhanh hơn Math.floor và an toàn chống tràn số
        const mid = (left + right) >>> 1
        const val = nums[mid]!

        if (val === target) {
            return mid
        } else if (val < target) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    // Khi không tìm thấy giá trị chính xác, con trỏ left chính là vị trí chèn phù hợp (Lower Bound)
    return left
}

// Export alias hỗ trợ các file test hoặc LeetCode template generator
export const searchInsert = searchInsertPosition
