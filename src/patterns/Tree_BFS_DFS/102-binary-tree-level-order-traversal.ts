/**
 * Problem: 102 - Binary Tree Level Order Traversal
 * Pattern: Tree_BFS_DFS (Breadth-First Search / Level-Order Traversal)
 *
 * Time Complexity: O(N)
 *   - Với N là tổng số node của cây.
 *   - Mỗi node được đưa vào hàng đợi (queue) đúng một lần và lấy ra xử lý đúng một lần.
 *   - Mọi thao tác push, pop, gán con trái, con phải đều là O(1).
 *
 * Space Complexity: O(W) = O(N)
 *   - Với W là chiều rộng tối đa (maximum width) của cây nhị phân.
 *   - Trong trường hợp xấu nhất (cây nhị phân hoàn hảo / Perfect Binary Tree),
 *     tầng cuối cùng chứa N / 2 node, do đó hàng đợi cần lưu trữ tối đa O(N) node.
 *   - Bộ nhớ mảng kết quả `result` lưu trữ toàn bộ N giá trị của các node: O(N).
 */
import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: Breadth-First Search (BFS) sử dụng hàng đợi theo từng tầng (Level Batching).
 *
 * @param root Node gốc của cây nhị phân
 * @returns Mảng 2 chiều chứa các giá trị theo từng tầng từ trên xuống dưới, từ trái sang phải
 */
export function levelOrder(root: TreeNode | null): number[][] {
    // Early Exit: Cây rỗng không có node nào
    if (root === null) return []

    const result: number[][] = []
    const queue: TreeNode[] = [root]

    while (queue.length > 0) {
        // Cố định số lượng node thuộc tầng hiện tại
        const levelSize = queue.length
        const currentLevel: number[] = []

        // Xử lý trọn vẹn toàn bộ các node của tầng này
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift()!
            currentLevel.push(node.val)

            // Nạp các con của tầng kế tiếp vào hàng đợi
            if (node.left !== null) {
                queue.push(node.left)
            }
            if (node.right !== null) {
                queue.push(node.right)
            }
        }

        result.push(currentLevel)
    }

    return result
}

// Export alias chuẩn LeetCode
export const levelOrderBFS = levelOrder
