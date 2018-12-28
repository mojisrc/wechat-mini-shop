// pages/webView/index.js

Page({
    data: {
        url: null,
    },
    onLoad(options) {
        this.setData({
            url: options['url'] ? decodeURIComponent(options['url']) : ''
        })
    }
})
