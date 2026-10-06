import { describe, it, expect } from 'vitest'
import { characterReplacement } from './424-longest-repeating-character-replacement.js'

describe('Pattern: Sliding_Window -> 424-longest-repeating-character-replacement', () => {
    it('LeetCode Ex 1: s = "ABAB", k = 2 -> 4', () => {
        expect(characterReplacement('ABAB', 2)).toBe(4)
    })

    it('LeetCode Ex 2: s = "AABABBA", k = 1 -> 4', () => {
        expect(characterReplacement('AABABBA', 1)).toBe(4)
    })
})
