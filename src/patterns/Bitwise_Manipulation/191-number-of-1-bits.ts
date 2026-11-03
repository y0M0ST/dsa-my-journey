/**
 * Problem: 191 - Number of 1 Bits (Hamming Weight)
 * Pattern: Bitwise_Manipulation (Bit Counting & Brian Kernighan)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Meta / Google):
 * - Đây là bài toán cơ bản nhưng cực kỳ phổ biến để đánh giá mức độ thấu hiểu
 *   cơ chế biểu diễn số nguyên ở mức nhị phân (binary representation) và kiến trúc CPU.
 * - Bài toán kiểm tra 3 khía cạnh:
 *   1. Khả năng dịch bit an toàn trong JavaScript (phân biệt `>>` và `>>>` unsigned shift).
 *   2. Thuật toán tối ưu Brian Kernighan `n &= (n - 1)` xóa bit 1 thấp nhất trong $O(K)$ bước.
 *   3. Thuật toán phân chia để trị bit-parallel SWAR (SIMD Within A Register) popcount chuẩn phần cứng.
 *
 * Đánh giá độ phức tạp:
 * 1. Loop 32 bits: Time $O(32) = O(1)$, Space $O(1)$.
 * 2. Brian Kernighan: Time $O(K) \le 32$ (với $K$ là số bit 1 thực tế), Space $O(1)$.
 * 3. SWAR Parallel Popcount: Time $O(1)$ (chính xác 12 phép toán bit), Space $O(1)$.
 */

/**
 * Cách 1: Thuật toán Brian Kernighan (Tối ưu số bước theo số lượng bit 1).
 * Phép toán `n & (n - 1)` luôn triệt tiêu bit 1 ngoài cùng bên phải (lowest set bit).
 *
 * @param n Số nguyên không âm 32-bit
 * @returns Số lượng bit 1
 */
export function hammingWeightKernighan(n: number): number {
    let count = 0
    let current = n >>> 0 // Ép kiểu về 32-bit unsigned integer

    while (current !== 0) {
        current = (current & (current - 1)) >>> 0
        count++
    }

    return count
}

/**
 * Cách 2: Duyệt từng bit bằng phép dịch phải không dấu `>>> 1`.
 *
 * @param n Số nguyên không âm 32-bit
 * @returns Số lượng bit 1
 */
export function hammingWeightShift(n: number): number {
    let count = 0
    let current = n >>> 0

    while (current !== 0) {
        count += current & 1
        current = current >>> 1
    }

    return count
}

/**
 * Cách 3: SWAR Popcount (Bit-Parallel Divide & Conquer / Hamming Weight hardware simulation).
 * Thuật toán chuẩn công nghiệp dùng trong GCC `__builtin_popcount` và CPU assembly instruction `POPCNT`.
 *
 * @param n Số nguyên 32-bit
 * @returns Số lượng bit 1
 */
export function hammingWeightBitHacks(n: number): number {
    let x = n >>> 0
    // Đếm từng cặp 2 bits: 0x55555555 = 01010101...
    x = x - ((x >>> 1) & 0x55555555)
    // Đếm từng cụm 4 bits: 0x33333333 = 00110011...
    x = (x & 0x33333333) + ((x >>> 2) & 0x33333333)
    // Đếm từng cụm 8 bits: 0x0F0F0F0F = 00001111...
    x = (x + (x >>> 4)) & 0x0f0f0f0f
    // Cộng dồn vào 16 bits và 32 bits
    x = x + (x >>> 8)
    x = x + (x >>> 16)
    // Kết quả tối đa là 32 (nằm trong 6 bits cuối: 0x3F)
    return x & 0x3f
}

/**
 * Hàm giải chính theo chuẩn LeetCode 191.
 * Mặc định sử dụng thuật toán Brian Kernighan.
 */
export const hammingWeight = hammingWeightKernighan
