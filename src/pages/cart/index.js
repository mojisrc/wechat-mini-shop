import CartModel from '../../models/cart'
import fa from '../../utils/fa'
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module'
import CartLogic from "../../logics/cart";
import LoginLogic from "../../logics/login";
import GoodsModel from "../../models/goods";

const cartModel = new CartModel()
const goodsModel = new GoodsModel()

Page({
    data: {
        cartListLoadedState: false,
        onLoaded: false,
        goodsId: null,
        specClickGoodsId: null,
        specClickGoodsSkuId:null,
        inCartNumber: 0,
        goodsInfo: null,
        goodsSkuId: null,
        removeCheckSkuIds: [],
        specIdValueIdsChecked: [],
        isSaveMode: false,
        cartSkuShow: false,
        stepper: 1,
        cartList: [],
        total: 0,
        totalNum:0,
        checkedGoodsSkuInfoIds: [],
        checkedCartIds: [],
        allChecked: false,
        userInfo: null,
    },
    async onRemove() {
        await cartModel.del({
            goods_sku_ids: this.data.removeCheckSkuIds
        })
        await this.initCartList()
    },
    onRemoveChecked(e) {
        console.log(e)
        const id = e.currentTarget.dataset.goodsSkuId
        let ids = this.data.removeCheckSkuIds
        !fa.inArray(id, ids) ? ids.push(id) : ids = fa.remove(ids, id)
        this.setData({
            removeCheckSkuIds: ids
        })
        this.initCartList()
    },
    onAllRemoveChecked() {
        let ids = this.data.removeCheckSkuIds
        const allIds = this.data.cartList.map(function (item) {
            return item.goods_sku_id
        })
        ids = allIds.length === ids.length ? [] : allIds
        this.setData({
            removeCheckSkuIds: ids
        })
        this.initCartList()
    },
    async onChecked(e) {
        await cartModel.check({
            goods_sku_ids: [e.currentTarget.dataset.goodsSkuId],
            is_check: fa.inArray(this.data.cartList[e.currentTarget.dataset.index].goods_sku_id,this.data.checkedGoodsSkuInfoIds)  ? 0 : 1,
        })
        this.initCartList()
    },
    async onAllChecked() {
        const cartLength = this.data.cartList.length
        const checkedLength = this.data.checkedGoodsSkuInfoIds.length
        const goodsSkuIds = this.data.cartList.map(function (item) {
            return item.goods_sku_id
        })

        await cartModel.check({
            goods_sku_ids: goodsSkuIds,
            is_check: cartLength === checkedLength  ? 0 : 1,
        })
        this.initCartList()
    },
    toggleGoodsSkuSelect() {
        this.setData({
            cartSkuShow: false
        })
    },
    async onCartGoodsSpecClick(e) {
        this.setData({
            specIdValueIdsChecked: e.detail.goodsSkuId !== this.data.goodsSkuId ? [] : this.data.specIdValueIdsChecked,
            goodsId: e.detail.goodsId,
            specClickGoodsId: e.detail.goodsId,
            specClickGoodsSkuId: e.detail.goodsSkuId,
            goodsSkuId: e.detail.goodsSkuId,
            cartSkuShow: true
        })
        await this.initGoodsInfo()
    },
    bindToggleSave(e) {
        this.setData({
            removeCheckSkuIds: [],
            isSaveMode: !this.data.isSaveMode
        })
        this.initCartList()

    },
    goOrderFill() {
        wx.navigateTo({
            url: '/pages/cart/orderFill/index?cart_ids=' + JSON.stringify(this.data.checkedCartIds)
        })
    },
    goGoodsDetail(e) {
        console.log(e)
        wx.navigateTo({
            url: `/pages/goods/detail/index?id=${e.detail.goodsId}`
        })
    },
    async login() {
        const self = this
        const loginLogic = new LoginLogic({
            success: function (result) {
                if (result.code === 1) {
                    self.setData({
                        userInfo: fa.cache.get('user_info')
                    })
                }
            }
        })
        loginLogic.wechatLogin()
        this.onShow()
    },
    async onPullDownRefresh() {
        await cartModel.list()
        wx.stopPullDownRefresh()
    },
    async inCartNumberChange(e) {
        const goods_sku_id = this.data.cartList[e.detail.index].goods_sku_id
        const number = e.detail.number

        const cartLogic = new CartLogic()
        const result = await cartLogic.save(goods_sku_id, number)
        if (result !== false) {
            this.initCartList()
        } else {
            fa.toast.show({
                title: fa.code.parse(cartLogic.cartModel.getException().getCode())
            })
        }
    },
    onLoad(){
        wx.showShareMenu({
            withShareTicket: true
        })
    },
    async onShow() {
        const user_info = fa.cache.get('user_info')
        this.setData({
            userInfo: user_info,
            onLoaded: true
        })
        if (fa.cache.get('user_info')) {
            await this.initCartList()
        }
    },
    async initCartList() {
        // 计算金额
        let total = 0
        let totalNum = 0
        let checkedGoodsSkuInfoIds = []
        let checkedCartIds = []
        const result = await cartModel.list()
        if (result.list) {
            const cartList = result.list
            for (let i = 0; i < cartList.length; i++) {
                cartList[i]['goods_spec_string'] = cartList[i].goods_spec.map(function (item) {
                    return `${item.name}:${item.value_name}`
                })

                if (cartList[i].checked === true) {
                    checkedCartIds.push(cartList[i].id)
                    checkedGoodsSkuInfoIds.push(cartList[i].goods_sku_id)
                    // todo 多个float相加有bug 暂时想不通
                    total += parseFloat(cartList[i].goods_price).toFixed(2) * cartList[i].goods_num
                    totalNum += cartList[i].goods_num
                }

                if (fa.inArray(cartList[i].goods_sku_id, this.data.removeCheckSkuIds)) {
                    cartList[i]['remove_checked'] = true
                } else {
                    cartList[i]['remove_checked'] = false
                }
            }
            total = total.toFixed(2)

            this.setData({
                cartListLoadedState: true,
                checkedCartIds,
                checkedGoodsSkuInfoIds,
                total,
                totalNum,
                cartList
            })
        } else {
            fa.toast.show({
                title: fa.code.parse(cartModel.getException().getCode())
            })
        }

    },
    async initGoodsInfo() {
        const result = await goodsModel.info({
            id: this.data.goodsId
        })
        if (result) {
            let goodsInfo = result.info
            for (let i = 0; i < this.data.cartList.length; i++) {
                if (this.data.cartList[i].goods_sku_id === this.data.goodsSkuId) {
                    this.setData({
                        stepper: this.data.cartList[i].goods_num
                    })
                    break;
                }
            }
            this.setData({
                goodsInfo
            })
        } else {
            fa.toast.show({
                title: fa.code.parse(goodsModel.getException().getCode())
            })
        }
    },
    onStepperChange(e) {
        this.setData({
            stepper: e.detail
        })
    },
    async onGoodsSkuMatchSuccess(e) {
        this.setData({
            goodsSkuInfo: e.detail.goodsSkuInfo
        })
        const cartGoods = await cartModel.info({ goods_sku_id: e.detail.goodsSkuInfo.id })
        if (cartGoods) {
            this.setData({
                cartGoods: cartGoods,
                inCartNumber: cartGoods.goods_num
            })
        }
    },
    async onGoodsSkuMatchFail(e) {
        this.setData({
            specIdValueIdsChecked: e.detail.specIdValueIdsChecked,
            goodsSkuInfo: null,
            cartGoods: null,
            inCartNumber: 0
        })
    },
    async changeSkuConfirm() {
        const stepper = this.data.stepper
        const goodsSkuInfo = this.data.goodsSkuInfo
        console.log(goodsSkuInfo)
        const specClickGoodsSkuId = this.data.specClickGoodsSkuId
        if (!goodsSkuInfo) {
            return false
        } else {
            if (stepper > goodsSkuInfo.stock) {
                fa.toast.show({
                    title: '库存不足' // todo 加入到code
                })
            } else {
                const cartLogic = new CartLogic()
                const result = await cartLogic.change(specClickGoodsSkuId, goodsSkuInfo.id, stepper)
                if (result !== false) {
                    this.initCartList()
                    this.toggleGoodsSkuSelect()
                } else {
                    fa.toast.show({
                        title: fa.code.parse(cartLogic.cartModel.getException().getCode())
                    })
                }
            }
        }
    },
    onShareAppMessage: function () {
        const shopInfo = fa.cache.get('shop_info')
        return {
            title: shopInfo.name,
            path: `/pages/index/index`
        }
    }
})
