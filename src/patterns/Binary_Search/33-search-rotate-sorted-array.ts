/**
 * Problem: 33-search-rotate-sorted-array (Search in Rotated Sorted Array)
 * Pattern: Binary_Search (Modified Binary Search / Half-Sorted Dissection)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(1)
 *     + Mảng rỗng hoặc chỉ có 1 phần tử (Early Exit).
 *     + Target trùng khớp ngay tại 2 đầu mút (nums[0] hoặc nums[n - 1]).
 *     + Cắt tỉa khoảng hở (Gap Pruning):
 *       * Nếu mảng không xoay (nums[0] < nums[n - 1]) và target nằm ngoài [nums[0], nums[n - 1]].
 *       * Nếu mảng bị xoay (nums[0] > nums[n - 1]) và target lọt vào khoảng hở (nums[n - 1], nums[0]).
 *     + Target nằm ngay tại vị trí mid ở lần lặp đầu tiên.
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(log n)
 *     + Không gian tìm kiếm giảm một nửa sau mỗi vòng lặp.
 *     + Sử dụng phép toán dịch bit không dấu `(left + right) >>> 1` thay cho `Math.floor`
 *       giúp tăng tốc độ xử lý bitwise và phòng tránh tràn số 32-bit.
 *
 * Space Complexity: O(1)
 *   - Thuật toán hoạt động hoàn toàn tại chỗ (in-place), chỉ sử dụng các biến con trỏ nguyên thủy.
 */
export function searchRotateSortedArray(nums: number[], target: number): number {
    const n = nums.length
    if (n === 0) return -1
    if (n === 1) return nums[0] === target ? 0 : -1

    const first = nums[0]!
    const last = nums[n - 1]!

    // Tối ưu trường hợp biên: Kiểm tra ngay 2 đầu mút (O(1) Early Exits)
    if (target === first) return 0
    if (target === last) return n - 1

    // Kiểm tra tính bất khả thi về mặt toán học (O(1) Boundary Pruning):
    // - Nếu mảng không bị xoay (first < last): target nằm ngoài [first, last] thì chắc chắn không tồn tại.
    // - Nếu mảng bị xoay (first > last): mọi phần tử đều hoặc >= first hoặc <= last.
    //   Do đó bất kỳ target nào lọt vào khoảng hở (last, first) đều chắc chắn không tồn tại!
    if (first < last) {
        if (target < first || target > last) return -1
    } else {
        if (target > last && target < first) return -1
    }

    // Đã kiểm tra 2 đầu mút, thu hẹp không gian tìm kiếm vào đoạn [1, n - 2]
    let left = 1
    let right = n - 2

    while (left <= right) {
        // Phép dịch bit không dấu: nhanh hơn Math.floor và an toàn chống tràn số
        const mid = (left + right) >>> 1
        const midVal = nums[mid]!

        if (midVal === target) return mid

        // Kịch bản 1: Nửa TRÁI [left..mid] là vùng an toàn (đang tăng dần liên tục)
        if (nums[left]! <= midVal) {
            // Kiểm tra xem target có lọt thỏm vào nửa trái này không
            if (nums[left]! <= target && target < midVal) {
                right = mid - 1 // Nằm trong nửa trái -> kéo biên phải lùi lại
            } else {
                left = mid + 1 // Không nằm trong nửa trái -> lượn qua phải tìm
            }
        }
        // Kịch bản 2: Nửa PHẢI [mid..right] là vùng an toàn (đang tăng dần liên tục)
        else {
            // Kiểm tra xem target có lọt thỏm vào nửa phải này không
            if (midVal < target && target <= nums[right]!) {
                left = mid + 1 // Nằm trong nửa phải -> đẩy biên trái tiến lên
            } else {
                right = mid - 1 // Không nằm trong nửa phải -> lượn qua trái tìm
            }
        }
    }

    return -1
}

// Export aliases hỗ trợ các file test hoặc LeetCode template generator
export const search = searchRotateSortedArray
export const searchRotatedArray = searchRotateSortedArray