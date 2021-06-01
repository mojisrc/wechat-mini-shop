Component({
    externalClasses: [ 'custom-class'],
    properties: {
        orderInfo:{
            type:Object,
            value:null
        },
        orderNumber: {
            type: Number,
            value: null
        },
        createTime: {
            type: Number,
            value: null
        },
        payTime: {
            type: Number,
            value: null
        },
        payment: {
            type: String,
            value: null
        }
    },
    methods: {
        setClipboardData() {
            wx.setClipboardData({
                data: `${this.data.orderNumber}`
            })
        }
    }
});
