import library from "./library.js";
import { Stack } from "./Stack.js";

const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const vm = new Vue({
    el: "#app",
    data: {
        operation: '',
        operators: library,
        newExpresion: [],
        response: '',
        result: ''
    },
    methods: {
        descomposeOperation(operation) {
            let opeWithoutSpaces = operation.trim().split('');
            let newOpe = [];
            
            opeWithoutSpaces.forEach(element => {
                if (element !== " ") {
                    newOpe.push(element);
                }
            });

            this.orderPosfixed(newOpe);
        },

        orderPosfixed(expresion) {

            let stackOperators = new Stack();
            let newExpresion = [];

            expresion.forEach(exp => {
                if (exp in numbers) {
                    newExpresion.push(exp)
                } else {
                    if (stackOperators.getLength() === 0) {
                        stackOperators.push(exp);
                    } else {
                        if (exp === ")") {
                            for (let index = stackOperators.getValues().length - 1; index >= 0; index--) {
                                let ope = stackOperators.getValues()[index];

                                if (ope === "(") {
                                    stackOperators.pop();
                                    break;
                                } else {
                                    let value = stackOperators.pop();
                                    newExpresion.push(value);
                                }
                            }  
                        } else {
                            let valueTop = stackOperators.getTopValue();
                            let value1 = library.filter(x => exp == x.value)[0];
                            let value2 = library.filter(x => valueTop == x.value)[0];

                            if (value1.p_exp > value2.p_stack) {
                                stackOperators.push(exp);
                            } else if (value1.p_exp <= value2.p_stack) {
                                let value = stackOperators.pop();
                                newExpresion.push(value);
                                stackOperators.push(exp);
                            }
                        }
                    }
                }
            })

            while (stackOperators.getLength() > 0) {
                for (let index = stackOperators.getValues().length - 1; index >= 0; index--) {
                    let ope = stackOperators.getValues()[index];
                    if (ope == "(") {
                        stackOperators.pop();
                    } else {
                        let value = stackOperators.pop();
                        newExpresion.push(value);
                    }
                }
            }

            this.response = newExpresion.join(" ");
            this.evaluateExpresion(this.response)
        },

        evaluateExpresion(expresion) {
            let newExpresion = expresion.split(" ");
            let stackNumbers = new Stack();

            newExpresion.forEach(exp => {
                if (exp in numbers) {
                    stackNumbers.push(parseInt(exp))
                } else {
                    let value1 = parseInt(stackNumbers.pop());
                    let value2 = parseInt(stackNumbers.pop());
                    let res = 0;

                    console.log(value1, value2);

                    switch (exp) {
                        case "+":
                            res = value2 + value1;
                            stackNumbers.push(res);
                            break;
                        case "-":
                            res = value2 - value1;
                            stackNumbers.push(res);
                            break;
                        case "*":
                            res = value2 * value1;
                            stackNumbers.push(res);
                            break;
                        case "/":
                            res = value2 / value1;
                            stackNumbers.push(res);
                            break;
                        case "^":
                            res = Math.pow(value2, value1);
                            stackNumbers.push(res);
                            break;
                    
                        default:
                            break;
                    }
                }
            })

            this.result = stackNumbers.pop();
        }
    }
})