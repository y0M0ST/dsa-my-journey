/**
 * Problem: 125 - Valid Palindrome
 * Pattern: Two_Pointers (Opposite-Direction Inward Squeeze)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Meta / Google):
 * - Bài toán kinh điển số 1 để đánh giá khả năng xử lý chuỗi và tối ưu bộ nhớ.
 * - Phỏng vấn viên Meta đặc biệt chấm điểm:
 *   1. Tránh bẫy cấp phát bộ nhớ (Allocation Trap): Dùng Regex và `.replace()` + `.reverse()`
 *      sẽ cấp phát mảng/chuỗi mới tốn $O(N)$ Space trên V8 Heap.
 *   2. Thuật toán tối ưu hai con trỏ tại chỗ (In-place Two Pointers):
 *      Duyệt đồng thời từ hai đầu `left` và `right`, bỏ qua các ký tự không phải chữ/số
 *      bằng mã ASCII, đạt $O(1)$ Không gian bộ nhớ tuyệt đối (Zero Allocation).
 *
 * Đánh giá độ phức tạp thuật toán:
 * 1. Two Pointers In-place: Time $O(N)$, Space $O(1)$.
 * 2. Regex Cleaning & Reverse: Time $O(N)$, Space $O(N)$.
 */

/**
 * Kiểm tra xem một mã ASCII có phải là ký tự chữ thường hoặc số [a-z0-9] hay không.
 */
function isAlphanumeric(code: number): boolean {
    return (
        (code >= 48 && code <= 57) || // 0-9
        (code >= 65 && code <= 90) || // A-Z
        (code >= 97 && code <= 122) // a-z
    )
}

/**
 * Chuyển đổi mã ASCII chữ hoa [A-Z] thành chữ thường [a-z] bằng phép cộng offset 32.
 */
function toLowerCode(code: number): number {
    if (code >= 65 && code <= 90) {
        return code + 32
    }
    return code
}

/**
 * Cách 1: Hai con trỏ ép biên tại chỗ (In-place Two Pointers Squeeze - Zero Allocation).
 *
 * @param s Chuỗi đầu vào
 * @returns boolean true nếu là palindrome hợp lệ
 */
export function isPalindromeTwoPointers(s: string): boolean {
    let left = 0
    let right = s.length - 1

    while (left < right) {
        // Bỏ qua ký tự không phải chữ và số ở phía bên trái
        while (left < right && !isAlphanumeric(s.charCodeAt(left))) {
            left++
        }

        // Bỏ qua ký tự không phải chữ và số ở phía bên phải
        while (left < right && !isAlphanumeric(s.charCodeAt(right))) {
            right--
        }

        // So sánh 2 ký tự sau khi chuẩn hóa về chữ thường
        if (toLowerCode(s.charCodeAt(left)) !== toLowerCode(s.charCodeAt(right))) {
            return false
        }

        left++
        right--
    }

    return true
}

/**
 * Cách 2: Tiền xử lý bằng Regular Expression và so sánh chuỗi đảo ngược (Baseline).
 *
 * @param s Chuỗi đầu vào
 * @returns boolean
 */
export function isPalindromeRegex(s: string): boolean {
    const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '')
    let left = 0
    let right = cleaned.length - 1

    while (left < right) {
        if (cleaned[left] !== cleaned[right]) {
            return false
        }
        left++
        right--
    }

    return true
}

/**
 * Hàm giải chính theo chuẩn LeetCode 125.
 * Mặc định sử dụng thuật toán Two Pointers tại chỗ Zero-Allocation.
 */
export const isPalindrome = isPalindromeTwoPointers
