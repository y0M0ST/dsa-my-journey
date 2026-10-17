# BÍ KÍP VÕ CÔNG: TREE BFS & DFS (CÂY NHỊ PHÂN & DUYỆT TẦNG)

> **Khẩu quyết:** Cây (Tree) thực chất là một đồ thị đặc biệt: liên thông, không chu trình (Acyclic Connected Graph), có đúng một gốc (Root) và mỗi node con chỉ có duy nhất một cha. Làm chủ Cây Nhị Phân không phải là học vẹt đệ quy, mà là thấu suốt hai dòng tư tưởng võ học tối thượng: **DFS (Lặn sâu tận cùng với Call Stack)** và **BFS (Quét phẳng từng tầng với Hàng đợi FIFO Queue)**. Đặc biệt trong JavaScript/TypeScript, phải luôn khắc cốt ghi tâm: **`Array.prototype.shift()` là $O(N)$**, chớ để V8 Engine biến thuật toán $O(N)$ thành $O(N^2)$!

---

## 1. BẢN CHẤT CƠ CHẾ BỘ NHỚ: CÂY TRÊN HEAP VS CONTIGUOUS ARRAY

Trong bộ nhớ máy tính, Cây Nhị Phân (Binary Tree) thường được biểu diễn theo 2 hình thái khác nhau tùy theo bài toán:

```
[1. Pointer-based Node (Linked Tree trên Heap - Đa số bài LeetCode)]
RAM Heap:
Node(3) [val: 3 | left: 0x200 | right: 0x500]
           │                    │
           ▼                    ▼
   Node(9) [0x200]       Node(20) [0x500 | left: 0x600 | right: 0x800]
                            │                     │
                            ▼                     ▼
                     Node(15) [0x600]      Node(7) [0x800]

└──► Ưu điểm: Cấu trúc linh hoạt, thêm/xóa nhánh O(1) không cần dời bộ nhớ.
└──► Nhược điểm: "Pointer Chasing" gây cache miss CPU thường xuyên vì các node nằm rải rác trên RAM.
```

```
[2. Array-based Representation (Flat Array - Dùng cho Binary Heap / Complete Tree)]
Mảng: [3,  9, 20, null, null, 15, 7]
Index:  0   1   2    3     4   5  6
└──► Node cha tại chỉ số i:
     - Con trái:  left  = 2 * i + 1
     - Con phải:  right = 2 * i + 2
     - Node cha:  parent = Math.floor((i - 1) / 2)
└──► Tận dụng triệt để CPU L1/L2 Cache Locality, nhưng chỉ tối ưu cho Cây Đầy Đủ (Complete Binary Tree).
```

| Tiêu chí so sánh | Pointer-based Tree (`TreeNode`) | Array-based Tree (Mảng phẳng) |
|---|---|---|
| **Vị trí lưu trữ** | Phân tán ngẫu nhiên trên Heap | Liền kề trên bộ nhớ (Contiguous RAM) |
| **Chi phí bộ nhớ** | Tốn thêm 2 con trỏ `left`, `right` mỗi node | Tiết kiệm nếu cây đầy; lãng phí nếu cây lệch (Skewed) |
| **CPU Cache Locality** | Kém (nhiều Cache Miss) | Cực cao (Spatial Locality) |
| **Thao tác cấu trúc** | Thay đổi nhánh cực nhanh $O(1)$ | Khó thay đổi hình dạng cây linh hoạt |

---

## 2. BẢN ĐỒ VÕ HỌC: PHÂN TÁCH DFS VS BFS

```
                       CÁC PHƯƠNG PHÁP DUYỆT CÂY
                                   │
         ┌─────────────────────────┴─────────────────────────┐
         ▼                                                   ▼
     [CHIỀU SÂU: DFS]                                    [CHIỀU RỘNG: BFS]
 (Dùng Call Stack / Đệ quy)                            (Dùng Hàng đợi Queue)
         │                                                   │
 ┌───────┼───────┐                                           ▼
 ▼       ▼       ▼                                   Level Order (Từng tầng)
Pre     In     Post                                  (LC 102, LC 103, LC 199)
order   order  order
```

### 1. DFS (Depth-First Search - Duyệt ưu tiên chiều sâu)
- **Tư tưởng:** Đi theo một nhánh cho tới khi chạm đáy lá (`null`), sau đó mới quay lui (Backtrack) để duyệt các nhánh khác.
- **3 Biến thể kinh điển:**
  1. **Pre-order (Root $\rightarrow$ Left $\rightarrow$ Right):** Xử lý node cha trước rồi mới truyền context xuống con (dùng cho Serialize cây, clone cây).
  2. **In-order (Left $\rightarrow$ Root $\rightarrow$ Right):** Rất đặc biệt trên BST (Binary Search Tree) vì luôn xuất ra chuỗi giá trị **tăng dần có thứ tự**!
  3. **Post-order (Left $\rightarrow$ Right $\rightarrow$ Root):** Bottom-up (từ dưới lên), gom kết quả từ 2 cây con để tính toán cho node cha (tính chiều cao cây LC 104, tính Max Path Sum LC 124, tìm LCA LC 236).

### 2. BFS (Breadth-First Search - Duyệt ưu tiên chiều rộng)
- **Tư tưởng:** Quét hết tất cả các node ở tầng $K$ trước khi bước xuống tầng $K+1$.
- **Cấu trúc dữ liệu:** Sử dụng **Hàng đợi (FIFO Queue)**.
- **Ứng dụng:** Level Order Traversal, tìm khoảng cách ngắn nhất từ gốc tới một node, in góc nhìn của cây từ các phía (Right Side View LC 199).

---

## 3. CẠM BẪY CHÍ MẠNG TRONG JS/TS: `queue.shift()` LÀ $O(N)$!

Trong các ngôn ngữ như Java (`ArrayDeque`), C++ (`std::queue`), Python (`collections.deque`), thao tác lấy phần tử ở đầu hàng đợi (`popleft()`) tốn **$O(1)$**.

Tuy nhiên, trong JavaScript / TypeScript:
```typescript
const queue = [root];
const node = queue.shift(); // ⚠️ NGUY HIỂM: V8 Engine phải dịch chuyển toàn bộ N phần tử còn lại sang trái!
```
- Khi cây có $N = 100,000$ nodes, việc gọi `queue.shift()` $N$ lần sẽ biến độ phức tạp thời gian từ **$O(N)$ thành $O(N^2)$**!
- **Giải pháp tối ưu hóa:** Dùng **Con trỏ chỉ số `head`** (Index Pointer) hoặc Queue danh sách liên kết.
```typescript
const queue: TreeNode[] = [root];
let head = 0;
while (head < queue.length) {
    const node = queue[head++]; // O(1) tuyệt đối!
}
```

---

## 4. TEMPLATE THẦN THÁNH THI ĐẤU (THE SACRED TEMPLATES)

### Template 1: BFS Level-by-Level Batching (Vũ khí giải LC 102)

*Khẩu quyết:* Tại mỗi tầng, cố định kích thước hàng đợi bằng `const levelSize = queue.length - head` (hoặc `queue.length` nếu dùng array snapshot), sau đó lặp đúng `levelSize` lần để bóc tách trọn vẹn một tầng.

```typescript
function levelOrderBFS(root: TreeNode | null): number[][] {
    if (root === null) return [];

    const result: number[][] = [];
    const queue: TreeNode[] = [root];
    let head = 0;

    while (head < queue.length) {
        const levelSize = queue.length - head; // Số node thuộc tầng hiện tại
        const currentLevel: number[] = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue[head++];
            currentLevel.push(node.val);

            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
        }

        result.push(currentLevel);
    }

    return result;
}
```

### Template 2: DFS Đệ Quy Có Chỉ Số Tầng (`level` / `depth`)

Nhiều người nghĩ LC 102 (Level Order Traversal) chỉ giải được bằng BFS, nhưng thực chất **DFS đệ quy kèm tham số `level`** cực kỳ thanh lịch và đạt hiệu năng rất cao!

```typescript
function levelOrderDFS(root: TreeNode | null): number[][] {
    const result: number[][] = [];

    function traverse(node: TreeNode | null, level: number): void {
        if (node === null) return;

        // Nếu lần đầu tiên chạm tới độ sâu này, tạo bucket mảng rỗng cho tầng đó
        if (result.length === level) {
            result.push([]);
        }

        // Đẩy giá trị vào đúng tầng tương ứng
        result[level].push(node.val);

        // Duyệt con trái trước rồi tới con phải để đảm bảo thứ tự từ trái sang phải
        traverse(node.left, level + 1);
        traverse(node.right, level + 1);
    }

    traverse(root, 0);
    return result;
}
```

---

## 5. BẢNG SO SÁNH TRADE-OFF GIỮA BFS VÀ DFS (LC 102)

| Tiêu chí | BFS (Hàng đợi Level-by-Level) | DFS (Đệ quy với `level`) |
|---|---|---|
| **Cấu trúc phụ trợ** | FIFO Queue (Bộ nhớ Heap) | Call Stack (Bộ nhớ Stack hệ thống) |
| **Time Complexity** | $O(N)$ (Mỗi node duyệt đúng 1 lần) | $O(N)$ (Mỗi node duyệt đúng 1 lần) |
| **Space Worst-case (Cây cân bằng hoàn hảo)** | **$O(W) = O(N/2) = O(N)$** (Tầng đáy chứa $N/2$ nodes) | **$O(H) = O(\log N)$** (Chiều cao cây nhỏ nhất) |
| **Space Worst-case (Cây lệch một bên - Skewed)** | **$O(1)$** (Mỗi tầng chỉ có 1 node) | **$O(N)$** (Độ sâu đệ quy chạm tới $N$ frame) |
| **Trực quan tư duy** | Tư duy tự nhiên theo từng tầng | Đơn giản, code ngắn gọn, không cần xử lý hàng đợi |

---

## 6. BÀI TOÁN THỰC CHIẾN MẪU: LEETCODE 102

- **Đề bài:** Cho con trỏ `root` của cây nhị phân, trả về thứ tự duyệt các node theo từng tầng từ trái sang phải (Level Order Traversal).
- **Ví dụ:** Input `root = [3, 9, 20, null, null, 15, 7]` $\rightarrow$ Output `[[3], [9, 20], [15, 7]]`.
- **Chiến lược tối ưu:**
  1. Kiểm tra Early Exit nếu `root === null` $\rightarrow$ Trả về `[]`.
  2. Triển khai cả 2 phương pháp: BFS (Queue với index pointer $O(1)$) và DFS (Pre-order kèm tham số tầng).
  3. Cả 2 cách đều đạt điểm số tối đa $0\text{ms}$ trên LeetCode!
