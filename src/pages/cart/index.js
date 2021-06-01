import cartServices from '@/services/cart'
import fa from '@/utils/fa'
import CartLogic from "@/logics/cart";
import LoginLogic from "@/logics/login";
import goodsServices from "@/services/goods";
import connect from "@/utils/connect";
import Share from "@/utils/share";
import Arr from "@/utils/array";
import navigation from "@/utils/navigation";

Page(connect(({ user }) => ({
    login: user.login,
    userInfo: user.self,
}))({
    data: {
        cartListLoadedState: false,
        onLoaded: false,
        goodsId: null,
        specClickGoodsId: null,
        specClickGoodsSkuId: null,
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
        totalNum: 0,
        checkedGoodsSkuInfoIds: [],
        checkedCartIds: [],
        allChecked: false,
        pageBase: {
            body: []
        }
    },
    onPageScroll() {
    },
    async onRemove() {
        await cartServices.del({
            goods_sku_ids: this.data.removeCheckSkuIds
        })
        await this.initCartList()
    },
    onRemoveChecked(e) {
        const id = e.currentTarget.dataset.goodsSkuId
        let ids = this.data.removeCheckSkuIds
        this.setData({
            removeCheckSkuIds: Arr.toggle(id,ids)
        }, () => {
            this.initCartList()
        })
    },
    onAllRemoveChecked() {
        let ids = this.data.removeCheckSkuIds
        const allIds = this.data.cartList.map((item) => {
            return item.goods_sku_id
        })
        ids = allIds.length === ids.length ? [] : allIds
        this.setData({
            removeCheckSkuIds: ids
        }, () => {
            this.initCartList()
        })

    },
    async onChecked(e) {
        console.warn('e',e)
        await cartServices.check({
            goods_sku_ids: [e.currentTarget.dataset.goodsSkuId],
            is_check: Arr.inArray(this.data.cartList[e.currentTarget.dataset.index].goods_sku_id, this.data.checkedGoodsSkuInfoIds) ? 0 : 1,
        })
        this.initCartList()
    },
    async onAllChecked() {
        const cartLength = this.data.cartList.length
        const checkedLength = this.data.checkedGoodsSkuInfoIds.length
        const goodsSkuIds = this.data.cartList.map((item) => {
            return item.goods_sku_id
        })

        await cartServices.check({
            goods_sku_ids: goodsSkuIds,
            is_check: cartLength === checkedLength ? 0 : 1,
        })
        this.initCartList()
    },
    toggleGoodsSkuModalVisible() {
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
    onOrderFill() {
        navigation.navigate('cart/orderFill', {
            cart_ids: JSON.stringify(this.data.checkedCartIds)
        })
    },
    onGoodsDetail(e) {
        navigation.navigate('goods/detail', {
            id: e.detail.goodsId
        })
    },
    // TODO
    login() {
        const loginLogic = new LoginLogic({
            success: (result) => {
                if (result.code === 0) {
                    this.init()
                }
            }
        })
        loginLogic.wechatLogin()
    },
    async onPullDownRefresh() {
        await cartServices.list()
        wx.stopPullDownRefresh()
    },
    async onCartNumberChange(e) {
        const goods_sku_id = this.data.cartList[e.detail.index].goods_sku_id
        const { number } = e.detail
        const cartLogic = new CartLogic()
        const result = await cartLogic.save(goods_sku_id, number)
        if (result.code === 0) {
            this.initCartList()
        } else {
            fa.toast.show({
                title: result.msg
            })
        }
    },
    onLoad() {
        wx.showShareMenu({
            withShareTicket: true
        })
    },
    async onShow() {
        await this.init()
    },
    async init() {
        const { login } = this.data
        if (login) {
            await this.initCartList()
        }
        this.setData({
            onLoaded: true
        })
        this.initExtraPageInfo()
    },
    async initCartList() {
        // 计算金额
        let total = 0
        let totalNum = 0
        let checkedGoodsSkuInfoIds = []
        let checkedCartIds = []
        const {removeCheckSkuIds} = this.data
        const res = await cartServices.list()
        if (res.result.list) {
            const cartList = res.result.list
            for (let i = 0; i < cartList.length; i++) {
                cartList[i]['goods_spec_string'] = cartList[i].goods_spec.map( (item)=> {
                    return `${item.name}:${item.value_name}`
                })
                if (cartList[i].is_check) {
                    checkedCartIds.push(cartList[i].id)
                    checkedGoodsSkuInfoIds.push(cartList[i].goods_sku_id)

                    total += parseFloat(cartList[i].goods_price) * cartList[i].goods_num
                    totalNum += cartList[i].goods_num
                }

                cartList[i]['remove_checked'] = Arr.inArray(cartList[i].goods_sku_id, removeCheckSkuIds);
            }
            total = parseFloat(total.toFixed(2))

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
                title: res.msg
            })
        }

    },
    async initGoodsInfo() {
        const result = await goodsServices.info({
            id: this.data.goodsId
        })
        if (result.code === 0) {
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
                title: result.msg
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
        // TODO
        const cartGoods = await cartServices.info({ goods_sku_id: e.detail.goodsSkuInfo.id })
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
                if (result.code === 0) {
                    this.initCartList()
                    this.toggleGoodsSkuModalVisible()
                } else {
                    fa.toast.show({
                        title: fa.code.parse(cartLogic.cartServices.getException().getCode())
                    })
                }
            }
        }
    },
    onShareAppMessage: function () {
        const shopInfo = cache.get('shop_info')
        return Share.share({
            title: shopInfo.name,
            path: `/pages/index/index`,
        })
    },
    onReachBottom() {
        try {
            const selectComponent = this.selectComponent(`#pageBase`)
            if (selectComponent) {
                if (typeof selectComponent['onReachBottom'] === "function") {
                    selectComponent.onReachBottom();
                }
            }
        } catch (e) {
            console.warn(e)
        }
    },
    initExtraPageInfo() {
        const { dispatch, login } = this
        dispatch({
            type: 'page/extra',
            payload: { sign: login ? 20002 : 20001 },
            callback: (extra) => {
                if (extra.code === 0) {
                    this.setData({
                        pageBase: {
                            background_color: extra.result.info.background_color,
                            body: extra.result.info.body
                        }
                    })
                }
            }
        })
    }
}))
