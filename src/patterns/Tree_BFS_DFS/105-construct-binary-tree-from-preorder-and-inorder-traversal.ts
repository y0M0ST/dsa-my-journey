/**
 * Problem: 105 - Construct Binary Tree from Preorder and Inorder Traversal
 * Pattern: Tree_BFS_DFS (Tree Reconstruction / Divide & Conquer)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech (Meta, Google, Amazon):
 * - Đây là bài toán kinh điển kiểm tra sự thấu hiểu sâu sắc về thứ tự duyệt cây (Tree Traversals).
 * - Kiểm tra kỹ năng phân rã bài toán lớn thành các bài toán con (Divide & Conquer)
 *   thông qua việc tính toán con trỏ chỉ số (Index Boundary Arithmetic).
 * - Là tiền đề trực tiếp để giải các bài toán biến thể tái dựng cây:
 *   + LC 106 - Construct Binary Tree from Inorder and Postorder Traversal
 *   + LC 889 - Construct Binary Tree from Preorder and Postorder Traversal
 *   + LC 1008 - Construct Binary Search Tree from Preorder Traversal
 *
 * Bản chất toán học & Nguyên lý bất biến (Structural Invariant):
 * 1. Preorder Traversal: [Root, (Toàn bộ nhánh con Trái), (Toàn bộ nhánh con Phải)]
 *    - Phần tử đầu tiên luôn là Root của cây hiện tại!
 * 2. Inorder Traversal: [(Toàn bộ nhánh con Trái), Root, (Toàn bộ nhánh con Phải)]
 *    - Node Root đóng vai trò là "Vách ngăn" (Divider) phân chia ranh giới tuyệt đối
 *      giữa nhánh con trái và nhánh con phải.
 * 3. Kích thước bất biến (Size Invariant):
 *    - Số lượng node của nhánh con trái trong Preorder LUÔN BẰNG số lượng node của nhánh con trái trong Inorder.
 *    - Giả sử vị trí của Root trong Inorder là `inRootIdx`, khi đó:
 *      `leftSubtreeSize = inRootIdx - inStart`
 *    - Ranh giới nhánh trái trong Preorder: [preStart + 1, preStart + leftSubtreeSize]
 *    - Ranh giới nhánh phải trong Preorder: [preStart + leftSubtreeSize + 1, preEnd]
 *
 * Cạm bẫy chí mạng cần tránh:
 * - Dùng `Array.prototype.slice()` hoặc `indexOf()` trong đệ quy:
 *   `indexOf()` tốn O(N), `slice()` sao chép mảng tốn O(N) và cấp phát thêm bộ nhớ.
 *   Khi cây suy biến thành danh sách liên kết, thuật toán bị thoái hóa thành O(N^2) Time & Space!
 * - Giải pháp: Dùng Hash Map để tra cứu vị trí Inorder trong O(1) và truyền 4 con trỏ chỉ số.
 */
import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: Chia để trị (Divide & Conquer) kết hợp Hash Map Index Lookup.
 * Sử dụng Hash Map để lưu vị trí các giá trị trong mảng Inorder, giúp việc tìm kiếm vị trí Root
 * đạt O(1) thay vì O(N) của indexOf.
 *
 * Độ phức tạp:
 * - Time Complexity: O(N) - Xây dựng Map tốn O(N). Đệ quy ghé thăm mỗi node đúng 1 lần với O(1) phép tính chỉ số.
 * - Space Complexity: O(N) - Bảng băm lưu N phần tử + O(H) không gian Call Stack (H là chiều cao cây, O(log N) đến O(N)).
 *
 * @param preorder Mảng duyệt theo thứ tự Pre-order (Gốc -> Trái -> Phải)
 * @param inorder Mảng duyệt theo thứ tự In-order (Trái -> Gốc -> Phải)
 * @returns Node gốc của cây nhị phân đã được tái dựng
 */
export function buildTreeHashMapDFS(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0 || inorder.length === 0 || preorder.length !== inorder.length) {
        return null
    }

    // Tiền xử lý: Lưu ánh xạ { giá trị node => vị trí chỉ số trong inorder }
    const inorderMap = new Map<number, number>()
    for (let i = 0; i < inorder.length; i++) {
        inorderMap.set(inorder[i]!, i)
    }

    function buildSubtree(
        preStart: number,
        preEnd: number,
        inStart: number,
        inEnd: number
    ): TreeNode | null {
        // Base case: Không còn phần tử nào trong khoảng con
        if (preStart > preEnd || inStart > inEnd) {
            return null
        }

        // 1. Xác định Root từ phần tử đầu tiên của khoảng preorder hiện tại
        const rootVal = preorder[preStart]!
        const root = new TreeNode(rootVal)

        // 2. Tra cứu vị trí của Root trong inorder
        const inRootIdx = inorderMap.get(rootVal)!

        // 3. Tính số lượng node thuộc nhánh con trái
        const leftSubtreeSize = inRootIdx - inStart

        // 4. Đệ quy xây dựng nhánh con trái và nhánh con phải
        root.left = buildSubtree(
            preStart + 1,
            preStart + leftSubtreeSize,
            inStart,
            inRootIdx - 1
        )

        root.right = buildSubtree(
            preStart + leftSubtreeSize + 1,
            preEnd,
            inRootIdx + 1,
            inEnd
        )

        return root
    }

    return buildSubtree(0, preorder.length - 1, 0, inorder.length - 1)
}

/**
 * Cách 2: DFS Tối Ưu Với Điểm Dừng Ranh Giới (Sentinel / Stop-Value DFS).
 *
 * Ý tưởng đột phá:
 * - Thay vì dùng Hash Map và tính toán con trỏ phân đoạn mảng, ta tận dụng thứ tự tự nhiên của hai phép duyệt:
 *   + Preorder duyệt: Root -> Trái -> Phải.
 *   + Inorder duyệt: Trái -> Root -> Phải.
 * - Nhận xét: Nhánh con trái của một node X kết thúc ngay khi thứ tự Inorder chạm đến giá trị của chính node X (`X.val`)!
 *   Do đó, `X.val` đóng vai trò là "Điểm dừng" (Sentinel Stop Value) cho toàn bộ nhánh con trái của nó.
 * - Sau khi nhánh trái hoàn tất, giá trị tiếp theo trong Inorder chính là Root X. Ta tiến con trỏ Inorder qua một vị trí.
 * - Tiếp theo, nhánh con phải của node X sẽ dùng lại điểm dừng của node cha của X (giá trị `stop` được truyền xuống).
 *
 * Độ phức tạp:
 * - Time Complexity: O(N) - Mỗi node trong preorder được tạo đúng 1 lần; con trỏ inorder dịch chuyển đúng N lần.
 * - Space Complexity: O(H) - Hoàn toàn không tốn bộ nhớ cho Hash Map phụ (Zero Hash Map allocation)!
 *   Chỉ tốn Call Stack O(H) (O(log N) cho cây cân bằng, O(N) cho cây lệch).
 *
 * @param preorder Mảng duyệt theo thứ tự Pre-order
 * @param inorder Mảng duyệt theo thứ tự In-order
 * @returns Node gốc của cây nhị phân đã được tái dựng
 */
export function buildTreeSentinelDFS(preorder: number[], inorder: number[]): TreeNode | null {
    if (preorder.length === 0 || inorder.length === 0 || preorder.length !== inorder.length) {
        return null
    }

    let pre = 0
    let inIdx = 0

    function build(stop: number | undefined): TreeNode | null {
        if (pre >= preorder.length) {
            return null
        }
        if (inIdx < inorder.length && inorder[inIdx] === stop) {
            inIdx++
            return null
        }

        const rootVal = preorder[pre++]!
        const root = new TreeNode(rootVal)

        // Nhánh trái dừng lại khi chạm tới chính rootVal trong inorder
        root.left = build(rootVal)
        // Nhánh phải dừng lại khi chạm tới điểm dừng của node cha
        root.right = build(stop)

        return root
    }

    return build(undefined)
}

/**
 * Hàm giải chính thức chuẩn LeetCode cho LC 105.
 * Mặc định sử dụng Divide & Conquer với Hash Map (dễ bảo trì, trực quan và đạt hiệu năng tối ưu O(N)).
 */
export const buildTree = buildTreeHashMapDFS

