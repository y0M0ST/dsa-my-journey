/**
 * Problem: 3-longest-substring
 * Pattern: Sliding_Window
 * Time Complexity: O(n)
 * Space Complexity: O(min(m, n))
 */
export function lengthOfLongestSubstring(s: string): number {
  const n = s.length;
  if (n <= 1) return n;

  const lastSeen = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < n; right++) {
    const char = s[right]!;
    const prevIndex = lastSeen.get(char);

    if (prevIndex !== undefined && prevIndex >= left) {
      left = prevIndex + 1;
    }

    lastSeen.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

export const longestSubstring = lengthOfLongestSubstring;
