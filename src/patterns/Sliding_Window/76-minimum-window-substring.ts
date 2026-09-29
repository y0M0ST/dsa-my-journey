/**
 * Problem: 76-minimum-window-substring
 * Pattern: Sliding_Window
 * Time Complexity: O(m + n)
 * Space Complexity: O(m + n)
 */
export function minWindow(s: string, t: string): string {
  if (!s || !t || s.length < t.length) return '';

  const targetMap = new Map<string, number>();
  for (const char of t) {
    targetMap.set(char, (targetMap.get(char) || 0) + 1);
  }

  const windowMap = new Map<string, number>();
  let left = 0;
  let right = 0;
  let formed = 0;
  const required = targetMap.size;

  let minLen = Infinity;
  let minStart = 0;

  while (right < s.length) {
    const char = s[right]!;
    windowMap.set(char, (windowMap.get(char) || 0) + 1);

    if (targetMap.has(char) && windowMap.get(char) === targetMap.get(char)) {
      formed++;
    }

    while (left <= right && formed === required) {
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }

      const leftChar = s[left]!;
      windowMap.set(leftChar, windowMap.get(leftChar)! - 1);
      if (targetMap.has(leftChar) && windowMap.get(leftChar)! < targetMap.get(leftChar)!) {
        formed--;
      }
      left++;
    }

    right++;
  }

  return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
}

export const minimumWindowSubstring = minWindow;
