/**
 * Problem: 14-longest-common-prefix
 * Pattern: Implementation
 * Time Complexity: O(S) - Trong đó S là tổng số ký tự của tất cả các chuỗi
 * Space Complexity: O(1)
 */
export function longestCommonPrefix(strs: string[]): string {
  const sLength: number = strs.length;
  if (sLength === 0) return "";
  let prefix: string = strs[0]!;
  for (let i = 1; i < sLength; i++) {
    while (!strs[i]!.startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}

