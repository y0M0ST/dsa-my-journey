/**
 * Problem: 110 - Balanced Binary Tree
 * Pattern: Tree_BFS_DFS (Post-order Traversal & Early Pruning)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech:
 * - Bài toán kinh điển phân loại ứng viên giữa tư duy Naive $O(N^2)$ (Top-Down) và tư duy tối ưu Senior $O(N)$ (Bottom-Up).
 * - Là nền tảng trực tiếp để hiểu cơ chế tự cân bằng của cây AVL Tree và Red-Black Tree.
 *
 * Bản chất toán học & Bất biến cân bằng (Height-Balanced Invariants):
 * - Một cây nhị phân được gọi là cân bằng chiều cao (Height-Balanced) nếu:
 *   Với MỌI node trong cây, độ chênh lệch chiều cao giữa cây con bên trái và cây con bên phải không vượt quá 1:
 *   $$|H_{\text{left}} - H_{\text{right}}| \le 1$$
 *   đồng thời cả cây con trái và cây con phải đều phải tự cân bằng.
 *
 * So sánh các trường phái giải thuật:
 *
 * 1. Phương pháp DFS Đệ Quy Hậu Thứ Tự Thu Thập Chiều Cao Dưới Lên (Bottom-up Post-order DFS with Sentinel -1):
 *    - Điểm mấu chốt: Thay vì tính chiều cao nhiều lần từ trên xuống, ta tính chiều cao từ dưới lên.
 *    - Nếu phát hiện bất kỳ cây con nào không cân bằng, lập tức trả về giá trị lính canh `-1` (Sentinel value).
 *    - Khi gặp `-1`, đệ quy dừng tính toán và ngắt sớm (Early Termination / Pruning), dội `-1` thẳng về gốc.
 *    - Time Complexity: $O(N)$ - Mỗi node được duyệt đúng một lần.
 *    - Space Complexity: $O(H)$ với $H$ là chiều cao của cây (Call Stack).
 *
 * 2. Phương pháp Khử Đệ Quy Hậu Thứ Tự (Iterative Post-order with Explicit Stack & Height Map):
 *    - Sử dụng Stack trên Heap và cờ `visited` để mô phỏng chính xác hành vi Call Stack của Post-order.
 *    - Lưu chiều cao của các node đã hoàn thành vào Map để tính chênh lệch chiều cao cho node cha.
 *    - Time Complexity: $O(N)$.
 *    - Space Complexity: $O(N)$ bộ nhớ Heap, an toàn tuyệt đối trước rủi ro tràn Call Stack trên V8 Engine.
 *
 * 3. Phương pháp Duyệt Từ Trên Xuống (Top-down Naive DFS):
 *    - Tại mỗi node, gọi hàm `getDepth()` cho cả hai nhánh, sau đó đệ quy kiểm tra 2 con.
 *    - Time Complexity: $O(N^2)$ trên cây suy biến, $O(N \log N)$ trên cây cân bằng do các tầng dưới bị tính lặp lại liên tục.
 *    - Space Complexity: $O(H)$.
 */

import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: Bottom-up Post-order DFS với lính canh `-1` (Tối ưu chuẩn Big Tech).
 * Vừa tính chiều cao vừa kiểm tra tính cân bằng, ngắt sớm ngay khi phát hiện chênh lệch > 1.
 *
 * @param root Node gốc của cây nhị phân
 * @returns true nếu cây cân bằng chiều cao, ngược lại false
 */
export function isBalancedDFS(root: TreeNode | null): boolean {
    function checkHeight(node: TreeNode | null): number {
        if (node === null) return 0

        // Đệ quy kiểm tra nhánh trái
        const leftHeight = checkHeight(node.left)
        if (leftHeight === -1) return -1 // Tỉa nhánh sớm nếu nhánh trái mất cân bằng

        // Đệ quy kiểm tra nhánh phải
        const rightHeight = checkHeight(node.right)
        if (rightHeight === -1) return -1 // Tỉa nhánh sớm nếu nhánh phải mất cân bằng

        // Kiểm tra điều kiện bất biến cân bằng chiều cao tại node hiện tại
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1 // Vi phạm cân bằng, trả về lính canh -1
        }

        // Trả về chiều cao thực tế của node hiện tại lên cho node cha
        return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight)
    }

    return checkHeight(root) !== -1
}

/**
 * Cách 2: Khử Đệ Quy Hậu Thứ Tự với Explicit Stack và Height Map.
 * Duyệt Post-order an toàn trên Heap RAM, loại bỏ hoàn toàn nguy cơ Call Stack Overflow.
 *
 * @param root Node gốc của cây nhị phân
 * @returns true nếu cây cân bằng chiều cao, ngược lại false
 */
export function isBalancedIterative(root: TreeNode | null): boolean {
    if (root === null) return true

    const stack: { node: TreeNode; visited: boolean }[] = [{ node: root, visited: false }]
    const heightMap = new Map<TreeNode, number>()

    while (stack.length > 0) {
        const top = stack[stack.length - 1]!
        const curr = top.node

        if (!top.visited) {
            top.visited = true
            // Đẩy con phải trước rồi đến con trái để duyệt trái trước phải sau
            if (curr.right !== null) {
                stack.push({ node: curr.right, visited: false })
            }
            if (curr.left !== null) {
                stack.push({ node: curr.left, visited: false })
            }
        } else {
            stack.pop()
            const leftHeight = curr.left ? heightMap.get(curr.left) || 0 : 0
            const rightHeight = curr.right ? heightMap.get(curr.right) || 0 : 0

            // Kiểm tra điều kiện cân bằng
            if (Math.abs(leftHeight - rightHeight) > 1) {
                return false
            }

            const currHeight = 1 + (leftHeight > rightHeight ? leftHeight : rightHeight)
            heightMap.set(curr, currHeight)
        }
    }

    return true
}

/**
 * Cách 3: Top-Down Naive DFS (Phương pháp đối chiếu học thuật).
 * Tính lại chiều cao ở mọi node từ trên xuống dưới, làm rõ sự lãng phí tài nguyên $O(N^2)$.
 *
 * @param root Node gốc của cây nhị phân
 * @returns true nếu cây cân bằng chiều cao, ngược lại false
 */
export function isBalancedTopDown(root: TreeNode | null): boolean {
    if (root === null) return true

    function getDepth(node: TreeNode | null): number {
        if (node === null) return 0
        const leftDepth = getDepth(node.left)
        const rightDepth = getDepth(node.right)
        return 1 + (leftDepth > rightDepth ? leftDepth : rightDepth)
    }

    const leftDepth = getDepth(root.left)
    const rightDepth = getDepth(root.right)

    if (Math.abs(leftDepth - rightDepth) > 1) {
        return false
    }

    return isBalancedTopDown(root.left) && isBalancedTopDown(root.right)
}

// Export alias tương thích với hàm chuẩn của LeetCode
export const isBalanced = isBalancedDFS
