const Node = require('./node');

class LinkedList {
    constructor() {
        this._nullNode = new Node(null, null, null);
        this.clear();
    }

    append(data) {
        let newNode = new Node(data, this._nullNode, this._nullNode);

        if (this.isEmpty()) {
            this._head = newNode;
            this._tail = newNode;
        }
        else {
            this._tail.next = newNode;
            newNode.prev = this._tail;
            this._tail = newNode;
        }

        this.length++;
        return this;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        let node = this._getNodeAt(index);
        return node.data;
    }

    insertAt(index, data) {
        if (index == 0 && this.isEmpty()) {
            return this.append(data);
        }

        let node = this._getNodeAt(index);
        if (node == this.head) {
            let nextNode = node;
            let newNode = new Node(data, this._nullNode, nextNode);
            
            nextNode.prev = newNode;
            this._head = newNode;
        }
        else {
            let prevNode = node.prev;
            let nextNode = node;
            let newNode = new Node(data, prevNode, nextNode);

            prevNode.next = newNode;
            nextNode.prev = newNode;
        }

        this.length++;
        return this;
    }

    isEmpty() {
        return this._head == this._nullNode &&
            this._tail == this._nullNode;
    }

    clear() {
        this._head = this._nullNode;
        this._tail = this._nullNode;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let node = this._getNodeAt(index);

        if (node == this._head) {
            this._head = this._head.next;
        }
        else if (node == this._tail) {
            this._tail = this._tail.prev;
        }
        else {
            let prevNode = node.prev;
            let nextNode = node.next;

            prevNode.next = nextNode;
            nextNode.prev = prevNode;
        }

        this.length--;
        return this;
    }

    reverse() {
        let current = this._head;
        while (current != this._nullNode) {
            let next = current.next;
            [current.prev, current.next] = [current.next, current.prev];
            current = next;
        }

        [this._head, this._tail] = [this._tail, this._head];
        return this;
    }

    indexOf(data) {
        let current = this._head;
        let i = 0;
        while (current != this._nullNode) {
            if (current.data == data) return i;

            current = current.next;
            i++;
        }

        return -1;
    }

    _getNodeAt(index) {
        if (this.isEmpty()) {
            throw new Error('List is empty');
        }

        let node = this._head;

        for (let i = 0; i < index; i++) {
            node = node.next;
            if (node == this._nullNode) {
                throw new Error('Index out of range');
            }
        }

        return node;
    }
}

module.exports = LinkedList;
