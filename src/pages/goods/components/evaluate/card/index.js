Component({
    externalClasses: ['custom-class'],
    properties: {
        info: {
            type: Object,
            value: null
        }
    },
    data: {
        additional_interval_day: 0
    },
    observers: {
        'info': function (newVal) {
            const { additional_time, create_time } = newVal
            this.setData({
                additional_interval_day: additional_time ? parseInt((additional_time - create_time) / 86400) : 0
            })
        }
    },
    methods: {
        previewImage: function (e) {
            wx.previewImage({
                current: e.currentTarget.dataset.url,
                urls: e.currentTarget.dataset.images
            })
        },
    }
});
