/**
 * Thuật toán Difference Array (Mảng Hiệu)
 *
 * Ý tưởng cốt lõi:
 * - Khi cần cộng thêm `val` cho tất cả phần tử trong đoạn [left, right] liên tục:
 *   + Cách ngây thơ (Brute Force): Duyệt từ left -> right tốn O(N) cho mỗi lần cập nhật.
 *   + Mảng Hiệu (Difference Array): `diff[i] = nums[i] - nums[i - 1]`
 *     * `diff[left] += val` (bắt đầu cộng dồn từ left)
 *     * `diff[right + 1] -= val` (ngắt quãng hiệu ứng sau right)
 *     * Thao tác update đạt O(1) thuần túy.
 *   + Khi cần khôi phục mảng kết quả: Quét Prefix Sum trong O(N).
 */

export class DifferenceArray {
    private diff: number[]
    private readonly length: number

    /**
     * Khởi tạo DifferenceArray từ một mảng ban đầu nums hoặc độ dài mảng (toàn số 0).
     * @param source Mảng số nguyên ban đầu nums HOẶC độ dài length
     */
    constructor(source: number[] | number) {
        if (typeof source === 'number') {
            this.length = source
            this.diff = new Array(source + 1).fill(0)
        } else {
            this.length = source.length
            this.diff = new Array(this.length + 1).fill(0)
            if (this.length > 0) {
                this.diff[0] = source[0]!
                for (let i = 1; i < this.length; i++) {
                    this.diff[i] = source[i]! - source[i - 1]!
                }
            }
        }
    }

    /**
     * Thao tác cập nhật khoảng [left, right] với giá trị val trong O(1).
     * @param left Chỉ số bắt đầu (0-indexed)
     * @param right Chỉ số kết thúc (0-indexed)
     * @param val Giá trị cần cộng dồn (dương hoặc âm)
     */
    update(left: number, right: number, val: number): void {
        if (left < 0 || left >= this.length || right < left) return
        this.diff[left] += val
        const end = Math.min(right, this.length - 1)
        this.diff[end + 1] -= val
    }

    /**
     * Thực hiện cập nhật hàng loạt danh sách các khoảng để tối ưu hiệu năng.
     * @param updates Danh sách các cập nhật dạng [left, right, val]
     */
    batchUpdate(updates: [number, number, number][] | number[][]): void {
        const len = updates.length
        for (let i = 0; i < len; i++) {
            const u = updates[i]!
            this.update(u[0]!, u[1]!, u[2]!)
        }
    }

    /**
     * Khôi phục lại mảng kết quả cuối cùng bằng Prefix Sum trong O(N).
     * @returns Mảng sau khi đã áp dụng mọi cập nhật
     */
    result(): number[] {
        const res: number[] = new Array(this.length)
        let current = 0

        for (let i = 0; i < this.length; i++) {
            current += this.diff[i]!
            res[i] = current
        }

        return res
    }

    /**
     * Trả về độ dài của mảng
     */
    getLength(): number {
        return this.length
    }
}

/**
 * Hàm tiện ích áp dụng danh sách các bản cập nhật khoảng cho một mảng ban đầu toàn số 0.
 *
 * @param length - Chiều dài của mảng ban đầu (ví dụ: số trạm xe buýt)
 * @param updates - Danh sách các yêu cầu dạng [left, right, value]
 * @returns Mảng kết quả sau khi đã áp dụng toàn bộ các thay đổi
 */
export function applyRangeUpdates(length: number, updates: number[][]): number[] {
    const da = new DifferenceArray(length)
    da.batchUpdate(updates)
    return da.result()
}
