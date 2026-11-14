/**
 * Problem: 567 - Permutation in String
 * Pattern: Sliding_Window (Fixed-size Window & Frequency Match Counter)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Meta / Google):
 * - Đây là bài toán kinh điển kiểm tra kỹ năng áp dụng Fixed-size Sliding Window.
 * - Phỏng vấn viên Meta đặc biệt quan sát xem ứng viên có:
 *   1. Nhận diện kích thước cửa sổ cố định bằng chính độ dài của `s1`: $K = |s1|$.
 *   2. Tối ưu thời gian so khớp giữa 2 mảng tần suất:
 *      Thay vì so sánh toàn bộ 26 phần tử ở mỗi bước trượt ($O(26 \times N)$),
 *      duy trì một biến `matches` (số lượng chữ cái đang có tần suất khớp nhau)
 *      để kiểm tra khớp trong $O(1)$ tuyệt đối!
 *   3. Xử lý triệt để trường hợp biên: $|s1| > |s2|$ ngắt sớm trả về false ngay lập tức.
 *
 * Đánh giá độ phức tạp thuật toán:
 * 1. Fixed Window với biến đếm `matches`: Time $O(|s1| + |s2|)$, Space $O(1)$ (2 mảng Int32Array(26)).
 * 2. Fixed Window so sánh mảng 26 phần tử: Time $O(26 \times |s2|)$, Space $O(1)$.
 */

/**
 * Cách 1: Cửa sổ trượt kích thước cố định kết hợp biến đếm khớp O(1) (Optimal).
 *
 * @param s1 Chuỗi mẫu cần tìm hoán vị
 * @param s2 Chuỗi văn bản đích
 * @returns boolean true nếu s2 chứa bất kỳ hoán vị nào của s1
 */
export function checkInclusionMatches(s1: string, s2: string): boolean {
    const len1 = s1.length
    const len2 = s2.length

    if (len1 > len2) {
        return false
    }

    const count1 = new Int32Array(26)
    const count2 = new Int32Array(26)

    // Khởi tạo tần suất cho cửa sổ đầu tiên có độ dài len1
    for (let i = 0; i < len1; i++) {
        count1[s1.charCodeAt(i) - 97]++
        count2[s2.charCodeAt(i) - 97]++
    }

    // Đếm số lượng ký tự có tần suất khớp nhau ban đầu (tối đa 26)
    let matches = 0
    for (let i = 0; i < 26; i++) {
        if (count1[i] === count2[i]) {
            matches++
        }
    }

    if (matches === 26) {
        return true
    }

    // Bắt đầu trượt cửa sổ kích thước len1 từ vị trí len1 đến hết s2
    for (let r = len1; r < len2; r++) {
        const inChar = s2.charCodeAt(r) - 97
        const outChar = s2.charCodeAt(r - len1) - 97

        // 1. Thêm ký tự inChar vào mép phải cửa sổ
        if (count2[inChar] === count1[inChar]) {
            matches-- // Đang khớp mà tăng lên sẽ thành lệch
        }
        count2[inChar]++
        if (count2[inChar] === count1[inChar]) {
            matches++ // Tăng lên vừa khớp
        }

        // 2. Loại bỏ ký tự outChar ở mép trái cửa sổ
        if (count2[outChar] === count1[outChar]) {
            matches-- // Đang khớp mà giảm đi sẽ thành lệch
        }
        count2[outChar]--
        if (count2[outChar] === count1[outChar]) {
            matches++ // Giảm đi vừa khớp
        }

        // Kiểm tra xem tất cả 26 ký tự đã trùng khớp hoàn toàn chưa
        if (matches === 26) {
            return true
        }
    }

    return false
}

/**
 * Cách 2: Cửa sổ trượt cố định so sánh trực tiếp mảng tần suất 26 phần tử.
 *
 * @param s1 Chuỗi mẫu
 * @param s2 Chuỗi văn bản
 * @returns boolean
 */
export function checkInclusionArrayCompare(s1: string, s2: string): boolean {
    const len1 = s1.length
    const len2 = s2.length

    if (len1 > len2) {
        return false
    }

    const count1 = new Int32Array(26)
    const count2 = new Int32Array(26)

    for (let i = 0; i < len1; i++) {
        count1[s1.charCodeAt(i) - 97]++
        count2[s2.charCodeAt(i) - 97]++
    }

    const isMatch = (): boolean => {
        for (let i = 0; i < 26; i++) {
            if (count1[i] !== count2[i]) return false
        }
        return true
    }

    if (isMatch()) return true

    for (let r = len1; r < len2; r++) {
        count2[s2.charCodeAt(r) - 97]++
        count2[s2.charCodeAt(r - len1) - 97]--

        if (isMatch()) {
            return true
        }
    }

    return false
}

/**
 * Hàm giải chính theo chuẩn LeetCode 567.
 * Mặc định sử dụng thuật toán biến đếm matches O(1) per step.
 */
export const checkInclusion = checkInclusionMatches
