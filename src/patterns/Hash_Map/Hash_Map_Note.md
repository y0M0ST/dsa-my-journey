# BÍ KÍP VÕ CÔNG: HASH MAP / HASH TABLE (BẢNG BĂM)

> **Khẩu quyết:** Khi bài toán rơi vào bế tắc với độ phức tạp $O(N^2)$ vì phải liên tục tìm kiếm lùi, hãy nhớ đến định luật tối thượng: **"Đổi không gian lấy thời gian (Trade Space for Time)"**. Dùng thêm $O(N)$ bộ nhớ để đưa tốc độ tra cứu về $O(1)$ tức thì!

---

## 1. DẤU HIỆU NHẬN DIỆN (KHI NÀO NÊN NGHĨ ĐẾN HASH MAP?)

Nếu đề bài có một trong 4 yêu cầu sau, Hash Map / Hash Set là vũ khí số 1:
1. **Tra cứu tức thì $O(1)$ (Instant Lookup):** Cần kiểm tra xem một giá trị đã từng xuất hiện trước đó hay chưa.
2. **Tìm phần bù tương ứng (Complement Search):** Cần tìm 2 số sao cho $a + b = \text{target} \Leftrightarrow b = \text{target} - a$ (LC 1 Two Sum).
3. **Đếm tần suất xuất hiện (Frequency Counting):** Đếm số lần xuất hiện của các phần tử / ký tự để tìm mode, kiểm tra anagram, tìm ký tự không trùng lặp.
4. **Gom nhóm theo đặc trưng (Grouping / Categorization):** Gom các từ có cùng tập ký tự lại với nhau (Group Anagrams - LC 49) bằng cách dùng chuỗi đã sắp xếp làm Hash Key.
5. **Duyệt một lượt (One-Pass Processing):** Vừa duyệt mảng vừa tra cứu lịch sử trong quá khứ mà không cần duyệt lặp 2 vòng `for`.

---

## 2. BẢN CHẤT CƠ CHẾ HOẠT ĐỘNG (HASHING MECHANICS)

```
[Key] ──► [Hash Function] ──► [Hash Code % Buckets] ──► [Array Index / Bucket]
                                                            ├── [Node 1: K, V]
                                                            └── [Node 2: K, V] (Chaining)
```

1. **Hash Function (Hàm băm):** Biến đổi một Key bất kỳ (chuỗi, số, object) thành một số nguyên (Hash Code).
2. **Bucket Index:** Ánh xạ Hash Code vào mảng nội bộ: $\text{Index} = \text{HashCode} \pmod{\text{Capacity}}$.
3. **Xung đột băm (Hash Collision):** Hai key khác nhau nhưng ra cùng một bucket index.
   - **Separate Chaining (Phổ biến nhất):** Mỗi bucket là một Danh sách liên kết (Linked List) hoặc Cây đỏ đen (Red-Black Tree khi số phần tử $> 8$ như trong Java).
   - **Open Addressing (Linear/Quadratic Probing):** Khi đụng độ thì nhảy sang ô trống tiếp theo trong mảng.
4. **Load Factor & Rehashing:**
   - $\text{Load Factor} = \frac{\text{Số phần tử}}{\text{Số lượng bucket}}$. Mặc định thường là $0.75$.
   - Khi vượt ngưỡng, cấu trúc sẽ tự động nhân đôi kích thước mảng ($2 \times \text{Capacity}$) và băm lại toàn bộ phần tử (Rehash tốn $O(N)$ nhưng xảy ra rất hiếm $\rightarrow$ Amortized $O(1)$).

---

## 3. 4 PATTERN KINH ĐIỂN VỚI HASH MAP

```
                     4 PATTERN HASH MAP
                             │
  ┌──────────────────┬───────┴──────────┬──────────────────┐
  ▼                  ▼                  ▼                  ▼
[Pattern 1]        [Pattern 2]        [Pattern 3]        [Pattern 4]
Complement Lookup  Frequency Counter  Anagram Grouping   Prefix Sum + Map
(Tìm phần bù bù trừ) (Đếm tần suất)     (Gom nhóm qua Key) (Tổng mảng con)
  LC 1 (Two Sum)    LC 387, LC 347      LC 49             LC 560
```

### Pattern 1: Tìm phần bù bù trừ (Complement Lookup - LC 1)
*   **Chiến thuật:** Thay vì dùng 2 vòng `for` lồng nhau để tìm cặp số có tổng bằng `target` tốn $O(N^2)$:
*   Khi duyệt đến phần tử `num = nums[i]`, ta tính phần bù còn thiếu: `complement = target - num`.
*   Kiểm tra nếu `map.has(complement)` $\rightarrow$ Trả về `[map.get(complement), i]`.
*   Nếu chưa có $\rightarrow$ Lưu `map.set(num, i)` để phục vụ cho các phần tử phía sau!
*   **Time:** $O(N)$ | **Space:** $O(N)$.

### Pattern 2: Bảng đếm tần suất (Frequency Counter / Histogram)
*   Tạo `map = new Map<Element, number>()` để lưu `{ giá trị: số lần xuất hiện }`.
*   *Lưu ý tối ưu trong JS:* Nếu tập ký tự là cố định (ví dụ 26 chữ cái thường hoặc ASCII 128), hãy thay thế `Map` bằng `Int32Array(26)` hoặc `Int32Array(128)`. Mảng tĩnh giúp truy xuất trực tiếp ô nhớ trong CPU Cache, nhanh hơn `Map` gấp nhiều lần và không bị overhead bộ nhớ!

### Pattern 3: Chuẩn hóa Key để gom nhóm (Canonical Key Grouping - LC 49)
*   Để nhóm các từ đảo chữ (Anagrams) lại với nhau (ví dụ `"eat"`, `"tea"`, `"ate"`):
*   Biến đổi từ đó thành một chuỗi đại diện duy nhất (Canonical Key), ví dụ: `key = word.split('').sort().join('')` hoặc đếm chuỗi tần suất `"1#0#0#...#1"`.
*   Lưu vào `Map<string, string[]>` với `key` làm nhóm cha.

---

### 5. CHI TIẾT BÀI TOÁN THỰC CHIẾN

#### LeetCode 49 - Group Anagrams (Medium - Gom Nhóm Các Từ Đảo Ngữ)
- **Đề bài:** Cho một mảng các chuỗi `strs`, hãy gom các chuỗi là anagram của nhau lại thành từng nhóm.
- **Bản chất toán học:** Quan hệ tương đương (Equivalence Relation) phân hoạch tập $N$ chuỗi thành các lớp tương đương rời nhau.
- **So sánh 3 trường phái sinh Canonical Key:**
  1. **Canonical Sort Key (`word.split('').sort().join('')`):**
     - Đơn giản, trực quan.
     - Time: $O(N \cdot K \log K)$, Space: $O(N \cdot K)$.
  2. **Frequency Count Key with Delimiters (`Int32Array(26)` + `#c0#c1...`):**
     - Đạt độ phức tạp tuyến tính lý thuyết $O(N \cdot K)$.
     - Tránh bẫy Delimiter Trap: Phải dùng `#` phân tách số đếm.
  3. **Prime Factorization BigInt Hashing (Gödel Numbering):**
     - Gán 26 chữ cái với 26 số nguyên tố đầu tiên $[2, 3, 5, ..., 101]$.
     - Tích các số nguyên tố là duy nhất (Định lý cơ bản của số học).
     - Không cấp phát chuỗi (Zero string allocation), tra cứu qua `Map<bigint, string[]>`.
- **Kết quả:** Đạt $0\text{ms}$ (Beats 100.00%) trên LeetCode!

### Pattern 4: Prefix Sum + Hash Map (LC 560 - Subarray Sum Equals K)
*   **Khẩu quyết:** Tổng đoạn con từ `i` đến `j` bằng $\text{PrefixSum}[j] - \text{PrefixSum}[i - 1]$.
*   Để đoạn con có tổng bằng $K$, ta cần: $\text{PrefixSum}[j] - \text{PrefixSum}[i - 1] = K \Leftrightarrow \text{PrefixSum}[i - 1] = \text{PrefixSum}[j] - K$.
*   Dùng Hash Map lưu tần suất của các giá trị `prefixSum` đã qua. Mỗi bước duyệt $j$, chỉ cần kiểm tra xem `prefixSum - K` đã xuất hiện bao nhiêu lần!
*   Đây là bí thuật giải quyết bài toán mảng con có tổng bằng $K$ ngay cả khi mảng chứa **số âm** (nơi Sliding Window hoàn toàn bất lực).

---

## 4. CÁC CẠM BẪY TỬ THẦN & KINH NGHIỆM THỰC CHIẾN

### ⚠️ Bẫy 1: Phân biệt `Map` và Object thông thường `{}` trong JS/TS
*   **Object `{}`:**
    - Key chỉ có thể là `string` hoặc `Symbol`. Nếu đưa số hoặc object vào, nó sẽ bị ép kiểu sang string (ví dụ `{[1, 2]: true}` thành `{"1,2": true}`).
    - Có sẵn các thuộc tính prototype (`toString`, `valueOf`) dễ gây nhầm lẫn.
*   **ES6 `Map`:**
    - Key có thể là bất kỳ kiểu dữ liệu nào (number, object, function).
    - Giữ nguyên thứ tự chèn (Insertion order).
    - Có thuộc tính `.size` chuẩn xác và các phương thức `.has()`, `.get()`, `.set()`, `.delete()`.
*   **Quy tắc vàng:** Trong giải thuật LeetCode, LUÔN dùng `new Map()` hoặc TypedArray `Int32Array`, tránh dùng raw object `{}` để làm Hash Map.

### ⚠️ Bẫy 2: Object Key Equality (Tham chiếu vs Giá trị)
*   Trong JS `Map`, hai object có cùng nội dung nhưng khác địa chỉ vùng nhớ thì vẫn là **hai key hoàn toàn khác nhau**:
    ```ts
    const map = new Map();
    map.set([1, 2], "value");
    map.has([1, 2]); // FALSE! Vì 2 mảng là 2 reference khác nhau trong bộ nhớ Heap.
    ```
*   **Cách giải quyết:** Hãy serialize object/array thành chuỗi primitive (ví dụ `JSON.stringify()` hoặc `${x},${y}`) trước khi làm Key trong Map.

---

## 5. TỔNG KẾT BÀI TOÁN TIÊU BIỂU

| Bài toán | Kỹ thuật sử dụng | Time Complexity | Space Complexity | Điểm lưu ý |
|---|---|---|---|---|
| **LC 1: Two Sum** | Complement Lookup | $O(N)$ | $O(N)$ | Một vòng lặp, vừa tra vừa ghi |
| **LC 242: Valid Anagram** | Frequency Array `Int32Array(26)` | $O(N)$ | $O(1)$ | Đếm ký tự cộng dồn rồi trừ đi |
| **LC 49: Group Anagrams** | Canonical Sort Key + Map | $O(N \cdot K \log K)$ | $O(N \cdot K)$ | Sort từng từ làm Key gom nhóm |
| **LC 560: Subarray Sum = K** | Prefix Sum + Frequency Map | $O(N)$ | $O(N)$ | Khởi tạo `map.set(0, 1)` cho trường hợp bắt đầu từ index 0 |

---

## 6. CHI TIẾT BÀI TOÁN THỰC CHIẾN

### LeetCode 242 - Valid Anagram (Easy - Kiểm Tra Từ Đảo Chữ)
- **Đề bài:** Cho hai chuỗi `s` và `t`, kiểm tra xem `t` có phải là một anagram của `s` hay không.
- **Kỹ thuật tối ưu:**
  1. **Int32Array(26) Frequency Buffer:** Thay thế Map bằng TypedArray tĩnh, giảm thiểu chi phí GC và tận dụng CPU Cache.
  2. **Single-pass Cancellation:** Cộng dồn tần suất với `s`, trừ dần với `t`. Ngắt sớm ngay khi tần suất ký tự bị âm (< 0).
  3. **Hỗ trợ Unicode:** Sử dụng `Map<string, number>` khi đề bài mở rộng cho mọi ký tự Unicode toàn cầu.
- **Kết quả:** Đạt $0\text{ms}$ (Beats 100.00%) trên LeetCode!
