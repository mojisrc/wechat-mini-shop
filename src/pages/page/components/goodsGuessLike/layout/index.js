import navigation from "@/utils/navigation";
import GoodsItemUtils from "@/utils/goodsItem"
Component({
    externalClasses: [ 'custom-class'],
    properties: {
        payload: {
            type: Object,
            value: null,
        },
        loading:{
            type:Boolean,
            value:false
        },
        noMore:{
            type:Boolean,
            value:true
        }
    },
    data: {
        list: [],
        smallImageWidth: 0,
        rowsImageWidth: 0
    },
    observers: {
        'payload': function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                if (newVal.data.length > 0 && typeof newVal['isRequest'] !== "undefined") {
                    this.setData({
                        list: newVal.data.map((item) => {
                            const _item = new GoodsItemUtils(item)
                            _item.matchLowestPrice()
                            return {
                                ...item,
                                ...{
                                    price:_item.getPrice()
                                }
                            }
                        }),
                    })
                }
            }
        }
    },
    methods: {
        onPress(e) {
            navigation.navigate('goods/detail', {
                id: e.currentTarget.dataset.item.id
            })
        }
    },
    attached() {
        const systemInfo = wx.getSystemInfoSync()
        this.setData({
            smallImageWidth: (systemInfo.windowWidth - 18) / 2
        })
    }
});
