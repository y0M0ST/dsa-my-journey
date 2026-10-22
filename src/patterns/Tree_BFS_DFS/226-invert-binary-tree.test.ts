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
    TreeNode,
    isSameTree,
    cloneTree,
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

    describe('Kiểm tra tính tương đương tuyệt đối: DFS === BFS === IterativeDFS', () => {
        it.each(testCases)('3 phương pháp cho cùng kết quả trên $desc', ({ input }) => {
            const root1 = arrayToTree(input)
            const root2 = arrayToTree(input)
            const root3 = arrayToTree(input)

            const res1 = invertTreeDFS(root1)
            const res2 = invertTreeBFS(root2)
            const res3 = invertTreeIterativeDFS(root3)

            expect(treeToArray(res1)).toEqual(treeToArray(res2))
            expect(treeToArray(res2)).toEqual(treeToArray(res3))
            expect(isSameTree(res1, res2)).toBe(true)
            expect(isSameTree(res2, res3)).toBe(true)
        })
    })

    describe('Tính chất tự nghịch đảo (Involution Invariant: f(f(T)) === T)', () => {
        it.each(testCases)('Đảo ngược 2 lần phải khôi phục lại cấu trúc cây ban đầu ($desc)', ({ input }) => {
            const original = arrayToTree(input)
            const cloned = cloneTree(original)

            // Đảo ngược lần 1 rồi đảo ngược lần 2
            const invertedOnce = invertTreeDFS(cloned)
            const invertedTwice = invertTreeDFS(invertedOnce)

            expect(isSameTree(invertedTwice, original)).toBe(true)
            expect(treeToArray(invertedTwice)).toEqual(input)
        })
    })

    describe('Kiểm thử cây suy biến sâu (Deep Skewed Tree - 100 levels)', () => {
        it('Đảo ngược mượt mà cây suy biến 100 nodes lệch trái thành lệch phải mà không lỗi', () => {
            const depth = 100
            const root = new TreeNode(1)
            let curr = root
            for (let i = 2; i <= depth; i++) {
                curr.left = new TreeNode(i)
                curr = curr.left
            }

            // Đảo ngược bằng DFS
            const inverted = invertTreeDFS(root)
            expect(inverted).not.toBeNull()
            expect(inverted!.val).toBe(1)
            expect(inverted!.left).toBeNull()
            expect(inverted!.right).not.toBeNull()

            // Kiểm tra toàn bộ chuỗi đã chuyển sang nhánh right
            let checkCurr = inverted
            for (let i = 2; i <= depth; i++) {
                expect(checkCurr!.left).toBeNull()
                expect(checkCurr!.right).not.toBeNull()
                expect(checkCurr!.right!.val).toBe(i)
                checkCurr = checkCurr!.right
            }

            // Đảo ngược lại bằng BFS để khôi phục lệch trái
            const restored = invertTreeBFS(inverted)
            let restoreCurr = restored
            for (let i = 2; i <= depth; i++) {
                expect(restoreCurr!.right).toBeNull()
                expect(restoreCurr!.left).not.toBeNull()
                expect(restoreCurr!.left!.val).toBe(i)
                restoreCurr = restoreCurr!.left
            }
        })
    })
})
