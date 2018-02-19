'use strict'
class Node {
    constructor(data) {
        this.data = data;
        this.prev = null;
        this.next = null;

    }
}

class SelfOrganizedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }
    size() {
        if(this.head == null){
            console.log("head is null length is 0");
            return 0;
        }
        let count = 0;
        let node = this.head;
        while(node != null){
            count++;
            node = node.next;
        }
        return count;
    }
    insert(data) {
        let node = new Node(data);
        if(!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        return node;
    }
    at(index) {
        let currentNode = this.head;
        const size = this.size();
        let count = 0;
        if(index === 0){
            return this.head.data;
        }
        if (size === 0 || index < 0 || index > this.size()) {
            return null;
        }
        while (count < index) {
            currentNode = currentNode.next;
            count++;
        }
        return currentNode.data;
    }
    findNode(data) {
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.data === data)
                return currentNode;
            currentNode = currentNode.next;
        }
        if (currentNode === null)
            return null;
    }
    toArray() {
        let result = [];
        let current = this.head;
        while(current){
            result.push(current.data);
            current = current.next;
        }
        return result;
    }
    removeAt(index) {
        if (index > -1 && index < this.size()){
            let current = this.head;
            let i = 0;
            if (index === 0){
                this.head = current.next;
                if (!this.head){
                    this.tail = null;
                } else {
                    this.head.prev = null;
                }
            } else if (index === this.size() -1){
                current = this.tail;
                this.tail = current.prev;
                this.tail.next = null;
            } else{
                while(i++ < index){
                    current = current.next;
                }
                current.prev.next = current.next;
                current.next.prev = current.prev;
            }
            return current;
        } else{
            return null;
        }
    }
    moveToFront(node) {
        if(this.head === node){
            return;
        }else if(this.tail === node){
            node.prev.next = null;
            this.tail = node.prev;
        }else{
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        this.head.prev = node;
        node.next = this.head;
        node.prev = null;
        this.head = node;
    }
    reorganize(data) {
        let node = this.findNode(data);
        if(!node){
            return false;
        }else{
            this.moveToFront(node);
            return true;
        }
    }
}

module.exports = {
    SelfOrganizedList,
    Node
};