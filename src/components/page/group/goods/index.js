Component({
    properties: {
        dataSource: {
            type: Object,
            value: null
        },
        smallImageWidth: {
            type: Number,
            value: null
        },
        rowsImageWidth: {
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
            smallImageWidth:  (systemInfo.windowWidth - 18) / 2
        })
    }
});
