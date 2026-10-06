/**
 * Problem: 424-longest-repeating-character-replacement
 * Pattern: Sliding_Window (Frequency Array & Max Frequency Tracking)
 * Time Complexity: O(n)
 * Space Complexity: O(1) - mảng cố định 26 chữ cái tiếng Anh in hoa
 */
export function characterReplacement(s: string, k: number): number {
    const n = s.length
    if (n === 0) return 0

    let left = 0
    let maxLen = 0
    let maxFreq = 0
    // Thay thế Map bằng Int32Array(26) để tối ưu truy xuất O(1) và thân thiện với V8 cache
    const count = new Int32Array(26)

    for (let right = 0; right < n; right++) {
        const rightCode = s.charCodeAt(right) - 65
        count[rightCode]++

        // Tần suất lớn nhất của một ký tự duy nhất trong cửa sổ hiện tại
        maxFreq = Math.max(maxFreq, count[rightCode]!)

        // Điều kiện hợp lệ: (độ dài cửa sổ - tần suất ký tự xuất hiện nhiều nhất) <= k
        // Nếu số lượng ký tự cần biến đổi > k, ta phải thu hẹp cửa sổ từ phía trái
        while (right - left + 1 - maxFreq > k) {
            const leftCode = s.charCodeAt(left) - 65
            count[leftCode]--
            left++
            // Lưu ý: Không cần giảm maxFreq khi thu hẹp cửa sổ vì ta chỉ quan tâm
            // đến việc tìm kiếm một cửa sổ mới có kích thước lớn hơn kỷ lục hiện tại.
        }

        maxLen = Math.max(maxLen, right - left + 1)
    }

    return maxLen
}

export const longestRepeatingCharacterReplacement = characterReplacement
