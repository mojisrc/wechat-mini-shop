Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        refundInfo:{
            type:Object,
            value:null
        },
        orderState: {
            type: Number,
            value: null
        },
        expireTime:{
            type: Number,
            value: null
        },
        cost: {
            type: Number,
            value: null
        }
    },
    methods: {
    }
});
