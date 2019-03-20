/**
 * Simple message class.
 */
class MyMessage {
    constructor(text, time, from) {
        this.name = text || undefined;
        this.time = time || undefined;
		this.from = from || undefined
    }
};

exports.MyMessage = MyMessage;