Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        dataSource: {
            type: Object,
            value: null
        }
    },
    methods: {
        onClick(e) {
            this.triggerEvent('click', { index: e.currentTarget.dataset.index, dataSource: this.data.dataSource });
        }
    }
});
