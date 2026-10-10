# BÍ KÍP VÕ CÔNG: TWO POINTERS (KỸ THUẬT HAI CON TRỎ)

> **Khẩu quyết:** Hai con trỏ không chỉ là hai biến index chạy lòng vòng, mà là nghệ thuật **"Thu hẹp không gian tìm kiếm"** và **"Loại bỏ hàng triệu trường hợp vô nghĩa chỉ bằng một bước dịch chuyển"**!

---

## 1. DẤU HIỆU NHẬN DIỆN (KHI NÀO DÙNG TWO POINTERS?)

Nếu bài toán xuất hiện một trong các dấu hiệu sau, 90% là lãnh địa của Two Pointers:
1. **Mảng đã được sắp xếp (Sorted Array):** Cần tìm cặp số, bộ ba số có tổng thỏa mãn điều kiện (LC 167, LC 15). Tính chất tăng dần cho phép ta biết chắc chắn dịch con trỏ nào sẽ làm tổng tăng lên hay giảm đi.
2. **Xử lý mảng tại chỗ (In-place Array Modification):** Yêu cầu $O(1)$ Space Complexity, xóa phần tử trùng hoặc lọc giá trị mà không được tạo mảng phụ (LC 26, LC 27).
3. **Bài toán ranh giới hình học / Thể tích (Greedy Geometric / Bounding Heights):** Thể tích nước, diện tích hình chữ nhật bị giới hạn bởi 2 đầu bờ tường (LC 11, LC 42).
4. **Đảo ngược / Đối xứng chuỗi (Palindrome / In-place Reversal):** Kiểm tra đối xứng hoặc đảo mảng từ 2 đầu dồn vào giữa.

---

## 2. CHỌN ĐÚNG TRONG 3 TEMPLATE CHUẨN

```
             [TWO POINTERS PATTERN]
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
  [Template 1]    [Template 2]   [Template 3]
Opposite-Direction Same-Direction Bounding Wall
  (Đối xứng ép biên) (Nhanh & Chậm) (Bức tường chặn nước)
  LC 167, 15, 11    LC 26, 27        LC 42
```

---

### Template 1: Đối xứng ép biên (Opposite-Direction / Convergent)

*   **Khởi tạo:** `left = 0`, `right = nums.length - 1` (đứng ở hai đầu chiến tuyến).
*   **Điều kiện lặp:** `while (left < right)`
*   **Cơ chế hoạt động:**
    - Tính toán giá trị hiện tại dựa trên `nums[left]` và `nums[right]`.
    - Dựa vào tính chất đơn điệu (đã sort) hoặc tư duy tham lam (Greedy):
      - Nếu cần tăng giá trị: `left++` (để lấy số lớn hơn).
      - Nếu cần giảm giá trị: `right--` (để lấy số nhỏ hơn).
      - Nếu đạt mục tiêu: ghi nhận kết quả và thu hẹp cả 2 biên hoặc kết thúc sớm.
*   **Bài toán áp dụng:**
    - **LC 167 (Two Sum II - Input Array Is Sorted):** Duyệt 1 vòng $O(N)$ bằng cách ép biên dựa theo `sum vs target`.
    - **LC 15 (3Sum):** Cố định con trỏ `i`, biến bài toán thành Two Sum II cho đoạn `[i + 1, n - 1]`. Độ phức tạp giảm từ $O(N^3)$ xuống $O(N^2)$.
    - **LC 11 (Container With Most Water):** Diện tích $= (right - left) \times \min(height[left], height[right])$. Chiều rộng luôn giảm khi thu hẹp, nên cơ hội duy nhất để tăng diện tích là dịch chuyển bức tường **thấp hơn** vào trong để tìm cột cao hơn!

---

### Template 2: Rùa và Thỏ / Nhanh và Chậm (Same-Direction / Fast & Slow)

*   **Khởi tạo:** Cả hai con trỏ cùng xuất phát từ đầu mảng (`slow = 0`, `fast = 0` hoặc `fast = 1`).
*   **Cơ chế hoạt động:**
    - Con trỏ `fast` (Thỏ): Chạy trước do thám, quét qua từng phần tử để tìm dữ liệu hợp lệ.
    - Con trỏ `slow` (Rùa): Đứng tại vị trí cần ghi đè dữ liệu "sạch".
    - Khi `fast` tìm thấy phần tử thỏa mãn điều kiện $\rightarrow$ Copy giá trị `nums[slow] = nums[fast]` rồi tăng `slow++`.
*   **Bài toán áp dụng:**
    - **LC 26 (Remove Duplicates from Sorted Array):** `slow` giữ vị trí phần tử độc nhất cuối cùng. Khi `nums[fast] !== nums[slow]`, tăng `slow++` và gán `nums[slow] = nums[fast]`.
    - **LC 27 (Remove Element):** Khi `nums[fast] !== val`, gán `nums[slow] = nums[fast]` và `slow++`.

---

### Template 3: Tường chắn hai đầu (Bounding Wall / Trapping Water Invariant)

*   **Khởi tạo:** `left = 0`, `right = n - 1`, duy trì 2 đỉnh lũy kế `leftMax = height[0]`, `rightMax = height[n - 1]`.
*   **Bản chất toán học:** Lượng nước đọng tại cột $i$ là:
    $$\text{water}[i] = \max(0, \min(\text{leftMax}[i], \text{rightMax}[i]) - \text{height}[i])$$
*   **Cơ chế đột phá:**
    - Nếu `leftMax < rightMax`: Ta **chắc chắn** rằng bức tường bên phải đủ cao để chắn nước, lượng nước tại `left` hoàn toàn bị khống chế bởi `leftMax` mà không cần quan tâm các cột ở giữa! Ta chỉ việc tính nước tại `left` rồi tăng `left++`.
    - Ngược lại (`rightMax <= leftMax`): Nước tại `right` bị khống chế bởi `rightMax`, tính nước tại `right` rồi giảm `right--`.
*   **Bài tiêu biểu:** LC 42 (Trapping Rain Water) - Tối ưu từ $O(N)$ Space xuống $O(1)$ Space tuyệt đối!

---

## 3. CÁC CẠM BẪY TỬ THẦN & CÁCH NÉ

### ⚠️ Bẫy 1: Quên bỏ qua phần tử trùng lặp (Duplicate Skipping Trap trong 3Sum)
*   **Sai lầm:** Trong LC 15 (3Sum), tìm được 1 bộ 3 số thỏa mãn nhưng chỉ tăng `left++` hoặc `right--` mà không nhảy qua các số giống nhau, dẫn đến kết quả bị duplicate hoặc TLE.
*   **Cách né:** Sau khi tìm thấy một bộ `sum === 0`:
    ```ts
    while (left < right && nums[left] === nums[left + 1]) left++;
    while (left < right && nums[right] === nums[right - 1]) right--;
    left++;
    right--;
    ```
    Đồng thời ở vòng lặp ngoài cố định `i`, cũng phải skip nếu `nums[i] === nums[i - 1]`.

### ⚠️ Bẫy 2: Nhầm lẫn giữa `left < right` và `left <= right`
*   **Chân lý:**
    - Cần 2 phần tử **khác nhau** tạo thành cặp/đoạn/cột chứa nước $\rightarrow$ Dùng `while (left < right)` (LC 11, LC 15, LC 167, LC 42).
    - Cần xét cả phần tử ở giữa hoặc tìm kiếm nhị phân phần tử đơn $\rightarrow$ Dùng `while (left <= right)`.

### ⚠️ Bẫy 3: Di chuyển sai con trỏ trong Container With Most Water (LC 11)
*   **Sai lầm:** Dịch chuyển con trỏ có chiều cao lớn hơn với hy vọng tìm được cột còn cao hơn nữa.
*   **Chân lý:** Diện tích bị bóp nghẹt bởi cột **ngắn hơn**. Giữ lại cột ngắn và dịch cột dài thì chiều rộng giảm mà chiều cao tối đa vẫn bị chặn bởi cột ngắn $\rightarrow$ Diện tích **chắc chắn giảm**. Phải dịch cột ngắn đi để tìm cơ hội đổi đời!

---

## 4. BỘ SƯU TẬP PATTERN ĐÃ PHÁ ĐẢO

| Bài toán | Dạng con trỏ | Time Complexity | Space Complexity | Điểm cốt lõi |
|---|---|---|---|---|
| **LC 26: Remove Duplicates** | Fast & Slow | $O(N)$ | $O(1)$ | Ghi đè in-place khi `nums[fast] !== nums[slow]` |
| **LC 27: Remove Element** | Fast & Slow | $O(N)$ | $O(1)$ | Nhặt phần tử không phải rác đè lên vị trí `slow` |
| **LC 167: Two Sum II** | Convergent | $O(N)$ | $O(1)$ | Mảng đã sort $\rightarrow$ Ép biên theo `sum` |
| **LC 15: 3Sum** | Sort + Convergent | $O(N^2)$ | $O(1)$ | Cố định `i`, Two Sum II phần còn lại, triệt tiêu trùng lặp |
| **LC 11: Container With Most Water** | Greedy Convergent | $O(N)$ | $O(1)$ | Luôn dịch con trỏ ở bờ tường thấp hơn |
| **LC 42: Trapping Rain Water** | Bounding Invariant | $O(N)$ | $O(1)$ | Nước bị chặn bởi $\min(leftMax, rightMax)$, giải bài toán từ phía thấp hơn |

---

## 5. BẢNG SO SÁNH CÁC BIẾN THỂ TWO POINTERS

| Tiêu chí | Đối xứng ép biên (Convergent) | Nhanh và Chậm (Fast & Slow) | Tường chắn hai đầu (Bounding) |
|---|---|---|---|
| **Vị trí bắt đầu** | Hai đầu mảng (`0` và `n - 1`) | Cùng xuất phát từ đầu (`0`) | Hai đầu mảng (`0` và `n - 1`) |
| **Hướng di chuyển** | Đi ngược chiều vào tâm | Cùng tiến về phía trước | Đi ngược chiều theo mức min tường |
| **Điều kiện tiên quyết** | Mảng đã sort hoặc bài toán đối xứng | Xử lý mảng in-place / chu kỳ | Bảo toàn giá trị max hai phía |
| **Mục tiêu chính** | Tìm cặp nghiệm, tối đa diện tích | Lọc rác, dồn mảng, tìm chu kỳ | Đong nước từng cột độc lập |
