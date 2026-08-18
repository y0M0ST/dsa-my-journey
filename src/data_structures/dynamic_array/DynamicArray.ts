/**
* Building a dynamic array from zero
* Demonstrating techniques: Resizing & Amortized O(1)
*/
export class DynamicArray {
    private capacity: number; // Tổng số phòng trọ hiện có (kích thước thật)
    private length: number;   // Số lượng khách đang thuê (số phần tử thực tế)
    private arr: (number | undefined)[]; // Dãy nhà trọ (Mảng tĩnh pha ke)

    // Khi khởi tạo, mặc định xây cái nhà trọ có 2 phòng
    constructor(capacity: number = 2) {
        this.capacity = capacity;
        this.length = 0;
        this.arr = new Array(capacity).fill(undefined);
    }

    // Hàm Get: Lấy phần tử ở index i - Tốc độ ánh sáng O(1)
    get(i: number): number | undefined {
        if (i < 0 || i >= this.length) throw new Error("Index out of bounds!");
        return this.arr[i];
    }

    // Hàm Push: Thêm phần tử vào cuối mảng - Tốc độ Amortized O(1)
    push(n: number): void {
        // Nếu nhà trọ đã Full khách -> Tiến hành CHUYỂN NHÀ!
        if (this.length === this.capacity) {
            this.resize();
        }

        // Đủ chỗ rồi thì cứ nhét khách mới vào phòng trống tiếp theo thôi
        this.arr[this.length] = n;
        this.length++;
    }

    // Hàm Pop: Đuổi khách cuối cùng ra khỏi nhà - Tốc độ O(1)
    pop(): void {
        if (this.length > 0) {
            this.length--;
            // Bản chất không cần xóa data, chỉ cần lùi biến length lại, 
            // lần push sau nó sẽ tự ghi đè lên data cũ.
        }
    }

    // Hàm Bí mật Resizing: Tuyệt kỹ nhân đôi nhà trọ - Tốn O(N) thời gian
    private resize(): void {
        this.capacity *= 2; // Quyết định nhân đôi số phòng (2 -> 4 -> 8 -> 16...)
        const newArr = new Array(this.capacity).fill(undefined); // Mua khu đất mới

        // Bốc vác toàn bộ khách từ nhà cũ sang nhà mới
        for (let i = 0; i < this.length; i++) {
            newArr[i] = this.arr[i];
        }

        // Đập bỏ nhà cũ, chính thức chuyển sang ở nhà mới
        this.arr = newArr;
    }

    // Hàm phụ trợ để Vitest lấy ra xem nhà trọ đang to cỡ nào
    getCapacity(): number {
        return this.capacity;
    }
}