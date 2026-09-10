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