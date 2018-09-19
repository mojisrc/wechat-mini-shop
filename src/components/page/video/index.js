Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        dataSource: {
            type: Object,
            value: null
        }
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
