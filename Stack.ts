export class Stack {

    private stack: any;

    constructor() {
        this.stack = [];
    }

    public isEmpty() {
        return this.stack == []
    }

    public push(element: Object) {
        this.stack.push(element);
    }

    public pop() {
        return this.stack.pop();
    }

    public getTopValue() {
        return this.stack[this.stack.length -1];
    }

    public getLength() {
        return this.stack.length;
    }

    public getValues() {
        return this.stack;
    }
}