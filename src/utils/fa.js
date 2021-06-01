import Code from './code'
import Cache from './cache'
import Toast from './toast';
import requestUtil from "@/utils/request";
import exceptionUtil from "@/utils/exception";
import { host } from "@/api"
import storage from "@/services/storage"

export default class Fa {
    static code = new Code()
    static cache = new Cache()
    static toast = Toast

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

    static remove(arr, item) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== item) {
                result.push(arr[i]);
            }
        }
        return result;
    }

    static async request(api, options = {}) {
        const { params } = options
        const body = (typeof params !== 'undefined') ? params : {}
        let headers = (typeof options.header !== 'undefined') ? options.header : {}
        const token = storage.getUserToken()

        if (token) {
            headers = Object.assign(headers, {
                'Access-Token': token.access_token,
                'Source': 3,
            });
        }
        const result = await requestUtil({
            url: `${host}server/${api.url}`,
            method: api.method,
            type: 'json',
            body: body,
            headers: headers
        })
        if (result.status === 200) {
            const e = result.body
            if (e.code === 0) {
                return e
            } else if (e.code === 10005 && api.url.indexOf('user/logout') === -1) {
                // getApp()._store.dispatch({
                //     type: "user/logout"
                // })
                return e
            } else {
                return result.body
            }
        } else {
            throw new exceptionUtil(result.statusText, result.code)
        }
    }
}
