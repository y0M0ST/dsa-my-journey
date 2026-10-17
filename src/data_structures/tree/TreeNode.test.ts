import { describe, it, expect } from 'vitest'
import { TreeNode, arrayToTree, treeToArray } from './TreeNode.js'

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
})
