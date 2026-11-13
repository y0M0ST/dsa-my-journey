import { describe, it, expect } from 'vitest'
import { TreeNode, arrayToTree } from '../../data_structures/tree/TreeNode.js'
import {
    lowestCommonAncestor,
    lowestCommonAncestorPostOrder,
    lowestCommonAncestorParentMap,
} from './236-lowest-common-ancestor-of-a-binary-tree.js'

function findNode(root: TreeNode | null, val: number): TreeNode | null {
    if (root === null) return null
    if (root.val === val) return root
    return findNode(root.left, val) || findNode(root.right, val)
}

describe('Pattern: Tree_BFS_DFS -> 236-lowest-common-ancestor-of-a-binary-tree', () => {
    // Cây chuẩn LeetCode: [3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]
    const getStandardTree = () => arrayToTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4])

    const implementations = [
        { name: 'lowestCommonAncestor (Default)', fn: lowestCommonAncestor },
        { name: 'lowestCommonAncestorPostOrder (Bottom-Up DFS)', fn: lowestCommonAncestorPostOrder },
        { name: 'lowestCommonAncestorParentMap (Parent Pointers)', fn: lowestCommonAncestorParentMap },
    ]

    describe.each(implementations)('$name', ({ fn }) => {
        it('tìm thấy LCA là root khi p và q nằm ở 2 nhánh đối diện: p = 5, q = 1 -> LCA = 3', () => {
            const root = getStandardTree()
            const p = findNode(root, 5)
            const q = findNode(root, 1)
            const lca = fn(root, p, q)
            expect(lca).not.toBeNull()
            expect(lca!.val).toBe(3)
        })

        it('tìm thấy LCA là chính một trong 2 node khi node này là cha node kia: p = 5, q = 4 -> LCA = 5', () => {
            const root = getStandardTree()
            const p = findNode(root, 5)
            const q = findNode(root, 4)
            const lca = fn(root, p, q)
            expect(lca).not.toBeNull()
            expect(lca!.val).toBe(5)
        })

        it('tìm thấy LCA ở một nhánh con sâu: p = 7, q = 4 -> LCA = 2', () => {
            const root = getStandardTree()
            const p = findNode(root, 7)
            const q = findNode(root, 4)
            const lca = fn(root, p, q)
            expect(lca).not.toBeNull()
            expect(lca!.val).toBe(2)
        })

        it('xử lý cây chỉ có 2 node: [1, 2], p = 1, q = 2 -> LCA = 1', () => {
            const root = arrayToTree([1, 2])
            const p = findNode(root, 1)
            const q = findNode(root, 2)
            const lca = fn(root, p, q)
            expect(lca).not.toBeNull()
            expect(lca!.val).toBe(1)
        })

        it('trả về null khi root là null', () => {
            expect(fn(null, null, null)).toBeNull()
        })
    })

    describe('Equivalence Check', () => {
        it('cả hai phương pháp đồng nhất kết quả trên các cặp node khác nhau', () => {
            const root = getStandardTree()
            const pairs = [
                [6, 4],
                [7, 8],
                [6, 0],
                [2, 4],
                [5, 8],
            ]

            for (const [v1, v2] of pairs) {
                const p = findNode(root, v1!)
                const q = findNode(root, v2!)
                const lca1 = lowestCommonAncestorPostOrder(root, p, q)
                const lca2 = lowestCommonAncestorParentMap(root, p, q)
                expect(lca1).toBe(lca2)
            }
        })
    })
})
