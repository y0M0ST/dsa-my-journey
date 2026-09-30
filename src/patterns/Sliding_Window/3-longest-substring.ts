/**
 * Problem: 3-longest-substring (Longest Substring Without Repeating Characters)
 * Pattern: Sliding_Window (Direct Index Jump / Frequency Array Optimization)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(1) khi chuỗi rỗng hoặc có 1 ký tự (Early Exit).
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(n)
 *     + Duyệt qua chuỗi s đúng 1 lần bằng con trỏ right.
 *     + Con trỏ left nhảy cóc trực tiếp đến vị trí sau ký tự trùng lặp, không cần vòng lặp while co cửa sổ.
 *
 * Space Complexity: O(Σ) = O(1)
 *   - Sử dụng bảng Int32Array kích thước cố định 128 (đủ cho toàn bộ bảng mã ASCII chuẩn: chữ, số, ký hiệu, khoảng trắng).
 *   - Không cấp phát thêm Map hay Object động.
 */
export function lengthOfLongestSubstring(s: string): number {
    const n = s.length
    if (n <= 1) return n

    // Lưu vị trí xuất hiện gần nhất của từng ký tự ASCII (0-127)
    const lastSeen = new Int32Array(128).fill(-1)
    let left = 0
    let maxLen = 0

    for (let right = 0; right < n; right++) {
        const code = s.charCodeAt(right)

        // Nếu ký tự đã từng xuất hiện và nằm trong window hiện tại
        if (lastSeen[code] >= left) {
            left = lastSeen[code] + 1
        }

        lastSeen[code] = right
        const currentLen = right - left + 1
        if (currentLen > maxLen) {
            maxLen = currentLen
        }
    }

    return maxLen
}

// Export alias hỗ trợ các file test hoặc template generator
export const longestSubstring = lengthOfLongestSubstring
