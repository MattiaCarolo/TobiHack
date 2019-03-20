/**
 * Simple conversation class.
 */
class MyConversation {
    constructor() {
        this.messages = [];
    }
	
	addMessage(message) {
        this.messages.push(message);
	}
};

exports.MyConversation = MyConversation;