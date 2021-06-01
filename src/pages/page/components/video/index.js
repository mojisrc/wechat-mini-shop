Component({
    externalClasses: [ 'custom-class'],
    properties: {
        payload: {
            type: Object,
            value: null
        },
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
    }
});
