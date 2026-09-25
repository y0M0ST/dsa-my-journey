/**
 * Problem: 410-split-array
 * Pattern: Binary_Search
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 */
export function splitArray(nums: number[], k: number): number {
  // Tìm giá trị lớn nhất trong mảng và tổng của cả mảng
  let low = 0;
  let high = 0;

  for (const num of nums) {
    low = Math.max(low, num);
    high += num;
  }

  let ans = high;

  // Tìm kiếm nhị phân
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);

    if (canSplit(nums, k, mid)) {
      ans = mid; // Lưu lại kết quả khả thi
      high = mid - 1; // Thử tìm một tổng nhỏ hơn hơn
    } else {
      low = mid + 1; // Tổng này quá nhỏ, phải tăng lên
    }
  }

  return ans;
}

// Hàm kiểm tra xem có thể chia mảng với tổng tối đa là maxSum hay không
function canSplit(nums: number[], k: number, maxSum: number): boolean {
  let subArrayCount = 1;
  let currentSum = 0;

  for (const num of nums) {
    if (currentSum + num > maxSum) {
      // Nếu vượt quá maxSum, ta phải tạo một mảng con mới
      subArrayCount++;
      currentSum = num;

      // Nếu số lượng mảng con vượt quá k, cấu hình này không hợp lệ
      if (subArrayCount > k) {
        return false;
      }
    } else {
      currentSum += num;
    }
  }

  return true;
}
