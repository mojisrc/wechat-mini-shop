import connect from "@/utils/connect";
import Toast from "@/utils/toast";
import navigation from "@/utils/navigation";
import Goods, { GOODS_TYPES } from "@/utils/goods";
import Time from "@/utils/time";
import Share from "@/utils/share";
import validate from "@/utils/validate";

Page(connect(({ user, goodsCollect, cart }) => ({
    login: user.login,
    userInfo: user.self,
    isCollect: !!goodsCollect.state.result.state,
    totalNum: cart.totalNum.result.total_num
}))({
    data: {
        onLoaded: false,
        id: 972,
        cartTotalNumber: 0,
        cartGoods: null,
        inCartNumber: 0,
        buyMode: 'cart',         // cart buy_now
        goods_sku_id: null,
        currentSku: {
            format: {
                price: "",
                stock: 0,
                saleNum: 0,
                linePrice: ""
            }
        },
        showBottomPopup: false,
        specValueIdsChecked: [],
        selectedValueIds: [],
        evaluateList: {
            total_number: 0,
            list: []
        },
        spec_list: [],
        stepper: 1,
        list: [
            {
                id: '1',
                title: '商品'
            },
            {
                id: '2',
                title: '评价'
            },
            {
                id: '3',
                title: '详情'
            }
        ],
        selectedId: '1',
        brandGoods: {
            total_number: 0,
            list: []
        },
        pageBase: {
            body: []
        },
        skuList: [],
        goodsInfo: { id: 0 },
        goodsBody: [],
        specList: [],
        currentSkuIndex: 0,

        addCartBtnShow: true,
        addCartBtnText: "加入购物车",
        buyNowBtnText: "立即购买",
        buyNowBtnDisabled: false,
    },
    onPageScroll() {
    },
    async onLoad(options) {
        wx.showShareMenu({ withShareTicket: true })
        this.setData({ id: options['id'] ? options['id'] : 2293 })
        this.initGoodsInfo()
    },
    onShow() {
        this.initTotalNumber()
    },
    onCart() {
        if (this.data.userInfo) {
            wx.switchTab({
                url: '/pages/cart/index'
            })
        } else {
            return false
        }
    },
    onBuyNow({ quantity }) {
        const { dispatch } = this
        const { currentSku } = this.data
        dispatch({
            type: 'cart/save',
            payload: {
                goods_sku_id: currentSku.id,
                quantity
            },
            callback: (saveE) => {
                if (saveE.code === 0) {
                    dispatch({
                        type: 'cart/info',
                        payload: {
                            goods_sku_id: currentSku.id,
                        },
                        callback: (e) => {
                            if (e.code === 0) {
                                Toast.loading(false)
                                navigation.navigate("cart/orderFill", {
                                    way: "buy_now",
                                    cart_ids: JSON.stringify([e.result.info.id])
                                })
                                this.toggleGoodsSkuModalVisible()
                            } else {
                                Toast.fail(e.msg)
                            }
                        }
                    })
                } else {
                    Toast.fail(saveE.msg)
                }
            }
        })
    },
    onCartAdd({ quantity }) {
        const { dispatch } = this
        const { currentSku } = this.data
        Toast.loading()
        if (currentSku.marketing_activity === GOODS_TYPES.ORDINARY) {
            const payload = {
                goods_sku_id: currentSku.id,
                quantity
            }
            dispatch({
                type: 'cart/change',
                payload,
                callback: () => {
                    Toast.loading(false)
                    this.toggleGoodsSkuModalVisible()
                }
            })
        } else {
            this.onBuyNow({ quantity })
        }
    },
    /**
     * enum : addCart buyNow
     */
    footerBtnType: 'addCart',

    onFooterBtnPress(e) {
        const { login } = this.data
        if (!login) {
            navigation.navigate('user/login')
        } else {
            this.footerBtnType = e.currentTarget.dataset.type
            this.toggleGoodsSkuModalVisible()
        }
    },

    onSubmit() {
        const { stepper } = this.data
        switch (this.footerBtnType) {
            case "addCart":
                this.onCartAdd({ quantity: stepper })
                break
            case "buyNow":
                this.onBuyNow({ quantity: stepper })
                break
        }
    },
    toggleGoodsSkuModalVisible() {
        this.setData({
            showBottomPopup: !this.data.showBottomPopup
        });
    },
    onStepperChange(e) {
        this.setData({
            stepper: e.detail
        })
    },
    onGoodsSkuMatchSuccess(e) {
        const { goodsSkuInfo, skuListIndex } = e.detail
        this.setData({
            currentSku: goodsSkuInfo,
            currentSkuIndex: skuListIndex
        }, () => {
            switch (goodsSkuInfo.marketing_activity) {
                case GOODS_TYPES.ORDINARY:
                    this.setData({
                        addCartBtnShow: true,
                        addCartBtnText: "加入购物车",
                        buyNowBtnText: "立即购买",
                        buyNowBtnDisabled: false
                    })
                    break
            }
            if (goodsSkuInfo['marketing_activity'] === GOODS_TYPES.ORDINARY) {
                const { dispatch } = this
                dispatch({
                    type: 'cart/info',
                    payload: { goods_sku_id: goodsSkuInfo.id },
                    callback: (e) => {
                        if (e.code === 0) {
                            this.setData({
                                cartGoods: e.result.info,
                                inCartNumber: e.result.info.goods_num
                            })
                        }
                    }
                })
            }
        })
    },
    onGoodsSkuMatchFail(e) {
        const { selectedValueIds } = e.detail
        this.setData({
            selectedValueIds: selectedValueIds,
            cartGoods: null,
            inCartNumber: 0
        })
    },
    initGoodsInfo() {
        const { dispatch } = this
        const { id, login } = this.data
        try {
            dispatch({
                type: 'goods/infoBiz',
                payload: { id },
                callback: (e) => {
                    const { skuListReponse, goodsBody, goodsReponse, evaluateListResponse, brandListResponse } = e
                    let skuList = []
                    if (skuListReponse.code === 0) {
                        skuList = Goods.formatSkuList(skuListReponse.result.sku, goodsReponse.result.info)
                        this.setData({
                            skuList,
                            specList: skuListReponse.result.spec_list
                        })
                    }
                    if (goodsReponse.code === 0) {
                        const { item, index } = Goods.getDefaultSku(skuList)
                        this.setData({
                            onLoaded: true,
                            goodsInfo: goodsReponse.result.info,
                            goodsBody: goodsBody,
                            currentSku: item,
                            currentSkuIndex: index,
                        }, () => {
                            this.onGoodsSkuMatchSuccess({
                                detail: {
                                    goodsSkuInfo: item,
                                    skuListIndex: index
                                }
                            })
                        })
                    }
                    if (evaluateListResponse.code === 0) {
                        this.setData({
                            evaluateList: evaluateListResponse.result
                        })
                    }
                    if (brandListResponse.code === 0) {
                        this.setData({
                            brandGoods: brandListResponse.result
                        })
                    }
                    if (login) {
                        this.initGoodsCollectState()
                    }
                }
            })
        } catch (e) {
            Toast.fail("加载错误，请稍后再试")
        }
    },
    onBrandPress() {
        navigation.navigate('brand/detail', {
            id: this.data.goodsInfo.brand.id
        })
    },
    onGoodsEvaluateList() {
        navigation.navigate('goods/evaluateList', {
            goods_id: this.data.id
        })
    },
    onCollect() {
        const { dispatch } = this
        const { login, isCollect, id } = this.data;
        if (login) {
            dispatch({
                type: 'goodsCollect/changeState',
                payload: {
                    is_collect: isCollect,
                    goods_ids: [id]
                },
                callback: () => {
                    this.initGoodsCollectState()
                }
            })
        }
    },
    initGoodsCollectState() {
        const { dispatch } = this
        const { login, id } = this.data
        if (login) {
            dispatch({
                type: 'goodsCollect/state',
                payload: { goods_id: id }
            })
        }
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
    initTotalNumber() {
        const { dispatch } = this
        dispatch({
            type: "cart/totalNum",
        })
    },
    onShareAppMessage() {
        const { goodsInfo } = this.data
        return Share.share({
            title: goodsInfo.title,
            imageUrl: goodsInfo.img,
            path: `/pages/goods/detail/index?id=${goodsInfo.id}`,
        })
    }
}))
