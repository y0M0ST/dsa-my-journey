/**
 * Definition for a binary tree node (Cấu trúc dữ liệu Node cho Cây Nhị Phân chuẩn LeetCode).
 */
export class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null

    constructor(
        val: number = 0,
        left: TreeNode | null = null,
        right: TreeNode | null = null
    ) {
        this.val = val
        this.left = left
        this.right = right
    }
}

/**
 * Helper 1: Chuyển mảng LeetCode level-order (vd: [3, 9, 20, null, null, 15, 7]) thành Binary Tree.
 * Sử dụng hàng đợi BFS để gắn con trái / con phải tuần tự theo đúng quy chuẩn LeetCode.
 *
 * @param arr Mảng các số hoặc null đại diện cho các node theo thứ tự tầng
 * @returns Con trỏ trỏ tới node gốc (root) của cây
 */
export function arrayToTree(arr: (number | null)[]): TreeNode | null {
    if (!arr || arr.length === 0 || arr[0] === null) return null

    const root = new TreeNode(arr[0])
    const queue: TreeNode[] = [root]
    let head = 0
    let i = 1

    while (head < queue.length && i < arr.length) {
        const current = queue[head++]!

        const leftVal = arr[i++]
        if (leftVal !== null && leftVal !== undefined) {
            current.left = new TreeNode(leftVal)
            queue.push(current.left)
        }

        if (i < arr.length) {
            const rightVal = arr[i++]
            if (rightVal !== null && rightVal !== undefined) {
                current.right = new TreeNode(rightVal)
                queue.push(current.right)
            }
        }
    }

    return root
}

/**
 * Helper 2: Chuyển Binary Tree thành mảng LeetCode level-order (loại bỏ các null dư thừa ở đuôi).
 *
 * @param root Node gốc của cây
 * @returns Mảng level-order chuẩn LeetCode
 */
export function treeToArray(root: TreeNode | null): (number | null)[] {
    if (root === null) return []

    const result: (number | null)[] = []
    const queue: (TreeNode | null)[] = [root]
    let head = 0

    while (head < queue.length) {
        const current = queue[head++]
        if (current) {
            result.push(current.val)
            queue.push(current.left)
            queue.push(current.right)
        } else {
            result.push(null)
        }
    }

    while (result.length > 0 && result[result.length - 1] === null) {
        result.pop()
    }

    return result
}

/**
 * Helper 3: Kiểm tra hai cây nhị phân có hoàn toàn giống nhau về cấu trúc và giá trị hay không.
 *
 * @param p Gốc cây thứ nhất
 * @param q Gốc cây thứ hai
 * @returns true nếu hai cây giống nhau tuyệt đối, ngược lại false
 */
export function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null && q === null) return true
    if (p === null || q === null) return false
    if (p.val !== q.val) return false

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

/**
 * Helper 4: Duyệt cây theo Trung thứ tự (In-order: Trái -> Gốc -> Phải).
 * Đối với Binary Search Tree (BST), In-order sẽ sinh ra dãy số tăng dần hoàn hảo.
 *
 * @param root Node gốc của cây
 * @returns Mảng các giá trị theo thứ tự In-order
 */
export function inorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = []

    function dfs(node: TreeNode | null): void {
        if (node === null) return
        dfs(node.left)
        result.push(node.val)
        dfs(node.right)
    }

    dfs(root)
    return result
}

/**
 * Helper 5: Duyệt cây theo Tiền thứ tự (Pre-order: Gốc -> Trái -> Phải).
 * Thường dùng để nhân bản cây, serialize cấu trúc cây hoặc duyệt biểu thức prefix.
 *
 * @param root Node gốc của cây
 * @returns Mảng các giá trị theo thứ tự Pre-order
 */
export function preorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = []

    function dfs(node: TreeNode | null): void {
        if (node === null) return
        result.push(node.val)
        dfs(node.left)
        dfs(node.right)
    }

    dfs(root)
    return result
}

/**
 * Helper 6: Duyệt cây theo Hậu thứ tự (Post-order: Trái -> Phải -> Gốc).
 * Thường dùng trong tính toán độ cao (LC104), dọn dẹp vùng nhớ hoặc duyệt biểu thức postfix.
 *
 * @param root Node gốc của cây
 * @returns Mảng các giá trị theo thứ tự Post-order
 */
export function postorderTraversal(root: TreeNode | null): number[] {
    const result: number[] = []

    function dfs(node: TreeNode | null): void {
        if (node === null) return
        dfs(node.left)
        dfs(node.right)
        result.push(node.val)
    }

    dfs(root)
    return result
}

/**
 * Helper 7: Sao chép sâu (Deep Clone) một cây nhị phân sang vùng nhớ mới trên Heap.
 *
 * @param root Node gốc của cây cần sao chép
 * @returns Con trỏ trỏ tới node gốc của cây mới độc lập
 */
export function cloneTree(root: TreeNode | null): TreeNode | null {
    if (root === null) return null
    return new TreeNode(root.val, cloneTree(root.left), cloneTree(root.right))
}

