import { describe, it, expect } from 'vitest'
import {
    TreeNode,
    arrayToTree,
    treeToArray,
    isSameTree,
    inorderTraversal,
    preorderTraversal,
    postorderTraversal,
    cloneTree,
} from './TreeNode.js'

describe('Data Structure: Binary Tree (TreeNode, arrayToTree, treeToArray)', () => {
    it('khởi tạo TreeNode mặc định và có giá trị', () => {
        const nodeDefault = new TreeNode()
        expect(nodeDefault.val).toBe(0)
        expect(nodeDefault.left).toBeNull()
        expect(nodeDefault.right).toBeNull()

        const nodeCustom = new TreeNode(42, new TreeNode(10), new TreeNode(50))
        expect(nodeCustom.val).toBe(42)
        expect(nodeCustom.left?.val).toBe(10)
        expect(nodeCustom.right?.val).toBe(50)
    })

    it('chuyển mảng rỗng hoặc node đầu tiên là null', () => {
        expect(arrayToTree([])).toBeNull()
        expect(arrayToTree([null])).toBeNull()
        expect(treeToArray(null)).toEqual([])
    })

    it('cây chỉ có 1 node gốc', () => {
        const root = arrayToTree([1])
        expect(root).not.toBeNull()
        expect(root?.val).toBe(1)
        expect(root?.left).toBeNull()
        expect(root?.right).toBeNull()
        expect(treeToArray(root)).toEqual([1])
    })

    it('cây chuẩn 3 tầng [3, 9, 20, null, null, 15, 7]', () => {
        const input = [3, 9, 20, null, null, 15, 7]
        const root = arrayToTree(input)

        expect(root?.val).toBe(3)
        expect(root?.left?.val).toBe(9)
        expect(root?.left?.left).toBeNull()
        expect(root?.left?.right).toBeNull()
        expect(root?.right?.val).toBe(20)
        expect(root?.right?.left?.val).toBe(15)
        expect(root?.right?.right?.val).toBe(7)

        expect(treeToArray(root)).toEqual(input)
    })

    it('cây lệch phải [1, null, 2, 3]', () => {
        const input = [1, null, 2, 3]
        const root = arrayToTree(input)

        expect(root?.val).toBe(1)
        expect(root?.left).toBeNull()
        expect(root?.right?.val).toBe(2)
        expect(root?.right?.left?.val).toBe(3)
        expect(root?.right?.right).toBeNull()

        expect(treeToArray(root)).toEqual(input)
    })

    it('cây chứa số âm', () => {
        const input = [-10, 9, 20, null, null, 15, -7]
        const root = arrayToTree(input)
        expect(treeToArray(root)).toEqual(input)
    })

    describe('isSameTree: Kiểm tra sự tương đương cấu trúc & giá trị', () => {
        it('hai cây rỗng hoặc cùng 1 cấu trúc giống nhau', () => {
            expect(isSameTree(null, null)).toBe(true)

            const t1 = arrayToTree([1, 2, 3])
            const t2 = arrayToTree([1, 2, 3])
            expect(isSameTree(t1, t2)).toBe(true)
        })

        it('một cây rỗng và một cây có node', () => {
            const t1 = arrayToTree([1])
            expect(isSameTree(t1, null)).toBe(false)
            expect(isSameTree(null, t1)).toBe(false)
        })

        it('hai cây khác biệt cấu trúc nhưng cùng giá trị các node', () => {
            const t1 = arrayToTree([1, 2])
            const t2 = arrayToTree([1, null, 2])
            expect(isSameTree(t1, t2)).toBe(false)
        })

        it('hai cây cùng cấu trúc nhưng khác giá trị', () => {
            const t1 = arrayToTree([1, 2, 1])
            const t2 = arrayToTree([1, 1, 2])
            expect(isSameTree(t1, t2)).toBe(false)
        })
    })

    describe('Traversals: In-order, Pre-order, Post-order', () => {
        const tree = arrayToTree([4, 2, 6, 1, 3, 5, 7])

        it('inorderTraversal (Trái -> Gốc -> Phải)', () => {
            expect(inorderTraversal(tree)).toEqual([1, 2, 3, 4, 5, 6, 7])
            expect(inorderTraversal(null)).toEqual([])
        })

        it('preorderTraversal (Gốc -> Trái -> Phải)', () => {
            expect(preorderTraversal(tree)).toEqual([4, 2, 1, 3, 6, 5, 7])
            expect(preorderTraversal(null)).toEqual([])
        })

        it('postorderTraversal (Trái -> Phải -> Gốc)', () => {
            expect(postorderTraversal(tree)).toEqual([1, 3, 2, 5, 7, 6, 4])
            expect(postorderTraversal(null)).toEqual([])
        })
    })

    describe('cloneTree: Deep clone cây nhị phân độc lập bộ nhớ', () => {
        it('nhân bản chính xác và không bị dính tham chiếu (independent mutations)', () => {
            const original = arrayToTree([1, 2, 3, 4, 5])
            const cloned = cloneTree(original)

            expect(isSameTree(original, cloned)).toBe(true)
            expect(cloned).not.toBe(original)

            // Thay đổi cây cloned không được ảnh hưởng tới cây original
            if (cloned) {
                cloned.val = 999
            }
            expect(original?.val).toBe(1)
            expect(isSameTree(original, cloned)).toBe(false)
        })

        it('nhân bản cây rỗng (null)', () => {
            expect(cloneTree(null)).toBeNull()
        })
    })
})

