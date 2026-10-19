import { describe, it, expect } from 'vitest'
import {
    maxDepth,
    maxDepthDFS,
    maxDepthBFS,
    maxDepthIterativeDFS,
} from './104-maximum-depth-of-binary-tree.js'
import { arrayToTree } from '../../data_structures/tree/TreeNode.js'

describe('Pattern: Tree_BFS_DFS -> 104-maximum-depth-of-binary-tree', () => {
    const testCases = [
        {
            desc: 'Ví dụ 1 LeetCode: Cây chuẩn 3 tầng [3, 9, 20, null, null, 15, 7]',
            input: [3, 9, 20, null, null, 15, 7],
            expected: 3,
        },
        {
            desc: 'Ví dụ 2 LeetCode: Cây lệch phải [1, null, 2]',
            input: [1, null, 2],
            expected: 2,
        },
        {
            desc: 'Ví dụ 3 LeetCode: Cây rỗng []',
            input: [],
            expected: 0,
        },
        {
            desc: 'Cây chỉ có đúng 1 node gốc duy nhất [0]',
            input: [0],
            expected: 1,
        },
        {
            desc: 'Cây lệch hoàn toàn sang trái (Left-skewed Tree độ sâu 4)',
            input: [1, 2, null, 3, null, 4],
            expected: 4,
        },
        {
            desc: 'Cây lệch hoàn toàn sang phải (Right-skewed Tree độ sâu 4)',
            input: [1, null, 2, null, 3, null, 4],
            expected: 4,
        },
        {
            desc: 'Cây nhị phân hoàn hảo 4 tầng (15 nodes)',
            input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            expected: 4,
        },
        {
            desc: 'Cây ziczac (Zigzag Tree độ sâu 4)',
            input: [1, 2, null, null, 3, 4],
            expected: 4,
        },
        {
            desc: 'Cây không cân bằng với giá trị âm',
            input: [-10, 9, 20, null, null, -15, 7],
            expected: 3,
        },
    ]

    describe('Phương pháp 1: DFS Đệ Quy Post-order (Divide & Conquer)', () => {
        it.each(testCases)('$desc ($input -> $expected)', ({ input, expected }) => {
            const root = arrayToTree(input)
            expect(maxDepth(root)).toBe(expected)
            expect(maxDepthDFS(root)).toBe(expected)
        })
    })

    describe('Phương pháp 2: BFS Quét Từng Tầng (Optimized Queue with Head Pointer)', () => {
        it.each(testCases)('$desc ($input -> $expected)', ({ input, expected }) => {
            const root = arrayToTree(input)
            expect(maxDepthBFS(root)).toBe(expected)
        })
    })

    describe('Phương pháp 3: DFS Khử Đệ Quy bằng Explicit Stack', () => {
        it.each(testCases)('$desc ($input -> $expected)', ({ input, expected }) => {
            const root = arrayToTree(input)
            expect(maxDepthIterativeDFS(root)).toBe(expected)
        })
    })

    describe('Kiểm tra tính tương đương tuyệt đối: DFS === BFS === IterativeDFS', () => {
        it.each(testCases)('3 phương pháp cho cùng một kết quả chính xác trên $desc', ({ input }) => {
            const root1 = arrayToTree(input)
            const root2 = arrayToTree(input)
            const root3 = arrayToTree(input)

            const dfsResult = maxDepthDFS(root1)
            const bfsResult = maxDepthBFS(root2)
            const iterativeResult = maxDepthIterativeDFS(root3)

            expect(dfsResult).toBe(bfsResult)
            expect(bfsResult).toBe(iterativeResult)
        })
    })
})

