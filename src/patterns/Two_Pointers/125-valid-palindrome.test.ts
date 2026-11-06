import { describe, it, expect } from 'vitest'
import {
    isPalindrome,
    isPalindromeTwoPointers,
    isPalindromeRegex,
} from './125-valid-palindrome.js'

describe('Pattern: Two_Pointers -> 125-valid-palindrome', () => {
    const implementations = [
        { name: 'isPalindrome (Default)', fn: isPalindrome },
        { name: 'isPalindromeTwoPointers (O(1) Space)', fn: isPalindromeTwoPointers },
        { name: 'isPalindromeRegex (Baseline)', fn: isPalindromeRegex },
    ]

    describe.each(implementations)('$name', ({ fn }) => {
        it('nhận diện đúng câu đối xứng phức tạp có dấu câu: "A man, a plan, a canal: Panama"', () => {
            expect(fn('A man, a plan, a canal: Panama')).toBe(true)
        })

        it('nhận diện đúng chuỗi không đối xứng: "race a car"', () => {
            expect(fn('race a car')).toBe(false)
        })

        it('xử lý chuỗi chỉ chứa dấu cách "   "', () => {
            expect(fn('   ')).toBe(true)
        })

        it('xử lý chuỗi rỗng ""', () => {
            expect(fn('')).toBe(true)
        })

        it('xử lý chuỗi chỉ chứa ký tự đặc biệt ",.:;!?@#"', () => {
            expect(fn(',.:;!?@#')).toBe(true)
        })

        it('xử lý chuỗi một ký tự "a" và "Z"', () => {
            expect(fn('a')).toBe(true)
            expect(fn('Z')).toBe(true)
        })

        it('xử lý chuỗi chứa cả chữ và số "0P"', () => {
            expect(fn('0P')).toBe(false)
        })

        it('xử lý chuỗi số đối xứng "ab_a" và "12321"', () => {
            expect(fn('ab_a')).toBe(true)
            expect(fn('12321')).toBe(true)
        })
    })

    describe('Equivalence Check', () => {
        it('hai phương pháp cho kết quả đồng nhất trên tập kiểm thử mở rộng', () => {
            const testCases = [
                'Was it a car or a cat I saw?',
                'No lemon, no melon',
                'Madam, in Eden, I’m Adam.',
                'Eva, can I see bees in a cave?',
                'Not a palindrome at all!',
                '1b2',
                'Marge, let\'s \\"[went].\\" I say,\\" \\"-- bold argument!\\"',
            ]

            for (const text of testCases) {
                expect(isPalindromeTwoPointers(text)).toBe(isPalindromeRegex(text))
            }
        })
    })
})
