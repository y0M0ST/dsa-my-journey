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
        const currentLevel: number[] = new Array(levelSize);

        for (let i = 0; i < levelSize; i++) {
            const node = queue[head++]!;
            currentLevel[i] = node.val;

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

        result[level]!.push(node.val);

        // Duyệt con trái trước rồi tới con phải để đảm bảo thứ tự từ trái sang phải
        traverse(node.left, level + 1);
        traverse(node.right, level + 1);
    }

    traverse(root, 0);
    return result;
}
```

### Template 3: DFS Post-order Bottom-up (Vũ khí tính Chiều cao & Độ sâu LC 104)

*Khẩu quyết:* Bài toán tính chiều cao cây bản chất là Divide & Conquer. Độ sâu của cây con tại `node` phụ thuộc vào kết quả trả về từ 2 con của nó: `1 + Math.max(leftDepth, rightDepth)`.

```typescript
function maxDepthDFS(root: TreeNode | null): number {
    if (root === null) return 0;
    // Tối ưu Early Exit: Nếu là leaf node, trả về 1 ngay để bớt 2 frame đệ quy vô ích
    if (root.left === null && root.right === null) return 1;

    const left = maxDepthDFS(root.left);
    const right = maxDepthDFS(root.right);

    return 1 + Math.max(left, right);
}
```

### Template 4: DFS Khử Đệ Quy Bằng Explicit Stack (Khắc chế Call Stack Overflow)

*Khẩu quyết:* Khi cây lệch quá sâu ($H > 10,000$), Call Stack của V8 sẽ văng lỗi `RangeError: Maximum call stack size exceeded`. Đẩy stack ra ngoài bộ nhớ Heap bằng mảng tuần tự lưu cặp `[node, depth]` để đảm bảo an toàn tuyệt đối.

```typescript
function maxDepthIterativeDFS(root: TreeNode | null): number {
    if (root === null) return 0;

    let maxDepth = 0;
    const stack: [TreeNode, number][] = [[root, 1]];

    while (stack.length > 0) {
        const [node, currentDepth] = stack.pop()!;

        if (currentDepth > maxDepth) maxDepth = currentDepth;

        if (node.left !== null) stack.push([node.left, currentDepth + 1]);
        if (node.right !== null) stack.push([node.right, currentDepth + 1]);
    }

    return maxDepth;
}
```

---

## 5. BẢNG SO SÁNH TOÀN DIỆN CÁC PHƯƠNG PHÁP DUYỆT CÂY

| Tiêu chí | DFS Đệ Quy Post-order | BFS Quét Tầng (Head Pointer) | DFS Khử Đệ Quy (Explicit Stack) |
|---|---|---|---|
| **Cấu trúc lưu trữ** | Call Stack (Hệ thống) | FIFO Queue (Vùng Heap) | LIFO Stack (Vùng Heap) |
| **Time Complexity** | $O(N)$ | $O(N)$ | $O(N)$ |
| **Space (Cây cân bằng hoàn hảo)** | **$O(\log N)$** (Tối ưu nhất) | **$O(N/2) = O(N)$** (Tầng lá đáy) | **$O(\log N)$** |
| **Space (Cây lệch thẳng hàng)** | $O(N)$ (Nguy cơ tràn Call Stack) | **$O(1)$** (Mỗi tầng chỉ 1 node) | $O(N)$ (An toàn trên Heap) |
| **Tối ưu V8 Engine** | Dễ văng RangeError nếu $H > 10^4$ | Dùng `head` pointer tránh $O(N)$ `shift` | Tránh tràn Stack, chủ động bộ nhớ |

---

## 6. BÀI TOÁN THỰC CHIẾN MẪU

### 6.1. LeetCode 102 - Binary Tree Level Order Traversal (Medium)
- **Đề bài:** Cho con trỏ `root` của cây nhị phân, trả về thứ tự duyệt các node theo từng tầng từ trái sang phải.
- **Ví dụ:** Input `root = [3, 9, 20, null, null, 15, 7]` $\rightarrow$ Output `[[3], [9, 20], [15, 7]]`.
- **Chiến lược tối ưu:**
  1. Kiểm tra Early Exit nếu `root === null` $\rightarrow$ Trả về `[]`.
  2. Triển khai cả 2 phương pháp: BFS (Queue với index pointer $O(1)$) và DFS (Pre-order kèm tham số tầng).
  3. Cả 2 cách đều đạt điểm số tối đa $0\text{ms}$ trên LeetCode!

### 6.2. LeetCode 104 - Maximum Depth of Binary Tree (Easy)
- **Đề bài:** Cho `root` của cây nhị phân, tìm độ sâu lớn nhất (số node trên đường đi dài nhất từ root tới node lá xa nhất).
- **Ví dụ:** Input `root = [3, 9, 20, null, null, 15, 7]` $\rightarrow$ Output `3`.
- **Chiến lược tối ưu 3 trường phái:**
  1. **DFS Đệ quy Post-order:** Tinh gọn nhất ($1 + \max(left, right)$). Thêm Leaf Early Exit giảm tới 50% số frame gọi hàm đệ quy.
  2. **BFS Từng tầng:** Đếm số tầng duyệt được bằng Queue tối ưu con trỏ `head`. Cực kỳ tiết kiệm bộ nhớ trên cây lệch ($O(1)$ space).
  3. **DFS Khử đệ quy:** Dùng Explicit Stack trên Heap, miễn nhiễm với lỗi `Maximum call stack size exceeded`.
### 6.3. LeetCode 226 - Invert Binary Tree (Easy)
- **Giai thoại kinh điển:** Max Howell (tác giả Homebrew) từng tweet:
  > *"Google: 90% of our engineers use the software you wrote (Homebrew), but you can't invert a binary tree on a whiteboard so fuck off."*
  Đây trở thành giai thoại "meme" nổi tiếng nhất lịch sử phỏng vấn Big Tech!
- **Đề bài:** Cho con trỏ `root` của cây nhị phân, đảo ngược cây (tạo ảnh phản chiếu gương mirror qua trục thẳng đứng) và trả về `root`.
- **Ví dụ trực quan:**
  ```
        4                    4
      /   \                /   \
     2     7      ==>     7     2
    / \   / \            / \   / \
   1   3 6   9          9   6 3   1
  ```
- **Bản chất toán học & cấu trúc dữ liệu:**
  - **Phép tự nghịch đảo (Involution):** $f(f(\text{Tree})) = \text{Tree}$. Đảo ngược 2 lần liên tiếp sẽ luôn đưa cây về trạng thái nguyên bản.
  - **In-place Pointer Swapping:** Không cấp phát thêm node mới, chỉ tráo đổi con trỏ địa chỉ `node.left` và `node.right`.
- **Chiến lược tối ưu 3 trường phái:**
  1. **DFS Đệ quy (Post-order / Pre-order):** Hoán đổi con trỏ `left` và `right`, sau đó đệ quy xuống 2 nhánh con.
     - *Tối ưu hóa Leaf Early Exit:* `if (root.left === null && root.right === null) return root;` giúp tiết kiệm ~50% số frame gọi hàm chạm đáy `null` trên cây nhị phân đầy đủ ($2 \times N/2 = N$ frames).
     - Time: $O(N)$, Space: $O(H)$.
  2. **BFS Quét từng tầng (Queue với Head Pointer):** Sử dụng hàng đợi FIFO và con trỏ `head` để triệt tiêu chi phí $O(N)$ của `shift()`.
     - Time: $O(N)$, Space: $O(W)$ (với cây lệch thẳng hàng chỉ tốn $O(1)$).
  3. **DFS Khử đệ quy (Explicit Stack):** Sử dụng Stack trên Heap, miễn nhiễm trước nguy cơ tràn Call Stack trong V8 Engine (`RangeError`).
     - Time: $O(N)$, Space: $O(H)$.
- **Kết quả:** Đạt $0\text{ms}$ (Beats 100.00%) trên LeetCode!

### 6.4. LeetCode 199 - Binary Tree Right Side View (Medium - Meta Favorite Topic)
- **Đề bài:** Cho `root` của cây nhị phân, tưởng tượng bạn đứng ở mép bên phải nhìn vào cây. Hãy trả về danh sách giá trị các node nhìn thấy được theo thứ tự từ trên xuống dưới.
- **Ví dụ trực quan:**
  ```
        1            <--- 1
      /   \
     2     3         <--- 3
      \     \
       5     4       <--- 4
  Output: [1, 3, 4]
  ```
- **Bẫy nhận thức phổ biến ("Right Child Shadow Trap"):**
  - **Sai lầm sơ đẳng:** Chỉ lần theo con trỏ `root = root.right`.
  - **Thực tế:** Nhánh trái có thể sâu hơn nhánh phải (vd: cây `[1, 2, 3, 4, null, null, null, 5]`). Khi nhánh phải cụt, các tầng sâu hơn của nhánh trái sẽ lộ ra trước tầm mắt!
- **Chiến lược tối ưu 3 trường phái:**
  1. **BFS Quét từng tầng (Queue với Head Pointer - Khuyên dùng trong phỏng vấn):**
     - Duyệt từng tầng theo chiều ngang. Với mỗi tầng có kích thước `levelSize`, node cuối cùng trong tầng chính là node nằm ở rìa ngoài cùng bên phải.
     - Dùng con trỏ `head` triệt tiêu chi phí $O(N)$ dời mảng của `shift()`.
     - Time: $O(N)$, Space: $O(W) \le O(N/2)$.
  2. **DFS Đệ quy đảo ngược (Reversed Pre-order Traversal: Root -> Right -> Left):**
     - Luôn thăm nhánh phải trước nhánh trái!
     - Duy trì biến `depth` (độ sâu hiện tại, bắt đầu từ 0).
     - Điều kiện bắt trúng node ngoài cùng: `if (depth === result.length) result.push(node.val);`.
     - Vì nhánh phải luôn được thăm trước, node đầu tiên chạm tới ở mỗi độ sâu `depth` chắc chắn là node ngoài cùng bên phải! Các node cùng tầng sau đó sẽ thấy `depth < result.length` nên bị bỏ qua.
     - Time: $O(N)$, Space: $O(H)$.
  3. **DFS Khử đệ quy bằng Explicit Stack (LIFO Heap Stack):**
     - Push `{ node, depth }` vào Stack trên Heap.
     - Để nhánh phải được pop ra xử lý trước, ta push nhánh trái trước rồi push nhánh phải sau.
     - Miễn nhiễm hoàn toàn với nguy cơ `RangeError: Maximum call stack size exceeded` trên V8 Engine.
     - Time: $O(N)$, Space: $O(H)$.
- **Kết quả:** Đạt $0\text{ms}$ (Beats 100.00%) trên LeetCode!

### 6.5. LeetCode 100 - Same Tree (Easy - Tính Đồng Nhất Cấu Trúc & Duyệt Song Song)
- **Đề bài:** Cho con trỏ `p` và `q` của hai cây nhị phân, kiểm tra xem hai cây này có hoàn toàn giống nhau hay không. Hai cây được coi là giống nhau khi chúng đồng nhất về cấu trúc hình học và tất cả các node tương ứng có cùng giá trị.
- **Ví dụ trực quan:**
  ```
       1         1
      / \       / \
     2   3     2   3
    [Tree p]  [Tree q]  ===> Output: true

       1         1
      /           \
     2             2
    [Tree p]  [Tree q]  ===> Output: false (Cấu trúc lệch nhau)
  ```
- **Bản chất toán học & Tính chất quan hệ tương đương:**
  - **Đồng nhất phản xạ (Reflexivity):** Một cây luôn bằng chính nó ($T \cong T$).
  - **Tối ưu hóa con trỏ cùng địa chỉ nhớ (Same Memory Reference Check):**
    ```typescript
    if (p === q) return true;
    ```
    Đây là một "micro-optimization" cực kỳ tinh tế: Nếu cả hai con trỏ trỏ tới cùng một địa chỉ trong vùng nhớ Heap (hoặc cả hai cùng là `null`), ta kết luận ngay `true` mà không cần duyệt thêm bất kỳ node con nào!
- **Chiến lược tối ưu 3 trường phái:**
  1. **DFS Đệ quy (Pre-order Traversal / Divide & Conquer):**
     - Kiểm tra node hiện tại trước: nếu cả hai cùng null -> `true`; nếu chỉ một bên null hoặc giá trị khác nhau -> `false`.
     - Tận dụng cơ chế Short-circuit Evaluation của toán tử `&&`: nếu nhánh trái khác nhau, nhánh phải sẽ không bao giờ bị duyệt!
     - Time: $O(\min(N, M))$, Space: $O(\min(H_p, H_q))$.
  2. **BFS Quét Tầng Đồng Bộ (Synchronous Level-Order with Head Pointer):**
     - Đưa từng cặp `[nodeP, nodeQ]` vào hàng đợi FIFO.
     - Sử dụng con trỏ `head` để đạt $O(1)$ dequeue, miễn nhiễm với chi phí $O(K)$ của `Array.prototype.shift()`.
     - Time: $O(\min(N, M))$, Space: $O(\min(W_p, W_q))$.
  3. **DFS Khử Đệ Quy (Explicit Heap Stack):**
     - Đưa việc duyệt cặp node sang LIFO Stack trên Heap, miễn nhiễm nguy cơ tràn Call Stack của V8 khi gặp cây suy biến lệch quá sâu.
     - Time: $O(\min(N, M))$, Space: $O(\min(H_p, H_q))$.
- **Kết quả:** Đạt $0\text{ms}$ (Beats 100.00%) trên LeetCode!

### 6.6. LeetCode 105 - Construct Binary Tree from Preorder and Inorder Traversal (Medium - Tái Dựng Cây Nhị Phân)
- **Đề bài:** Cho 2 mảng số nguyên `preorder` và `inorder` lần lượt là thứ tự duyệt Pre-order (Gốc -> Trái -> Phải) và In-order (Trái -> Gốc -> Phải) của cùng một cây nhị phân (các giá trị đều độc nhất). Hãy tái dựng và trả về node gốc của cây nhị phân đó.
- **Bản chất toán học & Cấu trúc ranh giới mảng:**
  ```
  Preorder: [ Root | <---- Nhánh Trái ----> | <---- Nhánh Phải ----> ]
  Inorder:  [ <---- Nhánh Trái ----> | Root | <---- Nhánh Phải ----> ]
                                       ▲
                                   inRootIdx
  ```
  - **Node gốc (Root):** Luôn luôn là phần tử đầu tiên của khoảng `preorder` con (`preorder[preStart]`).
  - **Ranh giới phân tách (Partition Barrier):** Tìm vị trí của `root.val` trong `inorder` tại chỉ số `inRootIdx`.
  - **Bất biến kích thước nhánh (Subtree Size Invariant):**
    - Số node nhánh con trái: $\text{leftSize} = \text{inRootIdx} - \text{inStart}$.
    - Nhánh trái:
      - Preorder: `[preStart + 1, preStart + leftSize]`
      - Inorder: `[inStart, inRootIdx - 1]`
    - Nhánh phải:
      - Preorder: `[preStart + leftSize + 1, preEnd]`
      - Inorder: `[inRootIdx + 1, inEnd]`
- **Cạm bẫy chí mạng trong phỏng vấn:**
  - ❌ **Cắt mảng bằng `slice()` hoặc tìm bằng `indexOf()`:**
    - Mỗi tầng đệ quy gọi `slice()` và `indexOf()` tốn $O(N)$.
    - Khi cây suy biến lệch một phía (Skewed Tree chiều cao $N$), độ phức tạp thời gian bị đội lên $O(N^2)$ và không gian bộ nhớ tốn thêm $O(N^2)$!
  - ✅ **Giải pháp tối ưu chuẩn Big Tech:**
    - Tiền xử lý tạo Hash Map `inorderMap` lưu `{ value => index }` trong $O(N)$.
    - Truyền 4 con trỏ chỉ số `(preStart, preEnd, inStart, inEnd)` giúp mỗi bước phân rã đạt $O(1)$.
- **Chiến lược tối ưu 4 trường phái:**
  1. **Chia để trị (Divide & Conquer) kết hợp Hash Map Index Lookup:**
     - Xây dựng cây từ trên xuống (Top-down Pre-order): Tạo node gốc trước rồi đệ quy dựng con trái và con phải.
     - Time: $O(N)$, Space: $O(N)$ (Hash Map + Call Stack $O(H)$).
  2. **DFS Tối Ưu Với Điểm Dừng Ranh Giới (Sentinel / Stop-Value DFS):**
     - Tận dụng quy luật duyệt: Nhánh trái của node $X$ sẽ kết thúc ngay khi Inorder gặp giá trị $X.\text{val}$.
     - Dùng giá trị cha làm "Sentinel Stop Value" để ngắt đệ quy mà không cần tra cứu Hash Map hay tính toán chỉ số!
     - Time: $O(N)$, Space: $O(H)$ (Zero Hash Map allocation).
  3. **Khử đệ quy bằng Explicit Stack (LIFO Heap Stack Simulation):**
     - Đưa toàn bộ đường đi cây vào Stack trên Heap.
     - Khi đỉnh stack chưa khớp `inorder[inIdx]`, tiếp tục gắn nhánh con trái. Khi đỉnh stack khớp `inorder[inIdx]`, pop liên tục để tìm node cha gắn nhánh con phải.
     - Miễn nhiễm hoàn toàn trước nguy cơ tràn Call Stack của V8 khi gặp cây lệch sâu hàng chục nghìn nodes.
     - Time: $O(N)$, Space: $O(H)$.
  4. **TypedArray Direct Offset Indexing (Kỹ thuật Competitive Programming):**
     - Với ràng buộc giá trị $[-3000, 3000]$, sử dụng `Int16Array(6001)` với độ dời `OFFSET = 3000`.
     - Thay thế cơ chế băm của Map bằng truy cập bộ nhớ trực tiếp trong TypedArray buffer C++, tối đa hóa L1/L2 CPU Cache.
     - Time: $O(N)$ (tốc độ cực đại trong V8), Space: $12\text{KB}$ cố định.
- **Kết quả:** Đạt $0\text{ms}$ (Beats 100.00%) trên LeetCode!

---

## 7. KHẮC CỐT GHI TÂM KHI PHỎNG VẤN (INTERVIEW TAKEAWAYS)

1. **Hỏi ngay interviewer về ràng buộc bộ nhớ & hình dạng cây:**
   - Nếu cây rất rộng (wide) nhưng nông (shallow) $\rightarrow$ DFS tiết kiệm bộ nhớ hơn vì Call Stack chỉ $O(H) = O(\log N)$.
   - Nếu cây rất sâu (deep, skewed) nhưng hẹp $\rightarrow$ BFS tiết kiệm bộ nhớ hơn vì Queue chỉ chứa 1-2 node mỗi tầng ($O(1)$).
2. **Cảnh báo `shift()` ngay lập tức:**
   - Chủ động nói với interviewer: *"In JavaScript, `Array.prototype.shift()` is $O(N)$. To guarantee pure $O(N)$ total time complexity, I will use a head index pointer or circular queue."* $\rightarrow$ Đây là điểm cộng cực lớn cho Meta / Google Senior SWE!
3. **Thứ tự con khi push:**
   - BFS Level Order: Luôn push `node.left` trước rồi tới `node.right` để duyệt từ trái sang phải chuẩn mực.
   - DFS Iterative Stack: Muốn duyệt nhánh trái trước thì phải push `node.right` trước rồi mới push `node.left` vào Stack LIFO!
4. **Kỹ thuật Early Exit trên Leaf Node:**
   - Trong cây nhị phân đầy đủ, xấp xỉ một nửa số node là node lá ($N/2$). Việc check `if (node.left === null && node.right === null) return 1;` giúp bớt $2 \times (N/2) = N$ lượt gọi đệ quy chạm tới `null`!
5. **Điều kiện cần để tái dựng cây duy nhất (Unique Reconstruction Rule):**
   - Cần ít nhất một phép duyệt In-order để phân định ranh giới giữa nhánh con trái và nhánh con phải.
   - **Pre-order + In-order**: Tái dựng duy nhất cây nhị phân bất kỳ (LC 105).
   - **Post-order + In-order**: Tái dựng duy nhất cây nhị phân bất kỳ (LC 106).
   - **Pre-order + Post-order**: CHỈ tái dựng được nếu cây là Full Binary Tree (mọi node nội bộ đều có đủ 2 con, LC 889).



