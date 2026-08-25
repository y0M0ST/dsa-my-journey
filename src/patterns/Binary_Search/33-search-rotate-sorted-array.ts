/**
 * Problem: 33-search-rotate-sorted-array
 * Pattern: Binary_Search
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
export function searchRotateSortedArray(nums: number[], target: number): number {
  let left: number = 0;
  let right: number = nums.length - 1;

  while (left <= right) {
    let mid: number = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) return mid;

    // Kịch bản 1: Nửa TRÁI là vùng an toàn (sorted)
    if (nums[left] <= nums[mid]) {
      // Check xem target có lọt thỏm vô nửa trái này không
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1; // Nằm bên trái thì kéo biên phải lùi lại
      } else {
        left = mid + 1;  // Không nằm bên trái thì lượn qua phải tìm
      }
    }
    // Kịch bản 2: Nửa PHẢI là vùng an toàn (sorted)
    else {
      // Check xem target có lọt thỏm vô nửa phải này không
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;  // Nằm bên phải thì đẩy biên trái tiến lên
      } else {
        right = mid - 1; // Không nằm bên phải thì lượn qua trái tìm
      }
    }
  }

  return -1;
}