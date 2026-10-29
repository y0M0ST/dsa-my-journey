/**
 * Problem: 101 - Symmetric Tree
 * Pattern: Tree_BFS_DFS (Depth-First Search & Breadth-First Search)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech:
 * - Là bài toán kinh điển kiểm tra tư duy đối xứng gương (Mirror Symmetry) trên cây nhị phân.
 * - Thường xuất hiện tại vòng Onsite của Google, Meta, Amazon để đánh giá khả năng phân biệt giữa
 *   tính "Đồng nhất cấu trúc" (Structural Equivalence - LC 100) và tính "Đối xứng qua trục" (Mirror Symmetry).
 *
 * Bản chất toán học & Bất biến đối xứng (Mirror Invariants):
 * - Cây T đối xứng qua trục dọc tâm khi và chỉ khi:
 *   1. Node gốc root rỗng (null) -> hiển nhiên đối xứng.
 *   2. Hai cây con trực tiếp của root (root.left và root.right) là ảnh phản chiếu qua gương của nhau:
 *      + Giá trị tại hai node đối xứng phải bằng nhau: `t1.val === t2.val`.
 *      + Nhánh ngoài bên trái phải đối xứng với nhánh ngoài bên phải: `isMirror(t1.left, t2.right)`.
 *      + Nhánh trong bên phải phải đối xứng với nhánh trong bên trái: `isMirror(t1.right, t2.left)`.
 *
 * So sánh 3 trường phái giải thuật:
 *
 * 1. Phương pháp DFS Đệ Quy (Divide & Conquer - Mirror Reflection):
 *    - Time Complexity: O(N) với N là tổng số node của cây (duyệt qua mỗi node tối đa 1 lần).
 *    - Space Complexity: O(H) với H là chiều cao của cây. Cây cân bằng tốn O(log N), cây suy biến tốn O(N).
 *    - Ưu điểm: Mã nguồn súc tích, thanh lịch, tận dụng cơ chế short-circuiting của toán tử `&&`.
 *
 * 2. Phương pháp BFS Duyệt Tầng Cặp Đôi (Paired Level-Order Queue with Head Pointer):
 *    - Time Complexity: O(N).
 *    - Space Complexity: O(W) với W là độ rộng lớn nhất của cây.
 *    - Tối ưu V8: Dùng biến con trỏ `head` loại bỏ hoàn toàn chi phí dời mảng O(K) của `Array.prototype.shift()`.
 *
 * 3. Phương pháp DFS Khử Đệ Quy bằng Explicit Stack (LIFO Heap Stack):
 *    - Time Complexity: O(N).
 *    - Space Complexity: O(H).
 *    - Ưu điểm: Mô phỏng DFS trên Heap RAM, miễn nhiễm hoàn toàn với lỗi tràn Call Stack `RangeError: Maximum call stack size exceeded`.
 */
import { TreeNode } from '../../data_structures/tree/TreeNode.js'

/**
 * Cách 1: DFS Đệ Quy (Divide & Conquer - Mirror Reflection).
 *
 * @param root Node gốc của cây nhị phân
 * @returns true nếu cây đối xứng gương qua trục giữa, ngược lại false
 */
export function isSymmetricDFS(root: TreeNode | null): boolean {
    if (root === null) return true

    function isMirror(t1: TreeNode | null, t2: TreeNode | null): boolean {
        // Tối ưu hóa con trỏ tham chiếu: Cùng trỏ vào null hoặc cùng 1 địa chỉ nhớ
        if (t1 === t2) return true

        // Một bên null còn bên kia có node -> bất đối xứng cấu trúc
        if (t1 === null || t2 === null) return false

        // Giá trị khác nhau -> bất đối xứng dữ liệu
        if (t1.val !== t2.val) return false

        // Nhánh ngoài (t1.left & t2.right) và nhánh trong (t1.right & t2.left)
        return isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left)
    }

    return isMirror(root.left, root.right)
}

/**
 * Cách 2: BFS Duyệt Tầng Cặp Đôi (Paired Level-Order Queue with Head Pointer).
 * Duyệt đồng thời từng cặp node phản chiếu qua hàng đợi FIFO.
 *
 * @param root Node gốc của cây nhị phân
 * @returns true nếu cây đối xứng gương qua trục giữa, ngược lại false
 */
export function isSymmetricBFS(root: TreeNode | null): boolean {
    if (root === null) return true

    // Hàng đợi lưu trữ tuần tự các cặp node [t1, t2] đối xứng
    const queue: (TreeNode | null)[] = [root.left, root.right]
    let head = 0

    while (head < queue.length) {
        const t1 = queue[head++]!
        const t2 = queue[head++]!

        // Cả hai cùng null -> hợp lệ đối xứng ở lá, tiếp tục kiểm tra cặp tiếp theo
        if (t1 === null && t2 === null) continue

        // Một trong hai null hoặc giá trị không bằng nhau -> bất đối xứng
        if (t1 === null || t2 === null || t1.val !== t2.val) return false

        // Đẩy nhánh ngoài vào queue
        queue.push(t1.left, t2.right)
        // Đẩy nhánh trong vào queue
        queue.push(t1.right, t2.left)
    }

    return true
}

/**
 * Cách 3: DFS Khử Đệ Quy bằng Explicit Stack (LIFO Heap Stack Simulation).
 * Lưu trữ các cặp node đối xứng trên Heap Stack để tránh tràn Call Stack hệ thống.
 *
 * @param root Node gốc của cây nhị phân
 * @returns true nếu cây đối xứng gương qua trục giữa, ngược lại false
 */
export function isSymmetricIterativeStack(root: TreeNode | null): boolean {
    if (root === null) return true

    const stack: (TreeNode | null)[] = [root.left, root.right]

    while (stack.length > 0) {
        const t2 = stack.pop()!
        const t1 = stack.pop()!

        if (t1 === null && t2 === null) continue
        if (t1 === null || t2 === null || t1.val !== t2.val) return false

        // Đẩy các cặp tương ứng vào Stack: thứ tự pop sẽ kiểm tra nhánh ngoài trước rồi đến nhánh trong
        stack.push(t1.left, t2.right)
        stack.push(t1.right, t2.left)
    }

    return true
}

// Export hàm chuẩn theo chuẩn đặt tên LeetCode
export const isSymmetric = isSymmetricDFS
