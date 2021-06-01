import validate from "./validate"
import Url from "./url"

export default class Nav {
    static redirect(_url, param) {
        let url = `/pages/${_url}/index`;
        if (!validate.isEmpty(param)) {
            url = `${url}?${Url.httpBuildQuery(param)}`
        }
        wx.redirectTo({
            url
        })
    }

    static navigate(_url, param) {
        let url = `/pages/${_url}${_url !== 'index/index' ? '/index' : ''}`;
        if (!validate.isEmpty(param)) {
            url = `${url}?${Url.httpBuildQuery(param)}`
        }
        if (_url === 'index/index') {
            wx.switchTab({ url })
        } else {
            wx.navigateTo({ url })
        }
    }

    static replace(_url, param) {
        Nav.redirect(_url, param)
    }

    static goBack(param = {}) {
        wx.navigateBack(param)
    }
}
