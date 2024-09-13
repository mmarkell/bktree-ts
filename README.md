# bktree-ts
BKTree implementation in Typescript

Inspired by https://github.com/terasum/js-bktree/tree/master

BK Trees are an efficient data structure for determining the most similar strings in a list to a target string using some distance metric.
[Wikipedia link](https://en.wikipedia.org/wiki/BK-tree)

```ts
/**
 * example
 */

const words = ["hell", "help", "shel", "smell", "fell", "felt", "oops"];
const bktree = new BKTree(words.length, (a, b) => {
    let count = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            count++;
        }
    }
    return count;
});

bktree.add(words);

// The second argument is the "tolerance" value, which is the maximum number that the 
// distance metric can be from the word being searched for.

console.log(bktree.simWords("help", 1)); // [ 'hell', 'help', 'shel', 'felt' ]
console.log(bktree.simWords("help", 2)); // [ 'hell', 'help', 'shel', 'smell', 'felt' ]
console.log(bktree.simWords("help", 3)); // [ 'hell', 'help', 'shel', 'smell', 'fell', 'felt' ]
```
