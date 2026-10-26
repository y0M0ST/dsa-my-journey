/**
 * Problem: 199 - Binary Tree Right Side View
 * Pattern: Tree_BFS_DFS (Depth-First Search & Breadth-First Search)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Đặc biệt Meta E4/E5):
 * - Đây là bài toán kinh điển được hỏi nhiều bậc nhất tại Meta trong chủ đề Cây Nhị Phân.
 * - Bài toán kiểm tra trực diện khả năng nhận diện hình chiếu tầng (Level Projection)
 *   và bẫy nhận thức "Right child shadow trap" (Bóng râm của cây con trái).
 *
 * Bẫy nhận thức phổ biến (The Shadow Trap):
 * - Rất nhiều ứng viên ngây thơ nghĩ rằng chỉ cần rẽ phải liên tục (`root = root.right`).
 * - Phản ví dụ: Nhánh phải có thể ngắn hơn nhánh trái (vd: Cây có nhánh phải độ sâu 2, nhánh trái độ sâu 4).
 *   Khi đứng nhìn từ phía bên phải, sau khi nhánh phải kết thúc, các node sâu hơn ở nhánh trái
 *   sẽ lộ ra trước tầm mắt!
 *
 * So sánh 3 trường phái giải thuật:
 *
 * 1. Phương pháp BFS Quét Từng Tầng (Level-by-Level with Head Pointer):
 *    - Time Complexity: O(N)
 *      + Thăm qua tất cả N nodes đúng 1 lần.
 *      + Sử dụng con trỏ `head` triệt tiêu chi phí dời mảng O(K) của `queue.shift()`, đưa thao tác dequeue về O(1).
 *    - Space Complexity: O(W) <= O(N/2) -> O(N)
 *      + Với W là chiều rộng lớn nhất của tầng đáy cây cân bằng.
 *    - Trực giác thuật toán: Duyệt theo từng tầng. Phần tử cuối cùng của mỗi tầng chính là node nhìn thấy từ bên phải.
 *
 * 2. Phương pháp DFS Đệ Quy (Reversed Pre-order Traversal: Root -> Right -> Left):
 *    - Time Complexity: O(N)
 *    - Space Complexity: O(H) (Call stack: O(log N) với cây cân bằng, O(N) với cây suy biến lệch).
 *    - Trực giác thuật toán: Thăm nhánh PHẢI trước nhánh TRÁI.
 *      Duy trì biến `depth` (bắt đầu từ 0). Khi `depth === result.length`, node hiện tại chắc chắn
 *      là node đầu tiên được nhìn thấy ở độ sâu `depth` này từ phía bên phải.
 *
 * 3. Phương pháp DFS Khử Đệ Quy bằng Explicit Stack (LIFO Heap Stack):
 *    - Time Complexity: O(N)
 *    - Space Complexity: O(H)
 *    - Ưu điểm: Đưa Call Stack từ Stack hệ thống sang Stack trên Heap, miễn nhiễm trước
 *      nguy cơ `RangeError: Maximum call stack size exceeded` khi cây suy biến sâu.
 */
import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: BFS Quét Từng Tầng (Level-by-Level with Head Pointer).
 * Duyệt từng tầng theo thứ tự từ trái sang phải. Phần tử cuối cùng trong mỗi tầng
 * chính là node nhìn thấy được từ phía bên phải.
 *
 * @param root Node gốc của cây nhị phân
 * @returns Mảng các giá trị nhìn thấy từ góc nhìn bên phải (từ trên xuống dưới)
 */
export function rightSideViewBFS(root: TreeNode | null): number[] {
    if (root === null) return []

    const result: number[] = []
    const queue: TreeNode[] = [root]
    let head = 0

    while (head < queue.length) {
        const levelSize = queue.length - head

        for (let i = 0; i < levelSize; i++) {
            const node = queue[head++]!

            // Phần tử cuối cùng của tầng hiện tại là node nhìn thấy từ bên phải
            if (i === levelSize - 1) {
                result.push(node.val)
            }

            if (node.left !== null) queue.push(node.left)
            if (node.right !== null) queue.push(node.right)
        }
    }

    return result
}

/**
 * Cách 2: DFS Đệ Quy Đảo Ngược (Reversed Pre-order Traversal: Root -> Right -> Left).
 * Bằng cách ưu tiên thăm nhánh phải trước nhánh trái, node đầu tiên chạm tới ở mỗi độ sâu `depth`
 * được bảo đảm tuyệt đối là node ở rìa ngoài cùng bên phải.
 *
 * @param root Node gốc của cây nhị phân
 * @returns Mảng các giá trị nhìn thấy từ góc nhìn bên phải
 */
export function rightSideViewDFS(root: TreeNode | null): number[] {
    const result: number[] = []

    function dfs(node: TreeNode | null, depth: number): void {
        if (node === null) return

        // Nếu lần đầu tiên chạm tới độ sâu này, node này chính là node ngoài cùng bên phải
        if (depth === result.length) {
            result.push(node.val)
        }

        // Ưu tiên duyệt nhánh phải trước nhánh trái
        dfs(node.right, depth + 1)
        dfs(node.left, depth + 1)
    }

    dfs(root, 0)
    return result
}

/**
 * Cách 3: DFS Khử Đệ Quy bằng Explicit Stack (LIFO Heap Stack).
 * Đưa cơ chế duyệt Root -> Right -> Left vào ngăn xếp trên Heap.
 * Để nhánh phải được pop ra xử lý trước, ta push nhánh trái trước rồi push nhánh phải sau.
 *
 * @param root Node gốc của cây nhị phân
 * @returns Mảng các giá trị nhìn thấy từ góc nhìn bên phải
 */
export function rightSideViewIterativeDFS(root: TreeNode | null): number[] {
    if (root === null) return []

    const result: number[] = []
    const stack: Array<{ node: TreeNode; depth: number }> = [{ node: root, depth: 0 }]

    while (stack.length > 0) {
        const { node, depth } = stack.pop()!

        if (depth === result.length) {
            result.push(node.val)
        }

        // LIFO: Push left trước để right nằm trên đỉnh stack và được pop ra trước
        if (node.left !== null) {
            stack.push({ node: node.left, depth: depth + 1 })
        }
        if (node.right !== null) {
            stack.push({ node: node.right, depth: depth + 1 })
        }
    }

    return result
}

/**
 * Hàm giải chính cho LeetCode 199.
 * Mặc định sử dụng BFS Level-Order tối ưu với Head Pointer (trực quan, sát với định nghĩa "view").
 */
export const rightSideView = rightSideViewBFS
