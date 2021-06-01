export default class Ratio {
    static simple(str) {
        let _str = `${str}`
        let arr = _str.split(".");
        if(Array.isArray(arr) && arr.length === 2 && (arr[1] ==="00" || arr[1] ==="0")){
            return arr[0]
        }else if(Array.isArray(arr) && arr.length === 2 ){
            let _arr1 = arr[1];
            if(_arr1.charAt(_arr1.length - 1) === "0"){
                return `${arr[0]}.${_arr1.charAt(_arr1.length - 2)}`
            }else{
                return `${arr[0]}.${arr[1]}`
            }
        }else{
            return str
        }
    }
}
