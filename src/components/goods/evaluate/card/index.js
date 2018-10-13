Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        info: {
            type: Object,
            value: null
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
