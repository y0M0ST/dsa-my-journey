/**
 * Problem: 74 - Search a 2D Matrix
 * Pattern: Binary_Search (Virtual 1D Flattening & Coordinate Transformation)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Meta / Google):
 * - Đây là bài toán kinh điển kiểm tra tư duy ánh xạ không gian nhiều chiều về 1 chiều.
 * - Đặc điểm bất biến của ma trận $M \times N$:
 *   1. Mỗi hàng được sắp xếp theo thứ tự không giảm.
 *   2. Số đầu tiên của mỗi hàng lớn hơn số cuối cùng của hàng trước đó.
 *   $\rightarrow$ Ma trận tương đương 1 mảng 1 chiều đã được sắp xếp hoàn hảo!
 *
 * Bản chất công thức ánh xạ tọa độ (Virtual 1D Coordinate Mapping):
 * - Với chỉ số ảo $mid \in [0, M \times N - 1]$ trong mảng 1 chiều:
 *   $$\text{row} = \lfloor mid / N \rfloor$$
 *   $$\text{col} = mid \pmod N$$
 * - Nhờ công thức này, ta thực hiện Binary Search trên toàn bộ ma trận mà KHÔNG cần
 *   phải làm phẳng ma trận thành mảng 1 chiều thực tế (tránh tốn $O(M \times N)$ bộ nhớ phụ).
 *
 * So sánh các trường phái:
 * 1. Ánh xạ 1 chiều ảo (Virtual 1D): Time $O(\log(M \times N))$, Space $O(1)$.
 * 2. Tìm kiếm nhị phân 2 lượt (Row BS + Column BS): Time $O(\log M + \log N)$, Space $O(1)$.
 * 3. Tìm kiếm bậc thang từ góc (Staircase Search): Time $O(M + N)$, Space $O(1)$.
 */

/**
 * Cách 1: Ánh xạ 1D ảo (Virtual 1D Coordinate Transformation - Optimal).
 *
 * @param matrix Ma trận số nguyên kích thước M x N
 * @param target Giá trị cần tìm
 * @returns boolean true nếu tìm thấy target
 */
export function searchMatrixFlattened(matrix: number[][], target: number): boolean {
    if (matrix.length === 0 || matrix[0]!.length === 0) {
        return false
    }

    const m = matrix.length
    const n = matrix[0]!.length
    let low = 0
    let high = m * n - 1

    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2)
        const row = Math.floor(mid / n)
        const col = mid % n
        const val = matrix[row]![col]!

        if (val === target) {
            return true
        } else if (val < target) {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }

    return false
}

/**
 * Cách 2: Tìm kiếm nhị phân 2 lượt (Two-Pass Binary Search).
 * Lượt 1: Tìm hàng thích hợp. Lượt 2: Tìm cột trong hàng đó.
 *
 * @param matrix Ma trận
 * @param target Giá trị
 * @returns boolean
 */
export function searchMatrixTwoPass(matrix: number[][], target: number): boolean {
    if (matrix.length === 0 || matrix[0]!.length === 0) {
        return false
    }

    const m = matrix.length
    const n = matrix[0]!.length

    // 1. Binary Search tìm hàng mục tiêu
    let top = 0
    let bottom = m - 1
    let targetRow = -1

    while (top <= bottom) {
        const midRow = top + Math.floor((bottom - top) / 2)
        if (target >= matrix[midRow]![0]! && target <= matrix[midRow]![n - 1]!) {
            targetRow = midRow
            break
        } else if (target < matrix[midRow]![0]!) {
            bottom = midRow - 1
        } else {
            top = midRow + 1
        }
    }

    if (targetRow === -1) {
        return false
    }

    // 2. Binary Search trên hàng targetRow
    let left = 0
    let right = n - 1
    const row = matrix[targetRow]!

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2)
        if (row[mid] === target) {
            return true
        } else if (row[mid]! < target) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    return false
}

/**
 * Cách 3: Tìm kiếm bậc thang từ góc trên-phải (Staircase Search).
 * Phù hợp mở rộng cho LeetCode 240 (Search a 2D Matrix II).
 *
 * @param matrix Ma trận
 * @param target Giá trị
 * @returns boolean
 */
export function searchMatrixStaircase(matrix: number[][], target: number): boolean {
    if (matrix.length === 0 || matrix[0]!.length === 0) {
        return false
    }

    let r = 0
    let c = matrix[0]!.length - 1

    while (r < matrix.length && c >= 0) {
        const val = matrix[r]![c]!
        if (val === target) {
            return true
        } else if (val > target) {
            c--
        } else {
            r++
        }
    }

    return false
}

/**
 * Hàm giải chính theo chuẩn LeetCode 74.
 * Mặc định sử dụng thuật toán ánh xạ 1D ảo đạt O(log(M * N)).
 */
export const searchMatrix = searchMatrixFlattened
