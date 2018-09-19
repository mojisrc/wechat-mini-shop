Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        url: {
            type: String,
            value: null
        }
    },
    methods: {
        onClick(e) {
            this.triggerEvent('click',e);
        }
    }
});
