/**
 * Problem: 242 - Valid Anagram
 * Pattern: Hash_Map (Character Frequency Buffer & Single-Pass Cancellation)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Meta / Google):
 * - Bài toán quốc dân kiểm tra khả năng tối ưu bộ nhớ và thời gian với bảng đếm tần suất.
 * - Điểm mấu chốt được interviewer đánh giá cao:
 *   1. Nhận thức về cấp phát bộ nhớ (Allocation Awareness):
 *      Thay vì dùng ES6 `Map` (tốn hàng trăm bytes trên Heap) hoặc `sort()` ($O(N \log N)$),
 *      dùng `Int32Array(26)` phân bổ trực tiếp bộ nhớ tĩnh, tận dụng CPU L1 Cache.
 *   2. Kỹ thuật hủy dần tần suất (Frequency Cancellation):
 *      Cộng dồn tần suất của `s`, sau đó trừ dần với `t`. Nếu bất kỳ vị trí nào rơi xuống âm (< 0),
 *      ta có thể ngắt sớm (Early Exit) trả về `false` ngay lập tức!
 *   3. Follow-up: Xử lý Unicode đa ngôn ngữ bằng `Map<string, number>`.
 *
 * Đánh giá độ phức tạp:
 * 1. Int32Array Frequency Buffer: Time $O(N)$, Space $O(1)$ (26 integers cố định).
 * 2. Sorting Strings: Time $O(N \log N)$, Space $O(N)$.
 * 3. Unicode Map: Time $O(N)$, Space $O(U)$ với $U$ là số ký tự phân biệt.
 */

/**
 * Cách 1: Mảng đếm tần suất 26 phần tử kết hợp trừ dần ngắt sớm (Optimal).
 *
 * @param s Chuỗi nguồn
 * @param t Chuỗi cần kiểm tra
 * @returns boolean true nếu t là anagram của s
 */
export function isAnagramCount(s: string, t: string): boolean {
    if (s.length !== t.length) {
        return false
    }

    const count = new Int32Array(26)
    const len = s.length

    // Cộng tần suất ký tự của s
    for (let i = 0; i < len; i++) {
        count[s.charCodeAt(i) - 97]++
    }

    // Trừ tần suất ký tự của t, ngắt sớm nếu count âm
    for (let i = 0; i < len; i++) {
        const idx = t.charCodeAt(i) - 97
        count[idx]--
        if (count[idx]! < 0) {
            return false
        }
    }

    return true
}

/**
 * Cách 2: Sắp xếp chuỗi (Sorting Baseline).
 *
 * @param s Chuỗi nguồn
 * @param t Chuỗi kiểm tra
 * @returns boolean
 */
export function isAnagramSorting(s: string, t: string): boolean {
    if (s.length !== t.length) {
        return false
    }

    const sortedS = s.split('').sort().join('')
    const sortedT = t.split('').sort().join('')

    return sortedS === sortedT
}

/**
 * Cách 3: Hash Map hỗ trợ ký tự Unicode mở rộng (Follow-up Unicode Support).
 *
 * @param s Chuỗi
 * @param t Chuỗi
 * @returns boolean
 */
export function isAnagramMap(s: string, t: string): boolean {
    if (s.length !== t.length) {
        return false
    }

    const freq = new Map<string, number>()

    for (const ch of s) {
        freq.set(ch, (freq.get(ch) || 0) + 1)
    }

    for (const ch of t) {
        const val = freq.get(ch)
        if (val === undefined || val === 0) {
            return false
        }
        freq.set(ch, val - 1)
    }

    return true
}

/**
 * Hàm giải chính theo chuẩn LeetCode 242.
 * Mặc định sử dụng thuật toán mảng đếm tần suất O(N) thời gian, O(1) bộ nhớ.
 */
export const isAnagram = isAnagramCount
