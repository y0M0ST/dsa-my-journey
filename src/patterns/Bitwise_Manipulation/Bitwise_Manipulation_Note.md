# BÍ KÍP VÕ CÔNG: BITWISE MANIPULATION (THAO TÁC TRÊN BIT)

> **Khẩu quyết:** Máy tính bản chất chỉ hiểu $0$ và $1$. Thao tác trên bit là tầng võ công thấp nhất (sát phần cứng nhất) nhưng lại có uy lực tối thượng: **Tốc độ thực thi $O(1)$ chỉ trong đúng 1 chu kỳ CPU (single cycle) và tiêu tốn $O(1)$ bộ nhớ tuyệt đối!**

---

## 1. BẢN CHẤT BITWISE TRONG JAVASCRIPT / TYPESCRIPT

*   Trong JavaScript/TypeScript, mọi số thông thường là kiểu `Number` (64-bit Floating Point chuẩn IEEE 754).
*   Tuy nhiên, khi áp dụng các toán tử Bitwise (`&`, `|`, `^`, `~`, `<<`, `>>`), V8 Engine sẽ tự động ép kiểu số đó về **32-bit Signed Integer** (bù hai - Two's Complement) từ $-2^{31}$ đến $2^{31} - 1$.
*   Sau khi tính toán xong, kết quả được chuyển ngược lại về JavaScript Number.
*   Toán tử dịch phải không dấu `>>>` sẽ trả về **32-bit Unsigned Integer** (từ $0$ đến $2^{32} - 1$).

---

## 2. BẢNG CHÂN LÝ VÀ 6 PHÉP TOÁN CỐT LÕI

| Phép toán | Ký hiệu | Ý nghĩa logic | Ví dụ nhị phân | Kết quả |
|---|---|---|---|---|
| **AND** | `&` | Cả 2 đều là `1` thì bằng `1`, còn lại là `0` | `1101 & 1011` | `1001` (9) |
| **OR** | `\|` | Có ít nhất một `1` thì bằng `1`, cả hai `0` thì là `0` | `1100 \| 0011` | `1111` (15) |
| **XOR** | `^` | **Khác nhau** thì bằng `1`, **giống nhau** thì bằng `0` | `1100 ^ 1010` | `0110` (6) |
| **NOT** | `~` | Đảo toàn bộ bit (`0` thành `1`, `1` thành `0`). $\sim x = -(x + 1)$ | `~00000101` (~5) | `-6` |
| **Left Shift** | `<<` | Dịch bit sang trái, nhân thêm $2^k$ (nhồi số `0` bên phải) | `5 << 2` (`101` $\rightarrow$ `10100`) | `20` |
| **Right Shift** | `>>` | Dịch bit sang phải, chia nguyên cho $2^k$ (giữ nguyên dấu) | `20 >> 2` (`10100` $\rightarrow$ `101`) | `5` |
| **Unsigned Right Shift** | `>>>` | Dịch bit sang phải, lấp số `0` ở đầu (bỏ qua bit dấu) | `-1 >>> 0` | `4294967295` |

---

## 3. BÍ THUẬT XOR MAGIC (CHÌA KHÓA VÀNG LC 136)

Toán tử XOR mang 4 tính chất toán học kỳ diệu giúp giải quyết nhiều bài toán phỏng vấn kinh điển:

```
1. Tự triệt tiêu:     x ^ x = 0     (Hai số giống nhau tự hủy diệt)
2. Phần tử trung hòa: x ^ 0 = x     (XOR với 0 không làm thay đổi giá trị)
3. Tính giao hoán:    a ^ b = b ^ a (Thứ tự thực hiện không quan trọng)
4. Tính kết hợp:      (a ^ b) ^ c = a ^ (b ^ c)
```

### Ứng dụng đỉnh cao: Tìm kẻ cô đơn (Single Number - LC 136)
Giả sử có mảng `[4, 1, 2, 1, 2]`. Nếu ta XOR liên tiếp tất cả các phần tử lại với nhau:
$$\text{Result} = 4 \oplus 1 \oplus 2 \oplus 1 \oplus 2 = 4 \oplus (1 \oplus 1) \oplus (2 \oplus 2) = 4 \oplus 0 \oplus 0 = 4$$
*   Mọi cặp số trùng lặp tự triệt tiêu thành `0`.
*   Chỉ duy nhất con số xuất hiện 1 lần tồn tại đến cuối cùng!
*   **Time Complexity:** $O(N)$ (duyệt mảng 1 lần).
*   **Space Complexity:** $O(1)$ (chỉ dùng đúng 1 biến tích lũy).

---

## 4. TOP 7 BIT-TRICKS "HACK NÃO" PHỔ BIẾN TRONG PHỎNG VẤN

```
              TOP 7 HACK BIT-TRICKS
                       │
  ┌────────────────────┼────────────────────┐
  ▼                    ▼                    ▼
n & (n - 1)          n & -n               n & 1
Xóa bit 1 cuối cùng  Trích xuất bit 1     Kiểm tra số lẻ
(Brian Kernighan)    (Lowest set bit)     (Odd / Even check)
```

### 1. `n & (n - 1)`: Xóa bit 1 thấp nhất (Brian Kernighan's Trick)
*   **Công dụng:** Biến bit `1` cuối cùng bên phải của `n` thành `0`.
*   **Ứng dụng:** Đếm số lượng bit 1 trong một số (Hamming Weight - LC 191) chỉ mất số bước bằng đúng số bit 1, thay vì phải duyệt qua cả 32 bit!
*   **Kiểm tra số có phải lũy thừa của 2 (Power of Two - LC 231):**
    ```ts
    const isPowerOfTwo = (n: number): boolean => n > 0 && (n & (n - 1)) === 0;
    ```

### 2. `n & -n`: Trích xuất bit 1 thấp nhất (Isolate Lowest Set Bit)
*   **Bản chất:** Trong biểu diễn bù hai (Two's Complement), `-n = ~n + 1`.
*   Phép toán `n & -n` sẽ triệt tiêu mọi bit, chỉ giữ lại duy nhất bit `1` ngoài cùng bên phải.
*   **Ứng dụng:** Cài đặt cây Fenwick / Binary Indexed Tree (BIT) hoặc giải bài toán Single Number III (LC 260).

### 3. `(n & 1) === 1`: Kiểm tra số chẵn/lẻ nhanh hơn `% 2`
*   Bit cuối cùng bằng `1` $\rightarrow$ Số lẻ.
*   Bit cuối cùng bằng `0` $\rightarrow$ Số chẵn.

### 4. `(n >> k) & 1`: Kiểm tra xem bit thứ $k$ có được bật hay không
*   Dịch bit thứ $k$ về vị trí số 0 rồi AND với 1. Nếu kết quả là `1` nghĩa là bit đó đang ON.

### 5. `n | (1 << k)`: Bật bit thứ $k$ lên 1 (Set bit)
*   Tạo mặt nạ `1 << k` rồi OR với `n`.

### 6. `n & ~(1 << k)`: Tắt bit thứ $k$ về 0 (Clear bit)
*   Tạo mặt nạ phủ định `~(1 << k)` rồi AND với `n`.

### 7. `n ^ (1 << k)`: Đảo trạng thái bit thứ $k$ (Toggle bit)
*   Nếu đang `1` thì về `0`, nếu đang `0` thì lên `1`.

---

## 5. CẠM BẪY TỬ THẦN & KINH NGHIỆM THỰC CHIẾN

### ⚠️ Bẫy 1: Độ ưu tiên toán tử trong JavaScript (Operator Precedence)
*   **Sai lầm:** Gõ `if (n & 1 === 1)` hoặc `if (n & (n - 1) === 0)`.
*   Toán tử so sánh `===` có độ ưu tiên **cao hơn** toán tử bitwise `&`!
*   Biểu thức `n & 1 === 1` sẽ bị tính thành `n & (1 === 1)` $\rightarrow$ `n & true` $\rightarrow$ `n & 1` (trả về số chứ không phải boolean mong muốn).
*   **Cách né:** LUÔN LUÔN bọc ngoặc tròn phép toán bitwise:
    ```ts
    if ((n & 1) === 1) { ... }
    if ((n & (n - 1)) === 0) { ... }
    ```

### ⚠️ Bẫy 2: Tràn số khi dịch bit quá 31 vị trí
*   Trong JS, toán tử `<< 32` không tạo ra số lớn hơn mà quay vòng lại `<< 0` (vì chỉ lấy 5 bit cuối của số dịch).
*   Không bao giờ dùng toán tử bitwise thông thường cho số lớn hơn $2^{31} - 1$ hoặc số âm khi cần thao tác dữ liệu 64-bit (hãy dùng `BigInt` nếu cần).

---

## 6. TỔNG KẾT BÀI TOÁN TIÊU BIỂU

| Bài toán | Kỹ thuật Bitwise | Time Complexity | Space Complexity |
|---|---|---|---|
| **LC 136: Single Number** | XOR tích lũy `result ^= num` | $O(N)$ | $O(1)$ |
| **LC 191: Number of 1 Bits** | Brian Kernighan `n &= (n - 1)` | $O(\text{set bits}) \le 32$ | $O(1)$ |
| **LC 231: Power of Two** | Feasibility check `n > 0 && (n & (n - 1)) === 0` | $O(1)$ | $O(1)$ |
| **LC 268: Missing Number** | XOR toàn bộ index và giá trị | $O(N)$ | $O(1)$ |
