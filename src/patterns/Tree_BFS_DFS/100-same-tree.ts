/**
 * Problem: 100 - Same Tree
 * Pattern: Tree_BFS_DFS (Depth-First Search & Breadth-First Search)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech:
 * - Đây là bài toán kiểm tra tính đồng nhất cấu trúc (Structural Equivalence) kinh điển nhất.
 * - Là tiền đề trực tiếp để giải quyết hàng loạt bài toán biến thể nâng cao:
 *   + LC 101 - Symmetric Tree (Cây đối xứng gương qua trục)
 *   + LC 572 - Subtree of Another Tree (Cây con của cây khác)
 *   + LC 951 - Flip Equivalent Binary Trees (Cây tương đương sau khi lật nhánh)
 *
 * Bản chất toán học & Nguyên lý nhận diện:
 * - Quan hệ tương đương (Equivalence Relation): Hai cây P và Q đồng nhất khi và chỉ khi:
 *   1. Đồng nhất rỗng: Cả hai cây cùng rỗng (p === null && q === null).
 *   2. Đồng nhất giá trị & cấu trúc đệ quy: p !== null && q !== null && p.val === q.val
 *      đồng thời p.left đồng nhất q.left VÀ p.right đồng nhất q.right.
 * - Tối ưu con trỏ tham chiếu (Identity Check):
 *   `if (p === q) return true;`
 *   Bao hàm cả trường hợp cả hai cùng null và trường hợp trỏ vào cùng một đối tượng TreeNode trong bộ nhớ Heap.
 *
 * So sánh 3 trường phái giải thuật:
 *
 * 1. Phương pháp DFS Đệ quy (Divide & Conquer - Pre-order Traversal):
 *    - Time Complexity: O(min(N, M))
 *      + Chỉ duyệt tối đa qua số node của cây nhỏ hơn trước khi phát hiện sai khác hoặc duyệt hết.
 *    - Space Complexity: O(min(H_p, H_q))
 *      + Chi phí Call Stack phụ thuộc vào chiều cao của cây nông hơn. Cây cân bằng tốn O(log N), cây lệch tốn O(N).
 *    - Ưu điểm: Mã nguồn cực kỳ ngắn gọn, thanh lịch, tận dụng short-circuit evaluation của toán tử `&&`.
 *
 * 2. Phương pháp BFS Duyệt Tầng Đồng Bộ (Synchronous Level-Order with Head Pointer):
 *    - Time Complexity: O(min(N, M))
 *      + Duyệt đồng thời từng cặp node tương ứng của cả hai cây qua hàng đợi.
 *      + Sử dụng con trỏ `head` triệt tiêu chi phí dời mảng O(K) của `queue.shift()`, đưa thao tác dequeue về O(1).
 *    - Space Complexity: O(min(W_p, W_q))
 *      + Với W là chiều rộng lớn nhất của cây.
 *
 * 3. Phương pháp DFS Khử Đệ Quy bằng Explicit Stack (LIFO Heap Stack):
 *    - Time Complexity: O(min(N, M))
 *    - Space Complexity: O(min(H_p, H_q))
 *    - Ưu điểm: Đưa Call Stack từ Stack hệ thống sang Stack nằm trên Heap, miễn nhiễm trước
 *      nguy cơ `RangeError: Maximum call stack size exceeded` trên V8 Engine khi cây suy biến sâu.
 */
import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: DFS Đệ Quy (Pre-order Traversal / Divide & Conquer).
 * Kiểm tra node hiện tại trước (giá trị và cấu trúc), sau đó đệ quy kiểm tra đồng thời
 * cả hai nhánh con trái và hai nhánh con phải.
 *
 * @param p Node gốc cây thứ nhất
 * @param q Node gốc cây thứ hai
 * @returns true nếu hai cây đồng nhất tuyệt đối về cấu trúc và giá trị, ngược lại false
 */
export function isSameTreeDFS(p: TreeNode | null, q: TreeNode | null): boolean {
    // Tối ưu hóa tham chiếu: Nếu cùng trỏ vào một địa chỉ nhớ (hoặc cả hai cùng null)
    if (p === q) return true

    // Nếu một trong hai null (nhưng không phải cả hai vì đã qua check p === q ở trên)
    if (p === null || q === null) return false

    // Nếu giá trị tại node khác nhau
    if (p.val !== q.val) return false

    // Đệ quy kiểm tra nhánh trái và nhánh phải
    return isSameTreeDFS(p.left, q.left) && isSameTreeDFS(p.right, q.right)
}

/**
 * Cách 2: BFS Duyệt Tầng Đồng Bộ (Synchronous Level-Order with Head Pointer).
 * Duyệt song song cả hai cây bằng hàng đợi FIFO lưu các cặp node [nodeP, nodeQ].
 * Sử dụng con trỏ `head` để đạt O(1) dequeue, triệt tiêu chi phí O(K) của `shift()`.
 *
 * @param p Node gốc cây thứ nhất
 * @param q Node gốc cây thứ hai
 * @returns true nếu hai cây giống hệt nhau, ngược lại false
 */
export function isSameTreeBFS(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === q) return true
    if (p === null || q === null) return false

    // Hàng đợi lưu cặp [nodeP, nodeQ]
    const queue: Array<[TreeNode | null, TreeNode | null]> = [[p, q]]
    let head = 0

    while (head < queue.length) {
        const [nodeP, nodeQ] = queue[head++]!

        // Cả 2 cùng null -> hợp lệ ở vị trí này
        if (nodeP === null && nodeQ === null) continue

        // Một bên null hoặc khác giá trị -> cấu trúc hoặc giá trị không khớp
        if (nodeP === null || nodeQ === null || nodeP.val !== nodeQ.val) {
            return false
        }

        // Đẩy đồng thời các nhánh con tương ứng vào queue
        queue.push([nodeP.left, nodeQ.left])
        queue.push([nodeP.right, nodeQ.right])
    }

    return true
}

/**
 * Cách 3: DFS Khử Đệ Quy bằng Explicit Stack (LIFO Heap Stack).
 * Đưa cơ chế duyệt đồng bộ sang ngăn xếp trên Heap để kiểm soát bộ nhớ
 * và loại bỏ nguy cơ tràn Call Stack trong môi trường V8 Engine.
 *
 * @param p Node gốc cây thứ nhất
 * @param q Node gốc cây thứ hai
 * @returns true nếu hai cây giống hệt nhau, ngược lại false
 */
export function isSameTreeIterativeDFS(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === q) return true
    if (p === null || q === null) return false

    const stack: Array<[TreeNode | null, TreeNode | null]> = [[p, q]]

    while (stack.length > 0) {
        const [nodeP, nodeQ] = stack.pop()!

        if (nodeP === null && nodeQ === null) continue
        if (nodeP === null || nodeQ === null || nodeP.val !== nodeQ.val) {
            return false
        }

        // Đẩy các nhánh con vào stack theo cặp
        stack.push([nodeP.right, nodeQ.right])
        stack.push([nodeP.left, nodeQ.left])
    }

    return true
}

/**
 * Hàm giải chính thức cho LeetCode 100.
 * Mặc định sử dụng DFS Đệ quy (gọn gàng, cache-friendly, đạt 0ms trên LeetCode).
 */
export const isSameTree = isSameTreeDFS
