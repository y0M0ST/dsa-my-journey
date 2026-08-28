import { ListNode } from './ListNode.js';

export class SinglyLinkedList {
    public head: ListNode | null;
    public tail: ListNode | null; // Cực kỳ quan trọng để insertAtTail tốn O(1)
    public length: number;        // Tracking chiều dài để hàm get(index) dễ thở hơn

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // --- CÁC HÀM THÊM (INSERT) ---
    insertAtHead(val: number): void {
        // TODO: Tạo Node mới. Trỏ next     của Node mới vào Head hiện tại. Cập nhật lại Head.
        const newNode = new ListNode(val)
        if (this.head === null) {
            this.head = newNode
            this.tail = newNode
        } else {
            newNode.next = this.head
            this.head = newNode
        }
        this.length++
        //newNode.next = oldHead
        //head = newNode
        // ====> Chỗ ni là từ duy bất biến của insertHear
        //nhưng tail vẫn node cuối cũ nếu list trc đó ko rỗng
        //length tăng đúng 1
        //Nếu list trước đó rỗng => head === tail === newNode; newNode.next === null
        // =>>>Muốn chèn đầu: node mới trỏ vào head cũ, rồi head trỏ vào node mới.
    }
    

    insertAtTail(val: number): void {
        // TODO: Tạo Node mới. Nối tail hiện tại tới Node mới. Cập nhật lại Tail.
        const newNode = new ListNode(val) //Mặc định khi tạo 1 node mới thì head và tail của nó là null
        if (this.head === null) {
            this.head = newNode
            this.tail = newNode
        } else {
            this.tail!.next = newNode
            this.tail = newNode
        }
        this.length++
    }

    insertAt(index: number, val: number): void {
        // TODO: Chặn edge cases (index < 0 hoặc > length). Tìm node đứng trước index. Chèn vào.
        const newNode = new ListNode(val)
        if (index < 0 && index > this.length) return
        if (index === 0) {
            this.insertAtHead(val)
            return
        } else if (index === this.length) {
            this.insertAtTail(val)
            return
        } else {
            const newNode = new ListNode(val)
            let current = this.head
            for (let i = 0; i < index - 1; i++) {
                current = current!.next
            }
            //Hiện tại current đang là A, current.next là B. Muốn chèn newNode vào giữa 
            newNode.next = current!.next //B1. Cánh tay của th newNode phải với tới th B
            current!.next = newNode //B2. Cánh tay cũ của th A (current.next) bây giờ sẽ với tới cho th mới newNode
            this.length++
        }
        
    }

    // --- CÁC HÀM XÓA (DELETE) ---
    deleteHead(): void {
        // TODO: Đưa head trỏ tới node thứ 2. Cắt đứt liên lạc với node đầu cũ.
    }

    deleteTail(): void {
        // TODO: Cái này khoai nha! Phải đi bộ từ đầu tìm ra thằng áp chót để biến nó thành Tail.
    }

    // --- CÁC HÀM TIỆN ÍCH (UTILITIES) ---
    print(): void {
        // TODO: Dùng vòng lặp while đi từ Head đến null, in ra chuỗi kiểu "1 -> 2 -> 3 -> null"
        let current = this.head;
        const result: number[] = [];

        while (current !== null) {
            result.push(current.val); // Gom khách ở trạm hiện tại

            // Bước 3: Câu thần chú cốt lõi - Nhích con trỏ sang trạm tiếp theo
            current = current.next;
        }
        console.log(result.join(' -> ') + ' -> null');
    }
}

const list = new SinglyLinkedList();
list.insertAtHead(10);
list.insertAtHead(20);
list.print(); // Nó sẽ in ra: 20 -> 10 -> null