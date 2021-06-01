import fa from '@/utils/fa'
import addressServices from '@/services/address'
import areaServices from '@/services/area'
import connect from "@/utils/connect";
import Dialog from '@vant/weapp/dialog/dialog';
import Toast from "@/utils/toast";


Page(connect(({ user }) => ({
    login: user.login,
}))({
    data: {
        id: null,
        truename: '',
        mobile_phone: '',
        type: '个人',
        area_id: '',
        address: '',
        is_default: 1,
        combine_detail: null,
        idcard: '',
        area: [0, 0, 0],

        onLoaded: false,
        checked: true,
        areaList: [],
    },
    async onLoad(options) {
        const { id } = options
        const areaList = await areaServices.tree()
        const { result: { info } } = await addressServices.info({ id })
        this.setData({
            id,
            truename: info.truename,
            mobile_phone: info.mobile_phone,
            type: info.type,
            area: [info.province_id, info.city_id, info.area_id],
            area_id: info.area_id,
            address: info.address,
            is_default: info.is_default,
            combine_detail: info.combine_detail,
            idcard: info.idcard,
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
    async onDelete() {
        Dialog.confirm({
            title: '提示',
            message: '您确认删除吗？一旦删除不可恢复',
        })
            .then(async () => {
                const res = await addressServices.del({
                    id: this.data.id
                })
                if (res.code !== 0) {
                    Toast.info(res.msg)
                } else {
                    wx.navigateBack({
                        delta: 1
                    })
                }
            })
            .catch(() => {
                // on cancel
            });
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
            id: this.data.id,
            truename: values.truename,
            mobile_phone: values.mobile_phone,
            address: values.address,
            is_default: values.is_default ? 1 : 0,
            type: this.data.type,
            area_id: values.area[2],
            idcard: values.idcard
        }

        const res = await addressServices.edit(data)
        if (res.code !== 0) {
            Toast.info(res.msg)
        } else {
            wx.navigateBack({
                delta: 1
            })
        }
    }
}))
