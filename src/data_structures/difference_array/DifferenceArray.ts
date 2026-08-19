/**
 * Thuật toán Difference Array (Mảng Hiệu)
 * Giải quyết bài toán: Cập nhật giá trị cho cả một khoảng [L, R] cực nhanh.
 * Thay vì dùng vòng lặp O(N) cho mỗi lần cập nhật, ta dùng Difference Array với O(1) thao tác.
 * 
 * @param length - Chiều dài của mảng ban đầu (ví dụ: số trạm xe buýt)
 * @param updates - Danh sách các yêu cầu dạng [left, right, value]
 * @returns Mảng kết quả sau khi đã áp dụng toàn bộ các thay đổi
 */
export function applyRangeUpdates(length: number, updates: number[][]): number[] {
    // Bước 1: Khởi tạo mảng hiệu diff với kích thước length + 1 
    // (Cộng thêm 1 để phòng hờ trường hợp index right + 1 nằm ở cuối biên giới)
    const diff: number[] = new Array(length + 1).fill(0);

    // Bước 2: Ghi chú sự thay đổi (Thao tác cực nhanh O(1) cho mỗi lần update)
    for (const update of updates) {
        const [left, right, val] = update as [number, number, number];
        diff[left] = (diff[left] ?? 0) + val; // Đánh dấu điểm BẮT ĐẦU cộng dồn
        diff[right + 1] = (diff[right + 1] ?? 0) - val; // Đánh dấu điểm KẾT THÚC (ngay sau right) để ngắt quãng ảnh hưởng
    }

    // Bước 3: Quét lại toàn bộ bằng Prefix Sum (Cộng dồn từ trái sang phải) 
    // để ra mảng kết quả cuối cùng trong O(N) thời gian
    const result: number[] = new Array(length).fill(0);
    let currentVal = 0;

    for (let i = 0; i < length; i++) {
        currentVal += diff[i]!; // Giá trị được kéo dài (carry over) từ trạm trước sang
        result[i] = currentVal;
    }

    return result;
}