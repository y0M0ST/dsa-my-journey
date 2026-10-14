/**
 * Problem: 239-sliding-window-maximum (Sliding Window Maximum)
 * Pattern: Sliding_Window (Monotonic Decreasing Deque / Two-Pointer Queue)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(n)
 *     + Khi k = 1: Sử dụng Early Exit trả về ngay bản sao mảng nums.slice() trong O(n), không cần Deque.
 *     + Khi k >= n: Duyệt một vòng O(n) tìm giá trị lớn nhất duy nhất trả về [max].
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(n)
 *     + Mỗi chỉ số i từ 0 đến n - 1 được thêm vào Deque đúng 1 lần (tail++).
 *     + Mỗi chỉ số chỉ bị loại bỏ tối đa 1 lần qua đầu hàng đợi (head++) hoặc đuôi hàng đợi (tail--).
 *     + Tổng số thao tác trên Deque không vượt quá 2n -> Thời gian chạy tuyến tính O(n).
 *
 * Space Complexity: O(k)
 *   - Hàng đợi đơn điệu chỉ lưu trữ tối đa k chỉ số của cửa sổ trượt tại mọi thời điểm.
 *   - Tối ưu hóa cực hạn V8 Engine: Sử dụng Int32Array với 2 con trỏ head và tail thay vì
 *     Array.prototype.shift() (thao tác shift tốn O(k) do phải re-index toàn bộ mảng).
 *   - Cấp phát trước mảng kết quả kích thước cố định (n - k + 1) tránh GC thrashing và realloc.
 */
export function maxSlidingWindow(nums: number[], k: number): number[] {
    const n = nums.length

    // Early Exit 1: Xử lý trường hợp mảng rỗng hoặc k không hợp lệ
    if (n === 0 || k <= 0) return []

    // Early Exit 2: Khi k = 1, mỗi cửa sổ chỉ có đúng 1 phần tử -> trả về bản sao của nums
    if (k === 1) return nums.slice()

    // Early Exit 3: Khi k >= n, cửa sổ bao trùm toàn bộ mảng -> tìm giá trị lớn nhất trong 1 lần duyệt
    if (k >= n) {
        let maxVal = nums[0]
        for (let i = 1; i < n; i++) {
            if (nums[i] > maxVal) {
                maxVal = nums[i]
            }
        }
        return [maxVal]
    }

    // Mảng kết quả kích thước cố định n - k + 1 phần tử
    const resultLen = n - k + 1
    const result = new Array<number>(resultLen)
    let resultIdx = 0

    // Monotonic Decreasing Deque sử dụng Int32Array và 2 con trỏ head, tail
    // Deque lưu trữ CHỈ SỐ (index) của các phần tử, giá trị tương ứng nums[deque[i]] luôn giảm dần
    const deque = new Int32Array(n)
    let head = 0 // Con trỏ trỏ tới đầu hàng đợi (chứa index của phần tử MAX hiện tại)
    let tail = 0 // Con trỏ ghi phần tử tiếp theo vào cuối hàng đợi

    for (let i = 0; i < n; i++) {
        const currentVal = nums[i]

        // 1. Loại bỏ phần tử đã trượt ra khỏi cửa sổ hiện tại [i - k + 1, i]
        // Nếu chỉ số ở đầu hàng đợi < i - k + 1, tăng head (O(1) pop front)
        if (head < tail && deque[head] < i - k + 1) {
            head++
        }

        // 2. Duy trì tính đơn điệu giảm:
        // Loại bỏ mọi phần tử ở cuối Deque có giá trị nhỏ hơn hoặc bằng phần tử hiện tại.
        // Triết lý: Nếu phần tử mới vào (nums[i]) vừa trẻ hơn (tồn tại lâu hơn trong cửa sổ)
        // vừa có giá trị lớn hơn các phần tử cũ, thì các phần tử cũ không còn cơ hội làm Max nữa.
        while (head < tail && nums[deque[tail - 1]] <= currentVal) {
            tail-- // O(1) pop back
        }

        // 3. Thêm chỉ số hiện tại vào cuối Deque (O(1) push back)
        deque[tail++] = i

        // 4. Khi cửa sổ đã gom đủ ít nhất k phần tử (i >= k - 1),
        // phần tử ở đầu Deque (deque[head]) chính là giá trị lớn nhất của cửa sổ hiện tại
        if (i >= k - 1) {
            result[resultIdx++] = nums[deque[head]]
        }
    }

    return result
}

// Export alias hỗ trợ các file test hoặc template generator
export const slidingWindowMaximum = maxSlidingWindow
