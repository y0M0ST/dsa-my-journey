/**
 * Problem: 102 - Binary Tree Level Order Traversal
 * Pattern: Tree_BFS_DFS (Breadth-First Search & Depth-First Search)
 *
 * So sánh 2 trường phái giải thuật:
 *
 * 1. Phương pháp BFS (Breadth-First Search - Hàng đợi tối ưu hóa con trỏ Head):
 *    - Time Complexity: O(N)
 *      + Mỗi node được nạp vào hàng đợi và lấy ra xử lý đúng 1 lần.
 *      + Sử dụng con trỏ `head` di chuyển tới thay vì `queue.shift()` để triệt tiêu chi phí
 *        dời mảng O(K) trong V8 Engine, đưa thao tác dequeue về O(1) thuần túy.
 *    - Space Complexity: O(W) = O(N)
 *      + Với W là chiều rộng tối đa của cây (tầng đáy chứa tối đa N/2 nodes).
 *
 * 2. Phương pháp DFS (Depth-First Search - Đệ quy kèm chỉ số tầng `level`):
 *    - Time Complexity: O(N)
 *      + Thăm mỗi node đúng 1 lần theo thứ tự Pre-order (Gốc -> Trái -> Phải).
 *    - Space Complexity: O(H)
 *      + Với H là chiều cao của cây.
 *      + Cây cân bằng (Balanced): H = log(N) -> Bộ nhớ Call Stack chỉ tốn O(log N).
 *      + Cây lệch (Skewed): H = N -> Call Stack tốn O(N).
 */
import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: BFS tối ưu hóa con trỏ `head` (Tránh cạm bẫy queue.shift() O(N)).
 *
 * @param root Node gốc của cây nhị phân
 * @returns Mảng 2 chiều chứa các giá trị theo từng tầng
 */
export function levelOrderBFS(root: TreeNode | null): number[][] {
    if (root === null) return []

    const result: number[][] = []
    const queue: TreeNode[] = [root]
    let head = 0

    while (head < queue.length) {
        const levelSize = queue.length - head
        const currentLevel: number[] = new Array(levelSize)

        for (let i = 0; i < levelSize; i++) {
            const node = queue[head++]!
            currentLevel[i] = node.val

            if (node.left !== null) queue.push(node.left)
            if (node.right !== null) queue.push(node.right)
        }

        result.push(currentLevel)
    }

    return result
}

/**
 * Cách 2: DFS Đệ Quy kết hợp chỉ số tầng `level` (Pre-order Traversal).
 * Khám phá cây theo chiều sâu, tự động khởi tạo mảng con `result[level]`
 * khi lần đầu tiên chạm tới độ sâu mới.
 *
 * @param root Node gốc của cây nhị phân
 * @returns Mảng 2 chiều chứa các giá trị theo từng tầng
 */
export function levelOrderDFS(root: TreeNode | null): number[][] {
    const result: number[][] = []

    function dfs(node: TreeNode | null, level: number): void {
        if (node === null) return

        if (result.length === level) {
            result.push([])
        }

        result[level]!.push(node.val)

        dfs(node.left, level + 1)
        dfs(node.right, level + 1)
    }

    dfs(root, 0)
    return result
}

/**
 * Hàm giải chính (Mặc định sử dụng BFS tối ưu O(1) dequeue).
 */
export const levelOrder = levelOrderBFS
