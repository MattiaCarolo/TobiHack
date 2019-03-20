/**
 * Simple conversation class.
 */
class Stack {
    constructor() {
        this.messages = [];
    }
	
	addMessage(message) {
        this.messages.push(message);
	}
};

exports.Stack = Stack;