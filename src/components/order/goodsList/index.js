Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        orderInfo:{
            type:Object,
            value:null
        },
        goodsList: {
            type: Array,
            value: null
        }
    },
    methods: {
        onRefund(e){
            this.triggerEvent('goods-refund-click', { goodsInfo:e.currentTarget.dataset.goodsInfo });
        },
        onRefundDetail(e){
            this.triggerEvent('goods-refund-detail', { goodsInfo:e.currentTarget.dataset.goodsInfo });
        },
        onGoodsDetail(e) {
            this.triggerEvent('goods-detail', { goodsInfo:e.currentTarget.dataset.goodsInfo });
        }
    }
});
