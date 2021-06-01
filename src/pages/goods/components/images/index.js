Component({
    externalClasses: [ 'custom-class'],
    properties: {
        images: {
            type: Array,
            value: []
        }
    },
    methods: {
        bannerPreview({ currentTarget }) {
            wx.previewImage({
                current: currentTarget.dataset.url,
                urls: this.data.images
            })
        },
    }
});
