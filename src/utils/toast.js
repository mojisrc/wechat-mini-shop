export default class Toast {
    // todo完善
    static show(options) {
        wx.showToast({
            title: options.title,
            icon: 'none',
            duration: typeof options['duration'] !== "undefined" ? options.duration : 1000
        })
    }

    static info(str, duration = 1000) {
        wx.showToast({
            title: str ? `${str}` : `操作成功`,
            icon: 'none',
            duration: duration
        })
    }

    static fail(str, duration = 1000) {
        wx.showToast({
            title: str ? `${str}` : `请求错误`,
            icon: 'none',
            duration: duration
        })
    }

    static success(str, duration = 1000) {
        wx.showToast({
            title: str ? `${str}` : `操作成功`,
            icon: 'none',
            duration: duration
        })
    }

    static loading(str, duration = 3000) {
        const _str = String(str)
        if (str === false) {
            wx.hideLoading()
        } else {
            wx.showLoading({
                title: str ? `${str}` : `加载中`,
            })
            setTimeout(function () {
                wx.hideLoading()
            }, duration)
        }
    }
}
