type SNode<T> = {
    value: T,
    prev?: SNode<T>
}
export default class Stack<T> {
    public length: number;

    head?: SNode<T>;

    constructor() {
        this.head = undefined;
        this.length = 0;
    }

    push(item: T): void {
        const node = {value: item} as SNode<T>;
        if (this.head === undefined) {
            this.head = node;
        } else {
            node.prev = this.head;
            this.head = node;
        }
        this.length++;
    }

    pop(): T | undefined {
        this.length = Math.max(0, this.length - 1);
        if (this.length === 0) {
            const head = this.head;
            this.head = undefined;
            return head?.value ;
        }
        const head = this.head as SNode<T> ;
        this.head = head.prev;
        return head.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}