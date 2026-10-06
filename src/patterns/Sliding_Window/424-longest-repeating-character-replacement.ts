/**
 * Problem: 424-longest-repeating-character-replacement
 * Pattern: Sliding_Window
 * Time Complexity: O(26 * n)
 * Space Complexity: O(26) = O(1)
 */
export function characterReplacement(s: string, k: number): number {
    let left = 0
    let maxLen = 0
    const countMap = new Map<string, number>()

    for (let right = 0; right < s.length; right++) {
        const char = s[right]!
        countMap.set(char, (countMap.get(char) || 0) + 1)

        // Tìm tần suất lớn nhất của một ký tự trong cửa sổ hiện tại
        let maxFreq = 0
        for (const count of countMap.values()) {
            if (count > maxFreq) {
                maxFreq = count
            }
        }

        // Nếu số lượng ký tự cần thay thế vượt quá k, thu hẹp cửa sổ từ bên trái
        while (right - left + 1 - maxFreq > k) {
            const leftChar = s[left]!
            countMap.set(leftChar, countMap.get(leftChar)! - 1)
            left++

            // Cập nhật lại maxFreq sau khi thu hẹp
            maxFreq = 0
            for (const count of countMap.values()) {
                if (count > maxFreq) {
                    maxFreq = count
                }
            }
        }

        maxLen = Math.max(maxLen, right - left + 1)
    }

    return maxLen
}

export const longestRepeatingCharacterReplacement = characterReplacement
