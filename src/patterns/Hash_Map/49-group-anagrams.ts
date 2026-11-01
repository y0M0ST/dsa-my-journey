/**
 * Problem: 49 - Group Anagrams
 * Pattern: Hash_Map (Canonical Key Grouping / Equivalence Partitioning)
 *
 * Tầm quan trọng trong phỏng vấn Big Tech:
 * - Đây là một trong những bài toán kinh điển nhất của mẫu hình Hash Map (LeetCode Medium).
 * - Câu hỏi cốt lõi nhà tuyển dụng (Meta, Google, Amazon) muốn kiểm tra:
 *   "Làm thế nào để ánh xạ (map) nhiều đối tượng có hình thức biểu diễn khác nhau
 *    nhưng cùng một bản chất (anagrams) về chung một khóa đại diện duy nhất (Canonical Key)?"
 *
 * Định nghĩa toán học & Quan hệ tương đương (Equivalence Relation):
 * - Hai chuỗi s1 và s2 được gọi là đảo chữ (anagrams) của nhau khi và chỉ khi:
 *   1. Chiều dài bằng nhau: |s1| = |s2|
 *   2. Đa tập hợp (multiset) ký tự của s1 và s2 trùng khớp hoàn toàn:
 *      ∀ c ∈ Σ: count(c, s1) = count(c, s2)
 * - Đây là một quan hệ tương đương (phản xạ, đối xứng, bắc cầu), chia tập hợp chuỗi đầu vào
 *   thành các lớp tương đương (equivalence classes / partitions).
 *
 * Chiến thuật 1: Sắp xếp chuỗi làm Canonical Key (Canonical Sorted String Hashing)
 * - Bản chất: Mọi biến thể hoán vị của các ký tự khi sắp xếp theo thứ tự bảng chữ cái
 *   đều quy tụ về đúng một chuỗi duy nhất:
 *   Ví dụ: "eat", "tea", "ate" -> khi sort đều trở thành "aet".
 * - Cơ chế:
 *   1. Tạo bảng băm `groups = new Map<string, string[]>()`.
 *   2. Duyệt qua từng chuỗi `s` trong mảng `strs`:
 *      - Chuẩn hóa: `const key = s.split('').sort().join('')`.
 *      - Tra cứu hoặc khởi tạo mảng đích trong Map và push `s` vào.
 *   3. Trả về `Array.from(groups.values())`.
 *
 * Đánh giá độ phức tạp thuật toán:
 * - Time Complexity: O(N * K log K)
 *   Trong đó N là số lượng phần tử trong strs, K là chiều dài tối đa của một chuỗi.
 *   Mỗi chuỗi tốn O(K) để phân rã mảng, O(K log K) để sắp xếp và O(K) để ghép chuỗi lại.
 * - Space Complexity: O(N * K)
 *   Bộ nhớ cho bảng băm Map lưu trữ toàn bộ N chuỗi và các canonical keys có độ dài tối đa K.
 */

/**
 * Cách 1: Sắp xếp chuỗi làm Canonical Key (Canonical Sort Key).
 *
 * @param strs Mảng các chuỗi ký tự thường tiếng Anh
 * @returns Mảng các nhóm anagrams
 */
export function groupAnagramsSorting(strs: string[]): string[][] {
    if (strs.length <= 1) {
        return [strs]
    }

    const groups = new Map<string, string[]>()

    for (let i = 0; i < strs.length; i++) {
        const word = strs[i]!
        // Sắp xếp các ký tự theo thứ tự ASCII/Unicode để tạo khóa duy nhất
        const key = word.split('').sort().join('')

        const bucket = groups.get(key)
        if (bucket !== undefined) {
            bucket.push(word)
        } else {
            groups.set(key, [word])
        }
    }

    return Array.from(groups.values())
}

/**
 * Hàm giải chính theo chuẩn LeetCode 49.
 */
export const groupAnagrams = groupAnagramsSorting
