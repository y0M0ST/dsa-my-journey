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
 * Cách 2: BFS Quét Từng Tầng (Level-by-Level with Head Pointer).
 * Sử dụng Hàng đợi (Queue) kết hợp con trỏ chỉ số `head` để đạt O(1) dequeue,
 * triệt tiêu hoàn toàn chi phí dịch chuyển bộ nhớ O(K) của `Array.prototype.shift()`.
 *
 * Time Complexity: O(N) - Thăm qua tất cả N nodes trong cây đúng 1 lần.
 * Space Complexity: O(W) - Với W là bề rộng lớn nhất của cây (tối đa N/2 nodes ở tầng đáy -> O(N)).
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
 * Time Complexity: O(N) - Thăm qua tất cả N nodes trong cây đúng 1 lần.
 * Space Complexity: O(H) - Tốn bộ nhớ Heap cho mảng `stack` (O(log N) với cây cân bằng, O(N) với cây lệch).
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
