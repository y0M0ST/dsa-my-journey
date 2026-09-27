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
    const newNode = new ListNode(val);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  insertAtTail(val: number): void {
    const newNode = new ListNode(val);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this.length++;
  }

  insertAt(index: number, val: number): void {
    if (index < 0 || index > this.length) return;
    if (index === 0) {
      this.insertAtHead(val);
      return;
    }
    if (index === this.length) {
      this.insertAtTail(val);
      return;
    }

    const newNode = new ListNode(val);
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }

    // Chèn newNode vào giữa current (A) và current.next (B)
    newNode.next = current!.next; // B1: Cánh tay của newNode với tới B
    current!.next = newNode;      // B2: Cánh tay của A trỏ tới newNode
    this.length++;
  }

  // --- CÁC HÀM XÓA (DELETE) ---
  deleteHead(): void {
    if (this.head === null) return;
    this.head = this.head.next;
    this.length--;
    if (this.length === 0) {
      this.tail = null;
    }
  }

  deleteTail(): void {
    if (this.length === 0) return;
    if (this.length === 1) {
      this.deleteHead();
      return;
    }

    let current = this.head;
    while (current!.next !== this.tail) {
      current = current!.next;
    }
    current!.next = null;
    this.tail = current;
    this.length--;
  }

  get(index: number): ListNode | null {
    if (index < 0 || index >= this.length) return null;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    return current;
  }

  deleteAt(index: number): void {
    if (index < 0 || index >= this.length) return;
    if (index === 0) {
      this.deleteHead();
      return;
    }
    if (index === this.length - 1) {
      this.deleteTail();
      return;
    }

    const prev = this.get(index - 1);
    if (prev && prev.next) {
      const nodeToDelete = prev.next;
      prev.next = nodeToDelete.next;
      this.length--;
    }
  }

  search(val: number): number {
    let current = this.head;
    let index = 0;
    while (current !== null) {
      if (current.val === val) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  // Tuyệt kĩ quay đầu xe (In-place reversal):
  // Không tạo mảng mới, không tạo Node mới, chỉ dùng 3 con trỏ: prev, current, next
  reverse(): void {
    if (this.head === null || this.head === this.tail) return;
    let prev: ListNode | null = null;
    let current: ListNode | null = this.head;
    let next: ListNode | null = null;
    this.tail = this.head; // Đầu cũ bây giờ thành đuôi mới

    while (current !== null) {
      next = current.next; // Lưu lại node tiếp theo
      current.next = prev; // Đảo ngược liên kết về node trước
      prev = current;      // Trượt prev lên
      current = next;      // Trượt current lên
    }

    this.head = prev; // Node cuối cùng ban đầu chính thức thành HEAD mới
  }

  toArray(): number[] {
    const result: number[] = [];
    let current = this.head;
    while (current !== null) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  // --- CÁC HÀM TIỆN ÍCH (UTILITIES) ---
  print(): void {
    let current = this.head;
    const result: number[] = [];

    while (current !== null) {
      result.push(current.val);
      current = current.next;
    }
    console.log(result.join(' -> ') + ' -> null');
  }
}


