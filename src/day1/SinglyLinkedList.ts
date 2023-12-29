export default class SinglyLinkedList<T> {
    public length: number;


    head: SinglyLinkedListNode<T> | undefined;
    tail: SinglyLinkedListNode<T> | undefined;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        if (this.head === undefined) {
            this.head = {value: item, next: undefined};
            this.increaseLenght();
        } else {
            this.head = {value: item, next: this.head};
            this.increaseLenght();
        }
    }

    private increaseLenght() {
        this.length = this.length + 1;
    }

    private decreaseLenght() {
        this.length = this.length - 1;
    }

    // A (1) -> C (3)
    // insert B(2) at index 1
    insertAt(item: T, idx: number): void {
        let previousNode = this.node(idx - 1);
        if (previousNode === undefined) {
            return;
        } else {
            previousNode.next = {value: item, next: previousNode.next};
            this.increaseLenght();
        }
    }

    append(item: T): void {
        let node: SinglyLinkedListNode<T> = {value: item, next: undefined};
        if (this.head === undefined) {
            this.head = node;
            this.tail = node;
        } else if (this.tail === undefined) {
            this.tail = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.increaseLenght();

    }

    remove(item: T): T | undefined {

        let res = false

        for (let x = this.head; x !== undefined; x = x.next) {
            if (item === x.value) {
                this.decreaseLenght();
                this.unlink(x);
                res = true;
            }
        }
        if (res) {
            return item;
        } else {
            return undefined;
        }


    }

    get(idx: number): T | undefined {
        return this.node(idx)?.value;
    }

    private node(idx: number): SinglyLinkedListNode<T> | undefined {
        let node = this.head;
        if (node === undefined) {
            return undefined;
        }
        let x = this.head;
        for (let i = 0; i < idx; ++i)
            if (x !== undefined) x = x.next;
        if (x === undefined) {
            return undefined;
        } else {
            return x;
        }
    }

    removeAt(idx: number): T | undefined {
        let node = this.node(idx);

        if (node === undefined) {
            return undefined;
        } else {
            this.unlink(node);
            this.decreaseLenght();
            return node.value;
        }
    }

    private unlink(x: SinglyLinkedListNode<T>): void {
        // let el = x.value;
        let next = x.next;

        // if x is the head
        // set head to x.next

        if (x === this.head) {
            this.head = next;
        } else {
            // find the node before x
            let prev = this.head;
            while (prev !== undefined && prev.next !== x) {
                prev = prev.next;
            }
            if (prev !== undefined) {
                prev.next = next;
            }
        }
    }
}