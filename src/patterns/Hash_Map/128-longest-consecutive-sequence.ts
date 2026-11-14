/**
 * Problem: 128 - Longest Consecutive Sequence
 * Pattern: Hash_Map (Set Lookup & Sequence-Start Boundary Invariant)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Meta / Google):
 * - Đây là bài toán kinh điển kiểm tra tư duy thuật toán tối ưu $O(N)$ tuyến tính.
 * - Thách thức cốt lõi:
 *   Sắp xếp mảng (Sorting) tốn $O(N \log N)$ bị cấm theo ràng buộc đề bài.
 *   Làm thế nào để tìm độ dài chuỗi số liên tiếp dài nhất chỉ trong đúng $O(N)$ thời gian?
 *
 * Bản chất toán học & Bất biến điểm đầu chuỗi (Sequence-Start Invariant):
 * - Đưa toàn bộ các phần tử vào một `Set<number>` để tra cứu sự tồn tại trong $O(1)$.
 * - Một số `num` là phần tử bắt đầu của một chuỗi liên tiếp $\iff$ `num - 1` KHÔNG tồn tại trong Set:
 *   $$\text{isStart}(x) \iff (x - 1) \notin \text{Set}$$
 * - Nếu $(x - 1) \in \text{Set}$, ta BỎ QUA không xét (tránh lặp vô nghĩa), vì chuỗi chứa $x$
 *   chắc chắn sẽ được tính từ một phần tử nhỏ hơn nằm ở đầu chuỗi.
 * - Mỗi phần tử chỉ được vòng lặp `while` duyệt qua đúng một lần duy nhất khi xuất phát từ phần tử đầu chuỗi.
 *   $\implies$ Tổng số phép kiểm tra toàn mảng là $O(N + N) = O(N)$ tuyến tính thuần túy!
 *
 * Đánh giá độ phức tạp:
 * 1. Hash Set Sequence-Start Optimization: Time $O(N)$, Space $O(N)$.
 * 2. Sorting Baseline: Time $O(N \log N)$, Space $O(1)$ auxiliary.
 */

/**
 * Cách 1: Tối ưu điểm đầu chuỗi bằng Hash Set đạt O(N) tuyến tính (Optimal).
 *
 * @param nums Mảng số nguyên chưa sắp xếp
 * @returns Độ dài chuỗi số nguyên liên tiếp dài nhất
 */
export function longestConsecutiveSet(nums: number[]): number {
    if (nums.length === 0) {
        return 0
    }

    const numSet = new Set<number>(nums)
    let longestStreak = 0

    for (const num of numSet) {
        // Chỉ bắt đầu đếm khi num là phần tử khởi đầu của chuỗi (num - 1 không tồn tại trong Set)
        if (!numSet.has(num - 1)) {
            let currentNum = num
            let currentStreak = 1

            // Tịnh tiến liên tục chừng nào số tiếp theo còn tồn tại
            while (numSet.has(currentNum + 1)) {
                currentNum++
                currentStreak++
            }

            if (currentStreak > longestStreak) {
                longestStreak = currentStreak
            }
        }
    }

    return longestStreak
}

/**
 * Cách 2: Sắp xếp mảng rồi duyệt tuyến tính (Sorting Baseline O(N log N)).
 *
 * @param nums Mảng số nguyên
 * @returns Độ dài chuỗi
 */
export function longestConsecutiveSorting(nums: number[]): number {
    if (nums.length === 0) {
        return 0
    }

    nums.sort((a, b) => a - b)

    let longest = 1
    let currentStreak = 1

    for (let i = 1; i < nums.length; i++) {
        // Bỏ qua các phần tử trùng lặp
        if (nums[i] === nums[i - 1]) {
            continue
        }

        if (nums[i] === nums[i - 1]! + 1) {
            currentStreak++
        } else {
            longest = Math.max(longest, currentStreak)
            currentStreak = 1
        }
    }

    return Math.max(longest, currentStreak)
}

/**
 * Hàm giải chính theo chuẩn LeetCode 128.
 * Mặc định sử dụng thuật toán Hash Set tối ưu điểm đầu O(N).
 */
export const longestConsecutive = longestConsecutiveSet
