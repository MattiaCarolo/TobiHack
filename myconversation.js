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

    getLastMessageDateMS() {
        if (this.messages.length > 0) {
            return (this.messages[this.messages.length - 1]).getTimeMS();
        } else {
            return -1;
        }
    }
};

exports.MyConversation = MyConversation;
