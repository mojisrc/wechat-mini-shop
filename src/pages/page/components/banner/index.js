Component({
    externalClasses: [ 'custom-class'],
    properties: {
        payload: {
            type: Object,
            value: null
        },
        height: {
            type: Number,
            value: null
        }
    },
    data:{
        list:[]
    },
    observers: {
        'payload': function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                if (newVal.data.length > 0) {
                    this.setData({
                        list: newVal.data.map((item) => {
                            return {
                                ...item,
                                ...{ openType: item.link.action === "contact_service" ? 'contact' : '' }
                            }
                        }),
                    })
                }
            }
        }
    },
    methods: {
        onClick(e) {
            this.triggerEvent('click', { index: e.currentTarget.dataset.index, payload: this.data.payload });
        },
        imageLoad(e){
            const ratio = e.detail.width / wx.getSystemInfoSync().windowWidth
            this.setData({
                height: e.detail.height / ratio
            })
        }
    },
    attached() {
        const systemInfo = wx.getSystemInfoSync()
        this.setData({
            height: systemInfo.windowWidth * 0.48
        })
    }
});
