/**
 * Problem: 704-binary-search (Binary Search)
 * Pattern: Binary_Search (Iterative Two Pointers / Divide and Conquer)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(1)
 *     + Khi target nằm ngoài khoảng giá trị của mảng (target < nums[0] hoặc target > nums[n - 1]),
 *       kết thúc ngay lập tức thông qua Boundary Check (Early Exit).
 *     + Khi target nằm ngay tại 2 đầu mút (nums[0] hoặc nums[n - 1]).
 *     + Khi target trùng khớp ngay vị trí chính giữa (mid) ở lần lặp đầu tiên.
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(log n)
 *     + Không gian tìm kiếm giảm đi một nửa sau mỗi vòng lặp.
 *     + Sử dụng phép toán dịch bit `(left + right) >>> 1` thay cho `Math.floor` giúp tối ưu hiệu năng
 *       và phòng tránh tràn số nguyên 32-bit.
 *
 * Space Complexity: O(1)
 *   - Chỉ sử dụng 2 con trỏ nguyên thủy left và right, không cấp phát thêm bộ nhớ phụ.
 */
export function binarySearch(nums: number[], item: number): number {
    const n = nums.length
    if (n === 0) return -1

    // Tối ưu trường hợp biên (Boundary Checks - O(1) Early Exits)
    const first = nums[0]!
    const last = nums[n - 1]!

    if (item < first || item > last) return -1
    if (item === first) return 0
    if (item === last) return n - 1

    // Đã kiểm tra 2 đầu mút, thu hẹp không gian tìm kiếm vào đoạn [1, n - 2]
    let left = 1
    let right = n - 2

    while (left <= right) {
        // Phép dịch bit không dấu: nhanh hơn Math.floor và an toàn chống tràn số
        const mid = (left + right) >>> 1
        const val = nums[mid]!

        if (val === item) {
            return mid
        } else if (val < item) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    return -1
}

// Export alias hỗ trợ các file test hoặc LeetCode template generator
export const search = binarySearch
