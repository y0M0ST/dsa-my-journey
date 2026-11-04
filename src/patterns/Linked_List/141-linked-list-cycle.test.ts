import { describe, it, expect } from 'vitest'
import { ListNode } from '../../data_structures/linked_list/ListNode.js'
import { hasCycle, hasCycleFloyd, hasCycleSet } from './141-linked-list-cycle.js'

/**
 * Helper tạo linked list từ mảng số và nối đuôi về node ở index pos (-1 nếu không có chu trình).
 */
function createLinkedListWithCycle(values: number[], pos: number): ListNode | null {
    if (values.length === 0) return null

    const nodes: ListNode[] = values.map((val) => new ListNode(val))
    for (let i = 0; i < nodes.length - 1; i++) {
        nodes[i]!.next = nodes[i + 1]!
    }

    if (pos >= 0 && pos < nodes.length) {
        nodes[nodes.length - 1]!.next = nodes[pos]!
    }

    return nodes[0]!
}

describe('Pattern: Linked_List -> 141-linked-list-cycle', () => {
    const implementations = [
        { name: 'hasCycle (Default)', fn: hasCycle },
        { name: 'hasCycleFloyd (O(1) Space)', fn: hasCycleFloyd },
        { name: 'hasCycleSet (O(N) Space)', fn: hasCycleSet },
    ]

    describe.each(implementations)('$name', ({ fn }) => {
        it('phát hiện chu trình tại vị trí pos = 1 trong mảng [3, 2, 0, -4]', () => {
            const head = createLinkedListWithCycle([3, 2, 0, -4], 1)
            expect(fn(head)).toBe(true)
        })

        it('phát hiện chu trình tại vị trí pos = 0 trong mảng [1, 2]', () => {
            const head = createLinkedListWithCycle([1, 2], 0)
            expect(fn(head)).toBe(true)
        })

        it('trả về false khi danh sách 1 node không có chu trình pos = -1', () => {
            const head = createLinkedListWithCycle([1], -1)
            expect(fn(head)).toBe(false)
        })

        it('phát hiện chu trình tự trỏ vào chính mình (self-loop) pos = 0 với 1 node [1]', () => {
            const head = createLinkedListWithCycle([1], 0)
            expect(fn(head)).toBe(true)
        })

        it('trả về false với danh sách rỗng null', () => {
            expect(fn(null)).toBe(false)
        })

        it('trả về false với danh sách tuyến tính dài không có chu trình', () => {
            const head = createLinkedListWithCycle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], -1)
            expect(fn(head)).toBe(false)
        })

        it('phát hiện chu trình lớn khi node cuối nối về node giữa (pos = 5)', () => {
            const head = createLinkedListWithCycle([10, 20, 30, 40, 50, 60, 70, 80], 5)
            expect(fn(head)).toBe(true)
        })
    })

    describe('Equivalence Check between Floyd and Set tracking', () => {
        it('cả hai phương pháp đồng nhất kết quả trên các cấu hình khác nhau', () => {
            const configs = [
                { vals: [1, 2, 3], pos: -1 },
                { vals: [1, 2, 3], pos: 0 },
                { vals: [1, 2, 3], pos: 2 },
                { vals: [5], pos: -1 },
                { vals: [5], pos: 0 },
                { vals: [], pos: -1 },
            ]

            for (const { vals, pos } of configs) {
                const h1 = createLinkedListWithCycle(vals, pos)
                const h2 = createLinkedListWithCycle(vals, pos)
                expect(hasCycleFloyd(h1)).toBe(hasCycleSet(h2))
            }
        })
    })
})
