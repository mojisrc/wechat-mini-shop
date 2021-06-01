Component({
    externalClasses: [ 'custom-class'],
    properties: {
        dataSource: {
            type: Object,
            value: null
        },
    },
    data: {
        leftWidth: 100,
        rightWidth: 275,
        leftIndex:0
    },
    methods: {
        onLeftItemPress(e){
            this.setData({
                leftIndex:e.currentTarget.dataset.leftIndex
            })
        },
    },
    attached() {
        const { windowWidth } = wx.getSystemInfoSync()
        const { leftWidth } = this.data
        this.setData({
            rightWidth: windowWidth - leftWidth
        })
    }
});
