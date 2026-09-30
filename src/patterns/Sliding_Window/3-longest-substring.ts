/**
 * Problem: 3-longest-substring
 * Pattern: Sliding_Window
 * Time Complexity: O(2n) = O(n)
 * Space Complexity: O(min(m, n))
 */
export function lengthOfLongestSubstring(s: string): number {
  if (s.length <= 1) return s.length;

  const charSet = new Set<string>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right]!;

    while (charSet.has(char)) {
      charSet.delete(s[left]!);
      left++;
    }

    charSet.add(char);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

export const longestSubstring = lengthOfLongestSubstring;
