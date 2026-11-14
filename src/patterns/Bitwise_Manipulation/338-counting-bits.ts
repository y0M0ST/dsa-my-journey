/**
 * Problem: 338 - Counting Bits
 * Pattern: Bitwise_Manipulation (Dynamic Programming on Bits & Brian Kernighan Transition)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Meta / Google):
 * - Bài toán đỉnh cao kết hợp giữa Bitwise Manipulation và Quy hoạch động (Bit DP).
 * - Yêu cầu khắt khe của Meta:
 *   1. KHÔNG được dùng hàm popcount built-in.
 *   2. Đạt độ phức tạp thời gian tuyến tính thuần túy $O(N)$ (thay vì $O(N \log N)$ bằng cách đếm từng số).
 *   3. Tận dụng các hệ thức chuyển đổi trạng thái bit đã tính từ các bài toán con trước đó.
 *
 * Các hệ thức truy hồi Dynamic Programming trên Bit:
 * 1. Phương pháp Dịch phải (Least Significant Bit - LSB):
 *    - Phép toán `i >> 1` tương đương chia đôi số $i$ (bỏ đi bit cuối cùng).
 *    - Bit cuối cùng là `i & 1`.
 *    $$\text{dp}[i] = \text{dp}[i \gg 1] + (i \ \& \ 1)$$
 * 2. Phương pháp Brian Kernighan (Lowest Set Bit Reduction):
 *    - Phép toán `i & (i - 1)` xóa bit 1 thấp nhất của $i$.
 *    - Vì $i \ \& \ (i - 1) < i$, trạng thái này chắc chắn đã được giải quyết xong trước đó!
 *    $$\text{dp}[i] = \text{dp}[i \ \& \ (i - 1)] + 1$$
 *
 * Đánh giá độ phức tạp:
 * 1. DP LSB: Time $O(N)$, Space $O(1)$ auxiliary.
 * 2. DP Kernighan: Time $O(N)$, Space $O(1)$ auxiliary.
 * 3. Naive Popcount: Time $O(N \log N)$, Space $O(1)$.
 */

/**
 * Cách 1: Quy hoạch động dựa trên Bit cuối cùng LSB (dp[i] = dp[i >> 1] + (i & 1)) - Optimal.
 *
 * @param n Số nguyên không âm
 * @returns Mảng kết quả từ 0 đến n
 */
export function countBitsDPLeastSignificant(n: number): number[] {
    const ans = new Array<number>(n + 1)
    ans[0] = 0

    for (let i = 1; i <= n; i++) {
        ans[i] = ans[i >> 1]! + (i & 1)
    }

    return ans
}

/**
 * Cách 2: Quy hoạch động dựa trên phép xóa bit 1 thấp nhất (dp[i] = dp[i & (i - 1)] + 1).
 *
 * @param n Số nguyên không âm
 * @returns Mảng kết quả
 */
export function countBitsDPKernighan(n: number): number[] {
    const ans = new Array<number>(n + 1)
    ans[0] = 0

    for (let i = 1; i <= n; i++) {
        ans[i] = ans[i & (i - 1)]! + 1
    }

    return ans
}

/**
 * Cách 3: Đếm bit độc lập cho từng số bằng Brian Kernighan (Baseline so sánh O(N log N)).
 *
 * @param n Số nguyên không âm
 * @returns Mảng kết quả
 */
export function countBitsNaive(n: number): number[] {
    const ans = new Array<number>(n + 1)

    for (let i = 0; i <= n; i++) {
        let count = 0
        let cur = i
        while (cur !== 0) {
            cur &= cur - 1
            count++
        }
        ans[i] = count
    }

    return ans
}

/**
 * Hàm giải chính theo chuẩn LeetCode 338.
 * Mặc định sử dụng thuật toán DP LSB O(N).
 */
export const countBits = countBitsDPLeastSignificant
