Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        orderId:{
            type: String,
            value: null
        },
        text: {
            type: String,
            value: null
        },
        active: {
            type: Boolean,
            value: false
        }
    },
    methods: {
        onClick(e) {
            this.triggerEvent('click', { orderId: this.data.orderId});
        }
    }
});
