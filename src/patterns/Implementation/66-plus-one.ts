/**
 * Problem: 66-plus-one
 * Pattern: Implementation
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
export function plusOne(digits: number[]): number[] {
  for (let i = digits.length -1; i >= 0; i--) { //đi ngược lại từ cuối mảng lên lại đầu mảng
    if (digits[i] < 9) {
      digits[i]++
      return digits
    } else {
      digits[i] = 0
    }
  }
  digits.unshift(1)
  return digits
};
