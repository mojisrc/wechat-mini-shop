Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        dataSource: {
            type: Object,
            value: null
        }
    },
    methods: {
        onMaskClick() {
            if (this.data.cancelWithMask) {
                this.cancelClick();
            }
        },
        cancelClick() {
            this.triggerEvent('cancel');
        },
        handleBtnClick({ currentTarget = {} }) {
            const dataset = currentTarget.dataset || {};
            const { index } = dataset;
            this.triggerEvent('actionclick', { index });
        }
    },
    attached() {
        const systemInfo = wx.getSystemInfoSync()
        console.log(systemInfo.windowWidth * 0.48)
        this.setData({
            smallImageWidth:  (systemInfo.windowWidth - 18) / 2
        })
    }
});
