Component({
    externalClasses: [ 'custom-class'],
    properties: {
        index: {
            type: Number,
            value: null
        },
        id: {
            type: [Number, String],
            value: null
        },
        checked: {
            type: Boolean,
            value: false
        },
        image: {
            type: String,
            value: null
        },
        title: {
            type: String,
            value: null
        },
        spec: {
            type: String,
            value: null
        },
        price: {
            type: Number,
            value: null
        },
        num: {
            type: Number,
            value: null
        },
        goodsId: {
            type: [Number, String],
            value: null
        },
        goodsSkuId: {
            type: [Number, String],
            value: null
        },
        canSkuSelect: {
            type: Boolean,
            value: false
        }
    },
    methods: {
        onClick: function (e) {
            this.triggerEvent('click', {
                goodsSkuId: this.data.goodsSkuId,
                goodsId: this.data.goodsId,
            })
        },
        bindNumberChange: function (e) {
            this.triggerEvent('numberChange', {
                index: e.currentTarget.id,
                number: e.detail,
            })
        },
        bindSpecClick: function (e) {
            this.triggerEvent('specClick', {
                goodsSkuId: this.data.goodsSkuId,
                goodsId: this.data.goodsId,
            })
        }
    }
});
