import { describe, it, expect } from 'vitest';
import { buySellStock } from './121-buy-sell-stock.js'; // Nhớ check lại tên hàm bên file gốc xem đúng chưa nha

describe('Pattern: Sliding_Window -> 121-buy-sell-stock', () => {
  const testCases = [
    // 1. Edge case: Không có ngày nào để giao dịch (Sàn đóng cửa)
    { input: [], expected: 0 },
    // 2. Edge case: Có đúng 1 ngày (Mua xong không có ngày mai để bán) -> Nghỉ chơi
    { input: [5], expected: 0 },
    // 3. Ví dụ 1 LeetCode: Bắt đáy thành công
    { input: [7, 1, 5, 3, 6, 4], expected: 5 },
    // 4. Ví dụ 2 LeetCode: Thị trường tắm máu (Downtrend)
    { input: [7, 6, 4, 3, 1], expected: 0 },
    // 5. Thị trường đi ngang (Sideway): Giá chả nhúc nhích đồng nào
    { input: [3, 3, 3, 3, 3], expected: 0 },
    // 6. Cổ phiếu tiềm năng (Uptrend): Tăng trưởng đều đặn mỗi ngày
    { input: [1, 2, 3, 4, 5], expected: 4 }, // Mua 1 bán 5
    // 7. Cú lừa "Đáy sau sâu hơn đáy trước nhưng không có đỉnh": 
    // Mua ở 2 bán ở 6 (lời 4). Sau đó rớt xuống 0 (đáy mới) nhưng chỉ hồi lên được 3 (lời 3).
    // Nên nó phải khôn ngoan chốt lời ở quá khứ (4) chứ không tham cái đáy mới.
    { input: [3, 2, 6, 5, 0, 3], expected: 4 },
  ];

  it.each(testCases)(
    'với biểu đồ giá $input thì tiền lời cao nhất chốt được là $expected',
    ({ input, expected }) => {
      expect(buySellStock(input)).toEqual(expected);
    }
  );
});