var Stack = /** @class */ (function () {
    function Stack() {
        this.stack = [];
    }
    Stack.prototype.isEmpty = function () {
        return this.stack == [];
    };
    Stack.prototype.push = function (element) {
        this.stack.push(element);
    };
    Stack.prototype.pop = function () {
        return this.stack.pop();
    };
    Stack.prototype.getTopValue = function () {
        return this.stack[this.stack.length - 1];
    };
    Stack.prototype.getLength = function () {
        return this.stack.length;
    };
    Stack.prototype.getValues = function () {
        return this.stack;
    };
    return Stack;
}());
export { Stack };
