Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        goodsId: {
            type: [Number, String],
            value: null
        },
        goodsSkuId: {
            type: [Number, String],
            value: null
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
            this.triggerEvent('click', {
                goodsSkuId: this.data.goodsSkuId,
                goodsId: this.data.goodsId,
            })
        },
    }
});
