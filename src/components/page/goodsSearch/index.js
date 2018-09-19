Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        dataSource: {
            type: Object,
            value: null
        }
    },
    methods: {
        onClick() {
            this.triggerEvent('click');
        }
    }
});
