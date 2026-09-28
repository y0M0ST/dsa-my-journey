# BÍ KÍP VÕ CÔNG: BINARY SEARCH (TÌM KIẾM NHỊ PHÂN)

> **Khẩu quyết:** Không bao giờ gõ `left = 0, right = nums.length - 1` một cách vô thức. Hãy tự hỏi: "Mình đang tìm một **con số** hay tìm một **ranh giới**?"

## 1. DẤU HIỆU NHẬN DIỆN (KHI NÀO DÙNG BINARY SEARCH?)
Nếu search space có tính đơn điệu và có thể loại bỏ một phần search space sau mỗi lần kiểm tra → hãy nghĩ đến Binary Search hoặc nếu đề bài có 1 trong 3 yếu tố sau, 99% là phải xài Binary Search:
1. **Mảng đã được sắp xếp (Sorted Array):** Dấu hiệu rõ ràng nhất.
2. **Yêu cầu Time Complexity khắt khe:** Bắt buộc tối ưu thời gian chạy là $O(\log N)$.
3. **Tính đơn điệu (Monotonicity):** Có thể chia không gian tìm kiếm thành 2 nửa rõ rệt: Nửa `[False, False...]` và nửa `[True, True...]` (Thường gặp trong dạng *Binary Search on Answer*).

---

## 2. CHỌN ĐÚNG TRONG 3 TEMPLATE CHUẨN

### Template 1: Súng ngắm (Tìm mục tiêu cụ thể)
*   **Điều kiện lặp:** `while (left <= right)`
*   **Khi nào dùng:** Tìm chính xác một `target` có tồn tại trong mảng hay không.
*   **Cách chém biên:** 
    *   Tìm thấy: `return mid`
    *   Không thấy: Ép biên triệt để `left = mid + 1` hoặc `right = mid - 1`.
*   **Loop Invariant:** Khi vòng lặp vỡ (`left > right`), `left` luôn trỏ vào vị trí hợp lý để chèn `target` (Bài LC 35).

### Template 2: Radar dò mìn (Tìm ranh giới / Điểm gãy)
*   **Điều kiện lặp:** `while (left < right)`
*   **Khi nào dùng:** Tìm phần tử đầu tiên/cuối cùng thỏa mãn điều kiện (Ví dụ: Nhỏ nhất, lớn nhất, First/Last Position).
*   **Cách chém biên:** Khúc này phải cực kỳ cẩn thận với **"Quy tắc bắt con tin"** (Xem mục Cạm bẫy).
*   **Điểm chốt hạ:** Vòng lặp vỡ khi `left === right`. Hai con trỏ chập làm 1, đó chính là đáp án: `return nums[left]`.

### Template 3: Phán đoán khả thi (Binary Search on Answer / Feasibility Search)
*   **Điều kiện lặp:** `while (low <= high)` kết hợp biến ghi nhận `result = mid`, hoặc `while (low < high)` co hẹp dần.
*   **Khi nào dùng:** Đề bài yêu cầu tìm giá trị **nhỏ nhất lớn nhất (minimize the maximum)** hoặc **lớn nhất nhỏ nhất (maximize the minimum)**. Không gian tìm kiếm là miền số nguyên liên tục `[minVal, maxVal]`.
*   **Hàm kiểm tra (Predicate Function):** Viết hàm `canDo(mid): boolean` (thường dùng Greedy duyệt mảng trong $O(N)$).
*   **Tính đơn điệu (Monotonicity):** 
    *   Nếu tải trọng / năng lực $M$ làm được $\rightarrow$ Mọi giá trị $> M$ chắc chắn làm được $\rightarrow$ Thu hẹp tìm giá trị nhỏ hơn (`high = mid - 1` hoặc `high = mid`).
    *   Nếu không làm được $\rightarrow$ Bắt buộc phải tăng năng lực (`low = mid + 1`).
*   **Bài toán áp dụng:** LC 875, LC 1011, LC 410.

---

## 3. CÁC CẠM BẪY TỬ THẦN & CÁCH NÉ

### Bẫy 1: Tràn bộ nhớ (Integer Overflow)
*   **Sai lầm:** `let mid = Math.floor((left + right) / 2)` (Sẽ nổ tung nếu mảng quá lớn trong các ngôn ngữ tĩnh; trong JS dù dùng 64-bit float vẫn là bad practice).
*   **Cách né:** LUÔN LUÔN dùng `let mid = left + Math.floor((right - left) / 2)`.

### Bẫy 2: Vi phạm "Quy tắc bắt con tin" (LC 153, LC 410)
*   **Sai lầm:** Khi dùng Template 2/3 (`low < high`), vội vàng chém `high = mid - 1` dù chưa chắc `mid` đã sai.
*   **Cách né:** Tự hỏi: *"Thằng `mid` có khả năng là đáp án tối ưu không?"*
    *   Nếu CHẮC CHẮN không phải $\rightarrow$ Thẳng tay vứt: `left = mid + 1`.
    *   Nếu CÓ KHẢ NĂNG là nó $\rightarrow$ Bắt làm con tin, giữ lại trên mép: **`right = mid`**.

### Bẫy 3: Chọn sai "Hệ quy chiếu" trong Mảng xoay (Rotated Array)
*   **Sai lầm:** Đem `nums[mid]` so sánh với `nums[left]`. Ở những đoạn gãy đứt khúc, `left` có thể đang đứng ở đỉnh vách đá khiến mọi so sánh bị đảo lộn.
*   **Cách né:** LUÔN LUÔN lấy **`nums[right]`** làm hệ quy chiếu để xét tính đơn điệu (xem mảng đang dốc lên hay bị gãy).

### Bẫy 4: Code thừa, logic lộn xộn (If/Else nhập nhằng)
*   **Cách né:** Không bao giờ gộp chung `<=`, `>=`. Phải chẻ rạch ròi 3 nhánh rõ ràng: `if (<)`, `else if (>)`, `else (===)`. 

---

## 4. BỘ SƯU TẬP PATTERN ĐÃ PHÁ ĐẢO
1. **Classic Binary Search:** Tìm kiếm cơ bản. (LC 704, LC 35)
2. **First / Last Position:** Dùng biến cờ (Flag `isSearchingLeft`) để ép biên khi đã tìm thấy target (đi tìm ranh giới trùng lặp). (LC 34)
3. **Rotated Sorted Array:** Xét xem nửa nào đang "thẳng tắp" (Sorted Half) rồi xem Target có rơi vào nửa đó không. (LC 33, LC 153)
4. **Binary Search on Answer (Feasibility Check / Minimax):**
   - **LC 875 (Koko Eating Bananas):** Miền tốc độ `[1, max(piles)]`, hàm `checkSpeed(k)` đếm tổng số giờ $\le h$. Time: $O(N \log M)$, Space: $O(1)$.
   - **LC 1011 (Capacity To Ship Packages Within D Days):** Miền tải trọng `[max(weights), sum(weights)]`, hàm `canShip(capacity)` gom hàng tham lam xem có kịp chuyển trong $\le \text{days}$ hay không. Time: $O(N \log(S - M))$, Space: $O(1)$.
   - **LC 410 (Split Array Largest Sum):** Miền tổng lớn nhất `[max(nums), sum(nums)]`, hàm `canSplit(maxSum)` đếm số đoạn con $\le k$. Tối ưu Early Exits khi $k=1$ (trả về `sum`) và $k=n$ (trả về `max`). Time: $O(N \log(S - M))$, Space: $O(1)$.

---

## 5. BẢNG TỔNG KẾT 3 TEMPLATE

| Tiêu chí | Template 1 (Classic) | Template 2 (Boundary) | Template 3 (On Answer) |
|---|---|---|---|
| **Điều kiện vòng lặp** | `while (left <= right)` | `while (left < right)` | `while (low <= high)` hoặc `while (low < high)` |
| **Không gian tìm kiếm** | Mảng đã sort `[0, n - 1]` | Mảng đã sort `[0, n - 1]` | Miền giá trị `[minVal, maxVal]` |
| **Cập nhật biên** | `left = mid + 1` / `right = mid - 1` | `left = mid + 1` / `right = mid` | `low = mid + 1` / `high = mid - 1` (kèm `result`) |
| **Kết thúc** | `return mid` hoặc `return -1` | `return nums[left]` | `return result` hoặc `return low` |
| **Bài tiêu biểu** | LC 704, LC 35 | LC 153, LC 34 | LC 875, LC 1011, LC 410 |