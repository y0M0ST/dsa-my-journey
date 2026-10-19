/**
 * Problem: 104 - Maximum Depth of Binary Tree
 * Pattern: Tree_BFS_DFS (Depth-First Search & Breadth-First Search)
 *
 * So sánh 3 trường phái giải thuật:
 *
 * 1. Phương pháp DFS Đệ quy (Divide & Conquer / Post-order Bottom-up):
 *    - Time Complexity: O(N)
 *      + Thăm qua tất cả N nodes đúng 1 lần.
 *    - Space Complexity: O(H)
 *      + Tiêu tốn bởi Call Stack của đệ quy. Cây cân bằng: O(log N). Cây lệch: O(N).
 *    - Ưu điểm: Cực kỳ ngắn gọn, trực quan, là mẫu hình tư duy nền tảng cho các bài cây (LC110, LC124, LC236).
 *
 * 2. Phương pháp BFS Duyệt Tầng (Level-by-Level with Head Pointer):
 *    - Time Complexity: O(N)
 *      + Sử dụng con trỏ `head` triệt tiêu chi phí dời mảng O(K) của `queue.shift()`, đưa thao tác dequeue về O(1).
 *    - Space Complexity: O(W)
 *      + Với W là chiều rộng lớn nhất của cây. Cây cân bằng hoàn hảo có W = N/2 -> O(N).
 *    - Ưu điểm: Bộ nhớ chỉ tốn O(1) trên cây suy biến thẳng hàng (Skewed Tree).
 *
 * 3. Phương pháp DFS Khử Đệ Quy (Iterative DFS with Explicit Stack):
 *    - Time Complexity: O(N)
 *    - Space Complexity: O(H)
 *    - Ưu điểm: Đưa Call Stack từ Stack hệ thống (giới hạn ~10,000 frames trong V8) sang Stack
 *      nằm trên vùng nhớ Heap, xóa bỏ hoàn toàn rủi ro `RangeError: Maximum call stack size exceeded`.
 */
import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: DFS Đệ Quy Bottom-up (Hậu thứ tự - Post-order).
 * Tối ưu hóa: Bổ sung Early Exit khi gặp leaf node để tiết kiệm 2 lần gọi đệ quy vô ích.
 *
 * @param root Node gốc của cây nhị phân
 * @returns Độ sâu lớn nhất của cây
 */
export function maxDepthDFS(root: TreeNode | null): number {
    if (root === null) return 0
    if (root.left === null && root.right === null) return 1

    const leftDepth = maxDepthDFS(root.left)
    const rightDepth = maxDepthDFS(root.right)

    return 1 + Math.max(leftDepth, rightDepth)
}

/**
 * Cách 2: BFS Quét Từng Tầng (Level-by-Level Traversal).
 * Sử dụng Hàng đợi (Queue) kết hợp con trỏ `head` để đạt O(1) dequeue,
 * triệt tiêu hoàn toàn chi phí dịch chuyển bộ nhớ O(K) của `Array.prototype.shift()`.
 *
 * @param root Node gốc của cây nhị phân
 * @returns Độ sâu lớn nhất của cây
 */
export function maxDepthBFS(root: TreeNode | null): number {
    if (root === null) return 0

    let depth = 0
    const queue: TreeNode[] = [root]
    let head = 0

    while (head < queue.length) {
        const levelSize = queue.length - head

        for (let i = 0; i < levelSize; i++) {
            const node = queue[head++]!

            if (node.left !== null) queue.push(node.left)
            if (node.right !== null) queue.push(node.right)
        }

        depth++
    }

    return depth
}

/**
 * Cách 3: DFS Khử Đệ Quy bằng Stack Tường Minh (Explicit Stack).
 * Lưu trữ cặp [node, currentDepth] trên Heap Stack,
 * loại bỏ nguy cơ tràn Call Stack trong JavaScript engine khi độ sâu cây quá lớn.
 *
 * @param root Node gốc của cây nhị phân
 * @returns Độ sâu lớn nhất của cây
 */
export function maxDepthIterativeDFS(root: TreeNode | null): number {
    if (root === null) return 0

    let max = 0
    const stack: [TreeNode, number][] = [[root, 1]]

    while (stack.length > 0) {
        const [node, currentDepth] = stack.pop()!

        if (currentDepth > max) {
            max = currentDepth
        }

        if (node.left !== null) stack.push([node.left, currentDepth + 1])
        if (node.right !== null) stack.push([node.right, currentDepth + 1])
    }

    return max
}

/**
 * Hàm giải chính cho LeetCode 104 (Mặc định sử dụng DFS Đệ quy ngắn gọn, thanh lịch).
 */
export const maxDepth = maxDepthDFS
