import { describe, it, expect } from 'vitest'
import { ListNode } from '../../data_structures/linked_list/ListNode.js'
import {
    removeNthFromEnd,
    removeNthFromEndTwoPointers,
    removeNthFromEndLength,
} from './19-remove-nth-node-from-end-of-list.js'

function arrayToList(arr: number[]): ListNode | null {
    if (arr.length === 0) return null
    const head = new ListNode(arr[0]!)
    let cur = head
    for (let i = 1; i < arr.length; i++) {
        cur.next = new ListNode(arr[i]!)
        cur = cur.next
    }
    return head
}

function listToArray(head: ListNode | null): number[] {
    const res: number[] = []
    let cur = head
    while (cur !== null) {
        res.push(cur.val)
        cur = cur.next
    }
    return res
}

describe('Pattern: Linked_List -> 19-remove-nth-node-from-end-of-list', () => {
    const implementations = [
        { name: 'removeNthFromEnd (Default)', fn: removeNthFromEnd },
        { name: 'removeNthFromEndTwoPointers (One-Pass O(1) Space)', fn: removeNthFromEndTwoPointers },
        { name: 'removeNthFromEndLength (Two-Pass Baseline)', fn: removeNthFromEndLength },
    ]

    describe.each(implementations)('$name', ({ fn }) => {
        it('xóa node thứ 2 từ đuôi trong danh sách [1, 2, 3, 4, 5] -> [1, 2, 3, 5]', () => {
            const head = arrayToList([1, 2, 3, 4, 5])
            const updated = fn(head, 2)
            expect(listToArray(updated)).toEqual([1, 2, 3, 5])
        })

        it('xóa node duy nhất trong danh sách 1 phần tử [1], n = 1 -> []', () => {
            const head = arrayToList([1])
            const updated = fn(head, 1)
            expect(listToArray(updated)).toEqual([])
        })

        it('xóa node đầu tiên (head) trong danh sách 2 phần tử [1, 2], n = 2 -> [2]', () => {
            const head = arrayToList([1, 2])
            const updated = fn(head, 2)
            expect(listToArray(updated)).toEqual([2])
        })

        it('xóa node đuôi (tail) trong danh sách 2 phần tử [1, 2], n = 1 -> [1]', () => {
            const head = arrayToList([1, 2])
            const updated = fn(head, 1)
            expect(listToArray(updated)).toEqual([1])
        })

        it('xóa node đầu tiên trong danh sách dài [10, 20, 30], n = 3 -> [20, 30]', () => {
            const head = arrayToList([10, 20, 30])
            const updated = fn(head, 3)
            expect(listToArray(updated)).toEqual([20, 30])
        })
    })

    describe('Equivalence Check', () => {
        it('cả hai phương pháp đồng nhất kết quả trên các cấu hình khác nhau', () => {
            const configs = [
                { arr: [1, 2, 3, 4, 5], n: 1 },
                { arr: [1, 2, 3, 4, 5], n: 5 },
                { arr: [1, 2, 3, 4, 5], n: 3 },
                { arr: [100, 200], n: 1 },
                { arr: [100, 200], n: 2 },
            ]

            for (const { arr, n } of configs) {
                const h1 = arrayToList(arr)
                const h2 = arrayToList(arr)
                expect(listToArray(removeNthFromEndTwoPointers(h1, n))).toEqual(
                    listToArray(removeNthFromEndLength(h2, n))
                )
            }
        })
    })
})
