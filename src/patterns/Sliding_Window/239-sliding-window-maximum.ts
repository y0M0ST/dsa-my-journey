/**
 * Problem: 239-sliding-window-maximum (Sliding Window Maximum)
 * Pattern: Sliding_Window (Monotonic Queue / Deque)
 * 
 * Phiên bản ban đầu: Cài đặt Monotonic Deque sử dụng Array chuẩn của JavaScript.
 * Sẽ được refactor và tối ưu hoá bộ nhớ / hiệu năng ở commit sau.
 * 
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */
export function maxSlidingWindow(nums: number[], k: number): number[] {
    const n = nums.length;
    if (n === 0 || k === 0) return [];

    const result: number[] = [];
    const deque: number[] = []; // Lưu trữ index của các phần tử

    for (let i = 0; i < n; i++) {
        // 1. Loại bỏ các phần tử nằm ngoài cửa sổ hiện tại [i - k + 1, i]
        while (deque.length > 0 && deque[0] < i - k + 1) {
            deque.shift();
        }

        // 2. Duy trì tính đơn điệu giảm: loại bỏ các phần tử nhỏ hơn hoặc bằng nums[i] từ cuối deque
        while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
            deque.pop();
        }

        // 3. Thêm index hiện tại vào đuôi deque
        deque.push(i);

        // 4. Khi cửa sổ đã đủ kích thước k, phần tử ở đầu deque chính là giá trị lớn nhất
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}

// Export alias hỗ trợ các file test hoặc template generator
export const slidingWindowMaximum = maxSlidingWindow;
