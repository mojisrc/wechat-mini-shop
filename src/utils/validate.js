export default class Validate {
    static isEmpty(value) {

        if (value == null) {
            return true;
        }
        if(value === ''){
            return true;
        }
        if (Array.isArray(value) && value.length === 0){
            return true
        }

        if(typeof value === 'object'){
            var arr = Object.keys(value);
            if(arr.length ===0){
                return true
            }
        }
        return false;
    }
}
