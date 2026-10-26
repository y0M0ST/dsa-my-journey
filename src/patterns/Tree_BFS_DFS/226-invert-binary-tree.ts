/**
 * Problem: 226 - Invert Binary Tree
 * Pattern: Tree_BFS_DFS (Depth-First Search & Breadth-First Search)
 *
 * Giai thoại kinh điển: Bài toán nổi tiếng của Max Howell (tác giả Homebrew):
 * "Google: 90% of our engineers use the software you wrote (Homebrew), but you can't invert
 * a binary tree on a whiteboard so fuck off."
 *
 * Bản chất hình học & đại số:
 * - Đảo ngược cây (Invert Binary Tree) là phép tạo ảnh gương đối xứng (Mirror Image) qua trục thẳng đứng.
 * - Tính chất Tự nghịch đảo (Involution): f(f(Tree)) === Tree. Đảo ngược 2 lần luôn khôi phục lại cây ban đầu.
 *
 * So sánh 3 trường phái giải thuật:
 *
 * 1. Phương pháp DFS Đệ quy (Post-order / Pre-order Traversal):
 *    - Time Complexity: O(N)
 *      + Thăm qua tất cả N nodes đúng 1 lần.
 *    - Space Complexity: O(H)
 *      + Chi phí Call Stack: O(log N) với cây cân bằng, O(N) với cây suy biến lệch một bên.
 *    - Tối ưu hóa: Bổ sung Early Exit khi gặp leaf node (`left === null && right === null`),
 *      tiết kiệm ~N lượt gọi đệ quy chạm null vô ích trên cây nhị phân đầy đủ.
 *
 * 2. Phương pháp BFS Duyệt Tầng (Level-by-Level with Head Pointer):
 *    - Time Complexity: O(N)
 *      + Sử dụng con trỏ `head` triệt tiêu chi phí dời mảng O(K) của `queue.shift()`, đưa thao tác dequeue về O(1).
 *    - Space Complexity: O(W)
 *      + Với W là chiều rộng lớn nhất của cây. Cây cân bằng hoàn hảo có W = N/2 -> O(N).
 *    - Ưu điểm: Bộ nhớ chỉ tốn O(1) trên cây suy biến thẳng hàng (Skewed Tree).
 *
 * 3. Phương pháp DFS Khử Đệ Quy (Iterative DFS with Explicit Heap Stack):
 *    - Time Complexity: O(N)
 *    - Space Complexity: O(H)
 *    - Ưu điểm: Đưa Call Stack từ Stack hệ thống sang Stack nằm trên vùng nhớ Heap,
 *      xóa bỏ hoàn toàn rủi ro `RangeError: Maximum call stack size exceeded` trên V8 Engine.
 */
import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: DFS Đệ Quy (Post-order / Pre-order Traversal).
 * Hoán đổi hai con trỏ left và right tại mỗi node, sau đó đệ quy đảo tiếp hai cây con.
 * Tối ưu hóa: Bổ sung Early Exit khi gặp leaf node để tránh 2 lần gọi hàm đệ quy vô ích.
 *
 * @param root Node gốc của cây nhị phân
 * @returns Con trỏ trỏ tới node gốc của cây sau khi đảo ngược
 */
export function invertTreeDFS(root: TreeNode | null): TreeNode | null {
    if (root === null) return null
    // Early exit tối ưu: Leaf node không cần tráo đổi con, tiết kiệm 2 frame đệ quy chạm null
    if (root.left === null && root.right === null) return root

    const temp = root.left
    root.left = invertTreeDFS(root.right)
    root.right = invertTreeDFS(temp)

    return root
}

/**
 * Cách 2: BFS Quét Từng Tầng (Level-by-Level with Head Pointer).
 * Sử dụng Hàng đợi (Queue) kết hợp con trỏ chỉ số `head` để đạt O(1) dequeue,
 * triệt tiêu hoàn toàn chi phí dịch chuyển bộ nhớ O(K) của `Array.prototype.shift()`.
 *
 * @param root Node gốc của cây nhị phân
 * @returns Con trỏ trỏ tới node gốc của cây sau khi đảo ngược
 */
export function invertTreeBFS(root: TreeNode | null): TreeNode | null {
    if (root === null) return null

    const queue: TreeNode[] = [root]
    let head = 0

    while (head < queue.length) {
        const node = queue[head++]!

        // Hoán đổi hai con trỏ left và right
        const temp = node.left
        node.left = node.right
        node.right = temp

        if (node.left !== null) queue.push(node.left)
        if (node.right !== null) queue.push(node.right)
    }

    return root
}

/**
 * Cách 3: DFS Khử Đệ Quy bằng Explicit Stack (LIFO Heap Stack).
 * Đưa toàn bộ Call Stack từ Stack hệ thống sang Stack trên vùng nhớ Heap,
 * miễn nhiễm hoàn toàn với lỗi `RangeError: Maximum call stack size exceeded` khi cây suy biến sâu (Skewed Tree).
 *
 * @param root Node gốc của cây nhị phân
 * @returns Con trỏ trỏ tới node gốc của cây sau khi đảo ngược
 */
export function invertTreeIterativeDFS(root: TreeNode | null): TreeNode | null {
    if (root === null) return null

    const stack: TreeNode[] = [root]

    while (stack.length > 0) {
        const node = stack.pop()!

        // Hoán đổi hai con trỏ left và right
        const temp = node.left
        node.left = node.right
        node.right = temp

        if (node.left !== null) stack.push(node.left)
        if (node.right !== null) stack.push(node.right)
    }

    return root
}

/**
 * Hàm giải chính cho LeetCode 226 (Mặc định sử dụng DFS Đệ quy ngắn gọn, thanh lịch).
 */
export const invertTree = invertTreeDFS
