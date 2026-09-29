/**
 * Problem: 76-minimum-window-substring (Minimum Window Substring)
 * Pattern: Sliding_Window (Two Pointers / Frequency Array Optimization)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(1) khi s rỗng hoặc s.length < t.length (Early Exit).
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(m + n)
 *     Trong đó m = s.length, n = t.length.
 *     + Xây dựng bảng tần suất cho t mất O(n).
 *     + Mỗi con trỏ left và right chỉ duyệt tiến một chiều qua mảng s tối đa m lần, mỗi lần O(1).
 *     + Thao tác slice kết quả cuối cùng mất O(minLen) <= O(m).
 *     Tổng thời gian chạy là O(m + n).
 *
 * Space Complexity: O(Σ) = O(1)
 *   - Sử dụng một bảng tần suất duy nhất Int32Array kích thước cố định 128 (bảng mã ASCII).
 *   - Không cấp phát thêm Map, Object hay cấu trúc dữ liệu động phụ thuộc vào kích thước đầu vào.
 */
export function minWindow(s: string, t: string): string {
    const sLen = s.length
    const tLen = t.length

    // Early Exit: Nếu chuỗi s ngắn hơn t hoặc t rỗng thì không thể tạo cửa sổ hợp lệ
    if (sLen < tLen || tLen === 0) return ''

    // Bảng tần suất ký tự ASCII (128 ký tự bao gồm đầy đủ A-Z, a-z)
    // targetFreq[code] > 0 biểu thị số lượng ký tự còn thiếu trong cửa sổ hiện tại
    // targetFreq[code] <= 0 biểu thị ký tự đã đủ hoặc là ký tự thừa/không cần thiết
    const targetFreq = new Int32Array(128)
    for (let i = 0; i < tLen; i++) {
        targetFreq[t.charCodeAt(i)]++
    }

    let remaining = tLen // Số lượng ký tự trong t cần được bao phủ
    let left = 0
    let right = 0
    let bestLeft = 0
    let minLen = Infinity

    // Mở rộng cửa sổ sang phải (Expand window)
    while (right < sLen) {
        const rightCode = s.charCodeAt(right)

        // Nếu ký tự này còn thiếu trong cửa sổ, giảm số lượng ký tự cần tìm
        if (targetFreq[rightCode] > 0) {
            remaining--
        }
        // Ghi nhận ký tự vào cửa sổ (giảm nhu cầu)
        targetFreq[rightCode]--
        right++

        // Khi cửa sổ đã gom đủ toàn bộ ký tự của t (remaining === 0)
        // Thu hẹp cửa sổ từ phía trái để tìm cửa sổ nhỏ nhất (Shrink window)
        while (remaining === 0) {
            const windowLen = right - left
            if (windowLen < minLen) {
                minLen = windowLen
                bestLeft = left
            }

            const leftCode = s.charCodeAt(left)
            // Nếu loại bỏ ký tự này làm cửa sổ bị thiếu (targetFreq[leftCode] === 0)
            // ta phải tăng biến đếm remaining lên để dừng thu hẹp
            if (targetFreq[leftCode] === 0) {
                remaining++
            }
            targetFreq[leftCode]++
            left++
        }
    }

    return minLen === Infinity ? '' : s.slice(bestLeft, bestLeft + minLen)
}

// Export alias hỗ trợ các file test hoặc template generator
export const minimumWindowSubstring = minWindow
