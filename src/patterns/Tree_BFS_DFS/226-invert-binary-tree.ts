import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: DFS Đệ Quy (Post-order / Pre-order Traversal).
 * Hoán đổi hai con trỏ left và right tại mỗi node, sau đó đệ quy đảo tiếp hai cây con.
 *
 * Time Complexity: O(N) - Thăm qua tất cả N nodes trong cây đúng 1 lần.
 * Space Complexity: O(H) - Phụ thuộc vào chiều cao H của cây trên Call Stack (O(log N) với cây cân bằng, O(N) với cây lệch).
 *
 * @param root Node gốc của cây nhị phân
 * @returns Con trỏ trỏ tới node gốc của cây sau khi đảo ngược
 */
export function invertTreeDFS(root: TreeNode | null): TreeNode | null {
    if (root === null) return null

    const temp = root.left
    root.left = invertTreeDFS(root.right)
    root.right = invertTreeDFS(temp)

    return root
}

/**
 * Hàm giải chính cho LeetCode 226 (Mặc định sử dụng DFS Đệ quy ngắn gọn, thanh lịch).
 */
export const invertTree = invertTreeDFS
