/**
 * Problem: 15-three-sum
 * Pattern: Two_Pointers
 * Time Complexity: O(n²)
 * Space Complexity: O(1) - Auxiliary space (excluding output array and shallow copy)
 *
 * Core Intuition:
 * - Sắp xếp mảng tăng dần để biến đổi bài toán 3Sum về Two Sum II (LC167) cho mỗi phần tử cố định.
 * - Cố định số thứ nhất `snums[i]`, dùng 2 con trỏ `left` và `right` quét từ 2 phía tìm tổng `-snums[i]`.
 * - Bỏ qua các giá trị trùng lặp cho cả 3 con trỏ để tránh nghiệm bị duplicate.
 * - Sử dụng mảng clone để giữ tính thuần khiết (pure function), không mutate mảng input của caller.
 */
export function threeSum(nums: number[]): number[][] {
  if (!nums || nums.length < 3) return [];

  // Clone mảng trước khi sort để tránh làm thay đổi mảng đầu vào (side-effect)
  const snums: number[] = [...nums].sort((a, b) => a - b);
  const n = snums.length;

  // Early exits: Nếu số nhỏ nhất > 0 hoặc số lớn nhất < 0 thì không thể có tổng = 0
  if (snums[0]! > 0 || snums[n - 1]! < 0) return [];

  const result: number[][] = [];

  for (let i = 0; i < n - 2; i++) {
    // Nếu số neo đã dương thì mọi số phía sau đều dương, tổng không thể bằng 0
    if (snums[i]! > 0) break;

    // Bỏ qua phần tử neo trùng lặp
    if (i > 0 && snums[i] === snums[i - 1]) continue;

    let left: number = i + 1;
    let right: number = n - 1;
    const target: number = -snums[i]!;

    while (left < right) {
      const sum: number = snums[left]! + snums[right]!;

      if (sum === target) {
        result.push([snums[i]!, snums[left]!, snums[right]!]);

        // Nhảy cóc qua các phần tử trùng lặp ở 2 đầu
        while (left < right && snums[left] === snums[left + 1]) {
          left++;
        }
        while (left < right && snums[right] === snums[right - 1]) {
          right--;
        }

        left++;
        right--;
      } else if (sum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return result;
}


