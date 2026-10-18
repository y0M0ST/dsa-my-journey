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
