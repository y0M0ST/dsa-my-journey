/**
 * Problem: 1011-ship-within-days (Capacity To Ship Packages Within D Days)
 * Pattern: Binary_Search (Binary Search on Answer / Feasibility Check)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(n) khi days === 1 hoặc days >= weights.length
 *     (kết thúc sớm - Early Exit).
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(n * log(totalWeight - low))
 *     Trong đó n = weights.length, totalWeight là tổng trọng lượng tất cả kiện hàng,
 *     low = Math.max(maxWeight, Math.ceil(totalWeight / days)).
 *     + Tìm maxWeight và totalWeight trong 1 pass O(n) duy nhất, loại bỏ Math.max(...weights)
 *       (tránh lỗi Call Stack Overflow trên mảng lớn) và loại bỏ reduce riêng biệt.
 *     + Tối ưu cận dưới (Tight Lower Bound): Mỗi ngày chở ít nhất ceil(totalWeight / days)
 *       kết hợp maxWeight giúp thu hẹp đáng kể không gian tìm kiếm nhị phân.
 *     + Cắt tỉa nhánh sớm (Early Pruning): Hàm canShip dừng duyệt ngay khi số ngày cần thiết
 *       vượt quá `days`, không cần duyệt hết các kiện hàng còn lại.
 *
 * Space Complexity: O(1)
 *   - Chỉ sử dụng các biến nguyên thủy lưu trữ con trỏ và trọng lượng tạm, không phát sinh bộ nhớ phụ.
 */
export function shipWithinDays(weights: number[], days: number): number {
    const n = weights.length
    if (n === 0) return 0

    let maxWeight = 0
    let totalWeight = 0

    // Duyệt 1 pass tuyến tính để tính đồng thời maxWeight và totalWeight
    for (let i = 0; i < n; i++) {
        const w = weights[i]!
        if (w > maxWeight) maxWeight = w
        totalWeight += w
    }

    // Tối ưu trường hợp biên (Early Exits):
    // 1. Nếu days === 1: Bắt buộc phải chở toàn bộ kiện hàng trong 1 ngày duy nhất
    if (days === 1) return totalWeight

    // 2. Nếu số ngày cho phép >= số lượng kiện hàng (days >= n):
    //    Mỗi ngày ta có thể chở 1 kiện, tải trọng tối thiểu chỉ cần bằng kiện nặng nhất
    if (days >= n) return maxWeight

    // Thu hẹp không gian tìm kiếm [low, high]:
    // - Cận dưới: Phải chứa được kiện nặng nhất và trung bình mỗi ngày ceil(totalWeight / days)
    // - Cận trên: Tổng trọng lượng toàn bộ kiện hàng (chở hết trong 1 ngày)
    let low = Math.max(maxWeight, Math.ceil(totalWeight / days))
    let high = totalWeight

    // Tìm kiếm nhị phân trên không gian đáp án (Binary Search on Answer)
    while (low < high) {
        const mid = low + Math.floor((high - low) / 2)

        if (canShip(weights, days, mid)) {
            // Tải trọng mid khả thi, thử tìm tải trọng nhỏ hơn ở nửa trái
            high = mid
        } else {
            // Tải trọng mid không đủ, bắt buộc phải tăng tải trọng lên
            low = mid + 1
        }
    }

    return low
}

/**
 * Hàm kiểm tra tính khả thi (Feasibility Predicate):
 * Liệu với tải trọng tàu `capacity`, ta có thể vận chuyển toàn bộ kiện hàng trong vòng `days` ngày không?
 */
function canShip(weights: number[], days: number, capacity: number): boolean {
    let currentDays = 1
    let currentWeight = 0
    const n = weights.length

    for (let i = 0; i < n; i++) {
        const w = weights[i]!

        if (currentWeight + w > capacity) {
            currentDays++
            // Cắt tỉa nhánh sớm (Early Pruning): Nếu số ngày vượt quá quy định thì không khả thi
            if (currentDays > days) {
                return false
            }
            currentWeight = w
        } else {
            currentWeight += w
        }
    }

    return true
}

// Export alias hỗ trợ các file test hoặc LeetCode template generator
export const shipWithinDaysCapacity = shipWithinDays