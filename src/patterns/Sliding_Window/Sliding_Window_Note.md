# BÍ KÍP VÕ CÔNG: SLIDING WINDOW (CỬA SỔ TRƯỢT)

> **Khẩu quyết:** Tại sao phải tốn $O(N^2)$ duyệt mọi cặp `(i, j)` khi chỉ cần 2 con trỏ `left` và `right` lướt nhẹ một lần $O(N)$? Khi mở rộng bên phải (`right++`), trạng thái tích lũy; khi thu hẹp bên trái (`left++`), trạng thái giải phóng. Đừng bao giờ quên: **Cửa sổ trượt chỉ hoạt động khi bài toán có tính đơn điệu (Monotonicity)!**

---

## 1. DẤU HIỆU NHẬN DIỆN (KHI NÀO DÙNG SLIDING WINDOW?)

Nếu đề bài có 3 yếu tố sau, 99% là đất diễn của Sliding Window:
1. **Dữ liệu là mảng hoặc chuỗi liên tục (Contiguous Subarray / Substring):**
   - Đề bài yêu cầu tìm chuỗi con, mảng con liên tiếp thỏa mãn một tiêu chuẩn nào đó.
   - *Lưu ý:* Nếu đề bài nói về "Subsequence" (chuỗi con không liên tiếp), Sliding Window thường **vô dụng**, phải nghĩ sang Dynamic Programming hoặc Greedy.
2. **Tìm Min, Max hoặc Đếm (Optimization / Counting Constraint):**
   - Tìm mảng con *ngắn nhất* có tổng $\ge K$ (LC 209).
   - Tìm chuỗi con *dài nhất* không có ký tự trùng lặp (LC 3).
   - Tìm chuỗi con *dài nhất* chứa toàn ký tự giống nhau sau tối đa $K$ lần thay thế (LC 424).
   - Tìm chuỗi con *nhỏ nhất* bao phủ toàn bộ tập ký tự mục tiêu (LC 76).
3. **Tính đơn điệu của Cửa sổ (Monotonicity):**
   - Mở rộng cửa sổ (`right++`): Thông tin nạp thêm chỉ làm tổng tăng lên, số lượng phần tử tăng lên, độ đa dạng tăng lên.
   - Co cửa sổ (`left++`): Thông tin nhả ra chỉ làm tổng giảm đi, số lượng phần tử giảm đi.
   - *Lưu ý cạm bẫy:* Nếu mảng chứa **số âm**, tổng không còn đơn điệu $\rightarrow$ Sliding Window gãy! Lúc này phải dùng **Prefix Sum + HashMap** (như LC 560).

---

## 2. CHỌN ĐÚNG TRONG 3 TEMPLATE CHUẨN

```
           [SLIDING WINDOW PATTERN]
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
[Template 1]    [Template 2]    [Template 3]
Fixed Size     Dynamic Shrink  Non-shrinking
(Cố định K)    (Co giãn max/min) (Bảo lưu kỷ lục)
 LC 438, 567    LC 3, 209, 76      LC 424
```

### Template 1: Cửa sổ kích thước cố định (Fixed Size Window)
*   **Khi nào dùng:** Kích thước cửa sổ được ấn định cố định là $K$ (hoặc độ dài chuỗi mẫu `p.length`).
*   **Cơ chế hoạt động:**
    1. Khởi tạo cửa sổ đầu tiên từ `0` đến `K - 1`.
    2. Vòng lặp trượt từ index `K` đến `N - 1`:
       - Nạp phần tử mới tại `right`.
       - Nhả phần tử cũ tại `left = right - K`.
       - Cập nhật trạng thái trong $O(1)$.
*   **Bí thuật tối ưu:** Thay vì sau mỗi bước trượt phải so sánh lại toàn bộ bảng tần suất $O(\Sigma)$ (ví dụ 26 chữ cái), hãy dùng biến `matches` đếm số ký tự đã đạt yêu cầu. Mỗi bước chỉ thay đổi 2 ký tự nên cập nhật `matches` mất đúng $O(1)$!
*   **Bài tiêu biểu:** LC 438 (Find All Anagrams in a String).

---

### Template 2: Cửa sổ kích thước biến thiên (Dynamic Variable-Size Window)
Đây là dạng phổ biến nhất trong các buổi phỏng vấn Meta, Google. Được chia làm 2 biến thể đối ngẫu:

#### 🔹 Biến thể 2A: Tìm cửa sổ NGẮN NHẤT thỏa điều kiện (Shortest / Min Window)
*   **Chiến thuật:** "Nạp cho ĐỦ $\rightarrow$ Vắt kiệt để TỐI THIỂU"
*   **Cơ chế:**
    - Vòng lặp ngoài `right`: Mở rộng cửa sổ cho đến khi điều kiện trở nên **HỢP LỆ** (`isValid === true`).
    - Vòng lặp trong `while (isValid)`:
      - Cập nhật kỷ lục nhỏ nhất: `minLen = Math.min(minLen, right - left + 1)`.
      - Thu hẹp `left++` để loại bỏ phần tử thừa nhằm tìm cửa sổ ngắn hơn.
      - Tiếp tục co cho đến khi điều kiện bị phá vỡ (`isValid === false`), rồi lại nhường quyền cho `right` chạy tiếp.
*   **Bài tiêu biểu:** LC 209 (Minimum Size Subarray Sum), LC 76 (Minimum Window Substring - Boss tối thượng).

#### 🔹 Biến thể 2B: Tìm cửa sổ DÀI NHẤT không vi phạm (Longest / Max Window)
*   **Chiến thuật:** "Nạp cho ĐẾN KHI VI PHẠM $\rightarrow$ Co lại để HỢP LỆ"
*   **Cơ chế:**
    - Vòng lặp ngoài `right`: Mở rộng cửa sổ nạp phần tử mới.
    - Nếu xuất hiện vi phạm (ví dụ trùng ký tự):
      - Dùng vòng lặp `while` co `left++` cho đến khi hết vi phạm;
      - Hoặc **nhảy cóc thần tốc (Direct Index Jump)** bằng mảng `lastSeen`: gán thẳng `left = lastSeen[code] + 1` (LC 3).
    - Cập nhật kỷ lục lớn nhất: `maxLen = Math.max(maxLen, right - left + 1)`.
*   **Bài tiêu biểu:** LC 3 (Longest Substring Without Repeating Characters).

---

### Template 3: Cửa sổ không co lại (Non-shrinking Sliding Window)
*   **Khẩu quyết:** "Đã lập đỉnh thì không bao giờ hạ chuẩn!"
*   **Khi nào dùng:** Bài toán tìm độ dài **LỚN NHẤT** (`maxLen`) và chi phí co cửa sổ quá tốn kém hoặc không cần thiết.
*   **Tư duy đột phá:**
    - Giả sử ta đã tìm được một cửa sổ hợp lệ có độ dài `K`. Mục tiêu là tìm xem có cửa sổ nào dài hơn $K+1, K+2...$ hay không.
    - Một cửa sổ có độ dài $\le K$ hoàn toàn vô giá trị, không thể phá kỷ lục!
    - Vì vậy, khi cửa sổ hiện tại bị vi phạm điều kiện (`len - maxFreq > k`), thay vì dùng `while` co `left` lại nhiều bước khiến cửa sổ thu nhỏ, ta **chỉ tăng `left++` đúng 1 lần**.
    - Nghĩa là: Cửa sổ tịnh tiến cả khối sang phải, kích thước `(right - left + 1)` được GIỮ NGUYÊN.
    - Kỷ lục không bao giờ giảm! Kết thúc duyệt, đáp án chính là `n - left`.
*   **Tại sao không cần giảm `maxFreq` khi `left` dịch chuyển?**
    - Kỷ lục `maxLen` trong quá khứ được xác lập bởi một giá trị `maxFreq` lịch sử.
    - Bất kỳ cửa sổ mới nào muốn phá kỷ lục thì phải có một ký tự đạt tần suất LỚN HƠN `maxFreq` cũ.
    - Việc giữ nguyên `maxFreq` (không giảm khi bỏ bớt ký tự) hoàn toàn không làm sai kết quả vì nó đóng vai trò là "mức sàn yêu cầu tối thiểu" để kích hoạt mở rộng cửa sổ.
*   **Bài tiêu biểu:** LC 424 (Longest Repeating Character Replacement).

---

## 3. CÁC CẠM BẪY TỬ THẦN & CÁCH NÉ

### ⚠️ Bẫy 1: Sai lệch 1 đơn vị độ dài cửa sổ (Off-by-One Error)
*   **Sai lầm:** Tính độ dài cửa sổ bằng `right - left`.
*   **Chân lý:**
    - Khi cả 2 con trỏ đều là chỉ số bao hàm (Inclusive `[left, right]`): Độ dài là **`right - left + 1`**.
    - Khi `right` trỏ vào vị trí đứng sau phần tử cuối cùng (Exclusive `[left, right)`): Độ dài mới là `right - left`.

### ⚠️ Bẫy 2: Chi phí $O(\Sigma)$ kiểm tra tính hợp lệ trong mỗi bước
*   **Sai lầm:** Sau mỗi lần `right++` hoặc `left++`, chạy một vòng lặp `for (0..25)` để kiểm tra 2 mảng tần suất có bằng nhau hay không $\rightarrow$ Đẩy Time Complexity lên $O(26 \times N)$.
*   **Cách né:**
    - Sử dụng biến phụ trợ: `matches` (trong LC 438) hoặc `remaining` (trong LC 76).
    - Chỉ kiểm tra và cập nhật biến phụ trợ này tại đúng ký tự vừa thêm/bớt trong $O(1)$.

### ⚠️ Bẫy 3: Cấp phát chuỗi động gây nghẽn Garbage Collection (GC Thrashing)
*   **Sai lầm:** Gọi `s.substring(left, right + 1)` hoặc `s.slice(...)` liên tục bên trong vòng lặp `while` để so sánh hoặc lưu chuỗi tạm.
*   **Hậu quả:** Trình thông dịch V8 liên tục cấp phát bộ nhớ chuỗi mới $\rightarrow$ Trigger Garbage Collection $\rightarrow$ Tụt Runtime thê thảm, nguy cơ Memory Limit Exceeded.
*   **Cách né:** LUÔN LUÔN chỉ lưu 2 con trỏ chỉ số: `bestLeft = left` và `minLen = windowLen`. Chỉ thực hiện `s.slice(bestLeft, bestLeft + minLen)` **đúng 1 lần duy nhất** trước lệnh `return` cuối cùng!

### ⚠️ Bẫy 4: Lạc trôi con trỏ `left` về quá khứ (LC 3)
*   **Sai lầm:** Khi dùng bảng vị trí gần nhất `lastSeen`, nhảy cóc mù quáng: `left = lastSeen[code] + 1`.
*   **Hậu quả:** Nếu ký tự trùng lặp xuất hiện ở tít bên ngoài cửa sổ hiện tại (trước cả `left`), phép gán sẽ kéo `left` nhảy lùi về quá khứ!
*   **Cách né:** Bắt buộc kiểm tra điều kiện ranh giới: `if (lastSeen[code] >= left) left = lastSeen[code] + 1`.

### ⚠️ Bẫy 5: Lãng phí CPU với `Map` và `Object`
*   **Bản chất:** `Map.set()`, `Map.get()` hoặc Object lookups có chi phí hashing, lookup bucket và overhead phân bổ heap.
*   **Cách né:** Với chuỗi chỉ chứa chữ cái tiếng Anh (`a-z`, `A-Z`) hoặc bảng mã ASCII (0-127), hãy LUÔN LUÔN ưu tiên dùng Typed Array: `new Int32Array(26)` hoặc `new Int32Array(128)`. Cực kỳ nhẹ, cache locality hoàn hảo, tốc độ vượt trội (Beats 95-100%).

---

## 4. BỘ SƯU TẬP PATTERN ĐÃ PHÁ ĐẢO

1. **LC 3 (Longest Substring Without Repeating Characters) — Medium:**
   - *Chiêu thức:* Dynamic Window + Direct Index Jump với `Int32Array(128)` lưu vị trí `lastSeen`.
   - *Điểm nhấn:* Nhảy thẳng `left` mà không cần vòng lặp `while` co từng bước. Time: $O(N)$, Space: $O(1)$.
2. **LC 209 (Minimum Size Subarray Sum) — Medium:**
   - *Chiêu thức:* Dynamic Shrinkable Window (Tìm min).
   - *Điểm nhấn:* Mở `right` tích lũy `currentSum`, khi $\ge target$ thì co `left` liên tục. Early Exit cực mạnh khi `minLen === 1`. Time: $O(N)$, Space: $O(1)$.
3. **LC 438 (Find All Anagrams in a String) — Medium:**
   - *Chiêu thức:* Fixed Size Window (Kích thước $K = p.length$).
   - *Điểm nhấn:* Kỹ thuật biến cờ `matches` đếm đủ 26 ký tự khớp, trượt cửa sổ nạp 1 bỏ 1 với $O(1)$ mỗi bước. Time: $O(N)$, Space: $O(1)$.
4. **LC 424 (Longest Repeating Character Replacement) — Medium:**
   - *Chiêu thức:* Non-shrinking Sliding Window.
   - *Điểm nhấn:* Khi số ký tự cần đổi `(len - maxFreq) > k`, chỉ tịnh tiến `left++`, bảo lưu kỷ lục kích thước lớn nhất `n - left`. Không cần giảm `maxFreq`. Time: $O(N)$, Space: $O(1)$.
5. **LC 76 (Minimum Window Substring) — Hard Boss:**
   - *Chiêu thức:* Dynamic Shrinkable Window tối ưu tuyệt đối.
   - *Điểm nhấn:* Dùng mảng `targetFreq = new Int32Array(128)` và biến đếm số ký tự còn thiếu `remaining = t.length`. Co `left` khi `remaining === 0`. Chỉ `slice` chuỗi 1 lần duy nhất ở cuối. Time: $O(M + N)$, Space: $O(1)$.

---

## 5. BẢNG TỔNG KẾT 3 TEMPLATE SLIDING WINDOW

| Tiêu chí | Template 1: Fixed Size | Template 2: Dynamic Shrinkable | Template 3: Non-shrinking |
|---|---|---|---|
| **Kích thước cửa sổ** | Luôn cố định bằng $K$ | Biến thiên liên tục (mở và co) | Chỉ tăng hoặc giữ nguyên |
| **Vòng lặp trong** | Không có (trượt $O(1)$) | Có `while` để co `left` | Không có (chỉ `if` tịnh tiến `left`) |
| **Mục tiêu chính** | Tìm mọi vị trí / đếm cửa sổ khớp | Tìm Min/Max Subarray/Substring | Tìm Max Subarray/Substring |
| **Chi phí mỗi bước** | $O(1)$ nhờ `matches` | Amortized $O(1)$ (mỗi con trỏ đi $\le N$) | $O(1)$ tuyệt đối |
| **Bộ nhớ phụ** | $O(1)$ với `Int32Array(26)` | $O(1)$ với biến con trỏ / `Int32Array` | $O(1)$ với `Int32Array(26)` |
| **Bài tiêu biểu** | LC 438, LC 567 | LC 3, LC 209, LC 76 | LC 424 |
