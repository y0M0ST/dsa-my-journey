import { describe, it, expect, beforeEach } from 'vitest'
import { SinglyLinkedList } from './SinglyLinkedList.js'

describe('Singly Linked List (Danh Sách Liên Kết Đơn)', () => {
    let list: SinglyLinkedList

    beforeEach(() => {
        list = new SinglyLinkedList()
    })

    describe('1. Khởi tạo & Kiểm tra rỗng (Initialization & isEmpty)', () => {
        it('Khởi tạo danh sách mới phải rỗng', () => {
            expect(list.head).toBeNull()
            expect(list.tail).toBeNull()
            expect(list.length).toBe(0)
            expect(list.isEmpty()).toBe(true)
            expect(list.toArray()).toEqual([])
        })
    })

    describe('2. Thao tác thêm (Insert Operations)', () => {
        it('insertAtHead: Chèn vào đầu danh sách', () => {
            list.insertAtHead(10)
            expect(list.head?.val).toBe(10)
            expect(list.tail?.val).toBe(10)
            expect(list.length).toBe(1)

            list.insertAtHead(20)
            expect(list.head?.val).toBe(20)
            expect(list.tail?.val).toBe(10)
            expect(list.length).toBe(2)
            expect(list.toArray()).toEqual([20, 10])
        })

        it('insertAtTail: Chèn vào cuối danh sách', () => {
            list.insertAtTail(10)
            expect(list.head?.val).toBe(10)
            expect(list.tail?.val).toBe(10)

            list.insertAtTail(20)
            list.insertAtTail(30)
            expect(list.head?.val).toBe(10)
            expect(list.tail?.val).toBe(30)
            expect(list.length).toBe(3)
            expect(list.toArray()).toEqual([10, 20, 30])
        })

        it('insertAt: Chèn vào vị trí bất kỳ và kiểm tra Edge Cases', () => {
            // Chèn vào vị trí 0 khi list rỗng (tương đương insertAtHead)
            list.insertAt(0, 10)
            expect(list.toArray()).toEqual([10])

            // Chèn vào cuối list (index === length, tương đương insertAtTail)
            list.insertAt(1, 30)
            expect(list.toArray()).toEqual([10, 30])

            // Chèn vào giữa (index 1)
            list.insertAt(1, 20)
            expect(list.toArray()).toEqual([10, 20, 30])
            expect(list.length).toBe(3)

            // Chèn với index âm hoặc vượt quá length -> không thay đổi list
            list.insertAt(-1, 999)
            list.insertAt(100, 999)
            expect(list.length).toBe(3)
            expect(list.toArray()).toEqual([10, 20, 30])
        })
    })

    describe('3. Thao tác xóa (Delete Operations)', () => {
        it('deleteHead: Xóa phần tử đầu tiên', () => {
            // Xóa trên list rỗng không bị lỗi
            list.deleteHead()
            expect(list.length).toBe(0)

            // List 1 phần tử
            list.insertAtHead(10)
            list.deleteHead()
            expect(list.head).toBeNull()
            expect(list.tail).toBeNull()
            expect(list.length).toBe(0)

            // List nhiều phần tử
            list.insertAtTail(10)
            list.insertAtTail(20)
            list.insertAtTail(30)
            list.deleteHead()
            expect(list.head?.val).toBe(20)
            expect(list.tail?.val).toBe(30)
            expect(list.length).toBe(2)
            expect(list.toArray()).toEqual([20, 30])
        })

        it('deleteTail: Xóa phần tử cuối cùng', () => {
            // Xóa trên list rỗng không bị lỗi
            list.deleteTail()
            expect(list.length).toBe(0)

            // List 1 phần tử
            list.insertAtTail(10)
            list.deleteTail()
            expect(list.head).toBeNull()
            expect(list.tail).toBeNull()
            expect(list.length).toBe(0)

            // List nhiều phần tử
            list.insertAtTail(10)
            list.insertAtTail(20)
            list.insertAtTail(30)
            list.deleteTail()
            expect(list.head?.val).toBe(10)
            expect(list.tail?.val).toBe(20)
            expect(list.tail?.next).toBeNull()
            expect(list.length).toBe(2)
            expect(list.toArray()).toEqual([10, 20])
        })

        it('deleteAt: Xóa tại vị trí bất kỳ', () => {
            list.insertAtTail(10)
            list.insertAtTail(20)
            list.insertAtTail(30)
            list.insertAtTail(40)

            // Xóa ngoài vùng index -> không đổi
            list.deleteAt(-1)
            list.deleteAt(10)
            expect(list.length).toBe(4)

            // Xóa ở giữa (index 1 -> xóa số 20)
            list.deleteAt(1)
            expect(list.toArray()).toEqual([10, 30, 40])
            expect(list.length).toBe(3)

            // Xóa đầu (index 0)
            list.deleteAt(0)
            expect(list.toArray()).toEqual([30, 40])

            // Xóa đuôi (index === length - 1)
            list.deleteAt(1)
            expect(list.toArray()).toEqual([30])
            expect(list.head?.val).toBe(30)
            expect(list.tail?.val).toBe(30)
        })
    })

    describe('4. Thao tác tìm kiếm & truy xuất (Get & Search)', () => {
        beforeEach(() => {
            list.insertAtTail(100)
            list.insertAtTail(200)
            list.insertAtTail(300)
        })

        it('get: Lấy node theo index', () => {
            expect(list.get(0)?.val).toBe(100)
            expect(list.get(1)?.val).toBe(200)
            expect(list.get(2)?.val).toBe(300)
            expect(list.get(-1)).toBeNull()
            expect(list.get(3)).toBeNull()
        })

        it('search: Tìm index theo giá trị', () => {
            expect(list.search(100)).toBe(0)
            expect(list.search(200)).toBe(1)
            expect(list.search(300)).toBe(2)
            expect(list.search(999)).toBe(-1)
        })
    })

    describe('5. Đảo ngược danh sách (reverse - Tuyệt kĩ 3 con trỏ)', () => {
        it('Đảo ngược list rỗng hoặc 1 phần tử', () => {
            // Rỗng
            list.reverse()
            expect(list.toArray()).toEqual([])

            // 1 phần tử
            list.insertAtHead(10)
            list.reverse()
            expect(list.head?.val).toBe(10)
            expect(list.tail?.val).toBe(10)
        })

        it('Đảo ngược list 2 phần tử', () => {
            list.insertAtTail(10)
            list.insertAtTail(20)
            list.reverse()

            expect(list.toArray()).toEqual([20, 10])
            expect(list.head?.val).toBe(20)
            expect(list.tail?.val).toBe(10)
            expect(list.tail?.next).toBeNull()
        })

        it('Đảo ngược list nhiều phần tử [1, 2, 3, 4, 5]', () => {
            ;[1, 2, 3, 4, 5].forEach((val) => list.insertAtTail(val))

            list.reverse()

            expect(list.toArray()).toEqual([5, 4, 3, 2, 1])
            expect(list.head?.val).toBe(5)
            expect(list.tail?.val).toBe(1)
            expect(list.tail?.next).toBeNull()
            expect(list.length).toBe(5)
        })
    })

    describe('6. Tiện ích & Xóa theo giá trị (removeValue, contains, clear)', () => {
        it('removeValue: Xóa node theo giá trị và xử lý edge cases', () => {
            // List rỗng
            expect(list.removeValue(10)).toBe(false)

            // List có 1 phần tử và xóa chính nó
            list.insertAtHead(10)
            expect(list.removeValue(10)).toBe(true)
            expect(list.head).toBeNull()
            expect(list.tail).toBeNull()
            expect(list.length).toBe(0)

            // Tạo list [10, 20, 30, 40]
            ;[10, 20, 30, 40].forEach((v) => list.insertAtTail(v))

            // Xóa ở giữa (20)
            expect(list.removeValue(20)).toBe(true)
            expect(list.toArray()).toEqual([10, 30, 40])
            expect(list.length).toBe(3)

            // Xóa ở tail (40) -> tail phải cập nhật về 30
            expect(list.removeValue(40)).toBe(true)
            expect(list.toArray()).toEqual([10, 30])
            expect(list.tail?.val).toBe(30)
            expect(list.tail?.next).toBeNull()
            expect(list.length).toBe(2)

            // Xóa ở head (10)
            expect(list.removeValue(10)).toBe(true)
            expect(list.toArray()).toEqual([30])
            expect(list.head?.val).toBe(30)
            expect(list.tail?.val).toBe(30)

            // Giá trị không tồn tại
            expect(list.removeValue(999)).toBe(false)
        })

        it('contains: Kiểm tra tồn tại giá trị trong danh sách', () => {
            expect(list.contains(5)).toBe(false)
            list.insertAtTail(5)
            list.insertAtTail(15)
            expect(list.contains(5)).toBe(true)
            expect(list.contains(15)).toBe(true)
            expect(list.contains(25)).toBe(false)
        })

        it('clear: Xóa trắng toàn bộ danh sách', () => {
            ;[1, 2, 3].forEach((v) => list.insertAtTail(v))
            list.clear()

            expect(list.head).toBeNull()
            expect(list.tail).toBeNull()
            expect(list.length).toBe(0)
            expect(list.isEmpty()).toBe(true)
            expect(list.toArray()).toEqual([])
        })
    })

    describe('7. Thuật toán Rùa & Thỏ: Tìm node giữa (findMiddle - LC876)', () => {
        it('findMiddle trên list rỗng trả về null', () => {
            expect(list.findMiddle()).toBeNull()
        })

        it('findMiddle trên list 1 phần tử [10] trả về node chính nó', () => {
            list.insertAtHead(10)
            expect(list.findMiddle()?.val).toBe(10)
        })

        it('findMiddle trên list số phần tử lẻ [1, 2, 3, 4, 5] trả về node giữa (3)', () => {
            ;[1, 2, 3, 4, 5].forEach((v) => list.insertAtTail(v))
            expect(list.findMiddle()?.val).toBe(3)
        })

        it('findMiddle trên list số phần tử chẵn [1, 2, 3, 4] trả về node giữa thứ hai (3)', () => {
            ;[1, 2, 3, 4].forEach((v) => list.insertAtTail(v))
            expect(list.findMiddle()?.val).toBe(3)
        })
    })

    describe('8. Thuật toán Floyd phát hiện chu trình (hasCycle - LC141)', () => {
        it('hasCycle trả về false với list rỗng hoặc 1 node không có chu trình', () => {
            expect(list.hasCycle()).toBe(false)

            list.insertAtHead(1)
            expect(list.hasCycle()).toBe(false)
        })

        it('hasCycle trả về false với list tuyến tính nhiều node', () => {
            ;[1, 2, 3, 4, 5].forEach((v) => list.insertAtTail(v))
            expect(list.hasCycle()).toBe(false)
        })

        it('hasCycle trả về true khi tail nối về head tạo chu trình khép kín', () => {
            ;[1, 2, 3].forEach((v) => list.insertAtTail(v))
            // Tạo chu trình thủ công: 3 -> 1
            list.tail!.next = list.head

            expect(list.hasCycle()).toBe(true)

            // Ngắt chu trình để tránh memory leak sau khi test
            list.tail!.next = null
        })

        it('hasCycle trả về true khi tail nối vào node ở giữa (chu trình hình chiếc thìa/lasso)', () => {
            ;[1, 2, 3, 4, 5].forEach((v) => list.insertAtTail(v))
            const middleNode = list.get(2) // node 3
            list.tail!.next = middleNode

            expect(list.hasCycle()).toBe(true)

            // Dọn dẹp chu trình
            list.tail!.next = null
        })
    })

    describe('9. Factory Method & Iterator Protocol (fromArray, for...of, spread)', () => {
        it('fromArray: Tạo danh sách nhanh từ mảng JavaScript', () => {
            const newList = SinglyLinkedList.fromArray([10, 20, 30])
            expect(newList.length).toBe(3)
            expect(newList.head?.val).toBe(10)
            expect(newList.tail?.val).toBe(30)
            expect(newList.toArray()).toEqual([10, 20, 30])
        })

        it('fromArray: Tạo danh sách từ mảng rỗng', () => {
            const emptyList = SinglyLinkedList.fromArray([])
            expect(emptyList.isEmpty()).toBe(true)
            expect(emptyList.head).toBeNull()
            expect(emptyList.tail).toBeNull()
        })

        it('fromArray: Tạo danh sách từ mảng có 1 phần tử duy nhất', () => {
            const singleList = SinglyLinkedList.fromArray([42])
            expect(singleList.length).toBe(1)
            expect(singleList.head?.val).toBe(42)
            expect(singleList.tail?.val).toBe(42)
            expect(singleList.head).toBe(singleList.tail)
            expect(singleList.toArray()).toEqual([42])
        })

        it('fromArray: Duyệt và bảo toàn cấu trúc với chuỗi dữ liệu lớn', () => {
            const nums = Array.from({ length: 100 }, (_, i) => i + 1)
            const largeList = SinglyLinkedList.fromArray(nums)
            expect(largeList.length).toBe(100)
            expect(largeList.head?.val).toBe(1)
            expect(largeList.tail?.val).toBe(100)
            expect(largeList.toArray()).toEqual(nums)
        })

        it('for...of loop: Duyệt danh sách trực tiếp qua Symbol.iterator', () => {
            const values = [1, 2, 3, 4]
            values.forEach((v) => list.insertAtTail(v))

            const collected: number[] = []
            for (const val of list) {
                collected.push(val)
            }

            expect(collected).toEqual([1, 2, 3, 4])
        })

        it('Spread operator [...list]: Giải nén các phần tử trực tiếp', () => {
            ;[5, 10, 15].forEach((v) => list.insertAtTail(v))
            expect([...list]).toEqual([5, 10, 15])
        })
    })
})
