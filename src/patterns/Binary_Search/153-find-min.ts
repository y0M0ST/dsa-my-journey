/**
 * Problem: 153-find-min (Find Minimum in Rotated Sorted Array)
 * Pattern: Binary_Search (Template 2: Boundary Detection / Pivot Finding)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(1)
 *     + Mảng rỗng hoặc chỉ có 1 phần tử (Early Exit).
 *     + Mảng không bị xoay (nums[0] <= nums[n - 1]): Phần tử nhỏ nhất chính là nums[0] ngay lập tức!
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(log n)
 *     + Mỗi bước chia đôi không gian tìm kiếm dựa trên phép so sánh giữa nums[mid] và nums[right].
 *     + Sử dụng phép toán dịch bit không dấu `(left + right) >>> 1` thay cho `Math.floor`
 *       giúp tăng tốc xử lý và ngăn ngừa tràn số nguyên.
 *
 * Space Complexity: O(1)
 *   - Thuật toán hoạt động hoàn toàn tại chỗ (in-place) với các con trỏ nguyên thủy.
 */
export function findMin(nums: number[]): number {
    const n = nums.length
    if (n === 0) return 0
    if (n === 1) return nums[0]!

    const first = nums[0]!
    const last = nums[n - 1]!

    // Tối ưu cực mạnh O(1): Nếu mảng không hề bị xoay (vòng lặp đầy đủ hoặc xoay k = 0)
    // Giá trị đầu tiên luôn là giá trị nhỏ nhất!
    if (first <= last) {
        return first
    }

    // Không gian tìm kiếm: Sử dụng Template 2 (left < right)
    let left = 0
    let right = n - 1

    while (left < right) {
        // Phép dịch bit không dấu: tương đương Math.floor((left + right) / 2)
        const mid = (left + right) >>> 1
        const midVal = nums[mid]!

        // So sánh với điểm mút bên phải (nums[right]) làm hệ quy chiếu chuẩn
        if (midVal > nums[right]!) {
            // Nửa trái [left..mid] nằm ở phần dốc cao trước điểm gãy.
            // Phần tử nhỏ nhất chắc chắn nằm ở nửa phải (sau mid).
            left = mid + 1
        } else {
            // Nửa phải [mid..right] đang tăng dần, điểm gãy có thể là mid hoặc nằm bên trái mid.
            // Bắt mid làm con tin: giữ lại mid vì nó hoàn toàn có thể là đáp án nhỏ nhất!
            right = mid
        }
    }

    // Khi vòng lặp dừng lại (left === right), cả 2 con trỏ hội tụ tại đúng điểm cực tiểu (Pivot)
    return nums[left]!
}

// Export aliases hỗ trợ các file test hoặc LeetCode template generator
export const findMinRotated = findMin