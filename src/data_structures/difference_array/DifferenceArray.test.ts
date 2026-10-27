import { describe, it, expect } from 'vitest'
import { DifferenceArray, applyRangeUpdates } from './DifferenceArray.js'

describe('Difference Array (Mảng Hiệu) - Xe buýt ảo diệu', () => {
    describe('applyRangeUpdates (Functional helper)', () => {
        it('Case 1: Chuyến xe buýt kinh điển (Ví dụ đã học)', () => {
            const length = 5 // 5 trạm từ 0 đến 4
            const updates = [
                [1, 3, 3], // Trạm 1 đến 3: lên 3 khách
                [2, 4, 2], // Trạm 2 đến 4: lên 2 khách
            ]
            // Kết quả kỳ vọng y chang lúc nãy mình nhẩm bằng tay!
            expect(applyRangeUpdates(length, updates)).toEqual([0, 3, 5, 5, 2])
        })

        it('Case 2: Xe chạy ế khách (Không có cập nhật nào)', () => {
            const length = 3
            const updates: number[][] = []
            expect(applyRangeUpdates(length, updates)).toEqual([0, 0, 0])
        })

        it('Case 3: Cập nhật đè lên nhau toàn tập', () => {
            const length = 4
            const updates = [
                [0, 3, 10], // Đợt 1: Cộng 10 cho toàn bộ mảng
                [1, 2, 5], // Đợt 2: Cộng thêm 5 cho khúc giữa (trạm 1 và 2)
            ]
            // Kỳ vọng: Trạm đầu và cuối là 10, trạm giữa nhận bão combo thành 15
            expect(applyRangeUpdates(length, updates)).toEqual([10, 15, 15, 10])
        })

        it('Case 4: Cập nhật sát mép biên (Edge case)', () => {
            const length = 3
            const updates = [
                [2, 2, 100], // Chỉ nhét đúng 100 khách vào duy nhất trạm cuối cùng
            ]
            expect(applyRangeUpdates(length, updates)).toEqual([0, 0, 100])
        })
    })

    describe('DifferenceArray (OOP Class)', () => {
        it('khởi tạo từ một mảng số ban đầu và áp dụng cập nhật', () => {
            const initial = [8, 2, 6, 3, 1]
            const da = new DifferenceArray(initial)

            expect(da.getLength()).toBe(5)
            expect(da.result()).toEqual([8, 2, 6, 3, 1])

            // Tăng đoạn [1, 3] thêm 3 đơn vị
            da.update(1, 3, 3)
            expect(da.result()).toEqual([8, 5, 9, 6, 1])

            // Giảm đoạn [2, 4] đi 2 đơn vị (cộng số âm)
            da.update(2, 4, -2)
            expect(da.result()).toEqual([8, 5, 7, 4, -1])
        })

        it('xử lý an toàn các trường hợp biên và chỉ số không hợp lệ', () => {
            const da = new DifferenceArray(5)

            // left < 0: Bỏ qua
            da.update(-1, 2, 10)
            expect(da.result()).toEqual([0, 0, 0, 0, 0])

            // right < left: Bỏ qua
            da.update(3, 1, 10)
            expect(da.result()).toEqual([0, 0, 0, 0, 0])

            // left >= length: Bỏ qua
            da.update(5, 6, 10)
            expect(da.result()).toEqual([0, 0, 0, 0, 0])

            // right vượt quá độ dài mảng: Tự động kẹp (clamp) về cuối mảng
            da.update(2, 100, 7)
            expect(da.result()).toEqual([0, 0, 7, 7, 7])
        })

        it('xử lý mảng rỗng (length = 0)', () => {
            const da = new DifferenceArray([])
            expect(da.getLength()).toBe(0)
            expect(da.result()).toEqual([])

            da.update(0, 0, 10)
            expect(da.result()).toEqual([])
        })

        it('batchUpdate: cập nhật hàng loạt nhiều truy vấn cùng lúc', () => {
            const da = new DifferenceArray([1, 2, 3, 4, 5])
            da.batchUpdate([
                [0, 2, 10], // [11, 12, 13, 4, 5]
                [1, 4, -2], // [11, 10, 11, 2, 3]
                [3, 3, 5], // [11, 10, 11, 7, 3]
            ])
            expect(da.result()).toEqual([11, 10, 11, 7, 3])
        })
    })
})
