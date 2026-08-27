# BÍ KÍP VÕ CÔNG: BINARY SEARCH (TÌM KIẾM NHỊ PHÂN)

> **Khẩu quyết:** Không bao giờ gõ `left = 0, right = nums.length - 1` một cách vô thức. Hãy tự hỏi: "Mình đang tìm một **con số** hay tìm một **ranh giới**?"

## 1. DẤU HIỆU NHẬN DIỆN (KHI NÀO DÙNG BINARY SEARCH?)
Nếu search space có tính đơn điệu và có thể loại bỏ một phần search space sau mỗi lần kiểm tra → hãy nghĩ đến Binary Search hoặc nếu đề bài có 1 trong 3 yếu tố sau, 99% là phải xài Binary Search:
1. **Mảng đã được sắp xếp (Sorted Array):** Dấu hiệu rõ ràng nhất.
2. **Yêu cầu Time Complexity khắt khe:** Bắt buộc tối ưu thời gian chạy là $O(\log N)$.
3. **Tính đơn điệu (Monotonicity):** Có thể chia không gian tìm kiếm thành 2 nửa rõ rệt: Nửa `[False, False...]` và nửa `[True, True...]` (Thường gặp trong dạng *Binary Search on Answer*).

---

## 2. CHỌN 1 TRONG 3 TEMPLATE NHMA THƯỜNG LÀ SỬ DỤNG 2 THÔI (CHỌN ĐÚNG TEMPLATE)

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
*   **Điểm chốt hạ:** Vòng lặp vỡ khi `left === right`. Hai con trỏ chập làm 1, đó chính là đáp án. `return nums[left]`.

---

## 3. CÁC CẠM BẪY TỬ THẦN & CÁCH NÉ

### Bẫy 1: Tràn bộ nhớ (Integer Overflow)
*   **Sai lầm:** `let mid = Math.floor((left + right) / 2)` (Sẽ nổ tung nếu mảng quá lớn).
*   **Cách né:** LUÔN LUÔN dùng `let mid = left + Math.floor((right - left) / 2)`.

### Bẫy 2: Vi phạm "Quy tắc bắt con tin" (LC 153)
*   **Sai lầm:** Khi dùng Template 2, vội vàng chém `right = mid - 1` dù chưa chắc `mid` đã sai.
*   **Cách né:** Tự hỏi: *"Thằng `mid` có khả năng là đáp án không?"*
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
4. **Binary Search on Answer:** Không tìm trên mảng có sẵn. Tự tạo một không gian đáp án ảo (Range `[min, max]`), viết hàm `check(mid)` trả về `True/False` để đi tìm chữ `True` đầu tiên. (LC 875 - Koko Eating Bananas).