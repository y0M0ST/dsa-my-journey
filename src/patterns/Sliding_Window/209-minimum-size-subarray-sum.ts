/**
 * Problem: 209-minimum-size-subarray-sum (Minimum Size Subarray Sum)
 * Pattern: Sliding_Window (Dynamic Window / Two Pointers Optimization)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(1) khi mảng rỗng (Early Exit) hoặc tìm thấy phần tử nums[i] >= target (minLen = 1).
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(n)
 *     Trong đó n = nums.length.
 *     + Con trỏ right mở rộng cửa sổ và duyệt qua từng phần tử mảng đúng 1 lần (n bước).
 *     + Con trỏ left chỉ di chuyển tiến lên để thu hẹp cửa sổ khi tổng thỏa điều kiện, mỗi phần tử bị loại tối đa 1 lần (<= n bước).
 *     + Tổng số bước thao tác của cả hai con trỏ tối đa là 2n = O(n).
 *     + Tối ưu hóa Early Exit: Nếu tìm thấy bất kỳ cửa sổ nào có độ dài minLen === 1 thì lập tức ngắt vòng lặp trả về 1,
 *       vì trong mảng số nguyên dương không thể có mảng con không rỗng nào ngắn hơn 1.
 *
 * Space Complexity: O(1)
 *   - Chỉ sử dụng các biến nguyên thủy lưu trữ con trỏ và tổng tạm thời (left, right, currentSum, minLen).
 *   - Không cấp phát thêm bất kỳ mảng phụ, Map hay Set nào.
 *
 * Ghi chú mở rộng (Follow-up):
 *   - Bài toán có thể giải bằng Prefix Sum kết hợp Binary Search với thời gian O(n log n).
 *   - Tuy nhiên phương pháp Sliding Window (Hai con trỏ biến thiên) là giải pháp tối ưu vượt trội với O(n) thời gian và O(1) không gian bộ nhớ.
 */
export function minSubArrayLen(target: number, nums: number[]): number {
    const n = nums.length
    if (n === 0) return 0

    let left = 0
    let currentSum = 0
    let minLen = n + 1 // Khởi tạo minLen lớn hơn kích thước mảng n

    for (let right = 0; right < n; right++) {
        currentSum += nums[right]!

        // Khi tổng các phần tử trong cửa sổ [left...right] đạt hoặc vượt target
        while (currentSum >= target) {
            const currentLen = right - left + 1
            if (currentLen < minLen) {
                minLen = currentLen
                // Tối ưu Early Exit: độ dài nhỏ nhất khả dĩ là 1, nếu đã tìm thấy thì trả về ngay lập tức
                if (minLen === 1) return 1
            }

            // Thu hẹp cửa sổ từ phía trái để tìm cửa sổ ngắn nhất
            currentSum -= nums[left]!
            left++
        }
    }

    return minLen > n ? 0 : minLen
}

// Export alias hỗ trợ các file test hoặc template generator
export const minimumSizeSubarraySum = minSubArrayLen
