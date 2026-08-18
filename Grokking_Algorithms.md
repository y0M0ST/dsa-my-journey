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

**People sign up for Facebook pretty oten, too. Suppose you decided to use an array to store the list of users. What are the downsides of an array for inserts? In particular, suppose you’re using binary search to search for logins. What happens when you add new users to an array?**

*Using array to store a list of users, there are several dictint disadvantages:*

* Array has length fix, if its full, we must create new array that bigger than and coppy all data from old array. Additionally, if we want to insert an element at a specific position (to maintain the array's order), we must shift multiple subsequent elements, incurring a cost of O(n).

* Binary search: To use Binary Search, the array must be ordered, we must insert the element at specific position, this is also similar to above. So, although find fast O(log n), insert slowdown O(n)