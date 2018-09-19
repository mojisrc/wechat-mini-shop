Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        goodsList: {
            type: Array,
            value: []
        }
    },
    methods: {
        onClick({ currentTarget = {} }) {
            this.triggerEvent('click', { currentTarget });
        }
    }
});
