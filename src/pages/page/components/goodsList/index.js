import GoodsItemUtils from "@/utils/goodsItem";

Component({
    externalClasses: [ 'custom-class'],
    properties: {
        payload: {
            type: Object,
            value: null
        },
        smallImageWidth: {
            type: Number,
            value: null
        },
        rowsImageWidth: {
            type: Number,
            value: null
        }
    },
    data:{
        style5ImageWidth:0
    },
    methods: {
        onClick(e) {
            this.triggerEvent('click', { index: e.currentTarget.dataset.index, payload: this.data.payload });
        }
    },
    list: [],
    observers: {
        'payload': function (newVal, oldVal) {
            if (newVal !== oldVal) {
                let list = newVal.data.map((item) => {
                    const _item = new GoodsItemUtils(item)
                    _item.matchLowestPrice()
                    return {
                        ...item,
                        ...{
                            price:_item.getPrice()
                        }
                    }
                })
                this.setData({
                    list
                })
            }
        }
    },
    attached() {
        const systemInfo = wx.getSystemInfoSync()
        this.setData({
            smallImageWidth: (systemInfo.windowWidth - 18) / 2,
            style5ImageWidth:(systemInfo.windowWidth - 24) / 3,
        })
    }
});
