Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        cartTotalNumber: {
            type: Number,
            value: null
        },
    },
    methods: {
        onClick() {
            this.triggerEvent('click', { orderId: this.data.orderId });
        },
    }
});
