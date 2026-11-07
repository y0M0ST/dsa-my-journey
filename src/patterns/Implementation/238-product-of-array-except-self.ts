/**
 * Problem: 238 - Product of Array Except Self
 * Pattern: Implementation (Prefix-Suffix Accumulation & In-place Buffer)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Meta / Google):
 * - Đây là bài toán kinh điển số 1 của Meta về mảng kỹ thuật (Array Manipulation).
 * - Yêu cầu bất biến:
 *   1. KHÔNG được dùng phép chia `/` (Division Operation Forbidden).
 *   2. Đạt độ phức tạp thời gian tuyến tính $O(N)$.
 *   3. Tối ưu bộ nhớ phụ về $O(1)$ auxiliary space (mảng kết quả trả về không tính là bộ nhớ phụ).
 *
 * Bản chất toán học:
 * - Với mỗi phần tử tại vị trí $i$, tích của toàn bộ mảng ngoại trừ chính nó là:
 *   $$\text{Output}[i] = \prod_{j=0}^{i-1} \text{nums}[j] \times \prod_{j=i+1}^{n-1} \text{nums}[j] = \text{Prefix}[i] \times \text{Suffix}[i]$$
 * - Thay vì tạo 2 mảng riêng biệt cho Prefix và Suffix tốn $O(N)$ bộ nhớ phụ,
 *   ta có thể ghi đè tích tiền tố vào thẳng mảng `output`, sau đó dùng một biến số thực
 *   `suffix` duy nhất để nhân dồn hậu tố từ phải sang trái trong lượt quét thứ hai.
 *
 * Đánh giá độ phức tạp:
 * 1. Output Buffer + Rolling Suffix: Time $O(N)$, Space $O(1)$ auxiliary.
 * 2. Hai mảng Prefix & Suffix riêng: Time $O(N)$, Space $O(N)$ auxiliary.
 */

/**
 * Cách 1: Tối ưu bộ nhớ O(1) phụ bằng Rolling Suffix trên mảng kết quả (Optimal).
 *
 * @param nums Mảng các số nguyên
 * @returns Mảng tích ngoại trừ phần tử tại vị trí tương ứng
 */
export function productExceptSelfOptimal(nums: number[]): number[] {
    const n = nums.length
    const result = new Array<number>(n)

    // Lượt 1: Quét từ trái sang phải để tích lũy Prefix Products vào result
    // result[i] sẽ chứa tích của tất cả các phần tử trước i
    result[0] = 1
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1]! * nums[i - 1]!
    }

    // Lượt 2: Quét từ phải sang trái với biến suffix tích lũy
    // Nhân dồn hậu tố vào giá trị tiền tố đã có sẵn trong result[i]
    let suffix = 1
    for (let i = n - 1; i >= 0; i--) {
        result[i] = result[i]! * suffix
        suffix *= nums[i]!
    }

    return result
}

/**
 * Cách 2: Sử dụng hai mảng Prefix và Suffix độc lập (Baseline trực quan).
 *
 * @param nums Mảng các số nguyên
 * @returns Mảng tích
 */
export function productExceptSelfPrefixSuffix(nums: number[]): number[] {
    const n = nums.length
    const prefix = new Array<number>(n)
    const suffix = new Array<number>(n)
    const result = new Array<number>(n)

    prefix[0] = 1
    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1]! * nums[i - 1]!
    }

    suffix[n - 1] = 1
    for (let i = n - 2; i >= 0; i--) {
        suffix[i] = suffix[i + 1]! * nums[i + 1]!
    }

    for (let i = 0; i < n; i++) {
        result[i] = prefix[i]! * suffix[i]!
    }

    return result
}

/**
 * Hàm giải chính theo chuẩn LeetCode 238.
 * Mặc định sử dụng thuật toán tối ưu bộ nhớ O(1) auxiliary space.
 */
export const productExceptSelf = productExceptSelfOptimal
