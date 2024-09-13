// ----------------------------
// BK-tree Node definition
// ----------------------------

// Maximum word length
const MAX_LEN = 1024;

class BKNode {
    word: string;
    next: number[];

    constructor(w: string) {
        this.word = w;
        this.next = new Array(2 * MAX_LEN).fill(-1);
    }

    setWord(w: string): void {
        this.word = w;
    }
}

export class BKTree {
    private tree: BKNode[];
    private root: BKNode;
    private ptr: number;

    constructor(
        wordNum: number,
        private editDistance: (a: string, b: string) => number
    ) {
        this.tree = Array.from({ length: wordNum }, () => new BKNode(""));
        this.root = new BKNode("");
        this.ptr = 0;
    }

    private _add(idx: number, curr: BKNode): void {
        if (this.root.word === "") {
            this.root.setWord(curr.word);
            this.tree[0] = this.root;
            return;
        }

        let currentIdx = idx;
        while (true) {
            const dist = this.editDistance(
                this.tree[currentIdx].word,
                curr.word
            );
            if (this.tree[currentIdx].next[dist] === -1) {
                // If no Node exists at this dist from current node
                // make it child of current Node
                this.ptr++;
                this.tree[this.ptr].setWord(curr.word);
                this.tree[currentIdx].next[dist] = this.ptr;
                break;
            } else {
                // Move to the next node
                currentIdx = this.tree[currentIdx].next[dist];
            }
        }
    }

    /**
     *
     * @param idx Index of the node
     * @param word The word to find similar words for
     * @param tolerance Tolerance value (edit distance)
     * @returns
     */
    private _simWords(idx: number, word: string, tolerance: number): string[] {
        let ret: string[] = [];
        if (idx === -1) {
            return ret;
        }

        if (this.root.word === "") {
            return ret;
        }
        const currRoot = this.tree[idx];

        // calculating editdistance of s from root
        const dist = this.editDistance(word, currRoot.word);
        // if dist is less than toleranceerance value
        // add it to similar words
        if (dist <= tolerance) {
            ret.push(currRoot.word);
        }

        let start = dist - tolerance;
        if (start < 0) {
            start = 1;
        }
        const end = dist + tolerance;
        while (start < end) {
            const temp = this._simWords(currRoot.next[start], word, tolerance);
            ret = ret.concat(temp);
            start++;
        }
        return ret;
    }

    add(words: string[]): void {
        if (!Array.isArray(words)) {
            throw new Error("words is not array");
        }
        words.forEach((element) => {
            this._add(0, new BKNode(element));
        });
    }

    simWords(src: string, tolerance: number): string[] {
        return this._simWords(0, src, tolerance);
    }
}
