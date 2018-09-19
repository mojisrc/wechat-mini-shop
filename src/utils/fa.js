import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module'
import Validate from './validate'
import Code from './code'
import Cache from './cache'
import Toast from './toast';

export default class Fa {
    static validate = new Validate()
    static code = new Code()
    static cache = new Cache()
    static toast = new Toast()

    /**
     * 数组根据键值转对象
     * @param array
     * @param field
     * @returns {{}}
     */
    static arrayFieldObject(array, field) {
        let object = {}
        array.forEach(function (item) {
            object[item[field]] = item
        })
        return object
    }


    /**
     *
     * @param value
     * @returns {boolean}
     */
    static isEmpty(value) {
        if (value === null || typeof (value) === 'undefined' || isNaN(value)) {
            return true
        } else {
            return false
        }
    }

    /**
     * 10位时间戳
     */
    static time() {
        let tmp = Date.parse(new Date()).toString();
        tmp = tmp.substr(0, 10);
        return tmp
    }

    static showLoginPage() {
        wepy.navigateTo({ url: '/pages/user/login' })
    }

    /**
     *
     * @param userInfo
     * @returns {boolean}
     */
    static getLoginState(userInfo) {
        if (userInfo !== null && typeof userInfo['id'] !== 'undefined' && userInfo.id > 0) {
            return true
        } else {
            return false
        }
    }

    /**
     * 检测数组中是否存在某个字符串
     * @param search
     * @param array
     * @returns {boolean}
     */
    static inArray(search, array) {
        for (let i in array) {
            if (array[i] === search) {
                return true;
            }
        }
        return false;
    }

    static remove(arr, item) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== item) {
                result.push(arr[i]);
            }
        }
        return result;
    }


}
