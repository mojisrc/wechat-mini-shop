Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        goodsTitle:{
            type: String,
            value: null
        },
        goodsImg:{
            type: String,
            value: null
        },
        goodsNum:{
            type: String,
            value: null
        },
        goodsSpec:{
            type: String,
            value: null
        },
        goodsInfo: {
            type: Object,
            value: null
        }
    },
    methods: {
        onClick(currentTarget) {
            this.triggerEvent('click', { currentTarget });
        }
    }
});
