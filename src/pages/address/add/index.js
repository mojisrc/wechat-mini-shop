import fa from '../../../utils/fa'
import AddressModel from '../../../models/address'
import AreaModel from '../../../models/area'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'

const addressModel = new AddressModel()
const areaModel = new AreaModel()

Page({
    data: {
        truename: '',
        mobile_phone: '',
        type: '个人',
        area_id: '',
        address: '',
        is_default: 1,

        onLoaded: false,
        checked: true,
        combine_detail:null,
        areaList: [],
    },
    async onLoad() {
        const areaCache =  fa.cache.get('area_list_level2')
        const result = areaCache ? areaCache : await areaModel.list({ level: 2 })
        this.setData({
            areaList: result.list,
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
            truename: this.data.truename,
            mobile_phone: this.data.mobile_phone,
            address: this.data.address,
            is_default: this.data.is_default,
            type: this.data.type,
            area_id:this.data.area_id
        }

        const result = await addressModel.add(data)
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
