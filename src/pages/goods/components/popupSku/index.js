import Arr from "@/utils/array"
import Goods from "@/utils/goods";

Component({
    externalClasses: ['custom-class'],
    properties: {
        login: {
            type: Boolean,
            value: false
        },
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
        priceSeparator: {
            type: String,
            value: ' - '
        },
        skuList: {
            type: Array,
            value: []
        },
        specList: {
            type: Array,
            value: []
        },
        defaultSkuIndex: {
            type: Number,
            value: null
        }
    },
    data: {
        price: null,
        prevGoodsId: null,
        userInfo: null,
        goodsSkuInfo: null,
        currentSku: {},
        currentSkuIndex: 0,
        selectedValueIds: [],
        tempSpecList: [],
        specValueIdsChecked: []
    },
    observers: {
        'specList': function (newVal, oldVal) {
            if (newVal !== oldVal) {
                this.setData({
                    tempSpecList: this.getTempSpecList(newVal, this.data.selectedValueIds)
                })
            }
        },
        'defaultSkuIndex': function (newVal, oldVal) {
            if (newVal !== oldVal) {
                let defaultSkuIndex = newVal
                const { skuList, specList } = this.data
                if (Array.isArray(skuList) && skuList.length > 0) {
                    this.setData({
                        selectedValueIds: JSON.parse(skuList[defaultSkuIndex].spec_value_sign),
                        currentSku: skuList[defaultSkuIndex],
                        currentSkuIndex: defaultSkuIndex,
                        tempSpecList: this.getTempSpecList(specList, JSON.parse(skuList[defaultSkuIndex].spec_value_sign))
                    })
                }
            }
        },
        // 'show': function (newVal) {
        //     if (newVal === true) {
        //         const { skuList } = this.data
        //         let price = this.generatePice()
        //         this.setData({ price })
        //         // 单商品主动模拟触发点击事件
        //         if (skuList[0].spec[0].id === 0) {
        //             this.setData({
        //                 selectedValueIds: ['0'] // 不设为string写会有bug 原因不详
        //             }, () => {
        //                 this.onSpecValueClick({
        //                     currentTarget: {
        //                         dataset: {
        //                             specValueId: 0,
        //                             specId: 0
        //                         }
        //                     }
        //                 })
        //             })
        //         }
        //     }
        // }
    },
    methods: {
        onSpecValueClick(e) {
            const { specValueId, spec } = e.currentTarget.dataset
            const { specList, goodsInfo } = this.data
            const selectedValueIds = Goods.specToggleValueIds(specValueId, this.data.selectedValueIds, spec)
            let goodsSkuInfo = null

            if (specList.length === selectedValueIds.length) {
                const { goodsSkuInfo, skuListIndex } = this.matchSku(selectedValueIds)
                console.warn("goods-sku-match-success", goodsSkuInfo)
                this.triggerEvent('goods-sku-match-success', {
                    goodsSkuInfo,
                    skuListIndex,
                    selectedValueIds,
                })
            } else {
                this.triggerEvent('goods-sku-match-fail', {
                    selectedValueIds
                })
            }
            let price = this.generatePice()
            this.setData({
                tempSpecList: this.getTempSpecList(specList, selectedValueIds),
                selectedValueIds,
                prevGoodsId: goodsInfo === null ? null : goodsInfo.id,
                price,
                goodsSkuInfo,
                currentSkuInfo: goodsSkuInfo
            })
        },
        matchSku(specValueIdsChecked) {
            const { skuList } = this.data
            const spec_value_sign = Goods.sortSpecValueIdToString(specValueIdsChecked)
            let goodsSkuInfo = null
            let skuListIndex = null
            for (let i = 0; i < skuList.length; i++) {
                if (skuList[i].spec_value_sign === spec_value_sign) {
                    goodsSkuInfo = skuList[i]
                    skuListIndex = i
                    break
                }
            }
            return { goodsSkuInfo, skuListIndex }
        },
        getTempSpecList: function (specList, selectedValueIds) {
            return Array.isArray(specList) ? specList.map(function (item) {
                return {
                    id: item.id,
                    name: item.name,
                    value_list: item.value_list.map(function (sub) {
                        return {
                            id: sub.id,
                            name: sub.name,
                            checked: Arr.inArray(sub.id, selectedValueIds)
                        }
                    })
                }
            }) : []
        },
        generatePice: function () {
            const { skuList } = this.data
            let price = skuList[0].price
            // 如果是有规格商品
            if (skuList.length > 1) {
                let prices = skuList.map(function (item) {
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
                selectedValueIds: [],
                specValueIdsChecked: []
            })

            this.triggerEvent('close')
        },
        onConfirmClick() {
            if (this.data.login) {
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
