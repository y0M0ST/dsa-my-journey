import { describe, it, expect } from 'vitest'
import { arrayToTree } from '../../data_structures/tree/TreeNode.js'
import {
    isValidBST,
    isValidBSTRecursive,
    isValidBSTInorder,
    isValidBSTBFS,
} from './98-validate-binary-search-tree.js'

describe('Pattern: Tree_BFS_DFS -> 98-validate-binary-search-tree', () => {
    const implementations = [
        { name: 'isValidBST (Default)', fn: isValidBST },
        { name: 'isValidBSTRecursive (Range DFS)', fn: isValidBSTRecursive },
        { name: 'isValidBSTInorder (Monotonic Stack)', fn: isValidBSTInorder },
        { name: 'isValidBSTBFS (Queue Range)', fn: isValidBSTBFS },
    ]

    describe.each(implementations)('$name', ({ fn }) => {
        it('trả về true cho BST chuẩn 3 node: [2, 1, 3]', () => {
            const root = arrayToTree([2, 1, 3])
            expect(fn(root)).toBe(true)
        })

        it('bắt chính xác cạm bẫy tổ tiên (The Ancestor Bounding Trap): [5, 1, 4, null, null, 3, 6]', () => {
            const root = arrayToTree([5, 1, 4, null, null, 3, 6])
            expect(fn(root)).toBe(false)
        })

        it('bắt chính xác node vi phạm cận trên của tổ tiên từ xa: [5, 4, 6, null, null, 3, 7]', () => {
            // Node 3 nằm ở cây con bên phải của 5, nhưng 3 < 5 -> không hợp lệ!
            const root = arrayToTree([5, 4, 6, null, null, 3, 7])
            expect(fn(root)).toBe(false)
        })

        it('bắt lỗi khi có hai node trùng giá trị (BST yêu cầu lớn hơn / nhỏ hơn nghiêm ngặt): [2, 2, 2]', () => {
            const root = arrayToTree([2, 2, 2])
            expect(fn(root)).toBe(false)
        })

        it('xử lý cây chỉ có một node duy nhất [1]', () => {
            const root = arrayToTree([1])
            expect(fn(root)).toBe(true)
        })

        it('xử lý cây rỗng null', () => {
            expect(fn(null)).toBe(true)
        })

        it('xử lý chính xác các node có giá trị biên 32-bit INT_MIN (-2147483648) và INT_MAX (2147483647)', () => {
            const root = arrayToTree([-2147483648, null, 2147483647])
            expect(fn(root)).toBe(true)
        })

        it('xử lý cây lệch phải (Right-skewed valid BST): [1, null, 2, null, 3, null, 4]', () => {
            const root = arrayToTree([1, null, 2, null, null, null, 3, null, null, null, null, null, null, null, 4])
            expect(fn(root)).toBe(true)
        })
    })

    describe('3-way Equivalence Check', () => {
        it('cả 3 thuật toán cho ra kết quả đồng nhất trên mọi cấu hình cây', () => {
            const testTrees = [
                [2, 1, 3],
                [5, 1, 4, null, null, 3, 6],
                [10, 5, 15, null, null, 6, 20],
                [1],
                [],
                [3, 2, 5, 1, 4],
                [32, 26, 47, 19, null, null, 56, null, 27],
            ]

            for (const treeArr of testTrees) {
                const r = arrayToTree(treeArr)
                const rec = isValidBSTRecursive(r)
                const ino = isValidBSTInorder(r)
                const bfs = isValidBSTBFS(r)

                expect(rec).toBe(ino)
                expect(bfs).toBe(ino)
            }
        })
    })
})
