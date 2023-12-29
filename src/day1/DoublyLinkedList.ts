export default class DoublyLinkedList<T> {
    public length: number;
    head?: ListNode<T>;
    tail?: ListNode<T>;


    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        let node = {value: item} as ListNode<T>;
        this.length++;
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return;
        }
        node.next = this.head;
        this.head.prev = node;
        this.head = node;
    }

    // A (1) <-> C (3)
    //insert B(2) at index 1
    // insertAt(item: T, idx: number): void {
    //     if (idx === 0) {
    //         this.prepend(item);
    //         return;
    //     }
    //     let previousNode = this.node(idx - 1);
    //     if (previousNode === undefined) {
    //         return;
    //     } else {
    //         let node = {value: item, next: previousNode.next, prev: previousNode}
    //         if (previousNode.next !== undefined) {
    //             previousNode.next.prev = node;
    //             previousNode.next = node;
    //             this.length++;
    //         }
    //     }
    // }
    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            return;
        }

        if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
            return;
        }
        this.length++;
        let curr = this.node(idx);
        curr = curr as ListNode<T>;
        const node = {value: item} as ListNode<T>;
        node.next = curr;
        node.prev = curr.prev;
        curr.prev = node;
        if (node.prev) {
            node.prev.next = node;
        }
    }

    append(item: T): void {
        this.length++;
        const node = {value: item} as ListNode<T>
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;

    }

    // append(item: T): void {
    //     this.length++;
    //     if (this.head === undefined) {
    //         this.head = {value: item, next: undefined, prev: undefined};
    //         this.tail = this.head;
    //     } else if (this.tail === undefined) {
    //         this.tail = {value: item, next: undefined, prev: this.head};
    //         this.head.next = this.tail;
    //     } else {
    //         this.tail.next = {value: item, next: undefined, prev: this.tail};
    //         this.tail = this.tail.next;
    //     }
    // }

    remove(item: T): T | undefined {
        let curr = this.head;
        for (let i = 0; i < this.length && curr; ++i) {
            if (curr.value === item) {
                break;
            }
            curr = curr.next;
        }
        if (!curr) {
            return undefined;
        }
        return this.removeNode(curr);
    }

    // remove(item: T): T | undefined {
    //     let res = false
    //
    //     for (let x = this.head; x !== undefined; x = x.next) {
    //         if (item === x.value) {
    //             this.length--;
    //             this.unlink(x);
    //             res = true;
    //         }
    //     }
    //     if (res) {
    //         return item;
    //     } else {
    //         return undefined;
    //     }
    // }

    get(idx: number): T | undefined {
        return this.node(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        let n = this.node(idx);
        if (n === undefined) {
            return undefined;
        }
        this.removeNode(n);
        return n.value;
    }

    private node(idx: number): ListNode<T> | undefined {
        let x = this.head;
        for (let i = 0; i < idx && x; ++i)
              x = x.next;
        return x;
    }

    private unlink(x: ListNode<T>): void {
        let next = x.next;
        let prev = x.prev;

        if (prev === undefined) {
            this.head = next;
        } else {
            prev.next = next;
            x.prev = undefined;
        }
        if (next === undefined) {
            this.tail = prev;
        } else {
            next.prev = prev;
            x.next = undefined;
        }
    }

    private removeNode(node: ListNode<T>): T | undefined {
        this.length--;
        if (this.length === 0) {
            const out = this.head?.value;
            this.head = this.tail = undefined;
            return out;
        }
        if (node.prev) {
            node.prev.next = node.next;
        }
        if (node.next) {
            node.next.prev = node.prev;
        }
        if (node === this.head) {
            this.head = node.next;
        }
        if (node === this.tail) {
            this.tail = node.prev;
        }
        node.next = node.prev = undefined;
        return node.value;
    }
}