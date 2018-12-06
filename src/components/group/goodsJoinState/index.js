Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        cartTotalNumber: {
            type: Number,
            value: null
        },
    },
    data:{
        maxNum:6,
        avatars:[
            {
                avatar:'https://tvax4.sinaimg.cn/crop.0.0.1242.1242.180/648679cbly8fw970qnrc4j20yi0yidjk.jpg',
            },
            {
                avatar:'https://tvax2.sinaimg.cn/crop.0.0.512.512.180/9e50beadly8flxy7l09coj20e80e8mxd.jpg',
            },
            {
                avatar:'https://tvax2.sinaimg.cn/crop.0.0.512.512.180/8291055aly8fshc9ota4aj20e80e80sz.jpg',
            },
            {
                avatar:'https://tvax2.sinaimg.cn/crop.0.0.191.191.180/83fae389ly8ffqnqtfhw7j205b05b0t4.jpg',
            },

        ]
    },
    methods: {
        onClick() {
            this.triggerEvent('click', { orderId: this.data.orderId });
        },
    }
});
