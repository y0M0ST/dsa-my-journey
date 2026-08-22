/**
 * Problem: 14-longest-common-prefix
 * Pattern: Implementation
 * Time Complexity: O(?)
 * Space Complexity: O(?)
 */
export function longestCommonPrefix(strs: string[]): string {
  let slength: number = strs.length
  if (slength === 0) return ""
  let prefix: string = strs[0]!
  for (let i = 1; i < slength; i++){
    while (!strs[i]!.startsWith(prefix)) {
      prefix = prefix.slice(0, -1)
      if(prefix === "") return ""
    }
  }
  return prefix;
}
