Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        dataSource: {
            type: Object,
            value: null
        },
        height: {
            type: Number,
            value: null
        }
    },
    methods: {
        onClick(e) {
            this.triggerEvent('click', { index: e.currentTarget.dataset.index, dataSource: this.data.dataSource });
        }
    },
    attached() {
        const systemInfo = wx.getSystemInfoSync()
        this.setData({
            height: systemInfo.windowWidth * 0.48
        })
    }
});
