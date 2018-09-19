import fa from "../../../utils/fa";

Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        show: {
            type: Boolean,
            value: false
        },
        goodsSkuId: {
            type: Number,
            value: null
        },
        confirmButtonText: {
            type: String,
            value: '确定'
        },
        stepperNumber: {
            type: Number,
            value: 0
        },
        inCartNumber: {
            type: Number,
            value: 0
        },
        goodsInfo: {
            type: Object,
            value: null
        },
        goodsSkuInfo: {
            type: Object,
            value: null
        },
        priceSeparator: {
            type: String,
            value: ' - '
        },
        specValueIdsChecked: {
            type: Array,
            value: []
        },
        specIdValueIdsChecked: {
            type: Array,
            value: []
        }
    },
    data: {
        prcie: null,
        spec_list: [],
        prevGoodsId: null,
        userInfo:null
    },
    ready() {
        let price = this.generatePice()
        this.setData({
            userInfo: fa.cache.get('user_info'),
            price,
        })
        // 单商品主动模拟触发点击事件
        if(this.data.goodsInfo.sku_list[0].spec_sign==='[0]'){
            this.setData({
                specIdValueIdsChecked:['0'] // 不设为string写会有bug 原因不详
            },()=>{
                this.onSpecClick({
                    currentTarget:{
                        dataset:{
                            specValueId:0,
                            specId:0
                        }
                    }
                })
            })
        }
    },
    // 减少setData
    methods: {
        onLoginSuccess() {
            this.setData({
                userInfo: fa.cache.get('user_info')
            })
        },
        onSpecClick(e) {
            const goodsInfo = this.data.goodsInfo
            const specValueId = e.currentTarget.dataset.specValueId
            const specId = e.currentTarget.dataset.specId
            let specIdValueIdsChecked = this.data.specIdValueIdsChecked

            // 取消选中
            if (specIdValueIdsChecked[specId] === specValueId) {
                delete specIdValueIdsChecked[specId]
            } else {
                // 选中
                specIdValueIdsChecked[specId] = specValueId
            }
            this.setData({
                specIdValueIdsChecked
            })
            this.initSpecList()
            // 判断是否有匹配的sku
            let specValueIdsChecked = [];
            for (let i = 0; i < specIdValueIdsChecked.length; i++) {
                if (typeof specIdValueIdsChecked[i] !== 'undefined') {
                    specValueIdsChecked.push(specIdValueIdsChecked[i])
                }
            }
            this.setData({
                specValueIdsChecked
            })
            let goodsSkuInfo = null
            if (this.data.goodsInfo.spec_list.length === specValueIdsChecked.length) {
                const matchResult = this.matchSku()
                goodsSkuInfo = matchResult.goodsSkuInfo
                console.log(goodsSkuInfo)
                console.log('goods-sku-match-success')
                this.triggerEvent('goods-sku-match-success', {
                    goodsSkuInfo: matchResult.goodsSkuInfo,
                    skuListIndex: matchResult.skuListIndex,
                    specIdValueIdsChecked: this.data.specIdValueIdsChecked,

                })
            } else {
                this.triggerEvent('goods-sku-match-fail', {
                    specIdValueIdsChecked: this.data.specIdValueIdsChecked
                })
            }
            let price = this.generatePice()
            this.setData({
                prevGoodsId: goodsInfo === null ? null : goodsInfo.id,
                price,
                goodsSkuInfo
            })
        },
        matchSku() {
            const goodsInfo = this.data.goodsInfo
            const spec_value_sign = this.data.specValueIdsChecked.sort(function (a, b) {
                return a - b
            })
            let goodsSkuInfo = null
            let skuListIndex = null
            const spec_value_sign_string = JSON.stringify(spec_value_sign)
            for (let i = 0; i < goodsInfo.sku_list.length; i++) {
                if (goodsInfo.sku_list[i].spec_value_sign === spec_value_sign_string) {
                    goodsSkuInfo = goodsInfo.sku_list[i]
                    skuListIndex = i
                    break
                }
            }
            return {
                goodsSkuInfo,
                skuListIndex
            }
        },
        initSpecList: function () {
            const goodsInfo = this.data.goodsInfo
            let specIdValueIdsChecked = this.data.specIdValueIdsChecked
            goodsInfo.spec_list = goodsInfo.spec_list.map(function (item) {
                return {
                    id: item.id,
                    name: item.name,
                    value_list: item.value_list.map(function (sub) {
                        return {
                            id: sub.id,
                            name: sub.name,
                            checked: sub.id === specIdValueIdsChecked[item.id]
                        }
                    })
                }
            })
            this.setData({
                goodsInfo
            })
        },
        generatePice: function () {
            const goodsInfo = this.data.goodsInfo
            let price = goodsInfo.sku_list[0].price
            // 如果是有规格商品
            if (goodsInfo.sku_list.length > 1) {
                let prices = goodsInfo.sku_list.map(function (item) {
                    return item.price
                })
                // 如果是多条就区间
                prices = prices.sort(function (a, b) {
                    return a - b
                })
                // 如果价格相同
                if (prices[0] !== prices[prices.length - 1]) {
                    price = `${prices[0]}${this.data.priceSeparator}${prices[prices.length - 1]}`
                }
            }
            return price
        },
        // 获得sku index
        onClick: function () {
            this.triggerEvent('click', {
                goodsSkuId: this.data.goodsSkuId
            })
        },
        onPopupClose() {
            this.setData({
                specIdValueIdsChecked: [],
                specValueIdsChecked: []
            })

            this.triggerEvent('close')
        },
        onConfirmClick() {
            if(this.data.userInfo!==null){
                this.triggerEvent('confirm-click')
            }
        },
        onStepperChange(e) {
            this.triggerEvent('stepper-change', e.detail)
        },
        _inArray(search, array) {
            for (let i in array) {
                if (array[i] === search) {
                    return true;
                }
            }
            return false;
        },
        _remove(arr, item) {
            let result = [];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] !== item) {
                    result.push(arr[i]);
                }
            }
            return result;
        }
    }
});
