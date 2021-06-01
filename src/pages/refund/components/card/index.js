Component({
    externalClasses: ['custom-class'],
    properties: {
        refundInfo: {
            type: Object,
            value: null
        }
    },
    methods: {
        onClick(e) {
            const refundInfo = this.data.refundInfo
            this.triggerEvent('click', { refundInfo });
        },
    }
});
