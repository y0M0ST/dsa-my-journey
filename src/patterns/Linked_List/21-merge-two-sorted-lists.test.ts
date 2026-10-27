import { describe, it, expect } from 'vitest'
import { mergeTwoLists, mergeTwoListsZeroAlloc } from './21-merge-two-sorted-lists.js'
import { ListNode } from '../../data_structures/linked_list/ListNode.js'

// Helper 1: Biến mảng [1, 2, 4] thành Linked List (1 -> 2 -> 4 -> null)
function arrayToList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null
    const head = new ListNode(arr[0])
    let current = head
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i])
        current = current.next
    }
    return head
}

// Helper 2: Biến Linked List thành mảng để Vitest so sánh (toEqual)
function listToArray(head: ListNode | null): number[] {
    const result: number[] = []
    let current = head
    while (current !== null) {
        result.push(current.val)
        current = current.next
    }
    return result
}

describe('Pattern: Linked_List -> 21-merge-two-sorted-lists', () => {
    const testCases = [
        {
            desc: 'Ví dụ 1 LeetCode: Hai danh sách độ dài bằng nhau',
            list1: [1, 2, 4],
            list2: [1, 3, 4],
            expected: [1, 1, 2, 3, 4, 4],
        },
        {
            desc: 'Ví dụ 2 LeetCode: Cả 2 danh sách đều rỗng',
            list1: [],
            list2: [],
            expected: [],
        },
        {
            desc: 'Ví dụ 3 LeetCode: list1 rỗng, list2 có 1 phần tử',
            list1: [],
            list2: [0],
            expected: [0],
        },
        {
            desc: 'list2 rỗng, list1 có phần tử',
            list1: [5, 10, 15],
            list2: [],
            expected: [5, 10, 15],
        },
        {
            desc: 'Hai danh sách có độ dài lệch nhau lớn',
            list1: [1, 2],
            list2: [3, 4, 5, 6, 7],
            expected: [1, 2, 3, 4, 5, 6, 7],
        },
        {
            desc: 'Các phần tử toàn số trùng lặp',
            list1: [2, 2, 2],
            list2: [2, 2],
            expected: [2, 2, 2, 2, 2],
        },
        {
            desc: 'Mảng chứa số âm xen kẽ số dương',
            list1: [-10, -5, 0, 3],
            list2: [-7, -2, 4, 8],
            expected: [-10, -7, -5, -2, 0, 3, 4, 8],
        },
        {
            desc: 'Một danh sách toàn phần tử nhỏ hơn danh sách kia hoàn toàn',
            list1: [1, 2, 3],
            list2: [10, 20, 30],
            expected: [1, 2, 3, 10, 20, 30],
        },
    ]

    describe('Cách 1: Dummy Head Node (mergeTwoLists)', () => {
        it.each(testCases)(
            '$desc ($list1 và $list2 -> $expected)',
            ({ list1, list2, expected }) => {
                const l1 = arrayToList(list1)
                const l2 = arrayToList(list2)
                const merged = mergeTwoLists(l1, l2)
                expect(listToArray(merged)).toEqual(expected)
            }
        )
    })

    describe('Cách 2: Zero-Allocation (mergeTwoListsZeroAlloc)', () => {
        it.each(testCases)(
            '$desc ($list1 và $list2 -> $expected)',
            ({ list1, list2, expected }) => {
                const l1 = arrayToList(list1)
                const l2 = arrayToList(list2)
                const merged = mergeTwoListsZeroAlloc(l1, l2)
                expect(listToArray(merged)).toEqual(expected)
            }
        )

        it('Kiểm tra tính tương đương tuyệt đối giữa Dummy Head và Zero-Alloc', () => {
            const arr1 = [1, 3, 5, 7, 9]
            const arr2 = [2, 4, 6, 8, 10]

            const resDummy = listToArray(mergeTwoLists(arrayToList(arr1), arrayToList(arr2)))
            const resZeroAlloc = listToArray(
                mergeTwoListsZeroAlloc(arrayToList(arr1), arrayToList(arr2))
            )

            expect(resZeroAlloc).toEqual(resDummy)
            expect(resZeroAlloc).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        })
    })
})
