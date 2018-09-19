import fa from '../../../utils/fa'
import AddressModel from '../../../models/address'
import AreaModel from '../../../models/area'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

const addressModel = new AddressModel()
const areaModel = new AreaModel()
const Dialog = require('../../../ui/dialog/dialog');

Page({
    data: {
        id: null,
        truename: '',
        mobile_phone: '',
        type: '个人',
        area_id: '',
        address: '',
        is_default: 1,
        combine_detail: null,

        onLoaded: false,
        checked: true,
        areaList: [],
    },
    async onLoad({ id }) {
        const areaCache = fa.cache.get('area_list_level2')
        const areaResult = areaCache ? areaCache : await areaModel.list({ level: 2 })
        const info = await addressModel.info({ id })
        this.setData({
            id,
            truename: info.truename,
            mobile_phone: info.phone,
            type: info.type,
            area_id: info.area_id,
            address: info.address,
            is_default: info.is_default,
            combine_detail: info.combine_detail,
            areaList: areaResult.list,
            onLoaded: true
        })
    },
    onAreaChange(e) {
        this.setData({
            area_id: e.detail.detail.ids[2]
        })
    },
    onTruenameChange(e) {
        this.setData({
            truename: e.detail.detail.value
        })
    },

    onMobilePhoneChange(e) {
        this.setData({
            mobile_phone: e.detail.detail.value
        })
    },

    onAddressChange(e) {
        this.setData({
            address: e.detail.detail.value
        })
    },
    onIsDefaultChange(e) {
        this.setData({
            is_default: e.detail.detail.checked ? 1 : 0
        })
    },
    async onWechatAddressChoose(){
        const self = this
        wx.chooseAddress({
            success: async function (res) {
                const result = await areaModel.info({
                    name:res.countyName
                })
                if(result !== false){
                    self.setData({
                        combine_detail:`${result.items[0].name} ${result.items[1].name} ${result.items[2].name}`,
                        area_id:result.items[2].id,
                        truename:res.userName,
                        mobile_phone:res.telNumber,
                        address:res.detailInfo,
                    })
                }else{
                    fa.toast.show({
                        title: "微信数据未能匹配成功，请使用其他方式"
                    })
                }
                self.setData({
                    truename:res.userName,
                    mobile_phone:res.telNumber,
                    address:res.detailInfo,
                })
            }
        })
    },
    async onDelete() {
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
                const result = await addressModel.del({
                    id: this.data.id
                })
                if (result === false) {
                    fa.toast.show({
                        title: fa.code.parse(addressModel.getException().getCode())
                    })
                } else {
                    wx.navigateBack({
                        delta: 1
                    })
                }
            }
        })
    },
    async onSubmit() {
        if (!this.data.truename) {
            return fa.toast.show({ title: '请输入姓名' })
        }
        if (!this.data.mobile_phone) {
            return fa.toast.show({ title: '请输入手机号' })
        }
        if (!this.data.area_id) {
            return fa.toast.show({ title: '请选择所在地区' })
        }
        if (!this.data.address) {
            return fa.toast.show({ title: '请填写楼栋楼层或房间号信息' })
        }
        let data = {
            id: this.data.id,
            truename: this.data.truename,
            mobile_phone: this.data.mobile_phone,
            address: this.data.address,
            is_default: this.data.is_default,
            type: this.data.type,
            area_id: this.data.area_id
        }

        const result = await addressModel.edit(data)
        if (result === false) {
            fa.toast.show({
                title: fa.code.parse(addressModel.getException().getCode())
            })
        } else {
            wx.navigateBack({
                delta: 1
            })
        }
    }
})
