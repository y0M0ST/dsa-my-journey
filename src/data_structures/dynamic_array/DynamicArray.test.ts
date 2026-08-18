import { describe, it, expect } from 'vitest';
import { DynamicArray } from './DynamicArray.js';

describe('Dynamic Array Architecture', () => {
    it('Quá trình mảng tự động phình to (Resizing)', () => {
        // Khởi tạo nhà trọ có đúng 2 phòng
        const myArr = new DynamicArray(2);
        expect(myArr.getCapacity()).toBe(2);

        // Nhét 2 người vào -> Vẫn ổn, chưa cần chuyển nhà
        myArr.push(10);
        myArr.push(20);
        expect(myArr.getCapacity()).toBe(2);

        // Nhét người thứ 3 -> Nhà trọ full! Hệ thống tự kích hoạt nhân đôi thành 4 phòng!
        myArr.push(30);
        expect(myArr.getCapacity()).toBe(4);
        expect(myArr.get(2)).toBe(30); // Khách số 30 vẫn an toàn ở phòng index 2

        // Nhét tiếp người thứ 4 và 5 -> Kích hoạt nhân đôi lần nữa thành 8 phòng!
        myArr.push(40);
        myArr.push(50);
        expect(myArr.getCapacity()).toBe(8);
    });

    it('Thử nghiệm Pop và Get', () => {
        const myArr = new DynamicArray(2);
        myArr.push(100);
        myArr.push(200);

        expect(myArr.get(1)).toBe(200);

        myArr.pop(); // Đuổi ông 200 đi
        // Bây giờ nhét ông 300 vào, ổng sẽ chiếm lại cái phòng của ông 200 vừa bỏ lại
        myArr.push(300);
        expect(myArr.get(1)).toBe(300);
    });
});