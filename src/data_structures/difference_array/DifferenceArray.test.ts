import { describe, it, expect } from 'vitest';
import { applyRangeUpdates } from './DifferenceArray.js';

describe('Difference Array (Mảng Hiệu) - Xe buýt ảo diệu', () => {
    it('Case 1: Chuyến xe buýt kinh điển (Ví dụ đã học)', () => {
        const length = 5; // 5 trạm từ 0 đến 4
        const updates = [
            [1, 3, 3], // Trạm 1 đến 3: lên 3 khách
            [2, 4, 2]  // Trạm 2 đến 4: lên 2 khách
        ];
        // Kết quả kỳ vọng y chang lúc nãy mình nhẩm bằng tay!
        expect(applyRangeUpdates(length, updates)).toEqual([0, 3, 5, 5, 2]);
    });

    it('Case 2: Xe chạy ế khách (Không có cập nhật nào)', () => {
        const length = 3;
        const updates: number[][] = [];
        expect(applyRangeUpdates(length, updates)).toEqual([0, 0, 0]);
    });

    it('Case 3: Cập nhật đè lên nhau toàn tập', () => {
        const length = 4;
        const updates = [
            [0, 3, 10], // Đợt 1: Cộng 10 cho toàn bộ mảng
            [1, 2, 5],  // Đợt 2: Cộng thêm 5 cho khúc giữa (trạm 1 và 2)
        ];
        // Kỳ vọng: Trạm đầu và cuối là 10, trạm giữa nhận bão combo thành 15
        expect(applyRangeUpdates(length, updates)).toEqual([10, 15, 15, 10]);
    });

    it('Case 4: Cập nhật sát mép biên (Edge case)', () => {
        const length = 3;
        const updates = [
            [2, 2, 100] // Chỉ nhét đúng 100 khách vào duy nhất trạm cuối cùng
        ];
        expect(applyRangeUpdates(length, updates)).toEqual([0, 0, 100]);
    });
});