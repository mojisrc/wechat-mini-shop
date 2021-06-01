Component({
    externalClasses: [ 'custom-class'],
    properties: {
        goodsInfo: {
            type: Object,
            value: null
        }
    },
    methods: {
        onGoods() {
            this.triggerEvent('goods', { goodsId: this.data.goodsInfo.goods_id });
        },
        onDetail() {
            this.triggerEvent('detail', { orderGoodsId: this.data.goodsInfo.id });
        },
        onAdd() {
            this.triggerEvent('add', { orderGoodsId: this.data.goodsInfo.id });
        },
        onAdditional() {
            this.triggerEvent('additional', { orderGoodsId: this.data.goodsInfo.id });
        },
    }
});
