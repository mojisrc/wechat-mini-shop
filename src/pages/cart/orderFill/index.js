import fa from "@/utils/fa";
import cartServices from "@/services/cart";
import addressServices from "@/services/address";
import connect from "@/utils/connect";
import navigation from "@/utils/navigation";
import Toast from "@/utils/toast";
import validate from "@/utils/validate";
import cache from "@/utils/cache";

Page(connect(({ user }) => ({
    login: user.login,
    userInfo: user.self,
}))({
    data: {
        userInfo: {
            assets: {
                points: 0
            }
        },
        delta: 1,
        way: 'cart', // way	否	购买途径，cart 购物车（默认）、buy_now 立即购买
        calculate: null,
        cartList: [],
        cartIds: [],
        addressId: null,
        address: {},
        message: null,
        total: 0,
        refundRulePageId: 0,
        invoiceText: '',
        invoice: {
            type: 0,
            header: 0,
            company: '',
            tax_number: '',
        },
    },
    onMessageChange(e) {
        this.setData({
            message: e.detail.value
        })
    },
    onAddressAdd() {
        navigation.navigate('address/add')
    },
    onAddressList() {
        navigation.navigate('address/list')
    },
    // TODO 优化
    async onLoad(options) {
        // 清空被选中，为了带过来列表返回的
        cache.set('address_checked_id', null)
        let cartIds = JSON.parse(options.cart_ids);
        let way = 'cart'
        let delta = this.data.delta
        if (typeof options['way'] !== 'undefined' && options['way'] === 'buy_now') {
            way = 'buy_now'
            delta = 1
        } else {
            delta = 2
        }
        this.setData({
            cartIds,
            way,
            delta
        })
        this.dispatch({
            type: 'user/self',
        })
    },
    // 计算费用
    async initCalculate() {
        const { cartIds, addressId} = this.data
        const { dispatch } = this
        let payload = {
            cart_ids: cartIds,
        }
        if (addressId > 0) {
            payload['address_id'] = addressId
        }

        dispatch({
            type: 'buy/calculate',
            payload,
            callback: (e) => {
                if (e.code === 0) {
                    const d = e.result.discount
                    this.setData({
                        calculate: {
                            freight_template_fee: e.result.freight_template_fee,
                            freight_unified_fee: e.result.freight_unified_fee,
                            goods_amount: e.result.goods_amount,
                            goods_freight_list: e.result.goods_freight_list,
                            pay_amount: e.result.pay_amount,
                            pay_freight_fee: e.result.pay_freight_fee,
                        },
                    })
                } else {
                    Toast.fail(e.msg)
                }
            }
        })
    },
    onUsableTotalNumberChange(e) {
        this.setData({
            usableTotalNumber: e.detail.usableTotalNumber
        })
    },
    // 获得默认地址
    async initAddress() {
        let res = null
        if (this.data.addressId > 0) {
            res = await addressServices.info({
                id: this.data.addressId
            })
        } else {
            res = await addressServices.getDefault()
        }
        const { info } = res.result
        if (res.code === 0) {
            this.setData({
                addressId: info.id,
                address: info
            })
            return info
        } else {
            return false
        }
    },
    async onShow() {
        const addressId = cache.get('address_checked_id')
        if (addressId > 0) {
            this.setData({ addressId })
        }
        const cartListState = await this.initCartList()
        if (cartListState === true) {
            const address = await this.initAddress()
            if (address.id > 0) {
                await this.initCalculate()
            }
        } else {
            fa.toast.show({
                title: '支付商品状态已变，请重新选择'
            })
            setTimeout(function () {
                wx.navigateBack({ delta: this.data.delta })
            }, 1500)
        }
    },
    async initCartList() {
        const cartIds = this.data.cartIds
        let checkedGoodsSkuInfoIds = []
        let checkedCartIds = []
        let total = 0
        const { result } = await cartServices.list({
            ids: cartIds
        })
        if (result.list.length > 0) {
            const cartList = result.list
            let goods_ids = []
            for (let i = 0; i < cartList.length; i++) {
                goods_ids.push(cartList[i].goods_id)
                total += parseFloat(cartList[i].goods_price) * cartList[i].goods_num
                cartList[i]['goods_spec_string'] = cartList[i].goods_spec[0].id !== 0 ? cartList[i].goods_spec.map(function (item) {
                    return `${item.name}:${item.value_name}`
                }) : ''
            }
            total = parseFloat(total.toFixed(2))
            this.setData({
                checkedCartIds,
                checkedGoodsSkuInfoIds,
                cartList,
                total
            })
            return true
        } else {
            return false
        }
    },
    onCreateOrder() {
        const {
            way,
            addressId,
            cartIds,
            message,
            userInfo,
            invoice
        } = this.data
        const { dispatch } = this
        if (!addressId) {
            return fa.toast.show({
                title: '请选择收货地址'
            })
        }
        let payload = {
            'way': way,
            'address_id': addressId,
            'cart_ids': cartIds,
            'message': message,
        }
        if (invoice.type === 1) {
            if (invoice.header === 1) {
                payload['invoice'] = {
                    type: 1,
                    company: invoice.company,
                    tax_number: invoice.tax_number,
                }
            } else {
                payload['invoice'] = { type: 0 }
            }
        }
        const pay_amount = this.data.calculate.pay_amount
        dispatch({
            type: 'buy/create',
            payload,
            callback: (e) => {
                if (e.code === 0) {
                    const { result } = e
                    const payModal = this.selectComponent('#pay')
                    payModal.show({
                        orderType: 'goods_buy',
                        orderPaySn: result.pay_sn,
                        payAmount: parseFloat(pay_amount),
                        miniOpenid: userInfo.wechat_open.mini_openid,
                        userBalance: parseFloat(userInfo.assets.balance),
                        onSuccess: () => {
                            payModal.close()
                            navigation.redirect('pay/result', {
                                pay_amount,
                                order_id: result.order_id,
                                pay_sn: result.pay_sn
                            })
                        },
                        onFail: () => {
                            payModal.close()
                            setTimeout(function () {
                                navigation.redirect('order/detail', {
                                    id: result.order_id,
                                })
                            }, 1000)
                        },
                        onClose: () => {
                            navigation.redirect('order/detail', {
                                id: result.order_id,
                            })
                        }
                    })
                } else {
                    Toast.fail(e.msg)
                    navigation.goBack()
                }
            }
        })
    },
    onInvoicePress() {
        this.selectComponent('#invoice-modal').show()
    },
    onInvoiceChange(e) {
        const invoice = e.detail
        let invoiceText = '发票'
        if (invoice.type === 1) {
            if (invoice.header === 0) {
                invoiceText = `个人`
            } else {
                invoiceText = `公司 ${invoice.company}`
            }
        }
        this.setData({ invoice, invoiceText })
    },
}))
