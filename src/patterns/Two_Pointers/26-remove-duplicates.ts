/**
 * Problem: 26-remove-duplicates-from-sorted-array (Remove Duplicates from Sorted Array)
 * Pattern: Two_Pointers (Fast & Slow Pointers / In-Place Write Optimization)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(1) khi mảng rỗng hoặc chỉ có 1 phần tử (Early Exit).
 *     Trường hợp mảng đã hoàn toàn không có phần tử trùng lặp: O(n) duyệt nhưng tốn 0 thao tác ghi bộ nhớ (0 writes).
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(n)
 *     Trong đó n = nums.length.
 *     + Con trỏ `fast` duyệt qua mảng đúng 1 lần từ index 1 đến n - 1 (n - 1 bước).
 *     + Con trỏ `slow` theo dõi vị trí ghi phần tử duy nhất tiếp theo.
 *     + Tối ưu hóa ghi bộ nhớ (Redundant Write Elimination): Chỉ thực hiện ghi `nums[slow] = nums[fast]`
 *       khi `slow !== fast` (tức là sau khi đã phát hiện ít nhất 1 phần tử trùng lặp). Điều này tránh
 *       việc ghi đè lại chính giá trị đang có vào bộ nhớ cache L1 khi mảng đang ở trạng thái không trùng.
 *
 * Space Complexity: O(1)
 *   - Sửa đổi trực tiếp tại chỗ (In-place modification) trên mảng đầu vào.
 *   - Chỉ sử dụng 2 con trỏ nguyên thủy `slow` và `fast`, không cấp phát thêm bất kỳ mảng phụ nào.
 */
export function removeDuplicates(nums: number[]): number {
    const n = nums.length
    if (n <= 1) return n

    let slow = 1

    for (let fast = 1; fast < n; fast++) {
        if (nums[fast] !== nums[fast - 1]) {
            // Tối ưu hóa: Chỉ ghi đè khi vị trí đọc khác vị trí ghi
            if (slow !== fast) {
                nums[slow] = nums[fast]!
            }
            slow++
        }
    }

    return slow
}

// Export alias hỗ trợ các file test hoặc LeetCode template generator
export const removeDuplicatesFromSortedArray = removeDuplicates


