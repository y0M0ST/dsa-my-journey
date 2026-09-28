/**
 * Canonical Examples: Binary Search Templates & Variations
 *
 * Mẫu chuẩn các biến thể Tìm kiếm nhị phân thông dụng trong TypeScript.
 */

/**
 * 1. Classic Binary Search (Tìm chính xác một giá trị trong mảng đã sort)
 * Time: O(log n), Space: O(1)
 */
export function binarySearchClassic(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const midVal = nums[mid]!;

    if (midVal === target) {
      return mid;
    } else if (midVal < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

/**
 * 2. Lower Bound: Tìm vị trí đầu tiên mà nums[i] >= target
 * Invariant: Kết quả nằm trong khoảng [0, nums.length]
 * Time: O(log n), Space: O(1)
 */
export function lowerBound(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid]! >= target) {
      right = mid; // Thu hẹp biên phải nhưng vẫn giữ mid làm ứng viên
    } else {
      left = mid + 1; // nums[mid] chắc chắn không thoả mãn
    }
  }

  return left;
}

/**
 * 3. Upper Bound: Tìm vị trí đầu tiên mà nums[i] > target
 * Time: O(log n), Space: O(1)
 */
export function upperBound(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid]! > target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

/**
 * 4. Binary Search on Answer (Tìm nghiệm tối ưu trên miền giá trị [low, high])
 * Feasibility / Monotonic Predicate Function
 */
export function binarySearchOnAnswer(
  low: number,
  high: number,
  isFeasible: (val: number) => boolean
): number {
  let result = high;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);

    if (isFeasible(mid)) {
      result = mid; // Ghi nhận đáp án hợp lệ, tìm giá trị nhỏ hơn ở nửa trái
      high = mid - 1;
    } else {
      low = mid + 1; // Không khả thi, phải tăng giá trị lên
    }
  }

  return result;
}
