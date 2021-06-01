import addressServices from '@/services/address'
import areaServices from '@/services/area'
import connect from "@/utils/connect";
import Toast from "@/utils/toast"

Page(connect(({ user }) => ({
    login: user.login,
}))({
    data: {
        truename: '',
        mobile_phone: '',
        type: '个人',
        area_id: '',
        address: '',
        is_default: 1,
        idcard: '',
        area: [0, 0, 0],

        onLoaded: false,
        checked: true,
        combine_detail: null,
        areaList: [],
    },
    async onLoad(options) {
        const areaList = await areaServices.tree()
        this.setData({
            areaList,
            onLoaded: true,
        })
    },
    async onWechatAddressChoose() {
        wx.chooseAddress({
            success: async (res) => {
                const e = await areaServices.info({
                    name: res.countyName
                })
                if (e.code === 0) {
                    const { result: { info } } = e
                    this.setData({
                        area: [info[0].id, info[1].id, info[2].id],
                        combine_detail: `${info[0].name} ${info[1].name} ${info[2].name}`,
                        area_id: info[2].id,
                        truename: res.userName,
                        mobile_phone: res.telNumber,
                        address: res.detailInfo,
                    })
                } else {
                    this.setData({
                        truename: res.userName,
                        mobile_phone: res.telNumber,
                        address: res.detailInfo,
                    })
                    Toast.info('微信数据未能匹配成功，请使用其他方式')
                }
            }
        })
    },
    async onSubmit(e) {
        let values = e.detail.value
        if (!values.truename) {
            return Toast.info('请输入姓名')
        }
        if (!values.mobile_phone) {
            return Toast.info('请输入手机号')
        }
        if (!Array.isArray(values.area) || values.area.length !== 3) {
            return Toast.info('请选择所在地区')
        }
        if (!values.address) {
            return Toast.info('请填写小区楼栋层或房间号信息')
        }
        let data = {
            truename: values.truename,
            mobile_phone: values.mobile_phone,
            address: values.address,
            is_default: values.is_default ? 1 : 0,
            type: this.data.type,
            area_id: values.area[2],
            idcard: values.idcard
        }

        const res = await addressServices.add(data)
        if (res.code !== 0) {
            Toast.info(res.msg)
        } else {
            wx.navigateBack({
                delta: 1
            })
        }
    }
}))
