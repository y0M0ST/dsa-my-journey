import { describe, it, expect } from 'vitest'
import { arrayToTree, TreeNode } from '../../data_structures/tree/TreeNode.js'
import {
    diameterOfBinaryTreeDFS,
    diameterOfBinaryTreeIterative,
    diameterOfBinaryTree,
} from './543-diameter-of-binary-tree.js'

describe('Pattern: Tree_BFS_DFS -> 543-diameter-of-binary-tree (Diameter of Binary Tree)', () => {
    const testCases: {
        name: string
        input: (number | null)[]
        expected: number
    }[] = [
        {
            name: 'LeetCode Ex 1: Cây kinh điển [1, 2, 3, 4, 5] -> Đường kính 3 cạnh',
            input: [1, 2, 3, 4, 5],
            expected: 3,
        },
        {
            name: 'LeetCode Ex 2: Cây 2 node [1, 2] -> Đường kính 1 cạnh',
            input: [1, 2],
            expected: 1,
        },
        {
            name: 'Edge case: Cây chỉ có 1 node [1] -> Đường kính 0 cạnh',
            input: [1],
            expected: 0,
        },
        {
            name: 'Edge case: Cây rỗng [] -> Đường kính 0 cạnh',
            input: [],
            expected: 0,
        },
        {
            name: 'Cây lệch hoàn toàn sang trái (Skewed Tree) [1, 2, null, 3, null, 4] -> Đường kính 3 cạnh',
            input: [1, 2, null, 3, null, 4],
            expected: 3,
        },
        {
            name: 'Cây cân bằng hoàn hảo 3 tầng [1, 2, 3, 4, 5, 6, 7] -> Đường kính 4 cạnh',
            input: [1, 2, 3, 4, 5, 6, 7],
            expected: 4,
        },
    ]

    describe('1. Kiểm thử tính đúng đắn trên 2 trường phái giải thuật', () => {
        for (const tc of testCases) {
            it(`[DFS Đệ Quy] ${tc.name}`, () => {
                const root = arrayToTree(tc.input)
                expect(diameterOfBinaryTreeDFS(root)).toBe(tc.expected)
            })

            it(`[Khử Đệ Quy Explicit Stack] ${tc.name}`, () => {
                const root = arrayToTree(tc.input)
                expect(diameterOfBinaryTreeIterative(root)).toBe(tc.expected)
            })

            it(`[Default LeetCode Alias] ${tc.name}`, () => {
                const root = arrayToTree(tc.input)
                expect(diameterOfBinaryTree(root)).toBe(tc.expected)
            })
        }
    })

    describe('2. Test Case Cạm Bẫy Phỏng Vấn Big Tech: Đường kính KHÔNG đi qua Root', () => {
        it('Đường kính dài nhất nằm trọn vẹn trong cây con bên trái', () => {
            /**
             * Cấu trúc cây:
             *              1 (Root)
             *             /
             *            2
             *           / \
             *          3   4
             *         /     \
             *        5       6
             *       /         \
             *      7           8
             * Đường kính đi từ 7 -> 5 -> 3 -> 2 -> 4 -> 6 -> 8 có độ dài 6 cạnh,
             * đi qua node 2 nhưng HOÀN TOÀN KHÔNG đi qua node 1 (Root)!
             */
            const node7 = new TreeNode(7)
            const node8 = new TreeNode(8)
            const node5 = new TreeNode(5, node7, null)
            const node6 = new TreeNode(6, null, node8)
            const node3 = new TreeNode(3, node5, null)
            const node4 = new TreeNode(4, null, node6)
            const node2 = new TreeNode(2, node3, node4)
            const root = new TreeNode(1, node2, null)

            expect(diameterOfBinaryTreeDFS(root)).toBe(6)
            expect(diameterOfBinaryTreeIterative(root)).toBe(6)
            expect(diameterOfBinaryTree(root)).toBe(6)
        })
    })

    describe('3. Kiểm thử tính bất biến đồng nhất (Equivalence Invariant)', () => {
        it('DFS Đệ quy và DFS Khử đệ quy phải luôn trả về cùng một kết quả', () => {
            for (const tc of testCases) {
                const rootDFS = arrayToTree(tc.input)
                const rootIter = arrayToTree(tc.input)

                expect(diameterOfBinaryTreeDFS(rootDFS)).toBe(
                    diameterOfBinaryTreeIterative(rootIter)
                )
            }
        })
    })
})
