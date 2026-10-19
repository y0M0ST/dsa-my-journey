/**
 * Problem: 104 - Maximum Depth of Binary Tree
 * Pattern: Tree_BFS_DFS (Depth-First Search - Post-order Traversal)
 *
 * Đề bài:
 * Cho node gốc `root` của một cây nhị phân, hãy tính độ sâu lớn nhất (Maximum Depth) của cây.
 * Độ sâu lớn nhất là số lượng node nằm trên đường đi dài nhất từ node gốc xuống node lá xa nhất.
 *
 * Phương pháp: DFS Đệ quy Bottom-up (Post-order Traversal - Divide & Conquer)
 * - Tư tưởng:
 *   + Chiều cao của một cây con có gốc tại `node` chính bằng:
 *     1 + max(chiều cao cây con trái, chiều cao cây con phải)
 *   + Base case: Khi chạm tới node rỗng (`root === null`), độ sâu là 0.
 *
 * - Time Complexity: O(N)
 *   + Duyệt qua tất cả N nodes trong cây đúng một lần.
 * - Space Complexity: O(H)
 *   + Không gian bộ nhớ tiêu tốn bởi Call Stack của đệ quy, với H là chiều cao của cây.
 *   + Best case (Cây cân bằng hoàn hảo): H = log(N) -> O(log N).
 *   + Worst case (Cây suy biến thành linked list lệch 1 bên): H = N -> O(N).
 */
import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: DFS Đệ Quy Bottom-up (Hậu thứ tự - Post-order).
 * Thu thập độ sâu tối đa từ 2 cây con trái và phải rồi cộng thêm 1 cho node hiện tại.
 *
 * @param root Node gốc của cây nhị phân
 * @returns Độ sâu lớn nhất của cây
 */
export function maxDepthDFS(root: TreeNode | null): number {
    if (root === null) return 0

    const leftDepth = maxDepthDFS(root.left)
    const rightDepth = maxDepthDFS(root.right)

    return 1 + Math.max(leftDepth, rightDepth)
}

/**
 * Cách 2: BFS Duyệt theo từng tầng (Level-by-Level Traversal).
 * Sử dụng Hàng đợi (Queue) kết hợp con trỏ `head` để đạt O(1) dequeue,
 * triệt tiêu hoàn toàn chi phí dịch chuyển bộ nhớ O(K) của `Array.prototype.shift()`.
 *
 * Mỗi khi quét xong trọn vẹn một tầng (levelSize nodes), biến `depth` được tăng thêm 1.
 *
 * - Time Complexity: O(N)
 *   + Mỗi node được nạp và lấy ra khỏi queue đúng 1 lần.
 * - Space Complexity: O(W)
 *   + Với W là bề rộng lớn nhất của cây (tầng đáy chứa tối đa N/2 nodes -> O(N)).
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
 * Giải quyết triệt để nguy cơ tràn Call Stack hệ thống (Maximum call stack size exceeded)
 * trong V8 Engine khi cây suy biến lệch một bên quá sâu (Skewed Tree, H > 10,000).
 *
 * Lưu trữ cặp [node, currentDepth] trên Stack nằm tại bộ nhớ Heap,
 * chủ động pop và cập nhật maxDepth tại mỗi node.
 *
 * - Time Complexity: O(N)
 *   + Mỗi node được push và pop khỏi stack đúng 1 lần.
 * - Space Complexity: O(H)
 *   + Kích thước tối đa của stack tương ứng với chiều cao của cây.
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
