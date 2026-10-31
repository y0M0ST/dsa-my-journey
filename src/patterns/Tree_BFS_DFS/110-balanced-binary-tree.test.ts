import { describe, it, expect } from 'vitest'
import { arrayToTree } from '../../data_structures/tree/TreeNode.js'
import {
    isBalancedDFS,
    isBalancedIterative,
    isBalancedTopDown,
    isBalanced,
} from './110-balanced-binary-tree.js'

describe('Pattern: Tree_BFS_DFS -> 110-balanced-binary-tree (Balanced Binary Tree)', () => {
    const testCases: {
        name: string
        input: (number | null)[]
        expected: boolean
    }[] = [
        {
            name: 'LeetCode Ex 1: Cây cân bằng [3, 9, 20, null, null, 15, 7] -> true',
            input: [3, 9, 20, null, null, 15, 7],
            expected: true,
        },
        {
            name: 'LeetCode Ex 2: Cây mất cân bằng [1, 2, 2, 3, 3, null, null, 4, 4] -> false',
            input: [1, 2, 2, 3, 3, null, null, 4, 4],
            expected: false,
        },
        {
            name: 'Edge case: Cây rỗng [] -> true (mặc định cân bằng)',
            input: [],
            expected: true,
        },
        {
            name: 'Edge case: Cây chỉ có 1 node [1] -> true',
            input: [1],
            expected: true,
        },
        {
            name: 'Edge case: Cây 2 node [1, 2] -> true (chênh lệch đúng 1 tầng)',
            input: [1, 2],
            expected: true,
        },
        {
            name: 'Edge case: Cây 3 node lệch một phía [1, 2, null, 3] -> false (chênh lệch 2 tầng)',
            input: [1, 2, null, 3],
            expected: false,
        },
        {
            name: 'Cây cân bằng hoàn hảo 3 tầng [1, 2, 3, 4, 5, 6, 7] -> true',
            input: [1, 2, 3, 4, 5, 6, 7],
            expected: true,
        },
        {
            name: 'Cạm bẫy: Cây con mất cân bằng sâu bên dưới dù tầng gốc cân bằng [1, 2, 2, 3, null, null, 3, 4, null, null, 4] -> false',
            input: [1, 2, 2, 3, null, null, 3, 4, null, null, 4],
            expected: false,
        },
    ]

    describe('1. Kiểm thử tính đúng đắn trên 3 trường phái giải thuật', () => {
        for (const tc of testCases) {
            it(`[DFS Đệ Quy Tỉa Nhánh -1] ${tc.name}`, () => {
                const root = arrayToTree(tc.input)
                expect(isBalancedDFS(root)).toBe(tc.expected)
            })

            it(`[Khử Đệ Quy Explicit Stack] ${tc.name}`, () => {
                const root = arrayToTree(tc.input)
                expect(isBalancedIterative(root)).toBe(tc.expected)
            })

            it(`[Top-Down Naive DFS] ${tc.name}`, () => {
                const root = arrayToTree(tc.input)
                expect(isBalancedTopDown(root)).toBe(tc.expected)
            })

            it(`[Default LeetCode Alias] ${tc.name}`, () => {
                const root = arrayToTree(tc.input)
                expect(isBalanced(root)).toBe(tc.expected)
            })
        }
    })

    describe('2. Kiểm thử tính bất biến đồng nhất (Equivalence Invariant)', () => {
        it('Cả 3 trường phái phải luôn cho ra kết quả đồng nhất tuyệt đối trên mọi cấu trúc cây', () => {
            for (const tc of testCases) {
                const root = arrayToTree(tc.input)
                const resDFS = isBalancedDFS(root)
                const resIter = isBalancedIterative(root)
                const resTopDown = isBalancedTopDown(root)

                expect(resDFS).toBe(resIter)
                expect(resIter).toBe(resTopDown)
            }
        })
    })
})
