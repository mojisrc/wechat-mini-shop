export default class Storage {
    static getUserInfo() {
        try {
            return JSON.parse(wx.getStorageSync('userInfo'));
        } catch (e) {
            return null
        }
    }

    static setUserInfo(user) {
        return wx.setStorageSync('userInfo', JSON.stringify(user))
    }

    static removeUserInfo() {
        return wx.removeStorageSync('userInfo')
    }

    static set(key, value) {
        return wx.setStorageSync(`${key}`, value)
    }

    static get(key) {
        return wx.getStorageSync(`${key}`)
    }

    static remove(key) {
        return wx.removeStorageSync(`${key}`)
    }
}
