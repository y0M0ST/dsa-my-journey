import { describe, it, expect } from 'vitest'
import { levelOrder } from './102-binary-tree-level-order-traversal.js'
import { arrayToTree } from '../../data_structures/tree/TreeNode.js'

describe('Pattern: Tree_BFS_DFS -> 102-binary-tree-level-order-traversal (BFS Approach)', () => {
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
    ]

    it.each(testCases)('$desc ($input -> $expected)', ({ input, expected }) => {
        const root = arrayToTree(input)
        const result = levelOrder(root)
        expect(result).toEqual(expected)
    })
})
