Component({
    externalClasses: [ 'custom-class'],
    properties: {
        payload: {
            type: Object,
            value: null
        },
    },
    methods: {
        onClick() {
            this.triggerEvent('click');
        }
    }
});
