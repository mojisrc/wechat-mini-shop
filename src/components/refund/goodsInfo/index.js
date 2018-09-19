Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        refundInfo: {
            type: Object,
            value: null
        }
    },
    methods: {
        onGoods() {
            this.triggerEvent('goods', { refundInfo: this.data.refundInfo });
        }
    }
});
