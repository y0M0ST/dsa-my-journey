import { describe, it, expect } from 'vitest'
import {
    rightSideView,
    rightSideViewBFS,
    rightSideViewDFS,
    rightSideViewIterativeDFS,
} from './199-binary-tree-right-side-view.js'
import { arrayToTree } from '../../data_structures/tree/TreeNode.js'

describe('Pattern: Tree_BFS_DFS -> 199-binary-tree-right-side-view', () => {
    const testCases = [
        {
            desc: 'Ví dụ 1 LeetCode: Cây tiêu chuẩn [1, 2, 3, null, 5, null, 4]',
            input: [1, 2, 3, null, 5, null, 4],
            expected: [1, 3, 4],
        },
        {
            desc: 'Ví dụ 2 LeetCode: Nhánh trái sâu hơn nhánh phải [1, 2, 3, 4, null, null, null, 5]',
            input: [1, 2, 3, 4, null, null, null, 5],
            expected: [1, 3, 4, 5],
        },
        {
            desc: 'Ví dụ 3 LeetCode: Cây chỉ có nhánh phải [1, null, 3]',
            input: [1, null, 3],
            expected: [1, 3],
        },
        {
            desc: 'Ví dụ 4 LeetCode: Cây rỗng []',
            input: [],
            expected: [],
        },
        {
            desc: 'Cây chỉ có đúng 1 node gốc duy nhất [1]',
            input: [1],
            expected: [1],
        },
        {
            desc: 'Cây lệch hoàn toàn sang trái (Skewed Left): Mọi node trái đều nhìn thấy được',
            input: [1, 2, null, 3, null, 4],
            expected: [1, 2, 3, 4],
        },
        {
            desc: 'Cây lệch hoàn toàn sang phải (Skewed Right)',
            input: [1, null, 2, null, 3, null, 4],
            expected: [1, 2, 3, 4],
        },
        {
            desc: 'Cây nhị phân hoàn chỉnh 3 tầng đầy đủ [1, 2, 3, 4, 5, 6, 7]',
            input: [1, 2, 3, 4, 5, 6, 7],
            expected: [1, 3, 7],
        },
        {
            desc: 'Cây có giá trị âm và các tầng so le zigzag [-10, 9, 20, null, null, -15, 7]',
            input: [-10, 9, 20, null, null, -15, 7],
            expected: [-10, 20, 7],
        },
    ]

    describe('Phương pháp 1: BFS Quét Từng Tầng (Optimized Queue with Head Pointer)', () => {
        it.each(testCases)('$desc', ({ input, expected }) => {
            const root = arrayToTree(input)
            expect(rightSideViewBFS(root)).toEqual(expected)
            expect(rightSideView(root)).toEqual(expected)
        })
    })

    describe('Phương pháp 2: DFS Đệ Quy Đảo Ngược (Root -> Right -> Left)', () => {
        it.each(testCases)('$desc', ({ input, expected }) => {
            const root = arrayToTree(input)
            expect(rightSideViewDFS(root)).toEqual(expected)
        })
    })

    describe('Phương pháp 3: DFS Khử Đệ Quy bằng Explicit Stack', () => {
        it.each(testCases)('$desc', ({ input, expected }) => {
            const root = arrayToTree(input)
            expect(rightSideViewIterativeDFS(root)).toEqual(expected)
        })
    })

    describe('Kiểm tra tính tương đương tuyệt đối: BFS === DFS === IterativeDFS', () => {
        it.each(testCases)('3 phương pháp cho cùng kết quả trên $desc', ({ input }) => {
            const root1 = arrayToTree(input)
            const root2 = arrayToTree(input)
            const root3 = arrayToTree(input)

            const res1 = rightSideViewBFS(root1)
            const res2 = rightSideViewDFS(root2)
            const res3 = rightSideViewIterativeDFS(root3)

            expect(res1).toEqual(res2)
            expect(res2).toEqual(res3)
        })
    })

    describe('Edge Cases & Bẫy "Shadow Trap" đặc biệt', () => {
        it('Xử lý đúng trường hợp nhánh trái dài ngoằng vươn ra khỏi bóng của nhánh phải', () => {
            // Cấu trúc:
            //       1
            //      / \
            //     2   3
            //    /
            //   4
            //  /
            // 5
            const root = arrayToTree([1, 2, 3, 4, null, null, null, 5])
            expect(rightSideViewBFS(root)).toEqual([1, 3, 4, 5])
            expect(rightSideViewDFS(root)).toEqual([1, 3, 4, 5])
            expect(rightSideViewIterativeDFS(root)).toEqual([1, 3, 4, 5])
        })
    })
})
