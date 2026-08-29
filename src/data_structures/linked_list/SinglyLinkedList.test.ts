import { describe, it, expect, beforeEach } from 'vitest';
import { SinglyLinkedList } from './SinglyLinkedList.js';

describe('Singly Linked List (Danh Sách Liên Kết Đơn)', () => {
    let list: SinglyLinkedList;

    beforeEach(() => {
        list = new SinglyLinkedList();
    });

    describe('1. Khởi tạo & Kiểm tra rỗng (Initialization & isEmpty)', () => {
        it('Khởi tạo danh sách mới phải rỗng', () => {
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.length).toBe(0);
            expect(list.isEmpty()).toBe(true);
            expect(list.toArray()).toEqual([]);
        });
    });

    describe('2. Thao tác thêm (Insert Operations)', () => {
        it('insertAtHead: Chèn vào đầu danh sách', () => {
            list.insertAtHead(10);
            expect(list.head?.val).toBe(10);
            expect(list.tail?.val).toBe(10);
            expect(list.length).toBe(1);

            list.insertAtHead(20);
            expect(list.head?.val).toBe(20);
            expect(list.tail?.val).toBe(10);
            expect(list.length).toBe(2);
            expect(list.toArray()).toEqual([20, 10]);
        });

        it('insertAtTail: Chèn vào cuối danh sách', () => {
            list.insertAtTail(10);
            expect(list.head?.val).toBe(10);
            expect(list.tail?.val).toBe(10);

            list.insertAtTail(20);
            list.insertAtTail(30);
            expect(list.head?.val).toBe(10);
            expect(list.tail?.val).toBe(30);
            expect(list.length).toBe(3);
            expect(list.toArray()).toEqual([10, 20, 30]);
        });

        it('insertAt: Chèn vào vị trí bất kỳ và kiểm tra Edge Cases', () => {
            // Chèn vào vị trí 0 khi list rỗng (tương đương insertAtHead)
            list.insertAt(0, 10);
            expect(list.toArray()).toEqual([10]);

            // Chèn vào cuối list (index === length, tương đương insertAtTail)
            list.insertAt(1, 30);
            expect(list.toArray()).toEqual([10, 30]);

            // Chèn vào giữa (index 1)
            list.insertAt(1, 20);
            expect(list.toArray()).toEqual([10, 20, 30]);
            expect(list.length).toBe(3);

            // Chèn với index âm hoặc vượt quá length -> không thay đổi list
            list.insertAt(-1, 999);
            list.insertAt(100, 999);
            expect(list.length).toBe(3);
            expect(list.toArray()).toEqual([10, 20, 30]);
        });
    });

    describe('3. Thao tác xóa (Delete Operations)', () => {
        it('deleteHead: Xóa phần tử đầu tiên', () => {
            // Xóa trên list rỗng không bị lỗi
            list.deleteHead();
            expect(list.length).toBe(0);

            // List 1 phần tử
            list.insertAtHead(10);
            list.deleteHead();
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.length).toBe(0);

            // List nhiều phần tử
            list.insertAtTail(10);
            list.insertAtTail(20);
            list.insertAtTail(30);
            list.deleteHead();
            expect(list.head?.val).toBe(20);
            expect(list.tail?.val).toBe(30);
            expect(list.length).toBe(2);
            expect(list.toArray()).toEqual([20, 30]);
        });

        it('deleteTail: Xóa phần tử cuối cùng', () => {
            // Xóa trên list rỗng không bị lỗi
            list.deleteTail();
            expect(list.length).toBe(0);

            // List 1 phần tử
            list.insertAtTail(10);
            list.deleteTail();
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.length).toBe(0);

            // List nhiều phần tử
            list.insertAtTail(10);
            list.insertAtTail(20);
            list.insertAtTail(30);
            list.deleteTail();
            expect(list.head?.val).toBe(10);
            expect(list.tail?.val).toBe(20);
            expect(list.tail?.next).toBeNull();
            expect(list.length).toBe(2);
            expect(list.toArray()).toEqual([10, 20]);
        });

        it('deleteAt: Xóa tại vị trí bất kỳ', () => {
            list.insertAtTail(10);
            list.insertAtTail(20);
            list.insertAtTail(30);
            list.insertAtTail(40);

            // Xóa ngoài vùng index -> không đổi
            list.deleteAt(-1);
            list.deleteAt(10);
            expect(list.length).toBe(4);

            // Xóa ở giữa (index 1 -> xóa số 20)
            list.deleteAt(1);
            expect(list.toArray()).toEqual([10, 30, 40]);
            expect(list.length).toBe(3);

            // Xóa đầu (index 0)
            list.deleteAt(0);
            expect(list.toArray()).toEqual([30, 40]);

            // Xóa đuôi (index === length - 1)
            list.deleteAt(1);
            expect(list.toArray()).toEqual([30]);
            expect(list.head?.val).toBe(30);
            expect(list.tail?.val).toBe(30);
        });
    });

    describe('4. Thao tác tìm kiếm & truy xuất (Get & Search)', () => {
        beforeEach(() => {
            list.insertAtTail(100);
            list.insertAtTail(200);
            list.insertAtTail(300);
        });

        it('get: Lấy node theo index', () => {
            expect(list.get(0)?.val).toBe(100);
            expect(list.get(1)?.val).toBe(200);
            expect(list.get(2)?.val).toBe(300);
            expect(list.get(-1)).toBeNull();
            expect(list.get(3)).toBeNull();
        });

        it('search: Tìm index theo giá trị', () => {
            expect(list.search(100)).toBe(0);
            expect(list.search(200)).toBe(1);
            expect(list.search(300)).toBe(2);
            expect(list.search(999)).toBe(-1);
        });
    });

    describe('5. Đảo ngược danh sách (reverse - Tuyệt kĩ 3 con trỏ)', () => {
        it('Đảo ngược list rỗng hoặc 1 phần tử', () => {
            // Rỗng
            list.reverse();
            expect(list.toArray()).toEqual([]);

            // 1 phần tử
            list.insertAtHead(10);
            list.reverse();
            expect(list.toArray()).toEqual([10]);
            expect(list.head?.val).toBe(10);
            expect(list.tail?.val).toBe(10);
        });

        it('Đảo ngược list 2 phần tử', () => {
            list.insertAtTail(10);
            list.insertAtTail(20);
            list.reverse();

            expect(list.toArray()).toEqual([20, 10]);
            expect(list.head?.val).toBe(20);
            expect(list.tail?.val).toBe(10);
            expect(list.tail?.next).toBeNull();
        });

        it('Đảo ngược list nhiều phần tử [1, 2, 3, 4, 5]', () => {
            [1, 2, 3, 4, 5].forEach((val) => list.insertAtTail(val));

            list.reverse();

            expect(list.toArray()).toEqual([5, 4, 3, 2, 1]);
            expect(list.head?.val).toBe(5);
            expect(list.tail?.val).toBe(1);
            expect(list.tail?.next).toBeNull();
            expect(list.length).toBe(5);
        });
    });
});
