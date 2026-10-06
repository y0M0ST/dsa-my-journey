/**
 * Problem: 424-longest-repeating-character-replacement (Longest Repeating Character Replacement)
 * Pattern: Sliding_Window (Two Pointers / Non-shrinking Window / Frequency Array Optimization)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(1)
 *     + Khi chuỗi rỗng s = "" -> trả về 0 ngay lập tức.
 *     + Khi chuỗi có độ dài <= 1 hoặc số lần thay thế k >= s.length - 1 -> Early Exit trả về s.length,
 *       bởi vì ta luôn có thể biến toàn bộ chuỗi thành cùng một ký tự.
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(n)
 *     Trong đó n = s.length.
 *     + Con trỏ right mở rộng cửa sổ và duyệt qua từng ký tự đúng 1 lần (n bước).
 *     + Mỗi bước duyệt: truy xuất và cập nhật bảng tần suất `Int32Array(26)` với chi phí O(1).
 *     + Kỹ thuật Cửa sổ không co lại (Non-shrinking Sliding Window):
 *       Khi số lượng ký tự cần thay thế `(right - left + 1 - maxFreq) > k`, thay vì dùng vòng lặp `while`
 *       để thu hẹp kích thước cửa sổ, ta chỉ cần tịnh tiến cả cửa sổ sang phải 1 bước bằng cách tăng `left++`.
 *       Điều này đảm bảo kích thước cửa sổ `(right - left + 1)` không bao giờ bị giảm, nó chỉ giữ nguyên
 *       kỷ lục lớn nhất đã đạt được hoặc mở rộng thêm khi tìm thấy ký tự có tần suất vượt qua `maxFreq`.
 *     + Tại sao không cần giảm `maxFreq` khi `left` dịch chuyển?
 *       Bởi vì mục tiêu của bài toán là tìm độ dài cửa sổ LỚN NHẤT. Một cửa sổ nhỏ hơn hoặc bằng kỷ lục
 *       hiện tại không thể giúp ta tìm ra kết quả tốt hơn. Kỷ lục chỉ có thể bị phá vỡ nếu xuất hiện
 *       một cửa sổ mới có tần suất ký tự vượt qua giá trị `maxFreq` trong quá khứ.
 *     + Khi kết thúc vòng lặp, kích thước cửa sổ tối đa đạt được chính là `n - left`.
 *
 * Space Complexity: O(Σ) = O(1)
 *   - Sử dụng bảng tần suất `Int32Array(26)` cố định cho 26 chữ cái in hoa tiếng Anh ('A' -> 'Z').
 *   - Không cấp phát động `Map` hay `Object`, thân thiện với bộ nhớ cache CPU và không phát sinh Garbage Collection (GC).
 *
 * Ghi chú mở rộng (Follow-up):
 *   - Kỹ thuật Non-shrinking Sliding Window là một trong những pattern tinh gọn và đẹp nhất của Sliding Window,
 *     giúp loại bỏ hoàn toàn vòng lặp lồng `while` và biến bài toán thành duyệt tuyến tính 1 pass O(n).
 */
export function characterReplacement(s: string, k: number): number {
    const n = s.length

    // Early Exit: Chuỗi rỗng
    if (n === 0) return 0

    // Early Exit: Chuỗi có 1 ký tự hoặc k đủ lớn để thay thế toàn bộ ký tự khác thành cùng 1 loại
    if (n === 1 || k >= n - 1) return n

    let left = 0
    let maxFreq = 0
    const freq = new Int32Array(26)

    for (let right = 0; right < n; right++) {
        const rightCode = s.charCodeAt(right) - 65
        freq[rightCode]++

        // Cập nhật kỷ lục tần suất lớn nhất của một ký tự trong bất kỳ cửa sổ hợp lệ nào
        if (freq[rightCode]! > maxFreq) {
            maxFreq = freq[rightCode]!
        }

        // Nếu số lượng ký tự cần thay thế vượt quá k:
        // Cửa sổ hiện tại không hợp lệ. Ta trượt cửa sổ về phía trước bằng cách tăng left.
        // Kích thước cửa sổ (right - left + 1) được giữ nguyên, không cần co nhỏ lại.
        if (right - left + 1 - maxFreq > k) {
            freq[s.charCodeAt(left) - 65]!--
            left++
        }
    }

    // Kết thúc vòng lặp, cửa sổ có kích thước lớn nhất được duy trì là (n - left)
    return n - left
}

// Export alias hỗ trợ các file test hoặc template generator
export const longestRepeatingCharacterReplacement = characterReplacement
