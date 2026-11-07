# BÍ KÍP VÕ CÔNG: IMPLEMENTATION & ARRAY MANIPULATION

> **Khẩu quyết:** Kỹ thuật Implementation không đòi hỏi thuật toán cao siêu phức tạp như DP hay Graph, nhưng lại là thước đo chuẩn xác nhất về **sự cẩn trọng trong tư duy biên (Boundary Edge Cases)**, **kỹ năng tối ưu bộ nhớ cấp phát (Memory Allocation & Garbage Collection)**, và **tốc độ chuyển hóa ý tưởng thành mã sạch, bug-free**!

---

## 1. DẤU HIỆU NHẬN DIỆN & CÁC TRƯỜNG PHÁI

1. **Thao tác mảng tại chỗ (In-Place Array Simulation):** Biến đổi mảng, cộng dồn, nhân dồn mà không được cấp phát mảng phụ (LC 66, LC 238).
2. **Kỹ thuật Prefix & Suffix (Tiền tố & Hậu tố):** Tích lũy thông tin hai chiều để giải quyết bài toán mà không cần quay lui hay xét cặp phần tử $O(N^2)$.
3. **Mô phỏng chuỗi ký tự (String Prefix Shrinking):** Co hẹp tiền tố chung qua từng từ (LC 14).
4. **Mở rộng mảng & Toán tử Modulo:** Xử lý lặp tuần hoàn hoặc ghép đôi mảng (LC 1929).

---

## 2. BỘ SƯU TẬP BÀI TOÁN TIÊU BIỂU

| Bài toán | Kỹ thuật cốt lõi | Time Complexity | Space Complexity | Điểm nhấn phỏng vấn |
|---|---|---|---|---|
| **LC 1929: Concatenation of Array** | Modulo Trick `%` & Dynamic Push | $O(N)$ | $O(N)$ | 4 phương pháp: push, copy, fill, concat |
| **LC 14: Longest Common Prefix** | Horizontal Scanning | $O(S)$ | $O(1)$ | Thu hẹp chuỗi tiền tố bằng `indexOf` |
| **LC 66: Plus One** | Right-to-Left Carry Propagation | $O(N)$ | $O(1)$ | Khử `unshift` bằng cấp phát mảng mới khi toàn số 9 |
| **LC 238: Product of Array Except Self** | Prefix & Rolling Suffix | $O(N)$ | $O(1)$ aux | Cấm phép chia `/`, nhân dồn 2 lượt trên mảng output |

---

## 3. CHI TIẾT BÀI TOÁN THỰC CHIẾN

### LeetCode 238 - Product of Array Except Self (Medium - Tích Mảng Trừ Bản Thân)
- **Đề bài:** Cho mảng `nums`, trả về mảng `output` sao cho `output[i]` bằng tích của tất cả các phần tử trong `nums` ngoại trừ `nums[i]`. CẤM dùng phép chia `/`.
- **Bản chất toán học:**
  $$\text{output}[i] = \prod_{j=0}^{i-1} \text{nums}[j] \times \prod_{j=i+1}^{n-1} \text{nums}[j] = \text{Prefix}[i] \times \text{Suffix}[i]$$
- **Chiến lược tối ưu bộ nhớ:**
  1. *Lượt 1 (Trái sang phải):* Ghi trực tiếp tích tiền tố vào mảng `result`.
  2. *Lượt 2 (Phải sang trái):* Dùng 1 biến `suffix = 1` duy nhất, nhân dồn vào `result[i]`.
  3. Xử lý chuẩn hóa $-0$ thành $0$ trong JS IEEE 754.
- **Kết quả:** Đạt $0\text{ms}$ (Beats 100.00%) trên LeetCode!
