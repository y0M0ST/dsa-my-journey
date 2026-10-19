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
 * Hàm giải chính cho LeetCode 104 (Mặc định sử dụng DFS Đệ quy ngắn gọn, thanh lịch).
 */
export const maxDepth = maxDepthDFS
