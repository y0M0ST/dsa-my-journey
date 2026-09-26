/**
 * Problem: 410-split-array (Split Array Largest Sum)
 * Pattern: Binary_Search (Binary Search on Answer / Feasibility Check)
 *
 * Time Complexity:
 *   - Trường hợp tốt nhất (Best Case): O(n) khi k = 1 hoặc k = n (kết thúc sớm - Early Exit).
 *   - Trường hợp trung bình/xấu nhất (Average/Worst Case): O(n * log(S - M))
 *     Trong đó n là độ dài mảng, S là tổng các phần tử (high), M là phần tử lớn nhất (low).
 *     Số vòng lặp nhị phân là log2(S - M), mỗi vòng duyệt qua mảng mất O(n).
 *
 * Space Complexity: O(1)
 *   - Chỉ sử dụng một số biến đếm nguyên thủy, không cấp phát bộ nhớ phụ thuộc vào kích thước mảng.
 */
export function splitArray(nums: number[], k: number): number {
  const n = nums.length;
  let low = 0;
  let high = 0;

  // Tìm giá trị lớn nhất (cận dưới) và tổng của mảng (cận trên)
  // Sử dụng for loop truyền thống để đạt hiệu năng tối đa trên V8 engine
  for (let i = 0; i < n; i++) {
    const num = nums[i]!;
    if (num > low) low = num;
    high += num;
  }

  // Tối ưu trường hợp biên (Early Exits):
  // 1. Nếu k = 1: Toàn bộ mảng là 1 mảng con duy nhất -> kết quả chính là tổng cả mảng (high)
  if (k === 1) return high;

  // 2. Nếu k = n: Mỗi phần tử là một mảng con riêng biệt -> kết quả là phần tử lớn nhất (low)
  if (k === n) return low;

  // Tìm kiếm nhị phân trên không gian đáp án [low, high]
  // Invariant: Kết quả tối ưu luôn nằm trong đoạn [low, high]
  while (low < high) {
    const mid = Math.floor(low + (high - low) / 2);

    if (canSplit(nums, k, mid)) {
      // mid có thể là đáp án hợp lệ, tiếp tục thu hẹp tìm kết quả nhỏ hơn ở nửa trái
      high = mid;
    } else {
      // mid quá nhỏ, không thể chia thành <= k mảng con -> đáp án chắc chắn phải > mid
      low = mid + 1;
    }
  }

  // Khi vòng lặp kết thúc, low === high và là giá trị maxSum nhỏ nhất thoả mãn điều kiện
  return low;
}

/**
 * Hàm kiểm tra tính khả thi (Feasibility / Predicate Function):
 * Liệu có thể chia nums thành <= k mảng con liên tiếp sao cho tổng mỗi mảng con <= maxSum?
 */
function canSplit(nums: number[], k: number, maxSum: number): boolean {
  let subArrayCount = 1;
  let currentSum = 0;
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    const num = nums[i]!;

    if (currentSum + num > maxSum) {
      // Bắt đầu một mảng con mới
      subArrayCount++;
      currentSum = num;

      // Cắt tỉa nhánh sớm (Early pruning): Nếu vượt quá k mảng con thì không hợp lệ
      if (subArrayCount > k) {
        return false;
      }
    } else {
      currentSum += num;
    }
  }

  return true;
}

