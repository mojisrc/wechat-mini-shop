Component({
    externalClasses: [ 'custom-class'],
    properties: {
        payload: {
            type: Object,
            value: null
        },
    },
    methods: {
        onClick(e) {
            const { currentTarget: { dataset: { index } } } = e
            const images = this.data.payload.data.map((item)=>{
                return item.img.url
            })
            wx.previewImage({
                current: images[index],
                urls: images
            })
        },
    },
});
