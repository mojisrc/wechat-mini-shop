import fa from '@/utils/fa'
import AddressModel from '@/models/address'
import "regenerator-runtime/runtime"

const addressModel = new AddressModel()
const Dialog = require('@/ui/dialog/dialog');

Page({
    data: {
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
    },
    async onShow() {
        this.initList()
    },
    initList() {
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
    async onChecked(e) {
        const result = await addressModel.setDefault({ id: e.currentTarget.dataset.id })
        if (result) {
            this.initList()
        } else {
            fa.toast.show({
                title: fa.code.parse(addressModel.getException().getCode())
            })
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
    onEdit(e) {
        wx.navigateTo({
            url: '/pages/user/address/edit/index?id=' + e.currentTarget.dataset.id
        })
    },
    async onDelete(e) {
        Dialog({
            message: '您确认删除吗？一旦删除不可恢复',
            selector: '#fa-dialog-confirm',
            buttons: [{
                text: '取消',
                type: 'cancel'
            }, {
                text: '确认',
                color: 'red',
                type: 'ok'
            }]
        }).then(async ({ type }) => {
            if (type === 'ok') {
                const result = await addressModel.del({ id: e.currentTarget.dataset.id })
                if (result) {
                    this.initList()
                } else {
                    fa.toast.show({
                        title: fa.code.parse(addressModel.getException().getCode())
                    })
                }
            }
        })

    },
    onAdd() {
        wx.navigateTo({
            url: '/pages/user/address/add/index'
        })
    }
})
