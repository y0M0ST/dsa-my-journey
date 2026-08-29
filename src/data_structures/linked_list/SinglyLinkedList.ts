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
        if (this.head === null) return //Chỗ ni vườn ko nhà trống thì return
        this.head = this.head.next //Dời cái head của cái head đầu sang cái thứ hai
        this.length-- //Phải giảm đi 1
        if (this.length === 0) {
            this.tail = null //Nếu cái list node có 1 cái thì xoá cái đầu phải cho cái đuôi về null luôn
        }
    }

    deleteTail(): void {
        // TODO: Cái này khoai nha! Phải đi bộ từ đầu tìm ra thằng áp chót để biến nó thành Tail.
        if (this.length === 0) return
        if (this.length === 1) {
            this.deleteHead()
            return
        }
        let current = this.head
        while (current!.next != this.tail) {
            current = current!.next
        }
        current!.next = null
        this.tail = current
        this.length--
    }

    get(index: number): ListNode | null {
        if (index < 0 || index >= this.length) return null
        let current = this.head
        for (let i = 0; i < index; i++){
            current = current!.next
        }
        return current
    }

    deleteAt(index: number): void{
        if (index < 0 || index >= this.length) return;
        if (index === 0) return this.deleteHead()
        if (index === this.length - 1) return this.deleteTail()
        
        const prev = this.get(index - 1)
        if (prev && prev.next) {
            const nodeToDelete = prev.next
            prev.next = nodeToDelete.next
            this.length--
        }
    }

    search(val: number): number{
        let current = this.head
        let index = 0
        while (current !== null) {
            if (current.val === val) return index
            current = current.next
            index++
        }
        return -1
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