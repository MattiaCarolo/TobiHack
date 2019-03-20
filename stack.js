/**
 * Simple conversation class.
 */
class Stack {
    constructor() {
        this.items = [];
    }

    push(element) 
    { 
        // push element into the items 
        this.items.push(element); 
    }

    pop() 
    { 
        // return top most element in the stack 
        // and removes it from the stack 
        // Underflow if stack is empty 
        if (this.items.length == 0) 
            return "Underflow"; 
        return this.items.pop(); 
    } 
 
    peek() 
    { 
        // return the top most element from the stack 
        // but does'nt delete it. 
        return this.items[this.items.length - 1]; 
    } 

    isEmpty() 
    { 
        // return true if stack is empty 
        return this.items.length == 0; 
    } 
 
    printStack() 
    { 
        var str = ""; 
        for (var i = 0; i < this.items.length; i++) 
            str += this.items[i] + " "; 
        return str; 
    }
    
    searchContext(value){
        var inputText = value;
        if (this.items.indexOf(inputText) > -1) {
            alert("item found");
            return this.items[this.items.indexOf(inputText)];
        }
        else {
            alert("item not found");
        }
    }

    countUnique() {
        return new Set(this.items).size;
      }

};

exports.Stack = Stack;