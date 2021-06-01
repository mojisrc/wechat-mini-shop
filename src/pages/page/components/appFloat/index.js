Component({
    externalClasses: [ 'custom-class'],
    properties: {
        payload: {
            type: Object,
            value: null
        },
    },
    methods: {
        onPress(e) {
            this.triggerEvent('click', { index: e.currentTarget.dataset.index, payload: this.data.payload });
        }
    }
});
