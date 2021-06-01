Component({
    externalClasses: [ 'custom-class'],
    properties: {
        orderId:{
            type: String,
            value: null
        },
        goodsList: {
            type: Array,
            value: null
        }
    },
    methods: {
        onClick(e) {
            this.triggerEvent('click', { orderId: this.data.orderId});
        }
    }
});
