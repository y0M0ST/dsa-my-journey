/**
 * Problem: 438-find-all-anagrams-in-a-string
 * Pattern: Sliding_Window
 * Time Complexity: O(n * k)
 * Space Complexity: O(k)
 */
export function findAnagrams(s: string, p: string): number[] {
  const sLen = s.length;
  const pLen = p.length;
  if (sLen < pLen) return [];

  const pCount = new Map<string, number>();
  for (const char of p) {
    pCount.set(char, (pCount.get(char) || 0) + 1);
  }

  const result: number[] = [];
  const windowCount = new Map<string, number>();

  for (let i = 0; i < sLen; i++) {
    const char = s[i]!;
    windowCount.set(char, (windowCount.get(char) || 0) + 1);

    if (i >= pLen) {
      const leftChar = s[i - pLen]!;
      if (windowCount.get(leftChar) === 1) {
        windowCount.delete(leftChar);
      } else {
        windowCount.set(leftChar, windowCount.get(leftChar)! - 1);
      }
    }

    if (i >= pLen - 1) {
      let isMatch = true;
      for (const [key, val] of pCount.entries()) {
        if (windowCount.get(key) !== val) {
          isMatch = false;
          break;
        }
      }
      if (isMatch) {
        result.push(i - pLen + 1);
      }
    }
  }

  return result;
}

export const findAllAnagrams = findAnagrams;
export const findAllAnagramsInAString = findAnagrams;
