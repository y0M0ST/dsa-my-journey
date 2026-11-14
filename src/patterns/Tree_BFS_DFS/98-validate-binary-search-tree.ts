/**
 * Problem: 98 - Validate Binary Search Tree
 * Pattern: Tree_BFS_DFS (BST Invariant & Bounding Range DFS / In-order Monotonicity)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Meta / Google):
 * - Đây là bài toán kiểm tra độ hiểu sâu sắc số 1 về cấu trúc Binary Search Tree (BST).
 * - Cạm bẫy tử thần kinh điển trong phỏng vấn (The Local Property Trap):
 *   Rất nhiều ứng viên chỉ kiểm tra điều kiện cục bộ:
 *   `node.left.val < node.val && node.right.val > node.val`
 *   Nhưng quên mất rằng TOÀN BỘ nhánh con bên phải phải lớn hơn tổ tiên,
 *   và TOÀN BỘ nhánh con bên trái phải nhỏ hơn tổ tiên!
 *   Ví dụ: Cây [5, 4, 6, null, null, 3, 7] -> Node 3 nằm ở nhánh phải của 4 nhưng lại nhỏ hơn 5!
 * - Xử lý giá trị biên 32-bit INT_MIN (-2^31) và INT_MAX (2^31 - 1):
 *   Không được dùng Number.MIN_SAFE_INTEGER làm cận, mà phải dùng `null` sentinel hoặc `Infinity`.
 *
 * Bản chất toán học & Bất biến BST (BST Invariants):
 * 1. Khoảng giá trị hợp lệ: Mọi node tại vị trí bất kỳ đều bị kẹp giữa $(min, max)$ kế thừa từ tổ tiên:
 *    $$min < node.val < max$$
 * 2. Tính đơn điệu của phép duyệt Trung thứ tự (In-order Monotonicity):
 *    Phép duyệt In-order (Left -> Root -> Right) của một BST hợp lệ LUÔN LUÔN tạo thành
 *    một dãy số tăng ngặt (Strictly Increasing Sequence). Nếu tồn tại $prev \ge current \implies$ Vi phạm BST!
 *
 * Đánh giá độ phức tạp thuật toán:
 * 1. Recursive Range DFS: Time $O(N)$, Space $O(H)$ Call Stack.
 * 2. Iterative In-order Stack: Time $O(N)$, Space $O(H)$ Heap Stack (loại bỏ nguy cơ tràn stack V8).
 * 3. BFS Queue Range Validation: Time $O(N)$, Space $O(W)$ với head pointer.
 */

import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: Đệ quy kiểm tra chặn khoảng giá trị (min, max) từ tổ tiên.
 *
 * @param root Node gốc của cây nhị phân
 * @returns boolean true nếu là BST hợp lệ
 */
export function isValidBSTRecursive(root: TreeNode | null): boolean {
    function validate(node: TreeNode | null, min: number | null, max: number | null): boolean {
        if (node === null) {
            return true
        }

        if (min !== null && node.val <= min) {
            return false
        }
        if (max !== null && node.val >= max) {
            return false
        }

        return (
            validate(node.left, min, node.val) &&
            validate(node.right, node.val, max)
        )
    }

    return validate(root, null, null)
}

/**
 * Cách 2: Duyệt Trung thứ tự không đệ quy bằng Stack (In-order Monotonicity).
 * Đảm bảo giá trị node sau luôn lớn hơn giá trị node trước (tăng ngặt).
 *
 * @param root Node gốc của cây
 * @returns boolean
 */
export function isValidBSTInorder(root: TreeNode | null): boolean {
    const stack: TreeNode[] = []
    let current: TreeNode | null = root
    let prevVal: number | null = null

    while (current !== null || stack.length > 0) {
        // Đi hết về nhánh con bên trái
        while (current !== null) {
            stack.push(current)
            current = current.left
        }

        current = stack.pop()!

        // Kiểm tra tính chất tăng ngặt
        if (prevVal !== null && current.val <= prevVal) {
            return false
        }
        prevVal = current.val

        current = current.right
    }

    return true
}

/**
 * Cách 3: Duyệt theo tầng BFS kết hợp hàng đợi khoảng chặn (min, max) có con trỏ head.
 *
 * @param root Node gốc của cây
 * @returns boolean
 */
export function isValidBSTBFS(root: TreeNode | null): boolean {
    if (root === null) return true

    interface QueueItem {
        node: TreeNode
        min: number | null
        max: number | null
    }

    const queue: QueueItem[] = [{ node: root, min: null, max: null }]
    let head = 0

    while (head < queue.length) {
        const item = queue[head++]!
        const { node, min, max } = item

        if (min !== null && node.val <= min) {
            return false
        }
        if (max !== null && node.val >= max) {
            return false
        }

        if (node.left !== null) {
            queue.push({ node: node.left, min, max: node.val })
        }
        if (node.right !== null) {
            queue.push({ node: node.right, min: node.val, max })
        }
    }

    return true
}

/**
 * Hàm giải chính theo chuẩn LeetCode 98.
 * Mặc định sử dụng thuật toán Đệ quy ràng buộc khoảng chặn DFS.
 */
export const isValidBST = isValidBSTRecursive
