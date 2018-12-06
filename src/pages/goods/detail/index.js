import GoodsModel from '../../../models/goods'
import CartModel from '../../../models/cart'
import GoodsEvaluateModel from '../../../models/goodsEvaluate'
import GoodsCollectModel from '../../../models/goodsCollect'
import fa from '../../../utils/fa'
import CartLogic from '../../../logics/cart'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

const goodsModel = new GoodsModel()
const cartModel = new CartModel()
const goodsEvaluateModel = new GoodsEvaluateModel()
const goodsCollectModel = new GoodsCollectModel()
Page({
    data: {
        onLoaded: false,
        id: 15,
        userInfo: {},
        cartTotalNumber: 0,
        cartGoods: null,
        inCartNumber: 0,
        buyMode: 'cart',         // cart buy_now
        goods_sku_id: null,
        goodsSkuInfo: null,
        showBottomPopup: false,
        specValueIdsChecked: [],
        evaluateList: [],
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
        detail: {}
    },
    async onLoad(options) {
        wx.showShareMenu({
            withShareTicket: true
        })
        // todo 商品不存在的情况判断
        // todo 已经下架的状态
        this.setData({
            id: options['id'] ? options['id'] : 16,
        })
        await this.initGoodsInfo()
        await this.initGoodsEvaluateList()
        const user_info = fa.cache.get('user_info')
        this.setData({
            userInfo: user_info
        })
        if (user_info) {
            this.initTotalNumber()
        }
    },
    async initGoodsEvaluateList() {
        const result = await goodsEvaluateModel.list({
            goods_id: this.data.detail.id,
            page: 1,
            rows: 3
        })
        if (result) {
            this.setData({
                evaluateList: result
            })
        }
    },
    addCart() {
        // 判断是否需登陆了
        this.toggleGoodsSkuSelect()
        this.setData({
            buyMode: 'cart'
        });
    },
    buyNow() {
        this.toggleGoodsSkuSelect()
        this.setData({
            buyMode: 'buy_now'
        });

    },
    onLoginSuccess() {
        this.setData({
            userInfo: fa.cache.get('user_info')
        })
    },
    async onCollect() {
        if (this.data.userInfo) {
            const result = await goodsCollectModel.add({
                goods_id: this.data.detail.id
            })
            if (result !== false) {
                fa.toast.show({
                    title: '成功收藏'
                })
            }
        } else {
            return false
        }
    },
    goCart() {
        if (this.data.userInfo) {
            wx.switchTab({
                url: '/pages/cart/index'
            })
        } else {
            return false
        }
    },
    toggleGoodsSkuSelect() {
        this.setData({
            showBottomPopup: !this.data.showBottomPopup
        });
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
            specValueIdsChecked: e.detail.specIdValueIdsChecked,
            goodsSkuInfo: null,
            cartGoods: null,
            inCartNumber: 0
        })
    },
    async buyConfirm(e) {
        const goodsSkuInfo = this.data.goodsSkuInfo
        if (!goodsSkuInfo) {
            fa.toast.show({
                title: '请选择商品规格'
            })
            return false
        } else {
            const inCartNumber = this.data.inCartNumber + this.data.stepper
            if (!this.data.userInfo) {
                this.login()
            } else if (inCartNumber > goodsSkuInfo.stock) {
                fa.toast.show({
                    title: '库存不足' // todo 加入到code
                })
            } else {
                const cartLogic = new CartLogic()
                const result = await cartLogic.save(goodsSkuInfo.id, this.data.buyMode === 'buy_now' ? this.data.stepper : inCartNumber)
                if (result !== false) {
                    if (this.data.buyMode === 'buy_now') {
                        const cartInfo = await cartModel.info({ goods_sku_id: goodsSkuInfo.id })
                        wx.navigateTo({
                            url: '/pages/cart/orderFill/index?way=buy_now&cart_ids=' + JSON.stringify([cartInfo.id])
                        })
                    } else {
                        fa.toast.show({
                            title: '成功加入购物车'
                        })
                    }
                    this.setData({
                        inCartNumber: inCartNumber
                    })
                    this.initTotalNumber()
                    this.toggleGoodsSkuSelect()
                } else {
                    fa.toast.show({
                        title: fa.code.parse(cartLogic.cartModel.getException().getCode())
                    })
                }
            }
        }
    },
    async initTotalNumber() {
        const cartTotalNumber = await cartModel.totalNum()
        if (cartTotalNumber !== false) {
            this.setData({
                cartTotalNumber: cartTotalNumber
            })
        }
    },
    async initGoodsInfo() {
        const result = await goodsModel.info({
            id: this.data.id
        })
        if (result) {
            let detail = result.info
            this.setData({
                detail
            })
        } else {
            fa.toast.show({
                title: fa.code.parse(goodsModel.getException().getCode())
            })
        }
        // 防止提前渲染报错
        this.setData({
            onLoaded: true,
        })
    },
    bodyImagePreview({ currentTarget }) {
        let images = []
        this.data.detail.body.forEach(function (item, index, array) {
            if (item.type === 'image') {
                images.push(item.value.url)
            }
        });
        wx.previewImage({
            current: currentTarget.dataset.url,
            urls: images
        })
    },
    onBodyGoodsClick() {
        // 当前页面跳转，小程序选择无限级页面，或者跳转前关闭当前，回来的时候back判断上一层点击的id，这样能弥补没法返回的功能
    },
    bannerPreview({ currentTarget }) {
        wx.previewImage({
            current: currentTarget.dataset.url,
            urls: this.data.detail.images
        })
    },
    goGoodsEvaluateList() {
        wx.navigateTo({
            url: '/pages/goods/evaluateList/index?goods_id=' + this.data.detail.id
        })
    },
    onShareAppMessage: function () {
        const goodsInfo = this.data.detail
        return {
            title: goodsInfo.title,
            path: `/pages/goods/detail/index?id=${goodsInfo.id}`
        }
    }
})
