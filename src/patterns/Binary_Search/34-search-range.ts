/**
 * Problem: 34-search-range (Find First and Last Position of Element in Sorted Array)
 * Pattern: Binary_Search (Bound Squeezing / Flag Invariant)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(1)
 *     + Mảng rỗng hoặc target nằm ngoài khoảng [nums[0], nums[n - 1]] (Boundary Check Early Exit).
 *     + Mảng có tất cả phần tử bằng nhau và bằng target (nums[0] === target && nums[n - 1] === target -> [0, n - 1]).
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(log n)
 *     + Tìm vị trí đầu tiên (first position) trong O(log n).
 *     + Nếu không tìm thấy first position (return [-1, -1] sớm), không cần tìm last position.
 *     + Nếu tìm thấy và nums[n - 1] === target thì last position là n - 1 ngay lập tức.
 *     + Ngược lại, chỉ cần tìm last position trong phạm vi thu hẹp [firstPos, n - 1] thay vì [0, n - 1].
 *     + Sử dụng phép toán dịch bit không dấu `(left + right) >>> 1` thay cho `Math.floor`.
 *
 * Space Complexity: O(1)
 *   - Chỉ sử dụng các biến nguyên thủy lưu trữ con trỏ và kết quả, không cấp phát thêm bộ nhớ phụ.
 */
export function searchRange(nums: number[], target: number): number[] {
    const n = nums.length
    if (n === 0) return [-1, -1]

    const first = nums[0]!
    const last = nums[n - 1]!

    // Tối ưu trường hợp biên (Boundary Checks - O(1) Early Exits)
    if (target < first || target > last) return [-1, -1]

    // Nếu cả 2 đầu mút đều bằng target, toàn bộ mảng là target
    if (first === target && last === target) return [0, n - 1]

    // 1. Tìm vị trí xuất hiện đầu tiên (First Position / Left Bound)
    let left = 0
    let right = n - 1
    let firstPos = -1

    while (left <= right) {
        const mid = (left + right) >>> 1
        const val = nums[mid]!

        if (val === target) {
            firstPos = mid
            right = mid - 1 // Tiếp tục ép biên phải về bên trái để tìm vị trí xuất hiện sớm hơn
        } else if (val < target) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    // Nếu không tìm thấy target trong mảng
    if (firstPos === -1) return [-1, -1]

    // Tối ưu: Nếu phần tử cuối cùng bằng target thì lastPos chính là n - 1
    if (last === target) return [firstPos, n - 1]

    // 2. Tìm vị trí xuất hiện cuối cùng (Last Position / Right Bound)
    // Thu hẹp không gian tìm kiếm: bắt đầu từ firstPos thay vì 0, và kết thúc ở n - 2 vì nums[n - 1] > target
    left = firstPos
    right = n - 2
    let lastPos = firstPos

    while (left <= right) {
        const mid = (left + right) >>> 1
        const val = nums[mid]!

        if (val === target) {
            lastPos = mid
            left = mid + 1 // Tiếp tục đẩy biên trái sang bên phải để tìm vị trí xuất hiện muộn hơn
        } else if (val < target) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    return [firstPos, lastPos]
}

// Export alias hỗ trợ các file test hoặc LeetCode template generator
export const findFirstAndLastPosition = searchRange