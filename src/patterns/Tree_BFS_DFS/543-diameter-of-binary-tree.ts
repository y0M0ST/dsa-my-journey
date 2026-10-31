/**
 * Problem: 543 - Diameter of Binary Tree
 * Pattern: Tree_BFS_DFS (Post-order Traversal & Bottom-up Height Aggregation)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech:
 * - Đây là bài toán kinh điển nhất về mẫu tư duy "Thu thập thông tin từ dưới lên" (Bottom-Up Aggregation).
 * - Kiểm tra cạm bẫy tư duy phổ biến nhất trong phỏng vấn:
 *   "Đường kính dài nhất KHÔNG NHẤT THIẾT phải đi qua node gốc (Root)!"
 *   Nó có thể nằm trọn vẹn trong một nhánh con đơn lẻ nếu nhánh đó phân nhánh rất sâu.
 *
 * Bản chất toán học & Bất biến quy nạp (Diameter Invariants):
 * - Đường kính (Diameter) được định nghĩa là số cạnh (edges) trên đường đi dài nhất giữa hai node bất kỳ.
 * - Tại mỗi node X:
 *   1. Chiều cao nhánh trái $H_{left}$ = số cạnh từ node con trái xuống lá sâu nhất.
 *   2. Chiều cao nhánh phải $H_{right}$ = số cạnh từ node con phải xuống lá sâu nhất.
 *   3. Đường đi dài nhất đi xuyên qua node X:
 *      $D_X = H_{left} + H_{right}$
 *   4. Chiều cao của chính node X gửi ngược lên node cha:
 *      $H_X = 1 + \max(H_{left}, H_{right})$
 *   5. Đường kính tối đại toàn cây:
 *      $\text{MaxDiameter} = \max_{X \in \text{Tree}} (D_X)$
 *
 * So sánh các trường phái giải thuật:
 *
 * 1. Phương pháp DFS Đệ Quy Hậu Thứ Tự (Bottom-up Post-order Traversal):
 *    - Time Complexity: O(N) với N là tổng số node. Mỗi node được thăm đúng 1 lần duy nhất.
 *    - Space Complexity: O(H) với H là chiều cao của cây. Cây cân bằng tốn O(log N), cây suy biến tốn O(N).
 *    - Ưu điểm: Mã nguồn súc tích, tính toán đồng thời chiều cao và đường kính trong cùng một lượt duyệt.
 *
 * 2. Phương pháp Duyệt Khử Đệ Quy Hậu Thứ Tự (Iterative Post-order with Explicit Stack):
 *    - Time Complexity: O(N).
 *    - Space Complexity: O(N) bộ nhớ Heap cho Stack và Map lưu trữ chiều cao.
 *    - Ưu điểm: Miễn nhiễm tuyệt đối trước nguy cơ tràn Call Stack của V8 khi gặp cây lệch sâu hàng chục nghìn tầng.
 */
import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: DFS Đệ Quy Hậu Thứ Tự (Bottom-Up Post-Order Traversal).
 * Tính toán chiều cao từ dưới lên và liên tục cập nhật đường kính tối đại qua biến closure.
 *
 * @param root Node gốc của cây nhị phân
 * @returns Độ dài đường kính (số cạnh lớn nhất giữa hai node bất kỳ)
 */
export function diameterOfBinaryTreeDFS(root: TreeNode | null): number {
    let maxDiameter = 0

    function getHeight(node: TreeNode | null): number {
        if (node === null) return 0

        // Đệ quy tính chiều cao nhánh trái và nhánh phải theo hậu thứ tự
        const leftHeight = getHeight(node.left)
        const rightHeight = getHeight(node.right)

        // Cập nhật đường kính tối đại đi qua node hiện tại
        const currentDiameter = leftHeight + rightHeight
        if (currentDiameter > maxDiameter) {
            maxDiameter = currentDiameter
        }

        // Trả về chiều cao của node hiện tại lên cho node cha
        return 1 + (leftHeight > rightHeight ? leftHeight : rightHeight)
    }

    getHeight(root)
    return maxDiameter
}

/**
 * Cách 2: Duyệt Khử Đệ Quy Hậu Thứ Tự (Iterative Post-order with Explicit Stack & Map).
 * Sử dụng Stack trên Heap và cờ `visited` để mô phỏng chính xác cơ chế trả về của Call Stack.
 *
 * @param root Node gốc của cây nhị phân
 * @returns Độ dài đường kính lớn nhất
 */
export function diameterOfBinaryTreeIterative(root: TreeNode | null): number {
    if (root === null) return 0

    let maxDiameter = 0
    const stack: { node: TreeNode; visited: boolean }[] = [{ node: root, visited: false }]
    const heightMap = new Map<TreeNode, number>()

    while (stack.length > 0) {
        const top = stack[stack.length - 1]!
        const curr = top.node

        if (!top.visited) {
            top.visited = true
            // Đẩy con phải rồi con trái để khi pop ra duyệt trái trước rồi tới phải
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

            const currentDiameter = leftHeight + rightHeight
            if (currentDiameter > maxDiameter) {
                maxDiameter = currentDiameter
            }

            const currHeight = 1 + (leftHeight > rightHeight ? leftHeight : rightHeight)
            heightMap.set(curr, currHeight)
        }
    }

    return maxDiameter
}

// Export alias tương thích với hàm chuẩn của LeetCode
export const diameterOfBinaryTree = diameterOfBinaryTreeDFS
