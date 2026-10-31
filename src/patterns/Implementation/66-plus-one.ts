/**
 * Problem: 66-plus-one (Plus One)
 * Pattern: Implementation / Array Traversal
 *
 * Time Complexity:
 *   - Best Case: O(1) khi chữ số cuối cùng < 9 (ví dụ: [1, 2, 3] -> [1, 2, 4])
 *   - Average / Worst Case: O(N) khi phải nhớ liên hoàn (ví dụ: [9, 9, 9] -> [1, 0, 0, 0])
 *
 * Space Complexity:
 *   - Best / Average Case: O(1) in-place modification
 *   - Worst Case (toàn số 9): O(N) để tạo mảng kết quả kích thước N + 1
 *
 * Tối ưu hóa hiệu năng (V8 Optimization):
 *   - Tránh dùng `digits.unshift(1)`: Trong JS/V8 engine, `unshift()` bắt buộc dịch chuyển
 *     toàn bộ phần tử sang phải và có thể trigger re-allocation/de-optimization của mảng.
 *   - Thay vào đó, khi thoát khỏi vòng lặp (toàn bộ các chữ số đều là 9), kết quả luôn là 1
 *     theo sau bởi N số 0 ([1, 0, 0, ...]). Khởi tạo trực tiếp mảng mới `new Array(n + 1).fill(0)`
 *     với `res[0] = 1` đạt tốc độ tối đa và tối ưu bộ nhớ.
 */

export function plusOne(digits: number[]): number[] {
    const len = digits.length

    // Duyệt ngược từ hàng đơn vị về hàng cao nhất
    for (let i = len - 1; i >= 0; i--) {
        if (digits[i]! < 9) {
            digits[i] += 1
            return digits
        }

        // Chữ số hiện tại là 9 -> chuyển thành 0 và tiếp tục truyền biến nhớ
        digits[i] = 0
    }

    // Nếu thoát vòng lặp, tất cả chữ số ban đầu đều là 9 (ví dụ [9, 9, 9])
    // Tối ưu V8: Tạo mảng mới pre-allocated thay vì unshift(1) tốn O(N) dịch chuyển
    const result = new Array(len + 1).fill(0)
    result[0] = 1
    return result
}
