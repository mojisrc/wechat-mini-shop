Component({
    options: {
        multipleSlots: true
    },
    properties: {
        title: {
            type: String,
            value: null
        },
        show: {
            type: Boolean,
            value: false
        },
    },
    methods: {
        onClose() {
            this.triggerEvent('close');
        },
    }
});
