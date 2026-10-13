# BÍ KÍP VÕ CÔNG: LINKED LIST (DANH SÁCH LIÊN KẾT)

> **Khẩu quyết:** Linked List không lưu trữ liên tục trên thanh RAM như Contiguous Array, mà là các mắt xích độc lập được nối với nhau qua con trỏ `next` (và `prev`). Làm chủ Linked List không phải là nhớ thuộc lòng cú pháp, mà là nghệ thuật **"Bảo toàn mắt xích"**, **"Vũ điệu chuyển dời con trỏ"** và **"Bảo bối Dummy Node"** để triệt tiêu mọi edge case rỗng đầu!

---

## 1. BẢN CHẤT CƠ CHẾ BỘ NHỚ: ARRAY VS LINKED LIST

Hiểu sâu sự khác biệt trong kiến trúc phần cứng là nền tảng số 1 để trả lời phỏng vấn Big Tech (Meta, Google):

```
[Contiguous Array]
RAM: [ 0x100: A ][ 0x104: B ][ 0x108: C ][ 0x10C: D ]
     └──► Bộ nhớ liền kề: Truy xuất O(1) qua index = base + i * size
     └──► CPU L1/L2 Cache Prefetching cực tốt

[Singly Linked List]
RAM: [0x100: A | 0x850] ────► [0x850: B | 0x320] ────► [0x320: C | null]
     └──► Nằm rải rác trong Heap: Phải lần theo pointer O(N)
     └──► Cache miss thường xuyên hơn, nhưng chèn/xóa tại chỗ chỉ tốn O(1)
```

| Tiêu chí so sánh | Contiguous Array / Dynamic Array | Singly / Doubly Linked List |
|---|---|---|
| **Truy xuất ngẫu nhiên (Random Access)** | $O(1)$ qua chỉ số `arr[i]` | $O(N)$ (phải duyệt từ `head`) |
| **Chèn / Xóa ở đầu (Head)** | $O(N)$ (phải shift toàn bộ mảng) | **$O(1)$** (chỉ đổi con trỏ trỏ vào `head`) |
| **Chèn / Xóa ở cuối (Tail)** | $O(1)$ amortized (nếu còn dung lượng) | $O(1)$ nếu có con trỏ `tail`, $O(N)$ nếu không |
| **Chèn / Xóa ở giữa khi đã có con trỏ** | $O(N)$ (phải dồn mảng) | **$O(1)$** (chỉ đổi con trỏ liên kết) |
| **Chi phí bộ nhớ phụ (Overhead)** | Gần như $0$ (chỉ lưu dữ liệu thô) | Tốn thêm bộ nhớ lưu con trỏ tham chiếu (`next`, `prev`) |
| **Khả năng tận dụng CPU Cache** | **Cực cao** (Spatial Locality) | **Kém** (các node nằm phân tán trên Heap) |

---

## 2. 4 VŨ KHÍ TỐI THƯỢNG CỦA LINKED LIST

```
                   4 VŨ KHÍ LINKED LIST
                            │
   ┌────────────────┬───────┴────────┬────────────────┐
   ▼                ▼                ▼                ▼
[Vũ khí 1]       [Vũ khí 2]       [Vũ khí 3]       [Vũ khí 4]
Dummy Node     Rùa và Thỏ       In-place Reversal Runner (Lead K)
(Triệt tiêu    (Fast & Slow)    (Vũ điệu 3       (Xóa node thứ K
 edge case)     LC 141, 142, 876  con trỏ) LC 206  từ đuôi) LC 19
```

---

### Vũ khí 1: Dummy Head Node (Bảo bối triệt tiêu Edge Case)

*   **Vấn đề nhức nhối:** Khi thực hiện chèn hoặc xóa node ở đầu danh sách, con trỏ `head` có thể bị thay đổi hoặc trở thành `null`. Bạn sẽ phải viết hàng loạt câu lệnh `if (!head)`, `if (head === target)` rườm rà và rất dễ sót bug.
*   **Giải pháp:** Tạo một node bù nhìn (Dummy Node) đứng trước `head`. Dummy node đóng vai trò là một "mỏ neo" vĩnh viễn không bao giờ thay đổi.
*   **Template chuẩn:**
```typescript
function solve(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  dummy.next = head;
  let current = dummy;

  // Thao tác an toàn mà không sợ mất dấu head
  while (current.next !== null) {
    if (/* điều kiện cần xóa current.next */) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return dummy.next; // Trả về head thật sự mới
}
```
*   **Bài toán tiêu biểu:** LC 21 (Merge Two Sorted Lists), LC 19 (Remove Nth Node), LC 203 (Remove Elements), LC 83 (Remove Duplicates).

---

### Vũ khí 2: Rùa và Thỏ (Floyd’s Cycle-Finding Algorithm & Fast/Slow Pointers)

*   **Ý tưởng cốt lõi:** Cho 2 con trỏ cùng xuất phát. Con trỏ `slow` (Rùa) bước **1 bước** mỗi lượt, con trỏ `fast` (Thỏ) bước **2 bước** mỗi lượt (`fast = fast.next.next`).
*   **3 Ứng dụng thần thánh:**
    1.  **Phát hiện vòng lặp vô tận (Cycle Detection - LC 141):**
        - Nếu danh sách không có chu kỳ: `fast` sẽ chạm tới `null` trước $\rightarrow$ Dừng lại.
        - Nếu có chu kỳ: Khoảng cách giữa `fast` và `slow` thu hẹp 1 bước sau mỗi vòng lặp. `fast` chắc chắn sẽ đuổi kịp và đụng độ `slow` (`fast === slow`).
    2.  **Tìm điểm gãy chu kỳ (Detect Cycle Entrance - LC 142):**
        - Khi `fast` và `slow` đụng độ tại điểm $M$, đưa một con trỏ về lại `head`.
        - Cả hai con trỏ cùng bước đều **1 bước** mỗi lượt. Điểm gặp nhau tiếp theo chính là **cửa ngõ của chu kỳ**!
    3.  **Tìm trung điểm danh sách (Middle of Linked List - LC 876):**
        - Khi `fast` chạm tới cuối danh sách (`fast === null` hoặc `fast.next === null`), con trỏ `slow` đang đứng chính xác tại **điểm chính giữa** danh sách!
        - Bước đệm quan trọng cho bài toán Merge Sort Linked List (LC 148) và Kiểm tra Palindrome (LC 234).

---

### Vũ khí 3: Đảo ngược tại chỗ (In-Place Reversal - LC 206)

*   **Khẩu quyết 4 bước:** Không cấp phát node mới, chỉ bẻ ngược hướng mũi tên con trỏ `next`.
```typescript
let prev: ListNode | null = null;
let current: ListNode | null = head;

while (current !== null) {
  const nextTemp: ListNode | null = current.next; // [1] Giữ chặt mắt xích phía sau
  current.next = prev;                            // [2] Bẻ ngược mũi tên về phía trước
  prev = current;                                 // [3] Nhấc prev tiến lên
  current = nextTemp;                             // [4] Nhấc current tiến lên
}

return prev; // prev giờ chính là head mới của danh sách đã đảo ngược
```
*   **Minh họa chuyển trạng thái:**
```
Ban đầu:     null ◄── prev      [1] ──► [2] ──► [3] ──► null
                                 ▲
                              current
                                       nextTemp = current.next
Sau bước 1:  null ◄── [1]       [2] ──► [3] ──► null
                       ▲         ▲
                      prev    current
```

---

### Vũ khí 4: Runner Technique / Con trỏ so le (Khoảng cách K - LC 19)

*   **Vấn đề:** Tìm hoặc xóa node thứ $N$ tính từ đuôi danh sách mà chỉ được duyệt **duy nhất 1 lượt (One Pass)**.
*   **Chiến thuật:**
    1. Giữ khoảng cách: Đưa con trỏ `fast` chạy trước `n + 1` bước (kết hợp Dummy Node).
    2. Sau đó, cho cả `fast` và `slow` cùng chạy đều 1 bước mỗi lượt.
    3. Khi `fast` chạm tới cuối danh sách (`null`), con trỏ `slow` đang đứng ngay **trước** node cần xóa!
    4. Thao tác xóa: `slow.next = slow.next.next`.

---

## 3. CÁC CẠM BẪY TỬ THẦN & CÁCH NÉ

### ⚠️ Bẫy 1: Mất dấu mắt xích (Lost Pointer / Dangling Node)
*   **Sai lầm:** Gán ngay `current.next = something` trước khi lưu lại node phía sau. Toàn bộ danh sách phía sau bị cắt đứt vĩnh viễn và bị JavaScript Garbage Collector dọn sạch.
*   **Khắc phục:** **LUÔN LUÔN** tạo biến tạm lưu trước: `const nextTemp = current.next`.

### ⚠️ Bẫy 2: Lỗi Null Pointer (`Cannot read properties of null`)
*   **Sai lầm:** Gọi `fast.next.next` khi `fast.next` đã là `null`.
*   **Khắc phục:** Luôn kiểm tra điều kiện kép trong vòng lặp:
    `while (fast !== null && fast.next !== null)`

### ⚠️ Bẫy 3: Tạo vòng lặp vô tận ngoài ý muốn (Accidental Cycle)
*   **Sai lầm:** Khi đảo ngược hoặc sắp xếp danh sách, quên gán `node.next = null` cho node cuối cùng. Kết quả là danh sách tạo thành một vòng lặp vĩnh cửu dẫn tới Memory Leak hoặc Crash test runner.

---

## 4. BẢNG TỔNG KẾT CHEAT SHEET

| Bài toán | Kỹ thuật tối ưu | Time Complexity | Space Complexity |
|---|---|---|---|
| **LC 206: Reverse Linked List** | 3-pointer In-place Reversal | $O(N)$ | $O(1)$ |
| **LC 141: Linked List Cycle** | Floyd's Fast & Slow Pointers | $O(N)$ | $O(1)$ |
| **LC 142: Linked List Cycle II** | Floyd's Pointers + Reset Head | $O(N)$ | $O(1)$ |
| **LC 876: Middle of the Linked List** | Fast & Slow Pointers | $O(N)$ | $O(1)$ |
| **LC 21: Merge Two Sorted Lists** | Dummy Node + Two Pointers | $O(M + N)$ | $O(1)$ |
| **LC 19: Remove Nth Node From End** | Dummy Node + Fast Lead N Steps | $O(N)$ | $O(1)$ |
| **LC 234: Palindrome Linked List** | Find Mid + Reverse Half + Compare | $O(N)$ | $O(1)$ |
