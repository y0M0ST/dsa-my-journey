/**
 * Problem: 438-find-all-anagrams-in-a-string (Find All Anagrams in a String)
 * Pattern: Sliding_Window (Fixed Size Window / Frequency Array Optimization)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(1) khi s.length < p.length hoặc s rỗng (Early Exit).
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(n)
 *     Trong đó n = s.length, k = p.length (k <= n).
 *     + Khởi tạo bảng tần suất ban đầu cho p và cửa sổ đầu tiên của s mất O(k) <= O(n).
 *     + Đếm trạng thái khớp ban đầu mất O(26) = O(1).
 *     + Duyệt trượt cửa sổ kích thước cố định k qua s từ trái sang phải mất O(n - k) bước.
 *     + Mỗi bước trượt: loại 1 ký tự cũ bên trái và nạp 1 ký tự mới bên phải, chỉ cập nhật biến đếm `matches`
 *       với chi phí O(1) mà không cần quét lại toàn bộ 26 ký tự.
 *     Tổng thời gian chạy toàn thuật toán là O(n).
 *
 * Space Complexity: O(Σ) = O(1)
 *   - Sử dụng hai bảng tần suất Int32Array kích thước cố định 26 (chữ cái tiếng Anh thường a-z).
 *   - Không sử dụng Map hay Object động, tối ưu hóa bộ nhớ và thân thiện với V8 cache.
 *   - Không gian phụ trợ O(1) (ngoại trừ mảng chứa chỉ số kết quả trả về).
 */
export function findAnagrams(s: string, p: string): number[] {
    const sLen = s.length
    const pLen = p.length

    // Early Exit: nếu chuỗi s ngắn hơn chuỗi mẫu p hoặc s rỗng
    if (sLen < pLen || sLen === 0) return []

    // Bảng tần suất 26 chữ cái thường tiếng Anh ('a' -> 'z')
    const targetFreq = new Int32Array(26)
    const windowFreq = new Int32Array(26)

    // Khởi tạo tần suất cho chuỗi p và cửa sổ kích thước pLen đầu tiên của s
    for (let i = 0; i < pLen; i++) {
        targetFreq[p.charCodeAt(i) - 97]++
        windowFreq[s.charCodeAt(i) - 97]++
    }

    // Đếm số lượng ký tự có tần suất trùng khớp hoàn toàn giữa target và window (0 -> 26)
    let matches = 0
    for (let i = 0; i < 26; i++) {
        if (targetFreq[i] === windowFreq[i]) {
            matches++
        }
    }

    const result: number[] = []

    // Nếu ngay cửa sổ đầu tiên (bắt đầu tại 0) đã khớp toàn bộ 26 ký tự
    if (matches === 26) {
        result.push(0)
    }

    // Trượt cửa sổ kích thước cố định pLen từ index pLen đến hết chuỗi s
    for (let right = pLen; right < sLen; right++) {
        const left = right - pLen

        // 1. Thêm ký tự mới ở đầu bên phải cửa sổ (Expand right)
        const rightCode = s.charCodeAt(right) - 97
        windowFreq[rightCode]++
        if (windowFreq[rightCode] === targetFreq[rightCode]) {
            matches++
        } else if (windowFreq[rightCode] === targetFreq[rightCode] + 1) {
            matches--
        }

        // 2. Loại bỏ ký tự cũ ở đầu bên trái cửa sổ (Shrink left)
        const leftCode = s.charCodeAt(left) - 97
        windowFreq[leftCode]--
        if (windowFreq[leftCode] === targetFreq[leftCode]) {
            matches++
        } else if (windowFreq[leftCode] === targetFreq[leftCode] - 1) {
            matches--
        }

        // Khi toàn bộ 26 ký tự trùng khớp, ta tìm thấy 1 anagram bắt đầu tại left + 1
        if (matches === 26) {
            result.push(left + 1)
        }
    }

    return result
}

// Export alias hỗ trợ các file test hoặc template generator
export const findAllAnagrams = findAnagrams
export const findAllAnagramsInAString = findAnagrams
