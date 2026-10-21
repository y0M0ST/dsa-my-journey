/**
 * Problem: 11-max-Area (Container With Most Water)
 * Pattern: Two_Pointers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * Core Intuition & Optimization:
 * - Diện tích nước bị giới hạn bởi cột thấp hơn: `area = (right - left) * min(height[left], height[right])`.
 * - Khi dịch chuyển cột thấp hơn vào trong, chiều rộng chắc chắn giảm (`width--`).
 * - Do đó, nếu gặp các cột tiếp theo có chiều cao thấp hơn hoặc bằng chiều cao cột cũ,
 *   diện tích mới CHẮC CHẮN nhỏ hơn diện tích cũ. Ta có thể bỏ qua (fast skip) các cột này
 *   ngay lập tức mà không cần tính lại diện tích!
 */
export function maxArea(height: number[]): number {
  if (!height || height.length < 2) {
    return 0;
  }

  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const currentWidth = right - left;
    const leftH = height[left]!;
    const rightH = height[right]!;
    const currentHeight = Math.min(leftH, rightH);
    const currentWater = currentWidth * currentHeight;

    if (currentWater > maxWater) {
      maxWater = currentWater;
    }

    if (leftH < rightH) {
      left++;
      // Tối ưu: Bỏ qua tất cả các cột thấp hơn hoặc bằng cột vừa xét
      while (left < right && height[left]! <= leftH) {
        left++;
      }
    } else {
      right--;
      // Tối ưu: Bỏ qua tất cả các cột thấp hơn hoặc bằng cột vừa xét
      while (left < right && height[right]! <= rightH) {
        right--;
      }
    }
  }

  return maxWater;
}

