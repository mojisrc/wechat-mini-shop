import fa from '../../../utils/fa'
import AddressModel from '../../../models/address'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

const addressModel = new AddressModel()

Page({
    data: {
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
    },
    async onShow() {
        this.setData({
            page: 1
        })
        this.getList()
    },
    async getList() {
        const page = this.data.page
        if (page > 1 && this.data.noMore === true) {
            return
        }
        const rows = this.data.rows
        const list = page === 1 ? [] : this.data.list
        const result = await addressModel.list({
            page,
            rows
        })
        if (result) {
            let data = { page: page + 1 }
            if (result.list.length === 0) {
                data['noMore'] = true
            }
            data['list'] = list.concat(result.list)
            this.setData(data)
        }
    },
    async onReachBottom() {
        if (this.data.noMore === true) {
            return false
        } else {
            this.getList()
        }
    },
    onAddressChecked(e) {
        fa.cache.set('address_checked_id', e.detail.addressId)
        wx.navigateBack({
            delta: 1
        })
    },
    goEdit(e) {
        wx.navigateTo({
            url: '/pages/address/edit/index?id=' + e.currentTarget.dataset.id
        })
    },
    goAdd() {
        wx.navigateTo({
            url: '/pages/address/add/index'
        })
    }
})
