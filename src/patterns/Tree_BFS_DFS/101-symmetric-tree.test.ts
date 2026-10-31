import { describe, it, expect } from 'vitest'
import { arrayToTree } from '../../data_structures/tree/TreeNode.js'
import {
    isSymmetricDFS,
    isSymmetricBFS,
    isSymmetricIterativeStack,
    isSymmetric,
} from './101-symmetric-tree.js'

describe('Pattern: Tree_BFS_DFS -> 101-symmetric-tree (Symmetric Tree)', () => {
    const testCases: {
        name: string
        input: (number | null)[]
        expected: boolean
    }[] = [
        {
            name: 'LeetCode Ex 1: Cây đối xứng hoàn hảo [1,2,2,3,4,4,3]',
            input: [1, 2, 2, 3, 4, 4, 3],
            expected: true,
        },
        {
            name: 'LeetCode Ex 2: Cây bất đối xứng cấu trúc [1,2,2,null,3,null,3]',
            input: [1, 2, 2, null, 3, null, 3],
            expected: false,
        },
        {
            name: 'Edge case: Cây rỗng [] -> Đối xứng hiển nhiên (true)',
            input: [],
            expected: true,
        },
        {
            name: 'Edge case: Cây chỉ có 1 node gốc [1] -> Đối xứng (true)',
            input: [1],
            expected: true,
        },
        {
            name: 'Cây 2 tầng đối xứng [1, 2, 2]',
            input: [1, 2, 2],
            expected: true,
        },
        {
            name: 'Cây 2 tầng bất đối xứng giá trị [1, 2, 3]',
            input: [1, 2, 3],
            expected: false,
        },
        {
            name: 'Cây bất đối xứng cấu trúc nhánh trong [1, 2, 2, null, 3, 3, null]',
            input: [1, 2, 2, null, 3, 3, null],
            expected: true,
        },
        {
            name: 'Cây có giá trị giống nhau nhưng lệch nhánh [1, 2, 2, 2, null, 2]',
            input: [1, 2, 2, 2, null, 2],
            expected: false,
        },
        {
            name: 'Cây lớn 4 tầng đối xứng hoàn hảo',
            input: [1, 2, 2, 3, 4, 4, 3, 5, 6, 7, 8, 8, 7, 6, 5],
            expected: true,
        },
        {
            name: 'Cây lớn 4 tầng có duy nhất 1 node ở tầng đáy bị sai khác',
            input: [
                1,
                2,
                2,
                3,
                4,
                4,
                3,
                5,
                6,
                7,
                8,
                8,
                7,
                6,
                999, // 999 khác 5
            ],
            expected: false,
        },
    ]

    describe('1. Kiểm thử tính đúng đắn trên 3 trường phái giải thuật', () => {
        for (const tc of testCases) {
            it(`[DFS Đệ Quy] ${tc.name}`, () => {
                const root = arrayToTree(tc.input)
                expect(isSymmetricDFS(root)).toBe(tc.expected)
            })

            it(`[BFS Hàng Đợi Tầng] ${tc.name}`, () => {
                const root = arrayToTree(tc.input)
                expect(isSymmetricBFS(root)).toBe(tc.expected)
            })

            it(`[DFS Explicit Stack] ${tc.name}`, () => {
                const root = arrayToTree(tc.input)
                expect(isSymmetricIterativeStack(root)).toBe(tc.expected)
            })

            it(`[Default LeetCode Alias] ${tc.name}`, () => {
                const root = arrayToTree(tc.input)
                expect(isSymmetric(root)).toBe(tc.expected)
            })
        }
    })

    describe('2. Kiểm thử tính bất biến và đồng nhất kết quả (3-way Equivalence)', () => {
        it('3 phương pháp phải trả về kết quả đồng nhất tuyệt đối trên mọi cây', () => {
            for (const tc of testCases) {
                const rootDFS = arrayToTree(tc.input)
                const rootBFS = arrayToTree(tc.input)
                const rootStack = arrayToTree(tc.input)

                const resDFS = isSymmetricDFS(rootDFS)
                const resBFS = isSymmetricBFS(rootBFS)
                const resStack = isSymmetricIterativeStack(rootStack)

                expect(resDFS).toBe(resBFS)
                expect(resBFS).toBe(resStack)
            }
        })
    })
})
