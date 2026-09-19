# Grokking Algorithms: Study Notes, Exercises & TypeScript Implementations

## Table of Contents
- [Chapter 1: Introduction to Algorithms & Binary Search](#chapter-1-introduction-to-algorithms--binary-search)
- [Chapter 2: Selection Sort, Arrays & Linked Lists](#chapter-2-selection-sort-arrays--linked-lists)
- [Chapter 3: Recursion](#chapter-3-recursion)
- [Chapter 4: Quicksort & Divide-and-Conquer (D&C)](#chapter-4-quicksort--divide-and-conquer-dc)
- [Chapter 5: Hash Tables](#chapter-5-hash-tables)
- [Chapter 6: Breadth-First Search (BFS) & Graphs](#chapter-6-breadth-first-search-bfs--graphs)
- [Chapter 7: Dijkstra's Algorithm & Weighted Graphs](#chapter-7-dijkstras-algorithm--weighted-graphs)
- [Chapter 8: Greedy Algorithms & NP-Complete Problems](#chapter-8-greedy-algorithms--np-complete-problems)
- [Chapter 9: Dynamic Programming (DP)](#chapter-9-dynamic-programming-dp)
- [Chapter 10: K-Nearest Neighbors (KNN)](#chapter-10-k-nearest-neighbors-knn)
- [Chapter 11: Where to Go Next? (Advanced Topics)](#chapter-11-where-to-go-next-advanced-topics--data-structures)
- [Summary: Algorithm Complexity & Decision Flowchart](#summary-algorithm-complexity--selection-matrix)
- [Core Algorithmic Paradigms & Mental Models](#core-algorithmic-paradigms--mental-models)
- [Practical LeetCode Mapping & TypeScript DSA Journey](#practical-leetcode-mapping--typescript-dsa-journey)

---

### Chapter 1: Introduction to Algorithms & Binary Search

**1.1. Suppose you have a sorted list of 128 names, and you’re searching through it using binary search. What’s the maximum number of steps it would take?** - *O(log 128) = 7*

**1.2 Suppose you double the size of the list. What’s the maximum number of steps now?** - *O(log 256) = 8*

**1.3 You have a name, and you want to find the person’s phone number in the phone book.** - *O(log n)*

**1.4 You have a phone number, and you want to find the person’s name in the phone book. (Hint: You’ll have to search through the whole book!)** - *O(n)*

**1.5 You want to read the numbers of every person in the phone book.** - *O(n)*

**1.6 You want to read the numbers of just the As. (This is a tricky one! It involves concepts that are covered more in chapter 4. Read the answer—you may be surprised!)** - *O(n)*

#### Binary Search Implementation in TypeScript

Binary Search works exclusively on **sorted collections**, halving the search space at each step.

```typescript
/**
 * Classic Iterative Binary Search
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function binarySearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // Avoid integer overflow: equivalent to Math.floor((low + high) / 2)
    const mid = low + Math.floor((high - low) / 2);
    const guess = arr[mid]!;

    if (guess === target) {
      return mid; // Target found
    } else if (guess > target) {
      high = mid - 1; // Target is in the left half
    } else {
      low = mid + 1; // Target is in the right half
    }
  }

  return -1; // Target not found
}

/**
 * Leftmost / Lower Bound Binary Search (Search Insert Position)
 * Returns the first index where arr[index] >= target
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function lowerBound(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length; // Range [0, n] allows inserting at the end

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (arr[mid]! >= target) {
      high = mid; // Narrow down to the left boundary
    } else {
      low = mid + 1;
    }
  }

  return low;
}
```

- **Why is Binary Search $O(\log n)$?**
  With each comparison, the search range is divided by 2:
  $$\frac{n}{2^k} = 1 \implies 2^k = n \implies k = \log_2 n$$
  For an array of $1,000,000$ elements, Binary Search takes at most $\lceil \log_2(1,000,000) \rceil = \mathbf{20}$ comparisons, whereas linear search could take $1,000,000$.

---

### Chapter 2: Selection Sort, Arrays & Linked Lists

**2.1. Suppose you’re building an app to keep track of your finances. Every day, you write down everything you spent money on. At the end of the month, you review your expenses and sum up how much you spent. So, you have lots of inserts and a few reads. Should you use an array or a list?** - *List*

**2.2 Suppose you’re building an app for restaurants to take customer orders. Your app needs to store a list of orders. Servers keep adding orders to this list, and chefs take orders off the list and make them. It’s an order queue: servers add orders to the back of the queue, and the chef takes the first order of the queue and cooks it. Would you use an array or a linked list to implement this queue? (Hint: Linked lists are good for inserts/deletes, and arrays are good for random access. Which one are you going to be doing here?)** - *List*

**2.3. Let’s run a thought experiment. Suppose Facebook keeps a list of usernames. When someone tries to log in to Facebook, a search is done for their username. If their name is in the list of usernames, they can log in. People log in to Facebook pretty often, so there are a lot of searches through this list of usernames. Suppose Facebook uses binary search to search the list. Binary search needs random access—you need to be able to get to the middle of the list of usernames instantly. Knowing this, would you implement the list as an array or a linked list?** - *Array*

**2.4. People sign up for Facebook pretty often, too. Suppose you decided to use an array to store the list of users. What are the downsides of an array for inserts? In particular, suppose you’re using binary search to search for logins. What happens when you add new users to an array?**

*Using an array to store a list of users, there are several distinct disadvantages:*

- **Fixed capacity & re-allocation:** Arrays allocate contiguous memory. If the allocated chunk is full, a larger block must be allocated and all existing elements copied over ($O(n)$).
- **Element shifting on insert:** To keep the array sorted for Binary Search, inserting a new username into the correct position requires shifting all subsequent elements to the right ($O(n)$).
- *Takeaway:* While Binary Search enables fast lookup in $O(\log n)$, keeping an array sorted imposes an $O(n)$ insertion penalty.

**2.5. In reality, Facebook uses neither an array nor a linked list to store user information. Let’s consider a hybrid data structure: an array of 26 linked lists (each element points to a linked list of usernames starting with that letter). Compare this hybrid data structure to arrays and linked lists. Is it slower or faster than each for searching and inserting?**
- *Searching:* Slower than arrays (arrays support random access and Binary Search in $O(\log n)$), but faster than a single linked list (you only need to search $1/26$th of the users).
- *Inserting:* Faster than arrays ($O(1)$ to append/insert into the linked list without shifting elements or reallocating array memory), and same speed as linked lists.
*(Note: This hybrid concept is the foundation of Hash Tables with separate chaining, covered in Chapter 5).*

#### Selection Sort Implementation in TypeScript
Selection sort repeatedly finds the minimum element from the unsorted portion and moves it to the sorted portion.

```typescript
/**
 * Finds the index of the smallest element in an array
 */
function findSmallestIndex(arr: number[]): number {
  let smallest = arr[0]!;
  let smallestIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i]! < smallest) {
      smallest = arr[i]!;
      smallestIndex = i;
    }
  }

  return smallestIndex;
}

/**
 * Pure out-of-place Selection Sort (as introduced in Grokking Algorithms)
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
function selectionSort(arr: number[]): number[] {
  const copy = [...arr];
  const sorted: number[] = [];

  while (copy.length > 0) {
    const smallestIdx = findSmallestIndex(copy);
    sorted.push(copy.splice(smallestIdx, 1)[0]!);
  }

  return sorted;
}

/**
 * In-place Selection Sort (optimal memory)
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
function selectionSortInPlace(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j]! < arr[minIdx]!) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx]!, arr[i]!];
    }
  }
  return arr;
}
```

- **Why is Selection Sort $O(n^2)$?**
  Checking for the smallest element takes $n$ operations, then $n - 1$, then $n - 2, \dots, 1$.
  $$\text{Total steps} = \frac{n(n + 1)}{2} = \frac{n^2 + n}{2} \implies O(n^2)$$
  Even though you examine fewer elements each pass, constants are dropped in Big-O notation.

---

### Chapter 3: Recursion

**3.1. Suppose I show you a call stack like this:**
```text
[ greet2 | name: maggie ]
[ greet  | name: maggie ]
```
**What can you tell me about the current state of these function calls?**
- `greet` was called first with `name = maggie`.
- `greet` called `greet2` with `name = maggie`.
- `greet` is currently in an incomplete, suspended state.
- `greet2` is currently executing at the top of the stack.
- Once `greet2` finishes and pops off the stack, `greet` will resume execution.

**3.2. Suppose you accidentally write an infinite recursive function that keeps calling itself. What happens to the stack?**
- Every function call allocates a new stack frame in memory. Without a base case to terminate, the call stack grows continuously until memory is exhausted, throwing a **Stack Overflow** error.

#### Recursion Anatomy & The Call Stack in TypeScript

Every recursive function requires two core components:
1. **Base Case:** The condition under which the function stops calling itself, preventing an infinite loop.
2. **Recursive Case:** The branch where the function calls itself with a smaller or simpler input, moving closer to the base case.

```typescript
/**
 * Classic Factorial using Recursion
 * Time Complexity: O(n)
 * Space Complexity: O(n) call stack frames
 */
function factorial(x: number): number {
  if (x <= 1) {
    return 1; // Base case
  }
  return x * factorial(x - 1); // Recursive case
}
```

##### Visualizing the Call Stack for `factorial(3)`

The call stack operates on a **LIFO** (Last In, First Out) principle:

```text
[1. PUSH PHASE: Building up the stack frames]
Step 1: Call factorial(3)
| factorial(3) | -> waiting for factorial(2)

Step 2: factorial(3) calls factorial(2)
| factorial(2) | -> waiting for factorial(1)
| factorial(3) | -> suspended

Step 3: factorial(2) calls factorial(1)
| factorial(1) | -> reaches BASE CASE (returns 1)
| factorial(2) | -> suspended
| factorial(3) | -> suspended

----------------------------------------------------
[2. POP PHASE: Resolving and unwinding the stack]
Step 4: factorial(1) returns 1 and is popped
| factorial(2) | -> computes 2 * 1 = 2, returns 2
| factorial(3) | -> suspended

Step 5: factorial(2) returns 2 and is popped
| factorial(3) | -> computes 3 * 2 = 6, returns 6

Step 6: factorial(3) returns 6 -> Final Result = 6 (Stack is now empty)
```

##### Stack Overflow & Memory Constraints in JavaScript / V8
- Each function invocation allocates a stack frame storing:
  - Local variables and arguments.
  - Return address (where in memory to return once execution completes).
- In modern JavaScript engines (V8 in Node.js / Chrome), the maximum call stack size is typically around **$10,000$ to $12,000$ frames**.
- If recursion exceeds this threshold without reaching a base case, the engine aborts with `RangeError: Maximum call stack size exceeded`.
- **Mitigation:** When recursion depth may exceed $10^4$, convert to an iterative loop with an explicit array stack, or use Tail Call Optimization where supported.

---

### Chapter 4: Quicksort & Divide-and-Conquer (D&C)

**4.1. Write out the code for the recursive `sum` function.**
```typescript
function sum(arr: number[]): number {
  if (arr.length === 0) return 0; // Base case
  return arr[0] + sum(arr.slice(1)); // Recursive case
}
```

**4.2. Write a recursive function to count the number of items in a list.**
```typescript
function count<T>(arr: T[]): number {
  if (arr.length === 0) return 0; // Base case
  return 1 + count(arr.slice(1)); // Recursive case
}
```

**4.3. Find the maximum number in a list recursively.**
```typescript
function max(arr: number[]): number {
  if (arr.length === 1) return arr[0]; // Base case
  const subMax = max(arr.slice(1)); // Recursive case
  return arr[0] > subMax ? arr[0] : subMax;
}
```

**4.4. Remember binary search from chapter 1? It’s a divide-and-conquer algorithm, too. What are the base case and recursive case for binary search?**
- *Base case:* A list with zero or one element (if empty, target not found; if single element matches target, found; otherwise, not in list).
- *Recursive case:* Compare target with middle element. If target is smaller, recursively search the left sub-array; if larger, recursively search the right sub-array.

**4.5. Printing the value of each element in an array.** - *O(n)*

**4.6. Doubling the value of each element in an array.** - *O(n)*

**4.7. Doubling the value of just the first element in an array.** - *O(1)*

**4.8. Creating a multiplication table with all the elements in the array (e.g. [2, 3, 7, 8, 10], multiplying every element by each element).** - *O(n²)*

#### Quicksort Implementation in TypeScript

Quicksort is the quintessential Divide-and-Conquer algorithm:
1. **Base Case:** Arrays with 0 or 1 element are already sorted.
2. **Recursive Case:**
   - Pick a **pivot**.
   - Partition the array into two sub-arrays: elements $\le$ pivot and elements $>$ pivot.
   - Recursively call `quicksort` on both sub-arrays and combine: `[...quicksort(less), pivot, ...quicksort(greater)]`.

```typescript
/**
 * Pure Functional Quicksort (as taught in Grokking Algorithms)
 * Elegant and intuitive, but creates sub-arrays at each recursive call.
 * Time Complexity: Average O(n log n), Worst O(n^2)
 * Space Complexity: O(n) auxiliary memory
 */
function quicksort(arr: number[]): number[] {
  // Base case: arrays with 0 or 1 element are already "sorted"
  if (arr.length < 2) {
    return arr;
  }

  // Choose pivot (here picking the middle element reduces worst-case risk)
  const mid = Math.floor(arr.length / 2);
  const pivot = arr[mid]!;
  
  const rest = [...arr.slice(0, mid), ...arr.slice(mid + 1)];
  const less = rest.filter((item) => item <= pivot);
  const greater = rest.filter((item) => item > pivot);

  return [...quicksort(less), pivot, ...quicksort(greater)];
}

/**
 * In-Place Quicksort (Lomuto Partition Scheme)
 * Memory-efficient version commonly expected in technical interviews.
 * Space Complexity: O(log n) call stack frames
 */
function quicksortInPlace(
  arr: number[],
  low: number = 0,
  high: number = arr.length - 1
): number[] {
  if (low < high) {
    const pivotIdx = partition(arr, low, high);
    quicksortInPlace(arr, low, pivotIdx - 1);
    quicksortInPlace(arr, pivotIdx + 1, high);
  }
  return arr;
}

function partition(arr: number[], low: number, high: number): number {
  // Pick last element as pivot
  const pivot = arr[high]!;
  let i = low - 1; // Boundary of elements <= pivot

  for (let j = low; j < high; j++) {
    if (arr[j]! <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }
  }

  // Place pivot right after the smaller elements partition
  [arr[i + 1], arr[high]] = [arr[high]!, arr[i + 1]!];
  return i + 1;
}
```

#### Quicksort Call Stack & Pivot Performance Breakdown

| Scenario | Pivot Choice on Sorted Array `[1, 2, 3, 4, 5]` | Call Stack Depth | Work per Level | Total Time Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Worst Case** | Always pick first or last element | $O(n)$ frames (linear degradation) | $O(n)$ | $\mathbf{O(n^2)}$ |
| **Best / Average Case** | Pick middle or random element | $O(\log n)$ frames (balanced tree) | $O(n)$ | $\mathbf{O(n \log n)}$ |

```text
[Average Case: Balanced Tree O(log n) levels]
               [3, 5, 2, 1, 4]  (pivot = 3)
                 /          \
            [2, 1]          [5, 4]
            /    \          /    \
          [1]    [2]      [4]    [5]
Total work at each level: O(n) x log n levels = O(n log n)

[Worst Case: Unbalanced Call Stack O(n) levels]
            [1, 2, 3, 4, 5] (pivot = 1)
                \
                [2, 3, 4, 5] (pivot = 2)
                    \
                    [3, 4, 5] (pivot = 3)
Total work: n + (n - 1) + (n - 2) + ... + 1 = O(n^2)
```

---

### Chapter 5: Hash Tables

**Which of these hash functions are consistent?**

**5.1. `f(x) = 1` (Returns 1 for all input)**
- *Consistent:* It always returns the same output for the same input, though it causes maximum collisions (everything ends up in slot 1).

**5.2. `f(x) = rand()` (Returns a random number every time)**
- *Inconsistent:* Different outputs for the same input make retrieval impossible.

**5.3. `f(x) = next_empty_slot()` (Returns the index of the next empty slot in the hash table)**
- *Inconsistent:* Output changes depending on current table capacity and filled slots.

**5.4. `f(x) = len(x)` (Uses the length of the string as the index)**
- *Consistent:* The same string always has the same length, though words of equal length will collide.

**It's important for hash functions to distribute keys evenly. Suppose you have these hash functions for strings:**
- **Function A:** Return `1` for all input.
- **Function B:** Use the length of the string as the index.
- **Function C:** Use the first character of the string as the index (`a` -> 0, `b` -> 1, etc.).
- **Function D:** Map every letter to a prime number (`a = 2, b = 3, c = 5, ...`), sum them up and modulo table size.

**Which of these hash functions will provide a good distribution for each scenario below?**

**5.5. A phonebook where keys are names and values are phone numbers. The names are Esther, Ben, Bob, Dan.**
- **Functions C and D** provide a good distribution.
  - Function C puts Esther in `E`, Ben and Bob in `B`, Dan in `D` (minimal collisions).
  - Function D distributes names uniformly based on prime weighting.
  - Function B collides Ben, Bob, Dan (all length 3). Function A puts everyone into slot 1.

**5.6. A mapping from battery size to power. The sizes are A, AA, AAA, AAAA.**
- **Functions B and D** provide a good distribution.
  - Function B works great here because each battery size has a distinct length (1, 2, 3, 4).
  - Function C would be terrible because all sizes start with `A`, putting every entry into slot 0.

**5.7. A mapping from book titles to authors. Titles: "Moby Dick", "The Great Gatsby", "Catch-22".**
- **Functions C and D** provide a good distribution.
  - Function D provides the most uniform distribution across general text.
  - Function C works reasonably well if titles start with diverse letters.
  - Function B can easily collide if titles have identical lengths.

**Hash Table Performance & Resizing Rule:**
- **Average Case:** $O(1)$ for Search, Insert, and Delete.
- **Worst Case (Heavy collisions):** $O(n)$.
- **Load Factor:** $\frac{\text{number of items}}{\text{total number of slots}}$. When load factor $> 0.7$, we should resize (double table size and re-hash items) to maintain $O(1)$ performance.

#### Hash Table Implementation in TypeScript (Separate Chaining)

In practice, hash collisions are inevitable by the Pigeonhole Principle. One of the most standard collision-resolution strategies is **Separate Chaining**, where each table slot holds a bucket (array or linked list) of key-value pairs.

```typescript
class HashTable<V> {
  private buckets: Array<Array<[string, V]>>;
  private capacity: number;
  private count: number;
  private readonly maxLoadFactor = 0.7;

  constructor(capacity: number = 16) {
    this.capacity = capacity;
    this.count = 0;
    this.buckets = Array.from({ length: capacity }, () => []);
  }

  /**
   * Polynomial rolling hash function (DJB2 variant)
   */
  private hash(key: string): number {
    let hashVal = 5381;
    for (let i = 0; i < key.length; i++) {
      hashVal = (hashVal * 33) ^ key.charCodeAt(i);
    }
    return Math.abs(hashVal % this.capacity);
  }

  /**
   * Insert or update key-value pair
   * Time Complexity: O(1) average, O(n) worst case
   */
  public set(key: string, value: V): void {
    if (this.count / this.capacity >= this.maxLoadFactor) {
      this.resize(this.capacity * 2);
    }

    const index = this.hash(key);
    const bucket = this.buckets[index]!;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i]![0] === key) {
        bucket[i]![1] = value; // Update existing key
        return;
      }
    }

    bucket.push([key, value]);
    this.count++;
  }

  /**
   * Retrieve value by key
   * Time Complexity: O(1) average, O(n) worst case
   */
  public get(key: string): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index]!;

    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return undefined;
  }

  /**
   * Check if key exists
   */
  public has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  /**
   * Delete key from table
   */
  public delete(key: string): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index]!;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i]![0] === key) {
        bucket.splice(i, 1);
        this.count--;
        return true;
      }
    }
    return false;
  }

  /**
   * Re-hashes all existing entries into a newly sized bucket array
   */
  private resize(newCapacity: number): void {
    const oldBuckets = this.buckets;
    this.capacity = newCapacity;
    this.count = 0;
    this.buckets = Array.from({ length: newCapacity }, () => []);

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  public get size(): number {
    return this.count;
  }
}
```

---

### Chapter 6: Breadth-First Search (BFS) & Graphs

**6.1. Find the length of the shortest path from start to finish in this graph:**
- `Start -> [A, B]`
- `A -> [Finish]`
- `B -> [A, Finish]`
- *Answer:* The shortest path length is **2** (`Start -> A -> Finish` or `Start -> B -> Finish`).

**6.2. Find the length of the shortest path from "cab" to "bat" where you can only change one letter at a time (Word Ladder):**
- Candidate dictionary words: `cab`, `cat`, `car`, `bar`, `mat`, `bat`.
- *Shortest path:* `cab` $\to$ `cat` $\to$ `bat` (Length = **2 transitions**).
- *(BFS searches level-by-level, guaranteeing that the shortest 2-step path is found before exploring longer 3-step paths like `cab` $\to$ `car` $\to$ `bar` $\to$ `bat`).*

**6.3. Here are three morning routines with dependency rules. Which ones are valid topological sorts?**
- Rules: `Wake up` must precede `Brush teeth`, `Shower` must precede `Get dressed`, `Brush teeth` must precede `Eat breakfast`.
  - **A.** `Wake up` $\to$ `Shower` $\to$ `Brush teeth` $\to$ `Eat breakfast` $\to$ `Get dressed` $\implies$ **Valid**
  - **B.** `Shower` $\to$ `Wake up` $\to$ `Get dressed` $\to$ `Brush teeth` $\to$ `Eat breakfast` $\implies$ **Valid**
  - **C.** `Shower` $\to$ `Get dressed` $\to$ `Brush teeth` $\to$ `Wake up` $\to$ `Eat breakfast` $\implies$ **Invalid** (`Brush teeth` cannot happen before `Wake up`).

**6.4. Which graphs are trees?**
- A tree is a connected, acyclic graph. If a graph has a cycle or disconnected components, it is not a tree. Any tree with $V$ vertices has exactly $V - 1$ edges.

**6.5. BFS Implementation in TypeScript & Complexity:**
```typescript
function bfs(graph: Record<string, string[]>, start: string, target: string): boolean {
  const queue: string[] = [start];
  const visited = new Set<string>([start]);

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (current === target) return true;

    for (const neighbor of graph[current] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return false;
}
```
- **Time Complexity:** $O(V + E)$ where $V$ is number of vertices (nodes) and $E$ is number of edges (connections).
- **Space Complexity:** $O(V)$ for the queue and visited set.

#### 6.6. Shortest Path Reconstruction with BFS

In real applications (e.g. navigation, social network shortest connection), we don't just want to know *if* a path exists—we need the actual sequence of nodes forming the path.

```typescript
/**
 * BFS Shortest Path Reconstruction
 * Returns the shortest path from start to target, or null if unreachable.
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function findShortestPath(
  graph: Record<string, string[]>,
  start: string,
  target: string
): string[] | null {
  if (start === target) return [start];

  const queue: string[] = [start];
  const visited = new Set<string>([start]);
  const parent = new Map<string, string | null>();
  parent.set(start, null);

  let head = 0; // Index pointer avoids O(n) array.shift() overhead
  let found = false;

  while (head < queue.length) {
    const current = queue[head++]!;
    if (current === target) {
      found = true;
      break;
    }

    for (const neighbor of graph[current] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parent.set(neighbor, current);
        queue.push(neighbor);
      }
    }
  }

  if (!found) return null;

  // Reconstruct path by backtracking parent pointers
  const path: string[] = [];
  let curr: string | null = target;
  while (curr !== null) {
    path.push(curr);
    curr = parent.get(curr) ?? null;
  }

  return path.reverse();
}
```

#### 6.7. Topological Sort in TypeScript (Kahn's Algorithm - BFS Approach)

Directly applied to Exercise 6.3 (validating and ordering morning routines and dependency graphs):

```typescript
/**
 * Kahn's Algorithm for Topological Sorting (DAG dependency resolution)
 * Time Complexity: O(V + E)
 * Space Complexity: O(V + E)
 */
function topologicalSort(
  nodes: string[],
  edges: [from: string, to: string][]
): string[] | null {
  const adj = new Map<string, string[]>();
  const inDegree = new Map<string, number>();

  for (const node of nodes) {
    adj.set(node, []);
    inDegree.set(node, 0);
  }

  for (const [from, to] of edges) {
    adj.get(from)!.push(to);
    inDegree.set(to, (inDegree.get(to) ?? 0) + 1);
  }

  // Queue all nodes with in-degree 0 (no prerequisites)
  const queue: string[] = [];
  for (const [node, degree] of inDegree.entries()) {
    if (degree === 0) queue.push(node);
  }

  const order: string[] = [];
  let head = 0;

  while (head < queue.length) {
    const u = queue[head++]!;
    order.push(u);

    for (const neighbor of adj.get(u) ?? []) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  // If order length matches total nodes, DAG is acyclic and sorted; otherwise, cycle exists
  return order.length === nodes.length ? order : null;
}
```

---

### Chapter 7: Dijkstra's Algorithm & Weighted Graphs

**7.1. In each of these graphs, what is the weight of the shortest path from start to finish?**

- **Graph A:**
  - `Start -> A (5)`, `Start -> B (2)`
  - `B -> A (8)`, `B -> D (7)`
  - `A -> C (4)`, `A -> D (2)`
  - `C -> D (6)`, `C -> Finish (3)`
  - `D -> Finish (1)`
  - *Shortest path:* `Start -> A -> D -> Finish` with total weight $5 + 2 + 1 = \mathbf{8}$.

- **Graph B:**
  - `Start -> A (10)`
  - `A -> B (20)`
  - `B -> C (1)`, `B -> Finish (30)`
  - `C -> A (1)` *(cycle with positive weight)*
  - *Shortest path:* `Start -> A -> B -> Finish` with total weight $10 + 20 + 30 = \mathbf{60}$.

- **Graph C (Negative-weight edge):**
  - `Start -> A (2)`, `Start -> B (2)`
  - `B -> A (2)`
  - `A -> Finish (2)`
  - `B -> Finish (-1)`
  - *Shortest path:* `Start -> B -> Finish` with total weight $2 + (-1) = \mathbf{1}$.
  - *(Warning: Dijkstra's algorithm fails when negative-weight edges exist because once a node is processed, it assumes its shortest path is finalized. To handle negative weights, use the **Bellman-Ford Algorithm**).*

**7.2. Comparison: BFS vs Dijkstra's Algorithm:**

| Feature | Breadth-First Search (BFS) | Dijkstra's Algorithm |
| :--- | :--- | :--- |
| **Graph Type** | Unweighted graphs (all edges have equal cost) | Weighted graphs |
| **Optimality Goal** | Shortest path by *fewest segments / steps* | Shortest path by *lowest total weight* |
| **Negative weights** | N/A | Fails with negative edge weights (use Bellman-Ford) |
| **Data structure** | Queue (FIFO) | Priority Queue / Min-Heap |
| **Time Complexity** | $O(V + E)$ | $O(E \log V)$ with min-heap |

#### 7.3. Dijkstra's Algorithm Implementation in TypeScript

In *Grokking Algorithms*, Dijkstra's algorithm uses three key data structures:
1. **`graph`**: Adjacency list storing outgoing edges and their weights.
2. **`costs`**: Maps each node to the lowest cost found so far from `start`.
3. **`parents`**: Maps each node to its predecessor along the lowest cost path.
4. **`processed`**: Set of nodes whose lowest cost path is already finalized.

```typescript
type WeightedGraph = Record<string, Record<string, number>>;

interface DijkstraResult {
  distance: number;
  path: string[];
}

/**
 * Finds the unprocessed node with the lowest cost.
 */
function findLowestCostNode(
  costs: Record<string, number>,
  processed: Set<string>
): string | null {
  let lowestCost = Infinity;
  let lowestNode: string | null = null;

  for (const node in costs) {
    const cost = costs[node]!;
    if (cost < lowestCost && !processed.has(node)) {
      lowestCost = cost;
      lowestNode = node;
    }
  }

  return lowestNode;
}

/**
 * Dijkstra's Algorithm (Grokking Algorithms implementation pattern)
 * Time Complexity: O(V^2) with array/object scan; O((V + E) log V) with Min-Heap
 * Space Complexity: O(V)
 */
function dijkstra(
  graph: WeightedGraph,
  start: string,
  finish: string
): DijkstraResult {
  // 1. Initialize costs table
  const costs: Record<string, number> = {};
  const parents: Record<string, string | null> = {};
  const processed = new Set<string>();

  // Set initial costs for direct neighbors of start, Infinity for others
  for (const node in graph) {
    if (node === start) continue;
    costs[node] = Infinity;
    parents[node] = null;
  }

  for (const neighbor in graph[start] ?? {}) {
    costs[neighbor] = graph[start]![neighbor]!;
    parents[neighbor] = start;
  }

  // 2. Main loop: process node with lowest cost
  let node = findLowestCostNode(costs, processed);

  while (node !== null) {
    const cost = costs[node]!;
    const neighbors = graph[node] ?? {};

    // Check all neighbors of current node
    for (const neighbor in neighbors) {
      const edgeWeight = neighbors[neighbor]!;
      const newCost = cost + edgeWeight;

      // If we found a cheaper way to reach neighbor, update cost and parent
      if ((costs[neighbor] ?? Infinity) > newCost) {
        costs[neighbor] = newCost;
        parents[neighbor] = node;
      }
    }

    // Mark current node as processed
    processed.add(node);
    node = findLowestCostNode(costs, processed);
  }

  // 3. Reconstruct shortest path from finish back to start
  const path: string[] = [];
  let curr: string | null = finish;

  while (curr !== null) {
    path.unshift(curr);
    curr = parents[curr] ?? null;
  }

  return {
    distance: costs[finish] ?? Infinity,
    path: path[0] === start ? path : [],
  };
}
```

#### 7.4. Step-by-Step Execution Trace (Exercise 7.1 Graph A)

Graph structure: `Start -> A (5)`, `Start -> B (2)`, `B -> A (8)`, `B -> D (7)`, `A -> C (4)`, `A -> D (2)`, `C -> Finish (3)`, `D -> Finish (1)`.

| Step | Node Processed | Neighbors Checked | Tentative Cost Calculation | Updated `costs` | Updated `parents` | `processed` |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- |
| **Init** | - | - | Direct neighbors of Start | `{A: 5, B: 2, C: ∞, D: ∞, Finish: ∞}` | `{A: Start, B: Start}` | `{}` |
| **1** | **B** (cost 2) | `A (8)`, `D (7)` | `A: 2 + 8 = 10 > 5` (no change)<br>`D: 2 + 7 = 9 < ∞` | `{A: 5, B: 2, C: ∞, D: 9, Finish: ∞}` | `{A: Start, B: Start, D: B}` | `{B}` |
| **2** | **A** (cost 5) | `C (4)`, `D (2)` | `C: 5 + 4 = 9 < ∞`<br>`D: 5 + 2 = 7 < 9` (cheaper path found!) | `{A: 5, B: 2, C: 9, D: 7, Finish: ∞}` | `{A: Start, B: Start, C: A, D: A}` | `{B, A}` |
| **3** | **D** (cost 7) | `Finish (1)` | `Finish: 7 + 1 = 8 < ∞` | `{A: 5, B: 2, C: 9, D: 7, Finish: 8}` | `{..., Finish: D}` | `{B, A, D}` |
| **4** | **Finish** (cost 8) | None | - | No updates | No updates | `{B, A, D, Finish}` |
| **5** | **C** (cost 9) | `Finish (3)` | `Finish: 9 + 3 = 12 > 8` (no change) | `{A: 5, B: 2, C: 9, D: 7, Finish: 8}` | `{..., Finish: D}` | `{B, A, D, Finish, C}` |

- **Final Shortest Path:** Backtracking from `Finish`: `Finish <- D <- A <- Start` $\implies$ `Start -> A -> D -> Finish` (Total Cost = **8**).

---

### Chapter 8: Greedy Algorithms & NP-Complete Problems

**8.1. You work for a furniture company, and you have to ship boxes all over the country. You need to pack your truck with boxes. All the boxes are of different sizes, and you’re trying to maximize the space you use in the truck. How would you pick boxes to maximize space? Is this a greedy strategy?**
- *Greedy strategy:* At each step, pick the largest remaining box that still fits into the truck until no more boxes fit.
- *Is it optimal?* No. Similar to the Knapsack Problem, a greedy approach does not guarantee the globally optimal packing (a combination of smaller boxes might utilize remaining empty space much better than a single bulky box).

**8.2. You’re going to Europe, and you have seven days to see everything you can. You have a list of sights with a rating (value) and time needed (cost). How can you see the best sights in the given time? Is this a greedy strategy?**
- *Greedy strategy:* Always pick the sight with the highest rating (or best rating-to-time ratio) that fits into your remaining schedule.
- *Is it optimal?* No, this is another variation of the Knapsack Problem. Greedy choices can leave awkward chunks of unused time that could have accommodated multiple high-value sights.

**8.3. For each of these algorithms, is it a greedy algorithm or not?**
- **Quicksort:** *Not greedy.* It uses Divide-and-Conquer (partitions the array around a pivot and recursively sorts sub-arrays).
- **Breadth-First Search (BFS):** *Not greedy.* It systematically explores all nodes level by level to guarantee the shortest unweighted path, rather than making locally greedy choices.
- **Dijkstra's Algorithm:** *Greedy.* At each step, it greedily selects the unvisited node with the lowest known distance from the source.

**8.4. A postman needs to deliver mail to 20 houses. He needs to find the shortest route that visits all 20 houses and returns home. Is this an NP-complete problem?**
- *Yes.* This is the classic **Traveling Salesperson Problem (TSP)**, which is NP-complete ($O(n!)$ brute force).

**8.5. Finding the largest clique in a group of people (a clique is a group where everyone knows each other). Is this NP-complete?**
- *Yes.* The **Max-Clique Problem** is a well-known NP-complete problem.

**8.6. You're making a map of the USA and need to color adjacent states with different colors. What's the minimum number of colors needed? Is this NP-complete?**
- *Yes.* The **Graph Coloring Problem** (finding the chromatic number) is NP-complete.

**8.7. The Set-Covering Problem & Greedy Approximation Algorithm:**
- *Problem:* You want to broadcast a radio show across 50 US states. You have a list of radio stations, each covering a subset of states. Find the minimum set of stations to cover all 50 states.
- *Exact solution:* Check every possible subset of stations $\implies O(2^n)$ (intractable for large $n$).
- *Greedy Approximation:*
  1. Pick the station that covers the most uncovered states.
  2. Add it to the solution and remove those states from the needed set.
  3. Repeat until all states are covered.
- *Performance:* Runs in $O(n^2)$ time and produces an approximation close to optimal ($O(\log n)$ approximation factor).

**8.8. How to identify NP-Complete problems:**
- Your algorithm runs quickly with a few items, but grinds to a halt as $n$ grows.
- "Find all combinations of X" or "Find every possible route through X" usually means NP-complete.
- Can't be broken down into smaller sub-problems (unlike Dynamic Programming or D&C).
- If the problem involves a sequence (like traveling salesperson) or a set of objects (like knapsack/set cover) and is hard to solve.

---

### Chapter 9: Dynamic Programming (DP)

**Dynamic Programming Core Concept:**
- DP solves problems by breaking them down into **subproblems** and solving subproblems first.
- DP only works when subproblems are **discrete and independent** (they don't depend on each other or external state).
- Every DP solution involves a **grid / table**:
  - The values in the cells are usually what you want to optimize.
  - Each cell represents a subproblem.

**9.1. Suppose you can steal another item: an MP3 player. It weighs 1 lb and is worth \$1,000. How does the knapsack grid update? Should you steal it?**
- *Answer:* Yes. Recalculating the DP grid with the 1 lb / \$1,000 MP3 player shows that it pairs with the laptop (3 lbs, \$2,000) for a 4 lb knapsack, raising the maximum total stolen value from \$3,000 (stereo + guitar) to **\$3,000 -> \$3,500** or higher depending on available items.
- *Knapsack recurrence formula:*
  $$\text{cell}[i][j] = \max(\text{cell}[i-1][j], \text{item\_value} + \text{cell}[i-1][j - \text{item\_weight}])$$

**9.2. Suppose you're going camping with a knapsack capacity of 6 lbs. Available items:**
- Water: 3 lbs, value 10
- Book: 1 lb, value 3
- Food: 2 lbs, value 9
- Jacket: 2 lbs, value 5
- Camera: 1 lb, value 6

*What is the optimal set of items to take?*
- By filling out the DP table for weights 1 to 6 lbs:
  - Weight 1: Camera (value 6)
  - Weight 2: Food (value 9)
  - Weight 3: Water (value 10) or Food + Camera (value 9 + 6 = 15)
  - Weight 5: Water (3 lbs, 10) + Food (2 lbs, 9) = 19
  - Weight 6: **Water (3 lbs, 10) + Food (2 lbs, 9) + Camera (1 lb, 6) = 6 lbs with maximum value $\mathbf{25}$**.

**9.3. Longest Common Substring vs. Longest Common Subsequence:**

- **Longest Common Substring:** Measures consecutive matching characters between two strings (e.g., `fish` and `hish` $\to$ `ish` with length 3).
  - *Cell formula:*
    $$\text{cell}[i][j] = \begin{cases} \text{cell}[i-1][j-1] + 1 & \text{if } s_1[i] == s_2[j] \\ 0 & \text{otherwise} \end{cases}$$

- **Longest Common Subsequence (LCS):** Measures characters that appear in the same relative order, but not necessarily consecutively (e.g., `fosh` and `fish` $\to$ `fsh` with length 3).
  - *Cell formula:*
    $$\text{cell}[i][j] = \begin{cases} \text{cell}[i-1][j-1] + 1 & \text{if } s_1[i] == s_2[j] \\ \max(\text{cell}[i-1][j], \text{cell}[i][j-1]) & \text{otherwise} \end{cases}$$

**9.4. Levenshtein Distance:**
- A string metric used in spell-checkers and DNA sequencing to measure the minimum number of single-character edits (insertions, deletions, or substitutions) required to transform one word into another.

#### 9.5. Dynamic Programming Implementations in TypeScript

##### 1. The 0/1 Knapsack Problem (Full 2D DP Table & Item Backtracking)

```typescript
interface KnapsackResult {
  maxValue: number;
  selectedIndices: number[];
}

/**
 * 0/1 Knapsack with DP grid and backtracking
 * Time Complexity: O(n * W) where n is items count, W is capacity
 * Space Complexity: O(n * W)
 */
function knapsack01(
  weights: number[],
  values: number[],
  capacity: number
): KnapsackResult {
  const n = weights.length;
  // dp[i][w] = max value using a subset of items from 0 to i - 1 with capacity w
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(capacity + 1).fill(0)
  );

  // Fill DP Table
  for (let i = 1; i <= n; i++) {
    const weight = weights[i - 1]!;
    const val = values[i - 1]!;

    for (let w = 1; w <= capacity; w++) {
      if (weight <= w) {
        // Option 1: don't include item i-1 vs Option 2: include item i-1
        dp[i]![w] = Math.max(dp[i - 1]![w]!, val + dp[i - 1]![w - weight]!);
      } else {
        dp[i]![w] = dp[i - 1]![w]!;
      }
    }
  }

  // Backtrack to find which items were chosen
  const selectedIndices: number[] = [];
  let currW = capacity;
  for (let i = n; i > 0; i--) {
    // If value came from including this item
    if (dp[i]![currW] !== dp[i - 1]![currW]) {
      selectedIndices.push(i - 1);
      currW -= weights[i - 1]!;
    }
  }

  return {
    maxValue: dp[n]![capacity]!,
    selectedIndices: selectedIndices.reverse(),
  };
}

/**
 * Space-Optimized 0/1 Knapsack (1D Rolling Array)
 * Notice: traverse capacity backwards to prevent using the same item twice!
 * Space Complexity: O(W)
 */
function knapsack01Optimized(
  weights: number[],
  values: number[],
  capacity: number
): number {
  const dp: number[] = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    const weight = weights[i]!;
    const val = values[i]!;

    for (let w = capacity; w >= weight; w--) {
      dp[w] = Math.max(dp[w]!, val + dp[w - weight]!);
    }
  }

  return dp[capacity]!;
}
```

##### 2. Longest Common Subsequence (LCS) vs. Longest Common Substring

```typescript
/**
 * Longest Common Subsequence (e.g. "fosh" & "fish" -> "fsh", length 3)
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i]![j] = dp[i - 1]![j - 1]! + 1;
      } else {
        dp[i]![j] = Math.max(dp[i - 1]![j]!, dp[i]![j - 1]!);
      }
    }
  }

  return dp[m]![n]!;
}

/**
 * Longest Common Substring (consecutive match, e.g. "fish" & "hish" -> "ish", length 3)
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
function longestCommonSubstring(s1: string, s2: string): string {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );
  let maxLen = 0;
  let endIndexInS1 = 0;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i]![j] = dp[i - 1]![j - 1]! + 1;
        if (dp[i]![j]! > maxLen) {
          maxLen = dp[i]![j]!;
          endIndexInS1 = i;
        }
      } else {
        dp[i]![j] = 0; // Reset counter for non-consecutive characters
      }
    }
  }

  return s1.slice(endIndexInS1 - maxLen, endIndexInS1);
}
```

---

### Chapter 10: K-Nearest Neighbors (KNN)

**10.1. Calculating Similarity with Distance Metrics:**
- **Euclidean Distance (Pythagorean Theorem in $N$ dimensions):**
  $$\text{Distance} = \sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2 + \dots + (z_1 - z_2)^2}$$
- **Cosine Similarity:** Measures the cosine of the angle between two vectors instead of direct Euclidean distance. Ideal when user rating habits differ (e.g. a harsh critic rating 3/5 vs an enthusiastic user rating 5/5 for the same enjoyment).

**10.2. Classification vs. Regression:**
- **Classification:** Predicting a **category/class** (Discrete label).
  - *Mechanism:* Take the **majority vote** among the $K$ nearest neighbors.
  - *Examples:* Is this email spam or not? Is this fruit an orange or grapefruit?
- **Regression:** Predicting a **numerical value** (Continuous number).
  - *Mechanism:* Take the **average (or distance-weighted average)** of the values of the $K$ nearest neighbors.
  - *Examples:* How many loaves of bread will the bakery sell tomorrow? How many stars (1–5) will user A give to this movie?

**10.3. Feature Extraction & Normalization:**
- **Feature Selection:** Choosing features that directly correlate to the target prediction without introducing noise or bias.
- **Normalization:** If features have vastly different scales (e.g. age: $18 - 80$ vs ratings: $1 - 5$), the feature with larger numbers will disproportionately dominate Euclidean distance. All features must be normalized (e.g. scaled to a $[0, 1]$ range).

**10.4. How to choose $K$:**
- **Too small $K$ (e.g., $K = 1$):** High variance, extremely sensitive to outliers and noisy data (overfitting).
- **Too large $K$ (e.g., $K = N$):** High bias, dilutes local patterns and predicts the global majority everywhere (underfitting).
- *Rule of thumb:* Typically $K = \sqrt{N}$ and preferably an **odd number** to avoid tie votes in binary classification.

**10.5. Real-World Applications of KNN:**
- **Recommendation Engines:** Netflix movie recommendations, Spotify playlist suggestions.
- **OCR (Optical Character Recognition):** Classifying handwritten digits (e.g. MNIST) by treating pixel intensities as high-dimensional coordinates.
- **Spam Filtering:** Classifying incoming emails based on word-frequency vectors.

---

### Chapter 11: Where to Go Next? (Advanced Topics & Data Structures)

**11.1. Binary Search Trees (BST) & Balanced Trees**
- **Binary Search Tree (BST):** A tree where every node has at most two children. For any node $N$, all values in its left subtree are $< N$, and all values in its right subtree are $> N$.
  - *Time Complexity:* Average $O(\log n)$ for Search, Insert, and Delete. Worst case $O(n)$ if the tree becomes completely unbalanced (skewed like a linked list).
- **Balanced Trees (AVL Trees, Red-Black Trees):** Self-balancing binary search trees that automatically perform rotations during insertion/deletion to keep height balanced at $O(\log n)$, guaranteeing $O(\log n)$ worst-case time complexity.
- **B-Trees:** Multi-way balanced search trees where nodes can store multiple keys and have dozens or hundreds of children.
  - *Use Case:* Primary indexing structure in relational databases (PostgreSQL, MySQL InnoDB) and file systems (NTFS, ext4). B-trees minimize expensive disk I/O reads by grouping keys to match physical disk page sizes.

**11.2. Inverted Indexes (Full-Text Search Engines)**
- **Concept:** Instead of mapping a document to the words it contains (`Doc -> [Words]`), an inverted index maps each unique word to the list of documents where it appears (`Word -> [Doc IDs]`).
  - *Example:*
    ```text
    "algorithm" -> [Doc 1, Doc 4, Doc 7]
    "binary"    -> [Doc 2, Doc 4, Doc 9]
    ```
- **Search Execution:** Searching for `"algorithm AND binary"` takes the intersection of the two sorted document lists in $O(\min(|A|, |B|))$ time.
- *Real-World:* Powers search engines like Google, Elasticsearch, and Apache Lucene.

**11.3. The Fourier Transform**
- **Concept:** A mathematical transform that decomposes a complex signal (like an audio wave) into its individual constituent pure frequencies (sine and cosine waves).
- **Analogy:** Given a smoothie, the Fourier transform tells you the exact proportions of strawberries, bananas, and milk that made it up.
- *Real-World Applications:*
  - **Audio Compression (MP3):** Identifies frequencies humans cannot hear and filters them out.
  - **Image Processing (JPEG):** Uses the Discrete Cosine Transform (DCT) to compress high-frequency visual noise.
  - **Music Recognition (Shazam):** Generates audio fingerprints from key peak frequencies.

**11.4. Parallel Algorithms & Distributed Computing (MapReduce)**
- **Limits of Single-Core CPUs:** CPU clock speeds have plateaued; performance gains now come from multi-core processors and distributed server clusters.
- **Challenges of Parallelization:**
  - *Overhead:* Thread creation, context switching, and inter-thread synchronization costs.
  - *Race Conditions & Deadlocks:* Multiple threads reading/writing shared memory concurrently without proper locking.
  - *Load Balancing:* Difficult to ensure all cores finish at the exact same time (Amdahl's Law).
- **MapReduce Model:** A distributed computing framework for processing massive datasets across hundreds or thousands of commodity machines:
  - **Map:** Distribute the input dataset across worker nodes to process data locally and emit `(key, value)` pairs.
  - **Shuffle & Sort:** Group all values by key across the cluster network.
  - **Reduce:** Aggregate and combine the grouped values for each key into final results.
  - *Real-World:* Apache Hadoop, Apache Spark, Google BigQuery.

**11.5. Probabilistic Data Structures: Bloom Filters & HyperLogLog**
- **Bloom Filters:** A space-efficient probabilistic data structure used to test whether an element is a member of a set:
  - *Mechanism:* Uses a bit array of size $m$ and $k$ independent hash functions. When adding an item, hash it $k$ times and set those bit indices to `1`. When querying, check if all $k$ bits are `1`.
  - **Core Guarantee:**
    - *No False Negatives:* If it returns "Item is NOT present", the item is **100% guaranteed** not in the set.
    - *Possible False Positives:* If it returns "Item IS present", the item **might** be in the set (bits could have been set by other elements).
  - *Use Cases:* Web crawlers (avoid re-crawling URLs), Google Chrome (checking malicious URLs locally before querying server), Apache Cassandra/Google Bigtable (avoiding costly disk reads for non-existent row keys).
- **HyperLogLog (HLL):** Estimates the number of unique elements (cardinality) in massive streams with negligible memory:
  - *Use Case:* Counting billions of distinct daily visitors to a website using only $\approx 1.5\text{ KB}$ of memory with an error rate of under $1\%$.

**11.6. Locality-Sensitive Hashing (LSH) & Simhash**
- **Cryptographic Hashes (e.g. SHA-256):** Feature the **Avalanche Effect** — changing a single bit in the input produces a completely different, unpredictable hash.
- **Locality-Sensitive Hashing (Simhash):** Designed with the opposite objective — similar inputs produce similar hash values.
  - *Mechanism:* Compares the Hamming distance (number of differing bits) between hashes. A small Hamming distance implies high document similarity.
  - *Use Cases:* Detecting near-duplicate web pages at Google scale, detecting plagiarism, copyright fingerprinting on streaming platforms.

**11.7. Cryptography: Diffie-Hellman Key Exchange & RSA**
- **Symmetric vs. Asymmetric Cryptography:**
  - *Symmetric (e.g. AES):* Same secret key encrypts and decrypts (fast, but requires a secure channel to share the secret).
  - *Asymmetric (Public/Private Key):* Public key encrypts, private key decrypts.
- **Diffie-Hellman Key Exchange:** Allows two parties (Alice and Bob) who have never met to negotiate a shared secret key over an insecure, public channel without an eavesdropper being able to calculate it.
  - *Mathematical Foundation:* Based on the difficulty of the **Discrete Logarithm Problem** ($g^a \pmod p$).
- **RSA Encryption:** Asymmetric cryptosystem based on the asymmetry of prime factorization: multiplying two massive prime numbers is trivial ($O(1)$), but factoring their large product back into its prime factors is computationally infeasible without the private key.

**11.8. Linear Programming & The Simplex Algorithm**
- **Concept:** A technique for optimizing a linear objective function subject to linear equality and inequality constraints.
  - *Example Problem:* Maximize profit $P = 3x + 5y$ subject to:
    $$x + 2y \le 20, \quad 2x + y \le 18, \quad x \ge 0, \quad y \ge 0$$
- **The Simplex Algorithm:** Traverses the vertices (corner points) of the feasible convex polygon/polytope to find the optimal global maximum or minimum.
- *Real-World Applications:* Supply chain logistics, airline crew scheduling, factory resource allocation.

---

### Summary: Algorithm Complexity & Selection Matrix

#### 1. Complete Big-O Complexity Comparison

| Algorithm / Technique | Book Chapter | Paradigm | Average Time | Worst Time | Space Complexity | Best For |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Binary Search** | Ch. 1 | Divide & Conquer | $O(\log n)$ | $O(\log n)$ | $O(1)$ | Sorted arrays lookup |
| **Selection Sort** | Ch. 2 | Brute Force | $O(n^2)$ | $O(n^2)$ | $O(1)$ | Tiny arrays, minimal writes |
| **Quicksort** | Ch. 4 | Divide & Conquer | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | General in-place sorting |
| **Hash Table Lookup** | Ch. 5 | Hashing | $O(1)$ | $O(n)$ | $O(n)$ | Key-value caching, fast lookup |
| **Breadth-First Search** | Ch. 6 | Graph Traversal | $O(V + E)$ | $O(V + E)$ | $O(V)$ | Shortest path in unweighted graphs |
| **Dijkstra's Algorithm** | Ch. 7 | Greedy | $O((V + E) \log V)$ | $O(V^2)$ | $O(V)$ | Shortest path with non-negative weights |
| **Greedy Set-Covering** | Ch. 8 | Greedy Approx. | $O(n^2)$ | $O(n^2)$ | $O(n)$ | NP-complete optimization approx. |
| **Knapsack Problem (0/1)**| Ch. 9 | Dynamic Prog. | $O(n \times W)$ | $O(n \times W)$ | $O(n \times W)$ | Discrete resource optimization |
| **Longest Common Substr** | Ch. 9 | Dynamic Prog. | $O(m \times n)$ | $O(m \times n)$ | $O(m \times n)$ | String alignment / similarity |
| **K-Nearest Neighbors** | Ch. 10 | Instance-based | $O(n \times d)$ | $O(n \times d)$ | $O(n \times d)$ | Classification / regression |
| **Binary Search Tree** | Ch. 11 | Hierarchical | $O(\log n)$ | $O(n)$ | $O(n)$ | Dynamic sorted data |

---

#### 2. Algorithm Decision Flowchart

When solving a problem, use this decision framework:

1. **Are you searching in a linear collection?**
   - Sorted array $\implies$ **Binary Search** ($O(\log n)$).
   - Unsorted $\implies$ **Hash Table** for $O(1)$ lookup or sort first ($O(n \log n)$).

2. **Are you finding the shortest path on a graph/network?**
   - Unweighted edges (fewest steps) $\implies$ **Breadth-First Search (BFS)**.
   - Weighted edges (positive weights) $\implies$ **Dijkstra's Algorithm**.
   - Weighted edges (contains negative weights) $\implies$ **Bellman-Ford Algorithm**.

3. **Are you optimizing under constraints?**
   - Can you break down into discrete, independent subproblems with overlapping solutions? $\implies$ **Dynamic Programming (DP)**.
   - Is it an NP-Complete problem (TSP, Set Cover) requiring a fast, near-optimal answer? $\implies$ **Greedy Approximation**.
   - Are both objective and constraints strictly linear? $\implies$ **Linear Programming (Simplex)**.

4. **Are you measuring similarity / recommendations?**
   - Low-dimensional feature points $\implies$ **KNN with Euclidean Distance**.
   - High-dimensional / angle-focused (ratings, text) $\implies$ **Cosine Similarity**.
   - Near-duplicate detection across millions of documents $\implies$ **Locality-Sensitive Hashing (Simhash)**.

---

### Core Algorithmic Paradigms & Mental Models

#### 1. The 4 Major Algorithmic Design Paradigms

| Paradigm | How It Thinks | Subproblem Relationship | Optimal Substructure? | When to Use | Classic Examples |
| :--- | :--- | :--- | :---: | :--- | :--- |
| **Divide & Conquer (D&C)** | Break into smaller, disjoint subproblems, solve recursively, and combine. | Non-overlapping, independent | Yes | Subproblems do not repeat; problem splits evenly. | Binary Search, Quicksort, Merge Sort |
| **Greedy** | Make the locally optimal choice at each step, hoping for global optimum. | Sequential, never backtracks | Yes (Greedy Choice Property) | Local optimum is guaranteed to lead to global optimum. | Dijkstra, Prim/Kruskal, Huffman Coding, Interval Scheduling |
| **Dynamic Programming (DP)** | Solve all subproblems once and store results in a memo/grid. | Overlapping subproblems | Yes | Overlapping subproblems with recurrence relationship. | 0/1 Knapsack, Longest Common Subsequence, Coin Change |
| **Backtracking (Brute Force Pruning)** | Build candidates incrementally, abandon ("backtrack") invalid paths. | Tree exploration with early pruning | No | Exhaustive search with constraints. | N-Queens, Sudoku, Subsets/Permutations |

#### 2. Shortest Path & Graph Traversal Mental Models

```text
[Graph Traversal Decision Tree]
               Is the graph weighted?
                     /        \
                   No          Yes
                  /              \
            Use BFS        Are there negative edge weights?
          O(V + E)               /            \
                               No              Yes
                              /                  \
                      Use Dijkstra          Use Bellman-Ford
                   O((V + E) log V)             O(V * E)
```

| Traversal / Algorithm | Edge Weights | Cycle Handling | Data Structure | Guarantees Shortest Path? |
| :--- | :--- | :--- | :--- | :--- |
| **BFS** | Unweighted ($w = 1$) | `visited` Set | Queue (FIFO) | **Yes** (fewest edges) |
| **DFS** | Irrelevant | `visited` Set | Stack / Call Stack | **No** (deep exploration) |
| **Dijkstra** | Non-negative ($w \ge 0$) | `processed` Set / Min-Heap | Priority Queue | **Yes** (minimal weight) |
| **Bellman-Ford** | Any (detects negative cycles) | Iterative relaxation | Array | **Yes** (handles negative weights) |
| **Topological Sort** | Directed Acyclic Graph (DAG) | In-degree count / DFS post-order | Queue / Stack | N/A (linear dependency ordering) |

---

### Practical LeetCode Mapping & TypeScript DSA Journey

Mapping concepts from *Grokking Algorithms* directly to the active patterns in this repository (`dsa-ts-journey`):

#### 1. Repository Pattern Mapping

| Book Topic | Corresponding Repo Pattern | Key LeetCode Practice Problems |
| :--- | :--- | :--- |
| **Ch. 1: Binary Search** | `src/patterns/Binary_Search/` | [LC 704: Binary Search](https://leetcode.com/problems/binary-search/)<br>[LC 33: Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)<br>[LC 153: Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) |
| **Ch. 2: Arrays & Lists** | `src/data_structures/linked_list/`<br>`src/patterns/Linked_List/` | [LC 206: Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)<br>[LC 21: Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)<br>[LC 141: Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) |
| **Ch. 4: Two Pointers / D&C**| `src/patterns/Two_Pointers/`<br>`src/patterns/Sliding_Window/` | [LC 11: Container With Most Water](https://leetcode.com/problems/container-with-most-water/)<br>[LC 15: 3Sum](https://leetcode.com/problems/3sum/)<br>[LC 42: Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/)<br>[LC 121: Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) |
| **Ch. 5: Hash Tables** | `src/patterns/Hash_Map/` | [LC 1: Two Sum](https://leetcode.com/problems/two-sum/)<br>[LC 242: Valid Anagram](https://leetcode.com/problems/valid-anagram/)<br>[LC 49: Group Anagrams](https://leetcode.com/problems/group-anagrams/) |
| **Ch. 6: BFS & Graphs** | `src/patterns/Graph_BFS/` *(Recommended)* | [LC 102: Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)<br>[LC 200: Number of Islands](https://leetcode.com/problems/number-of-islands/)<br>[LC 127: Word Ladder](https://leetcode.com/problems/word-ladder/) |
| **Ch. 7: Dijkstra** | `src/patterns/Dijkstra/` *(Recommended)* | [LC 743: Network Delay Time](https://leetcode.com/problems/network-delay-time/)<br>[LC 787: Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/) |
| **Ch. 8: Greedy** | `src/patterns/Greedy/` *(Recommended)* | [LC 55: Jump Game](https://leetcode.com/problems/jump-game/)<br>[LC 45: Jump Game II](https://leetcode.com/problems/jump-game-ii/)<br>[LC 435: Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/) |
| **Ch. 9: Dynamic Prog.** | `src/patterns/Dynamic_Programming/` *(Recommended)* | [LC 70: Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)<br>[LC 322: Coin Change](https://leetcode.com/problems/coin-change/)<br>[LC 1143: Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/) |

---

#### 2. Critical TypeScript/JavaScript Gotchas in DSA

1. **`Array.prototype.shift()` is $O(n)$:**
   - In JavaScript, `queue.shift()` shifts all subsequent elements in memory, turning BFS from $O(V + E)$ into $O(V^2 + E)$.
   - *Fix:* Use an index pointer `head` or implement a circular buffer / linked-list queue for true $O(1)$ dequeues.

2. **Number Precision:**
   - JS numbers are IEEE 754 64-bit floats. Safe integers are bounded by `Number.MAX_SAFE_INTEGER` ($2^{53} - 1$).
   - For 64-bit integer overflow problems (e.g. large factorials, modulo arithmetic), use `BigInt`.

3. **Map vs. Object `{}`:**
   - Always prefer `new Map()` for hash maps in DSA because it avoids prototype key collisions, maintains insertion order, supports non-string keys, and provides clean `.has()`, `.get()`, `.set()`, `.delete()` methods in $O(1)$.
