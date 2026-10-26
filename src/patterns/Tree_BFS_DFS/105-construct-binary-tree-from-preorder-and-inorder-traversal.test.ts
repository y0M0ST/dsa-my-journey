import { describe, it, expect } from 'vitest'
import {
    buildTree,
    buildTreeHashMapDFS,
    buildTreeSentinelDFS,
    buildTreeIterative,
    buildTreeTypedArrayDFS,
} from './105-construct-binary-tree-from-preorder-and-inorder-traversal.js'
import {
    treeToArray,
    isSameTree,
    preorderTraversal,
    inorderTraversal,
} from '../../data_structures/tree/TreeNode.js'

describe('Pattern: Tree_BFS_DFS -> 105-construct-binary-tree-from-preorder-and-inorder-traversal', () => {
    const testCases = [
        {
            desc: 'Ví dụ 1 LeetCode: Cây nhị phân phân nhánh thông thường [3, 9, 20, null, null, 15, 7]',
            preorder: [3, 9, 20, 15, 7],
            inorder: [9, 3, 15, 20, 7],
            expectedArray: [3, 9, 20, null, null, 15, 7],
        },
        {
            desc: 'Ví dụ 2 LeetCode: Cây chỉ có đúng 1 node mang giá trị âm [-1]',
            preorder: [-1],
            inorder: [-1],
            expectedArray: [-1],
        },
        {
            desc: 'Cả hai mảng đều rỗng [] -> trả về null',
            preorder: [],
            inorder: [],
            expectedArray: [],
        },
        {
            desc: 'Hai mảng độ dài lệch nhau -> trả về null',
            preorder: [1, 2],
            inorder: [1],
            expectedArray: [],
        },
        {
            desc: 'Cây suy biến lệch hoàn toàn sang trái (Left-skewed tree)',
            preorder: [3, 2, 1],
            inorder: [1, 2, 3],
            expectedArray: [3, 2, null, 1],
        },
        {
            desc: 'Cây suy biến lệch hoàn toàn sang phải (Right-skewed tree)',
            preorder: [1, 2, 3],
            inorder: [1, 2, 3],
            expectedArray: [1, null, 2, null, 3],
        },
        {
            desc: 'Cây nhị phân đầy đủ 3 tầng (Full Binary Tree 7 nodes)',
            preorder: [1, 2, 4, 5, 3, 6, 7],
            inorder: [4, 2, 5, 1, 6, 3, 7],
            expectedArray: [1, 2, 3, 4, 5, 6, 7],
        },
        {
            desc: 'Cây zigzag đổi hướng liên tục (Root -> Left -> Right -> Left)',
            preorder: [1, 2, 3, 4],
            inorder: [2, 4, 3, 1],
            expectedArray: [1, 2, null, null, 3, 4],
        },
        {
            desc: 'Cây chứa cả số âm, số 0 và số dương [-20, -10, 0, 10, 20]',
            preorder: [0, -10, -20, 10, 20],
            inorder: [-20, -10, 0, 10, 20],
            expectedArray: [0, -10, 10, -20, null, null, 20],
        },
    ]

    describe('Kiểm thử giải pháp chính thức (buildTree = buildTreeHashMapDFS)', () => {
        testCases.forEach(({ desc, preorder, inorder, expectedArray }) => {
            it(desc, () => {
                const root = buildTree(preorder, inorder)
                expect(treeToArray(root)).toEqual(expectedArray)
            })
        })
    })

    describe('Kiểm thử giải pháp Sentinel Stop-Value DFS (buildTreeSentinelDFS)', () => {
        testCases.forEach(({ desc, preorder, inorder, expectedArray }) => {
            it(desc, () => {
                const root = buildTreeSentinelDFS(preorder, inorder)
                expect(treeToArray(root)).toEqual(expectedArray)
            })
        })
    })

    describe('Kiểm thử giải pháp Khử đệ quy bằng Explicit Stack (buildTreeIterative)', () => {
        testCases.forEach(({ desc, preorder, inorder, expectedArray }) => {
            it(desc, () => {
                const root = buildTreeIterative(preorder, inorder)
                expect(treeToArray(root)).toEqual(expectedArray)
            })
        })
    })

    describe('Kiểm thử giải pháp Tối ưu Cache TypedArray (buildTreeTypedArrayDFS)', () => {
        testCases.forEach(({ desc, preorder, inorder, expectedArray }) => {
            it(desc, () => {
                const root = buildTreeTypedArrayDFS(preorder, inorder)
                expect(treeToArray(root)).toEqual(expectedArray)
            })
        })
    })

    describe('Kiểm định tính đồng nhất đa trường phái (4-way Structural Equivalence)', () => {
        testCases.forEach(({ desc, preorder, inorder }) => {
            it(`Đồng nhất cấu trúc tuyệt đối giữa 4 cách: ${desc}`, () => {
                const treeDFS = buildTreeHashMapDFS(preorder, inorder)
                const treeSentinel = buildTreeSentinelDFS(preorder, inorder)
                const treeIterative = buildTreeIterative(preorder, inorder)
                const treeTypedArray = buildTreeTypedArrayDFS(preorder, inorder)

                expect(isSameTree(treeDFS, treeSentinel)).toBe(true)
                expect(isSameTree(treeDFS, treeIterative)).toBe(true)
                expect(isSameTree(treeDFS, treeTypedArray)).toBe(true)
                expect(isSameTree(treeSentinel, treeIterative)).toBe(true)
                expect(isSameTree(treeSentinel, treeTypedArray)).toBe(true)
            })
        })
    })

    describe('Kiểm định bất biến toán học duyệt cây (Traversal Roundtrip Invariant)', () => {
        testCases
            .filter(
                ({ preorder }) =>
                    preorder.length > 0 && preorder.length === testCases[0]?.preorder.length
            )
            .forEach(({ desc, preorder, inorder }) => {
                it(`Roundtrip: Preorder & Inorder sau khi tái dựng phải bảo toàn nguyên vẹn (${desc})`, () => {
                    const reconstructed = buildTree(preorder, inorder)

                    const actualPreorder = preorderTraversal(reconstructed)
                    const actualInorder = inorderTraversal(reconstructed)

                    expect(actualPreorder).toEqual(preorder)
                    expect(actualInorder).toEqual(inorder)
                })
            })

        it('Roundtrip trên cây hoàn chỉnh lớn 15 nodes', () => {
            const preorder = [1, 2, 4, 8, 9, 5, 10, 11, 3, 6, 12, 13, 7, 14, 15]
            const inorder = [8, 4, 9, 2, 10, 5, 11, 1, 12, 6, 13, 3, 14, 7, 15]

            const root = buildTree(preorder, inorder)

            expect(preorderTraversal(root)).toEqual(preorder)
            expect(inorderTraversal(root)).toEqual(inorder)
        })
    })
})
