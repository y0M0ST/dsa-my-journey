### Excercises at Grokking Algorithms

**1.1. Suppose you have a sorted list of 128 names, and you’re searching through it using binary search. What’s the maximum number of teps it would take?** - *O(log 128)= 7*

**1.2 Suppose you double the size of the list. What’s the maximum number of steps now?** - *O(log 256)= 8*

**1.3 You have a name, and you want to find the person’s phone number in the phone book.** - *O(log n)*

**1.4 You have a phone number, and you want to find the person’s name in the phone book. (Hint: You’ll have to search through the whole book!)** - *O(n)*

**1.5 You want to read the numbers of every person in the phone book.** - *O(n)*

**1.6 You want to read the numbers of just the As. (his is a tricky one! It involves concepts that are covered more in chapter 4. Read the answer—you may be surprised!)** - *O(n)* 

**2.1. Suppose you’re building an app to keep track of your inances.Every day, you write down everything you spent money on. At the end of the month, you review your expenses and sum up how much you spent. So, you have lots of inserts and a few reads. Should you use an array or a list?** - *List*

**2.2 Suppose you’re building an app for restaurants to take customer orders. Your app needs to store a list of orders. Servers keep adding orders to this list, and chefs take orders of the list and make them. It’s an order queue: servers add orders to the back of the queue, and the chef takes the irst order of the queue and cooks it. Would you use an array or a linked list to implement this queue? (Hint: Linked lists are good for inserts/deletes, and arrays are good for random access. Which one are you going to be doing here?)** - *List*

**2.3. Let’s run a thought experiment. Suppose Facebook keeps a list of usernames. When someone tries to log in to Facebook, a search is done for their username. If their name is in the list of usernames, they can log in. People log in to Facebook pretty oten, so there are a lot of searches through this list of usernames. Suppose Facebook uses binary search to search the list. Binary search needs random access—you need to be able to get to the middle of the list of usernames instantly. Knowing this, would you implement the list as an array or a linked list?** - *Array*

**2.4. People sign up for Facebook pretty oten, too. Suppose you decided to use an array to store the list of users. What are the downsides of an array for inserts? In particular, suppose you’re using binary search to search for logins. What happens when you add new users to an array?**

*Using array to store a list of users, there are several dictint disadvantages:*

* Array has length fix, if its full, we must create new array that bigger than and coppy all data from old array. Additionally, if we want to insert an element at a specific position (to maintain the array's order), we must shift multiple subsequent elements, incurring a cost of O(n).

* Binary search: To use Binary Search, the array must be ordered, we must insert the element at specific position, this is also similar to above. So, although find fast O(log n), insert slowdown O(n)

**2.5. In reality, Facebook uses neither an array nor a linked list to store user information. Let’s consider a hybrid data structure: an array of 26 linked lists (each element points to a linked list of usernames starting with that letter). Compare this hybrid data structure to arrays and linked lists. Is it slower or faster than each for searching and inserting?**
- *Searching:* Slower than arrays (arrays support random access and Binary Search in O(log n)), but faster than a single linked list (you only need to search 1/26th of the users).
- *Inserting:* Faster than arrays (O(1) to append/insert into the linked list without shifting elements or reallocating array memory), and same speed as linked lists.
*(Note: This hybrid concept is the foundation of Hash Tables with separate chaining, covered in Chapter 5).*

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




