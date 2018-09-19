Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        goodsSkuId:{
            type:[Number,String],
            value:null
        },
        cart_id:{
            type:[Number,String],
            value:null
        },
        checked:{
            type:Boolean,
            value:false
        },
        image:{
            type:String,
            value:null
        },
        title:{
            type:String,
            value:null
        },
        spec:{
            type:String,
            value:null
        },
        price:{
            type:Number,
            value:null
        },
        num:{
            type:Number,
            value:null
        }
    },
    methods: {
        onClick:function(e){
            console.log(e)
            this.triggerEvent('click', {
                goods_sku_id : this.data.goodsSkuId
            })
        },
    }
});
