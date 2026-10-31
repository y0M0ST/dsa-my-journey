/**
 * Problem: 572 - Subtree of Another Tree
 * Pattern: Tree_BFS_DFS (Subtree Matching & Structural Equivalence)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech:
 * - Đây là bài toán kinh điển kiểm tra sự phối hợp giữa hai kỹ thuật:
 *   1. Kỹ thuật duyệt cây tìm kiếm ứng viên (Tree Traversal).
 *   2. Kỹ thuật so sánh hai cây đồng nhất cấu trúc (Tree Isomorphism / `isSameTree` - LC100).
 * - Cạm bẫy lớn nhất trong phỏng vấn (Partial Match Trap):
 *   Nhiều ứng viên nhầm tưởng chỉ cần node con giống giá trị là đúng, mà quên mất rằng
 *   cây con (subtree) phải chứa TOÀN BỘ các hậu duệ (descendants) của node đó.
 *   Nếu `subRoot` kết thúc nhưng cây tại node tương ứng vẫn còn node con nhánh dưới $\rightarrow$ KHÔNG phải subtree!
 *
 * Bản chất toán học & Bất biến cây con (Subtree Invariants):
 * - Cho hai cây $T$ (root) và $S$ (subRoot):
 *   $S$ là subtree của $T$ khi và chỉ khi tồn tại một node $X \in T$ sao cho:
 *   $$\text{Tree}(X) \cong S$$
 *   (Cây có gốc tại $X$ đẳng cấu hoàn toàn với $S$ cả về cấu trúc lẫn giá trị tại mọi vị trí).
 * - Nếu $T$ rỗng mà $S$ không rỗng $\rightarrow$ false.
 * - Nếu $S$ rỗng $\rightarrow$ luôn là subtree của bất kỳ cây nào (true).
 *
 * So sánh các trường phái giải thuật:
 *
 * 1. Phương pháp DFS Duyệt Cây Kết Hợp Đồng Dạng Cấu Trúc (DFS Traversal + isSameTree):
 *    - Duyệt qua từng node của $T$ bằng DFS. Tại mỗi node, thử khớp toàn bộ cây bằng `isSameTree`.
 *    - Time Complexity: $O(N \times M)$ trong trường hợp xấu nhất (tất cả các node đều có giá trị giống hệt nhau).
 *      Với dữ liệu thông thường, các nhánh khác giá trị sẽ ngắt ngay từ node đầu tiên nên chạy rất nhanh.
 *    - Space Complexity: $O(\max(H_T, H_S))$ Call Stack.
 *
 * 2. Phương pháp BFS Hàng Đợi Tìm Gốc Ứng Viên (BFS Candidate Queue with Head Pointer):
 *    - Quét từng tầng của cây $T$ bằng Queue có con trỏ `head` để triệt tiêu $O(N)$ overhead của `shift()`.
 *    - Chỉ kích hoạt `isSameTree` khi giá trị node hiện tại khớp với `subRoot.val`.
 *    - Ưu điểm: Tìm thấy subtree ở tầng nông cực nhanh mà không cần đi sâu xuống các nhánh xa.
 *    - Time Complexity: $O(N \times M)$, Space Complexity: $O(W)$ với $W$ là bề rộng tối đa của cây $T$.
 *
 * 3. Phương pháp Tuần Tự Hóa Chuỗi Tiền Thứ Tự (Pre-order Tree Serialization with Delimiters):
 *    - Tuần tự hóa cả hai cây thành chuỗi biểu diễn tiền thứ tự duy nhất.
 *    - Dùng dấu phân cách (delimiters) như `","` bao quanh mỗi node và `",#"` cho node null để tránh lỗi khớp chuỗi con giả
 *      (ví dụ: node `12` không được phép nhận diện nhầm là node `2`).
 *    - $S$ là subtree của $T \iff \text{Serialize}(S)$ là chuỗi con của $\text{Serialize}(T)$.
 *    - Time Complexity: $O(N + M)$ thời gian tuần tự hóa và tìm kiếm chuỗi con trên V8.
 *    - Space Complexity: $O(N + M)$ bộ nhớ lưu chuỗi.
 */

import { TreeNode, isSameTree } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: DFS Duyệt Cây Kết Hợp Kiểm Tra Đồng Nhất Cấu Trúc (DFS + isSameTree).
 *
 * @param root Node gốc của cây chính
 * @param subRoot Node gốc của cây con cần kiểm tra
 * @returns true nếu subRoot là subtree của root, ngược lại false
 */
export function isSubtreeDFS(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    // subRoot rỗng mặc định luôn là subtree
    if (subRoot === null) return true
    // root rỗng thì không thể chứa subRoot khác rỗng
    if (root === null) return false

    // Nếu tại vị trí hiện tại hai cây đồng nhất hoàn toàn
    if (isSameTree(root, subRoot)) {
        return true
    }

    // Đệ quy tìm kiếm tiếp ở nhánh con trái hoặc nhánh con phải
    return isSubtreeDFS(root.left, subRoot) || isSubtreeDFS(root.right, subRoot)
}

/**
 * Cách 2: BFS Hàng Đợi Tìm Node Ứng Viên với Con Trỏ Head (BFS Candidate Queue).
 * Duyệt theo tầng để tìm các node gốc tiềm năng, tối ưu thời gian khi subtree nằm gần đỉnh.
 *
 * @param root Node gốc của cây chính
 * @param subRoot Node gốc của cây con cần kiểm tra
 * @returns true nếu subRoot là subtree của root, ngược lại false
 */
export function isSubtreeBFS(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    if (subRoot === null) return true
    if (root === null) return false

    const queue: TreeNode[] = [root]
    let head = 0

    while (head < queue.length) {
        const curr = queue[head++]!

        // Chỉ kiểm tra isSameTree khi giá trị node hiện tại khớp với root của subtree
        if (curr.val === subRoot.val && isSameTree(curr, subRoot)) {
            return true
        }

        if (curr.left !== null) queue.push(curr.left)
        if (curr.right !== null) queue.push(curr.right)
    }

    return false
}

/**
 * Cách 3: Tuần Tự Hóa Chuỗi Tiền Thứ Tự (Pre-order Tree Serialization with Sentinels).
 * Biến đổi bài toán so sánh cấu trúc cây thành bài toán tìm kiếm chuỗi con (Substring Matching).
 *
 * @param root Node gốc của cây chính
 * @param subRoot Node gốc của cây con cần kiểm tra
 * @returns true nếu subRoot là subtree của root, ngược lại false
 */
export function isSubtreeSerialization(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    if (subRoot === null) return true
    if (root === null) return false

    function serialize(node: TreeNode | null): string {
        if (node === null) {
            return ',#'
        }
        // Bao bọc dấu phẩy trước và sau giá trị để phân định chính xác biên giới giá trị node
        return `,${node.val}${serialize(node.left)}${serialize(node.right)}`
    }

    const rootSerialized = serialize(root)
    const subRootSerialized = serialize(subRoot)

    return rootSerialized.includes(subRootSerialized)
}

// Export alias tương thích với hàm chuẩn của LeetCode
export const isSubtree = isSubtreeDFS
