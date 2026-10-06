/**
 * Problem: 875-koko-eating-bananas (Koko Eating Bananas)
 * Pattern: Binary_Search (Binary Search on Answer / Feasibility Check)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(n) khi h === piles.length (kết thúc sớm - Early Exit)
 *     hoặc khi mảng chỉ có 1 nải chuối.
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(n * log(maxPile - minSpeed))
 *     Trong đó n = piles.length, maxPile là số chuối lớn nhất trong 1 nải,
 *     minSpeed = Math.ceil(totalBananas / h).
 *     + Tìm maxPile và totalBananas bằng vòng lặp 1 pass O(n), không dùng Math.max(...piles)
 *       để tránh lỗi RangeError: Maximum call stack size exceeded trên mảng lớn.
 *     + Tối ưu cận dưới (Tight Lower Bound): minSpeed = Math.max(1, Math.ceil(totalBananas / h))
 *       giúp thu hẹp đáng kể không gian tìm kiếm so với cận dưới thông thường (1).
 *     + Cắt tỉa nhánh sớm (Early Pruning): Hàm kiểm tra khả thi canEatAll ngắt vòng lặp ngay khi
 *       tổng số giờ vượt quá h, tiết kiệm tối đa các phép toán khi thử các tốc độ nhỏ.
 *
 * Space Complexity: O(1)
 *   - Chỉ sử dụng các biến nguyên thủy lưu trữ con trỏ và biến đếm, không cấp phát thêm bộ nhớ.
 */
export function kokoEatingBananas(piles: number[], h: number): number {
    const n = piles.length
    if (n === 0) return 0

    let maxPile = 0
    let totalBananas = 0

    // Duyệt 1 pass tuyến tính để tính maxPile và tổng số chuối
    // Tránh dùng Math.max(...piles) vì có thể gây Call Stack Overflow trên mảng lớn
    for (let i = 0; i < n; i++) {
        const pile = piles[i]!
        if (pile > maxPile) maxPile = pile
        totalBananas += pile
    }

    // Tối ưu trường hợp biên (Early Exit):
    // Vì Koko chỉ có thể ăn tối đa 1 nải trong 1 giờ, nên để ăn hết n nải cần ít nhất n giờ.
    // Nếu h === n, Koko bắt buộc phải ăn xong mỗi nải trong đúng 1 giờ -> tốc độ nhỏ nhất chính là maxPile!
    if (h === n) return maxPile

    // Thu hẹp không gian tìm kiếm [low, high]:
    // - Cận dưới toán học (Tight Lower Bound): Koko phải ăn ít nhất ceil(totalBananas / h) chuối/giờ
    // - Cận trên: nải chuối lớn nhất (maxPile)
    let low = Math.max(1, Math.ceil(totalBananas / h))
    let high = maxPile

    // Tìm kiếm nhị phân trên không gian đáp án (Binary Search on Answer)
    while (low < high) {
        const mid = low + Math.floor((high - low) / 2)

        if (canEatAll(piles, h, mid)) {
            // Tốc độ mid đủ ăn kịp, thử tìm tốc độ nhỏ hơn ở nửa trái
            high = mid
        } else {
            // Tốc độ mid quá chậm, bắt buộc phải tăng tốc độ lên
            low = mid + 1
        }
    }

    return low
}

/**
 * Hàm kiểm tra tính khả thi (Feasibility Predicate):
 * Liệu với tốc độ ăn `speed` chuối/giờ, Koko có thể ăn hết toàn bộ chuối trong vòng `h` giờ không?
 */
function canEatAll(piles: number[], h: number, speed: number): boolean {
    let totalHours = 0
    const n = piles.length

    for (let i = 0; i < n; i++) {
        totalHours += Math.ceil(piles[i]! / speed)

        // Cắt tỉa nhánh sớm (Early Pruning): Nếu số giờ đã vượt quá h thì dừng ngay
        if (totalHours > h) {
            return false
        }
    }

    return true
}

// Export alias hỗ trợ các file test hoặc LeetCode template generator
export const minEatingSpeed = kokoEatingBananas

