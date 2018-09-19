
export default class Toast {

    // todo完善
    show(options) {
        wx.showToast({
            title: options.title,
            icon: 'none',
            duration: 1000
        })
    }
}
