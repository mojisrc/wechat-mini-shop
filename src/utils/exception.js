export default class Exception {
    message;
    code;

    constructor(message, code) {
        console.log(message,code)
        this.message = message
        this.code = code
    }

    getCode() {
        return this.code
    }

    getMessage() {
        return this.message
    }
}
