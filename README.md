# bktree-ts
BKTree implementation in Typescript

Inspired by https://github.com/terasum/js-bktree/tree/master

BK Trees are an efficient data structure for determining the most similar strings in a list to a target string using some distance metric.
[Wikipedia link](https://en.wikipedia.org/wiki/BK-tree)

# Runtime
- Search time is (VERY) approximately `O(Log(n))`, in practice somewhere between logarithmic and linear (see [analysis](https://github.com/benhoyt/pybktree/issues/5))
- Build time is longer, on the order of `O(n)`, so this is a data structure optimized for frequent reads and infrequent builds.


# Example
```ts
const words = ["hello", "world", "foo", "bar", "baz"];

// Levenstein Distance implementation elided
const bktree = new BKTree(words.length, levensteinDistance);

bktree.add(words);

// The second argument is the "tolerance" value, which is the maximum number that the 
// distance metric can be from the word being searched for.

console.log(bktree.simWords("hell", 1)); // [ 'hello' ]
console.log(bktree.simWords("barf", 1)); // [ 'bar' ]
console.log(bktree.simWords("barf", 2)); // [ 'bar', 'baz' ]
```
