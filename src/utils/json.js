export default class Json {
    static isJSON(str) {
        if (typeof str == 'string') {
            try {
                var obj = JSON.parse(str);
                return !!(typeof obj == 'object' && obj);
            } catch (e) {
                return false;
            }
        }
    }
}
