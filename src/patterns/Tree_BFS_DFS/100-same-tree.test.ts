import { describe, it, expect } from 'vitest'
import {
    isSameTree,
    isSameTreeDFS,
    isSameTreeBFS,
    isSameTreeIterativeDFS,
} from './100-same-tree.js'
import { arrayToTree, TreeNode } from '../../data_structures/tree/TreeNode.js'

describe('Pattern: Tree_BFS_DFS -> 100-same-tree', () => {
    const testCases = [
        {
            desc: 'Ví dụ 1 LeetCode: Hai cây nhị phân hoàn toàn giống nhau [1, 2, 3] và [1, 2, 3]',
            p: [1, 2, 3],
            q: [1, 2, 3],
            expected: true,
        },
        {
            desc: 'Ví dụ 2 LeetCode: Sai lệch về cấu trúc hình học [1, 2] và [1, null, 2]',
            p: [1, 2],
            q: [1, null, 2],
            expected: false,
        },
        {
            desc: 'Ví dụ 3 LeetCode: Cùng cấu trúc đối xứng nhưng khác giá trị node con [1, 2, 1] và [1, 1, 2]',
            p: [1, 2, 1],
            q: [1, 1, 2],
            expected: false,
        },
        {
            desc: 'Cả hai cây đều là cây rỗng [] và []',
            p: [],
            q: [],
            expected: true,
        },
        {
            desc: 'Cây p rỗng còn cây q có một node [] và [1]',
            p: [],
            q: [1],
            expected: false,
        },
        {
            desc: 'Cây p có một node còn cây q rỗng [1] và []',
            p: [1],
            q: [],
            expected: false,
        },
        {
            desc: 'Cả hai cây chỉ có đúng 1 node cùng giá trị [42] và [42]',
            p: [42],
            q: [42],
            expected: true,
        },
        {
            desc: 'Cả hai cây chỉ có đúng 1 node nhưng khác giá trị [1] và [2]',
            p: [1],
            q: [2],
            expected: false,
        },
        {
            desc: 'Hai cây lệch hoàn toàn sang trái giống nhau [1, 2, null, 3, null, 4]',
            p: [1, 2, null, 3, null, 4],
            q: [1, 2, null, 3, null, 4],
            expected: true,
        },
        {
            desc: 'Hai cây lệch sâu sang trái nhưng node lá sâu nhất khác giá trị',
            p: [1, 2, null, 3, null, 4],
            q: [1, 2, null, 3, null, 99],
            expected: false,
        },
        {
            desc: 'Hai cây lệch sâu sang phải giống nhau [1, null, 2, null, 3, null, 4]',
            p: [1, null, 2, null, 3, null, 4],
            q: [1, null, 2, null, 3, null, 4],
            expected: true,
        },
        {
            desc: 'Hai cây là ảnh gương của nhau nhưng không đồng nhất [1, 2, 3] và [1, 3, 2]',
            p: [1, 2, 3],
            q: [1, 3, 2],
            expected: false,
        },
        {
            desc: 'Cây có giá trị âm và số 0 [-10, 0, -5, null, 20] và [-10, 0, -5, null, 20]',
            p: [-10, 0, -5, null, 20],
            q: [-10, 0, -5, null, 20],
            expected: true,
        },
        {
            desc: 'Cây nhị phân hoàn chỉnh 3 tầng đầy đủ [1, 2, 3, 4, 5, 6, 7]',
            p: [1, 2, 3, 4, 5, 6, 7],
            q: [1, 2, 3, 4, 5, 6, 7],
            expected: true,
        },
        {
            desc: 'Cây nhị phân hoàn chỉnh nhưng khuyết 1 node lá [1, 2, 3, 4, 5, 6, null] vs [1, 2, 3, 4, 5, 6, 7]',
            p: [1, 2, 3, 4, 5, 6, null],
            q: [1, 2, 3, 4, 5, 6, 7],
            expected: false,
        },
    ]

    describe('Phương pháp 1: DFS Đệ Quy (Pre-order / Divide & Conquer)', () => {
        it.each(testCases)('$desc', ({ p, q, expected }) => {
            const treeP = arrayToTree(p)
            const treeQ = arrayToTree(q)
            expect(isSameTreeDFS(treeP, treeQ)).toBe(expected)
            expect(isSameTree(treeP, treeQ)).toBe(expected)
        })
    })

    describe('Phương pháp 2: BFS Duyệt Tầng Đồng Bộ (Queue with Head Pointer)', () => {
        it.each(testCases)('$desc', ({ p, q, expected }) => {
            const treeP = arrayToTree(p)
            const treeQ = arrayToTree(q)
            expect(isSameTreeBFS(treeP, treeQ)).toBe(expected)
        })
    })

    describe('Phương pháp 3: DFS Khử Đệ Quy bằng Explicit Stack', () => {
        it.each(testCases)('$desc', ({ p, q, expected }) => {
            const treeP = arrayToTree(p)
            const treeQ = arrayToTree(q)
            expect(isSameTreeIterativeDFS(treeP, treeQ)).toBe(expected)
        })
    })

    describe('Kiểm tra tính tương đương tuyệt đối: DFS === BFS === IterativeDFS', () => {
        it.each(testCases)('3 phương pháp luôn cho kết quả trùng khớp trên $desc', ({ p, q }) => {
            const treeP1 = arrayToTree(p)
            const treeQ1 = arrayToTree(q)
            const treeP2 = arrayToTree(p)
            const treeQ2 = arrayToTree(q)
            const treeP3 = arrayToTree(p)
            const treeQ3 = arrayToTree(q)

            const res1 = isSameTreeDFS(treeP1, treeQ1)
            const res2 = isSameTreeBFS(treeP2, treeQ2)
            const res3 = isSameTreeIterativeDFS(treeP3, treeQ3)

            expect(res1).toBe(res2)
            expect(res2).toBe(res3)
        })
    })

    describe('Tối ưu hóa con trỏ cùng địa chỉ nhớ (Same Memory Reference Check)', () => {
        it('Trả về true ngay lập tức khi p và q trỏ vào cùng một đối tượng cây trong bộ nhớ Heap', () => {
            const sharedTree = arrayToTree([1, 2, 3, 4, 5, 6, 7])
            expect(isSameTreeDFS(sharedTree, sharedTree)).toBe(true)
            expect(isSameTreeBFS(sharedTree, sharedTree)).toBe(true)
            expect(isSameTreeIterativeDFS(sharedTree, sharedTree)).toBe(true)
        })

        it('Trả về true ngay lập tức khi cả hai cùng là null', () => {
            expect(isSameTreeDFS(null, null)).toBe(true)
            expect(isSameTreeBFS(null, null)).toBe(true)
            expect(isSameTreeIterativeDFS(null, null)).toBe(true)
        })
    })
})
