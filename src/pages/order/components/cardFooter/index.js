Component({
    externalClasses: [ 'custom-class'],
    properties: {
        orderInfo: {
            type: Object,
            value: null
        },
        orderId: {
            type: String,
            value: null
        },
        goodsNumber: {
            type: Number,
            value: null
        },
        totalCost: {
            type: Number,
            value: null
        },
        showEvaluateBtn: {
            type: Boolean,
            value: false
        },
        showPayBtn: {
            type: Boolean,
            value: false
        },
        showReceiveBtn: {
            type: Boolean,
            value: false
        },
        showLogisticsBtn: {
            type: Boolean,
            value: false
        },
        showCancelBtn:{
            type: Boolean,
            value: false
        }
    },
    methods: {
        onClick() {
            this.triggerEvent('click', { orderId: this.data.orderId });
        },
        onCancel() {
            this.triggerEvent('cancel', { orderInfo: this.data.orderInfo });
        },
        onReceive() {
            this.triggerEvent('receive', { orderInfo: this.data.orderInfo });
        },
        onPay() {
            this.triggerEvent('pay', { orderInfo: this.data.orderInfo });
        },
        onEvaluate(){
            this.triggerEvent('evaluate', { orderInfo: this.data.orderInfo });
        }
    }
});
