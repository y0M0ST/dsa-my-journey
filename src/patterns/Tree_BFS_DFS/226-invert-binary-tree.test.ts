import { describe, it, expect } from 'vitest'
import {
    invertTree,
    invertTreeDFS,
    invertTreeBFS,
    invertTreeIterativeDFS,
} from './226-invert-binary-tree.js'
import {
    arrayToTree,
    treeToArray,
} from '../../data_structures/tree/TreeNode.js'

describe('Pattern: Tree_BFS_DFS -> 226-invert-binary-tree', () => {
    const testCases = [
        {
            desc: 'Ví dụ 1 LeetCode: Cây nhị phân hoàn chỉnh [4, 2, 7, 1, 3, 6, 9]',
            input: [4, 2, 7, 1, 3, 6, 9],
            expected: [4, 7, 2, 9, 6, 3, 1],
        },
        {
            desc: 'Ví dụ 2 LeetCode: Cây 3 nodes [2, 1, 3]',
            input: [2, 1, 3],
            expected: [2, 3, 1],
        },
        {
            desc: 'Ví dụ 3 LeetCode: Cây rỗng []',
            input: [],
            expected: [],
        },
        {
            desc: 'Cây chỉ có đúng 1 node gốc duy nhất [1]',
            input: [1],
            expected: [1],
        },
        {
            desc: 'Cây lệch hoàn toàn sang trái [1, 2, null, 3] -> Đảo thành lệch phải [1, null, 2, null, 3]',
            input: [1, 2, null, 3],
            expected: [1, null, 2, null, 3],
        },
        {
            desc: 'Cây lệch hoàn toàn sang phải [1, null, 2, null, 3] -> Đảo thành lệch trái [1, 2, null, 3]',
            input: [1, null, 2, null, 3],
            expected: [1, 2, null, 3],
        },
        {
            desc: 'Cây có giá trị âm và không đối xứng [-10, 9, 20, null, null, -15, 7]',
            input: [-10, 9, 20, null, null, -15, 7],
            expected: [-10, 20, 9, 7, -15],
        },
    ]

    describe('Phương pháp 1: DFS Đệ Quy (Post-order / Pre-order Traversal)', () => {
        it.each(testCases)('$desc', ({ input, expected }) => {
            const root1 = arrayToTree(input)
            const inverted1 = invertTree(root1)
            expect(treeToArray(inverted1)).toEqual(expected)

            const root2 = arrayToTree(input)
            const inverted2 = invertTreeDFS(root2)
            expect(treeToArray(inverted2)).toEqual(expected)
        })
    })

    describe('Phương pháp 2: BFS Quét Từng Tầng (Optimized Queue with Head Pointer)', () => {
        it.each(testCases)('$desc', ({ input, expected }) => {
            const root = arrayToTree(input)
            const inverted = invertTreeBFS(root)
            expect(treeToArray(inverted)).toEqual(expected)
        })
    })

    describe('Phương pháp 3: DFS Khử Đệ Quy bằng Explicit Stack', () => {
        it.each(testCases)('$desc', ({ input, expected }) => {
            const root = arrayToTree(input)
            const inverted = invertTreeIterativeDFS(root)
            expect(treeToArray(inverted)).toEqual(expected)
        })
    })
})
