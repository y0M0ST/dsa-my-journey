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
 * So sánh 3 trường phái sinh khóa Canonical Key:
 *
 * 1. Sắp xếp ký tự chuỗi (Canonical Sort Key):
 *    - Key = word.split('').sort().join('')
 *    - Time: O(N * K log K), Space: O(N * K)
 *    - Đơn giản, trực quan, tốc độ rất nhanh với K nhỏ (K <= 8).
 *
 * 2. Mảng đếm tần suất có ký tự phân cách (Frequency Count Key with Delimiters):
 *    - Đếm 26 chữ cái tiếng Anh thường [a-z] vào Int32Array(26).
 *    - Key = `#${count[0]}#${count[1]}...#${count[25]}`
 *    - Time: O(N * K), Space: O(N * K)
 *    - Đạt độ phức tạp thời gian tuyến tính lý thuyết O(N * K).
 *    - Cạm bẫy tử thần (Delimiter Trap): BẮT BUỘC phải có dấu phân cách (như `#` hoặc `,`).
 *      Nếu ghép chuỗi không có phân cách ("110" vs "110"), chuỗi có count 'a'=1, 'b'=10
 *      sẽ bị đụng độ với chuỗi có count 'a'=11, 'b'=0!
 *
 * 3. Tích các số nguyên tố (Prime Number Factorization / Gödel Numbering):
 *    - Định lý cơ bản của số học (Fundamental Theorem of Arithmetic):
 *      Mọi số nguyên > 1 đều có thể phân tích thành tích các thừa số nguyên tố duy nhất.
 *    - Gán mỗi ký tự 'a'-'z' với 1 trong 26 số nguyên tố đầu tiên: [2, 3, 5, 7, ..., 101].
 *    - Key = tích các số nguyên tố tương ứng với từng ký tự trong chuỗi.
 *    - Do phép nhân có tính chất giao hoán: 2 * 3 * 5 = 5 * 3 * 2 = 30 -> anagrams luôn có cùng tích!
 *    - Time: O(N * K), Space: O(N * K).
 *    - Tối ưu bộ nhớ: Tránh hoàn toàn việc cấp phát chuỗi (zero string allocation) khi dùng Map<bigint, string[]>.
 *    - Bắt buộc dùng `BigInt` trong JavaScript vì chiều dài chuỗi K <= 100 sẽ vượt ngưỡng
 *      Number.MAX_SAFE_INTEGER (2^53 - 1 ≈ 9 * 10^15).
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
        // Sắp xếp các ký tự theo thứ tự ASCII để tạo khóa chuẩn hóa duy nhất
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
 * Cách 2: Chuỗi đếm tần suất 26 ký tự có dấu phân cách (Frequency Count Key).
 * Đạt độ phức tạp thời gian tuyến tính O(N * K).
 *
 * @param strs Mảng các chuỗi ký tự thường tiếng Anh
 * @returns Mảng các nhóm anagrams
 */
export function groupAnagramsCount(strs: string[]): string[][] {
    if (strs.length <= 1) {
        return [strs]
    }

    const groups = new Map<string, string[]>()
    // Tái sử dụng mảng tần suất 26 phần tử để hạn chế cấp phát bộ nhớ rác (GC pressure)
    const count = new Int32Array(26)

    for (let i = 0; i < strs.length; i++) {
        const word = strs[i]!
        count.fill(0)

        // Đếm tần suất từng ký tự trong chuỗi O(K)
        for (let j = 0; j < word.length; j++) {
            count[word.charCodeAt(j) - 97]++
        }

        // Sinh khóa Canonical dạng chuỗi phân cách an toàn: "#c0#c1#...#c25"
        let key = ''
        for (let c = 0; c < 26; c++) {
            key += '#' + count[c]
        }

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
 * Danh sách 26 số nguyên tố đầu tiên tương ứng với 26 ký tự từ 'a' đến 'z'.
 */
const PRIMES: bigint[] = [
    2n,
    3n,
    5n,
    7n,
    11n,
    13n,
    17n,
    19n,
    23n,
    29n,
    31n,
    37n,
    41n,
    43n,
    47n,
    53n,
    59n,
    61n,
    67n,
    71n,
    73n,
    79n,
    83n,
    89n,
    97n,
    101n,
]

/**
 * Cách 3: Phân tích thừa số nguyên tố (Prime Factorization / BigInt Hashing).
 * Dựa trên Định lý cơ bản của số học để gán mỗi nhóm anagram một tích nguyên tố bất biến.
 *
 * @param strs Mảng các chuỗi ký tự thường tiếng Anh
 * @returns Mảng các nhóm anagrams
 */
export function groupAnagramsPrime(strs: string[]): string[][] {
    if (strs.length <= 1) {
        return [strs]
    }

    const groups = new Map<bigint, string[]>()

    for (let i = 0; i < strs.length; i++) {
        const word = strs[i]!
        let product = 1n

        for (let j = 0; j < word.length; j++) {
            product *= PRIMES[word.charCodeAt(j) - 97]!
        }

        const bucket = groups.get(product)
        if (bucket !== undefined) {
            bucket.push(word)
        } else {
            groups.set(product, [word])
        }
    }

    return Array.from(groups.values())
}

/**
 * Hàm giải chính theo chuẩn LeetCode 49.
 * Mặc định sử dụng thuật toán Frequency Count Key đạt O(N * K) tuyến tính.
 */
export const groupAnagrams = groupAnagramsCount
