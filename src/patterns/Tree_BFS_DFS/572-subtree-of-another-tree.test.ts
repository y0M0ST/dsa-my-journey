import { describe, it, expect } from 'vitest'
import { arrayToTree } from '../../data_structures/tree/TreeNode.js'
import {
    isSubtreeDFS,
    isSubtreeBFS,
    isSubtreeSerialization,
    isSubtree,
} from './572-subtree-of-another-tree.js'

describe('Pattern: Tree_BFS_DFS -> 572-subtree-of-another-tree (Subtree of Another Tree)', () => {
    const testCases: {
        name: string
        rootInput: (number | null)[]
        subRootInput: (number | null)[]
        expected: boolean
    }[] = [
        {
            name: 'LeetCode Ex 1: Cây con chuẩn [4, 1, 2] trong [3, 4, 5, 1, 2] -> true',
            rootInput: [3, 4, 5, 1, 2],
            subRootInput: [4, 1, 2],
            expected: true,
        },
        {
            name: 'LeetCode Ex 2: Cạm bẫy Partial Match [4, 1, 2] trong [3, 4, 5, 1, 2, null, null, null, null, 0] -> false (do dư node 0)',
            rootInput: [3, 4, 5, 1, 2, null, null, null, null, 0],
            subRootInput: [4, 1, 2],
            expected: false,
        },
        {
            name: 'Edge case: Cả hai cây chỉ có 1 node giống nhau [1] và [1] -> true',
            rootInput: [1],
            subRootInput: [1],
            expected: true,
        },
        {
            name: 'Edge case: Cả hai cây chỉ có 1 node khác nhau [1] và [2] -> false',
            rootInput: [1],
            subRootInput: [2],
            expected: false,
        },
        {
            name: 'Cây chính và cây con giống nhau hoàn toàn [1, 2, 3] và [1, 2, 3] -> true (Cây là subtree của chính nó)',
            rootInput: [1, 2, 3],
            subRootInput: [1, 2, 3],
            expected: true,
        },
        {
            name: 'Các node có giá trị trùng lặp [1, 1] và [1] -> true',
            rootInput: [1, 1],
            subRootInput: [1],
            expected: true,
        },
        {
            name: 'Cây lệch sâu một phía [1, null, 1, null, 1, null, 1, null, 1, 2] và [1, 2] -> true',
            rootInput: [1, null, 1, null, 1, null, 1, null, 1, 2],
            subRootInput: [1, 2],
            expected: true,
        },
        {
            name: 'Cạm bẫy giá trị tiền tố số (12 không phải là 2) [12] và [2] -> false',
            rootInput: [12],
            subRootInput: [2],
            expected: false,
        },
    ]

    describe('1. Kiểm thử tính đúng đắn trên 3 trường phái giải thuật', () => {
        for (const tc of testCases) {
            it(`[DFS + isSameTree] ${tc.name}`, () => {
                const root = arrayToTree(tc.rootInput)
                const subRoot = arrayToTree(tc.subRootInput)
                expect(isSubtreeDFS(root, subRoot)).toBe(tc.expected)
            })

            it(`[BFS Candidate Queue] ${tc.name}`, () => {
                const root = arrayToTree(tc.rootInput)
                const subRoot = arrayToTree(tc.subRootInput)
                expect(isSubtreeBFS(root, subRoot)).toBe(tc.expected)
            })

            it(`[Tree Serialization String Matching] ${tc.name}`, () => {
                const root = arrayToTree(tc.rootInput)
                const subRoot = arrayToTree(tc.subRootInput)
                expect(isSubtreeSerialization(root, subRoot)).toBe(tc.expected)
            })

            it(`[Default LeetCode Alias] ${tc.name}`, () => {
                const root = arrayToTree(tc.rootInput)
                const subRoot = arrayToTree(tc.subRootInput)
                expect(isSubtree(root, subRoot)).toBe(tc.expected)
            })
        }
    })

    describe('2. Kiểm thử tính bất biến đồng nhất (Equivalence Invariant)', () => {
        it('Cả 3 trường phái phải luôn cho ra kết quả đồng nhất tuyệt đối', () => {
            for (const tc of testCases) {
                const root = arrayToTree(tc.rootInput)
                const subRoot = arrayToTree(tc.subRootInput)

                const resDFS = isSubtreeDFS(root, subRoot)
                const resBFS = isSubtreeBFS(root, subRoot)
                const resSer = isSubtreeSerialization(root, subRoot)

                expect(resDFS).toBe(resBFS)
                expect(resBFS).toBe(resSer)
            }
        })
    })
})
