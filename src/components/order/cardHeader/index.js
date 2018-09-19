Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        orderInfo:{
            type:Object,
            value:null
        },
        orderId:{
            type: String,
            value: null
        },
        state: {
            type: Number,
            value: null
        },
        sn:{
            type: String,
            value: null
        },
    },
    methods: {
        onDelete() {
            this.triggerEvent('delete');
        },
        onClick(e) {
            this.triggerEvent('click', { orderId: this.data.orderId});
        },
        onPay(){
            this.triggerEvent('pay', { orderInfo: this.data.orderInfo});
        }
    }
});
