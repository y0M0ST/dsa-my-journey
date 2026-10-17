import { describe, it, expect } from 'vitest'
import {
    levelOrder,
    levelOrderBFS,
    levelOrderDFS,
} from './102-binary-tree-level-order-traversal.js'
import { arrayToTree } from '../../data_structures/tree/TreeNode.js'

describe('Pattern: Tree_BFS_DFS -> 102-binary-tree-level-order-traversal', () => {
    const testCases = [
        {
            desc: 'Ví dụ 1 LeetCode: Cây chuẩn 3 tầng',
            input: [3, 9, 20, null, null, 15, 7],
            expected: [[3], [9, 20], [15, 7]],
        },
        {
            desc: 'Ví dụ 2 LeetCode: Cây chỉ có đúng 1 node gốc',
            input: [1],
            expected: [[1]],
        },
        {
            desc: 'Ví dụ 3 LeetCode: Cây rỗng hoàn toàn',
            input: [],
            expected: [],
        },
        {
            desc: 'Cây lệch hoàn toàn sang trái (Skewed Left Tree)',
            input: [1, 2, null, 3, null, 4],
            expected: [[1], [2], [3], [4]],
        },
        {
            desc: 'Cây lệch hoàn toàn sang phải (Skewed Right Tree)',
            input: [1, null, 2, null, 3],
            expected: [[1], [2], [3]],
        },
        {
            desc: 'Cây đầy đủ 3 tầng với các giá trị số âm và dương',
            input: [-10, 9, 20, null, null, -15, 7],
            expected: [[-10], [9, 20], [-15, 7]],
        },
        {
            desc: 'Cây nhị phân hoàn hảo 4 tầng (Perfect Binary Tree)',
            input: [1, 2, 3, 4, 5, 6, 7],
            expected: [[1], [2, 3], [4, 5, 6, 7]],
        },
        {
            desc: 'Cây không đối xứng (Asymmetrical Tree)',
            input: [1, 2, 3, null, 4, 5, null],
            expected: [[1], [2, 3], [4, 5]],
        },
        {
            desc: 'Cây ziczac (Zigzag Tree)',
            input: [1, 2, null, null, 3, 4],
            expected: [[1], [2], [3], [4]],
        },
    ]

    describe('Phương pháp 1: BFS (Optimized Queue with Head Pointer)', () => {
        it.each(testCases)('$desc ($input -> $expected)', ({ input, expected }) => {
            const root = arrayToTree(input)
            expect(levelOrder(root)).toEqual(expected)
            expect(levelOrderBFS(root)).toEqual(expected)
        })
    })

    describe('Phương pháp 2: DFS (Depth-Indexed Pre-order Recursion)', () => {
        it.each(testCases)('$desc ($input -> $expected)', ({ input, expected }) => {
            const root = arrayToTree(input)
            expect(levelOrderDFS(root)).toEqual(expected)
        })
    })

    describe('Kiểm tra tính tương đương tuyệt đối: BFS === DFS', () => {
        it.each(testCases)('BFS và DFS cho cùng kết quả trên $desc', ({ input }) => {
            const rootBfs = arrayToTree(input)
            const rootDfs = arrayToTree(input)

            const bfsResult = levelOrderBFS(rootBfs)
            const dfsResult = levelOrderDFS(rootDfs)

            expect(bfsResult).toEqual(dfsResult)
        })
    })
})
