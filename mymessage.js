/**
 * Simple message class.
 */
class MyMessage {
    constructor(text, time, from, intent) {
        this.name = text || undefined;
        this.time = time || undefined;
        this.from = from || undefined;
        this.intent = intent || undefined
    }

    getTimeMS() {
        return this.time;
    }
};

exports.MyMessage = MyMessage;
