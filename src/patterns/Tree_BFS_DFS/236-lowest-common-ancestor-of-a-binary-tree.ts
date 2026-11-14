/**
 * Problem: 236 - Lowest Common Ancestor of a Binary Tree
 * Pattern: Tree_BFS_DFS (Post-order Bottom-Up Aggregation & Parent Pointer Tracking)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Meta / Google):
 * - Đây là một trong những câu hỏi phỏng vấn thuật toán cây có tần suất xuất hiện cao nhất lịch sử Meta SWE.
 * - Bài toán đánh giá khả năng:
 *   1. Tư duy truyền tin từ lá lên gốc (Bottom-up Information Aggregation / Post-order DFS).
 *   2. Định lý điểm phân nhánh (Split-point Invariant):
 *      Node tổ tiên chung thấp nhất $L$ chính là node sâu nhất mà $p$ và $q$ nằm ở hai nhánh con rẽ đôi
 *      (hoặc một node trùng với $L$ và node kia nằm ở nhánh con bên dưới).
 *   3. Giải pháp con trỏ cha (Parent Pointers) dùng trong các hệ thống thực tế (Git Merge Base).
 *
 * Đánh giá độ phức tạp thuật toán:
 * 1. Bottom-up Post-order DFS: Time $O(N)$, Space $O(H)$ Call Stack.
 * 2. Parent Pointer Map + Ancestor Set: Time $O(N)$, Space $O(N)$ Heap Memory.
 */

import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: Đệ quy hậu thứ tự gom nhánh Bottom-Up (Optimal - Chuẩn mực Meta/Google).
 *
 * @param root Node gốc của cây
 * @param p Node thứ nhất
 * @param q Node thứ hai
 * @returns Node tổ tiên chung thấp nhất (LCA)
 */
export function lowestCommonAncestorPostOrder(
    root: TreeNode | null,
    p: TreeNode | null,
    q: TreeNode | null
): TreeNode | null {
    // Điều kiện dừng cơ sở: Chạm đáy null hoặc tìm thấy một trong hai node mục tiêu
    if (root === null || root === p || root === q) {
        return root
    }

    // Đệ quy tìm kiếm ở hai nhánh con trái và phải
    const left = lowestCommonAncestorPostOrder(root.left, p, q)
    const right = lowestCommonAncestorPostOrder(root.right, p, q)

    // Nếu cả 2 nhánh đều trả về kết quả non-null -> root chính là điểm phân nhánh LCA!
    if (left !== null && right !== null) {
        return root
    }

    // Nếu chỉ có một nhánh tìm thấy, truyền kết quả đó lên tầng trên
    return left !== null ? left : right
}

/**
 * Cách 2: Lưu vết con trỏ cha bằng Hash Map và Hash Set (Parent Pointers Iteration).
 *
 * @param root Node gốc
 * @param p Node thứ nhất
 * @param q Node thứ hai
 * @returns Node LCA
 */
export function lowestCommonAncestorParentMap(
    root: TreeNode | null,
    p: TreeNode | null,
    q: TreeNode | null
): TreeNode | null {
    if (root === null || p === null || q === null) {
        return null
    }

    // Bảng lưu cha của mỗi node: Map<con, cha>
    const parentMap = new Map<TreeNode, TreeNode | null>()
    parentMap.set(root, null)

    // Hàng đợi BFS để duyệt cây tìm p và q
    const queue: TreeNode[] = [root]
    let head = 0

    while (head < queue.length && (!parentMap.has(p) || !parentMap.has(q))) {
        const curr = queue[head++]!

        if (curr.left !== null) {
            parentMap.set(curr.left, curr)
            queue.push(curr.left)
        }
        if (curr.right !== null) {
            parentMap.set(curr.right, curr)
            queue.push(curr.right)
        }
    }

    // Thu thập toàn bộ tổ tiên của node p vào Set
    const ancestors = new Set<TreeNode>()
    let currP: TreeNode | null = p
    while (currP !== null) {
        ancestors.add(currP)
        currP = parentMap.get(currP) ?? null
    }

    // Duyệt ngược từ q lên gốc, node đầu tiên có mặt trong ancestors chính là LCA!
    let currQ: TreeNode | null = q
    while (currQ !== null) {
        if (ancestors.has(currQ)) {
            return currQ
        }
        currQ = parentMap.get(currQ) ?? null
    }

    return null
}

/**
 * Hàm giải chính theo chuẩn LeetCode 236.
 * Mặc định sử dụng thuật toán gom nhánh hậu thứ tự Bottom-Up DFS.
 */
export const lowestCommonAncestor = lowestCommonAncestorPostOrder
