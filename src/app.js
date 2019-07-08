import "regenerator-runtime/runtime"
import ShopModel from '@/models/shop'
import AreaModel from '@/models/area'
import fa from "@/utils/fa"
import LoginLogic from '@/logics/login'

const shopModel = new ShopModel()
const areaModel = new AreaModel()
const loginLogic = new LoginLogic()

App({
    async onLaunch() {
        // 防止token过期
        const existUserInfo = fa.cache.get('user_info')
        if (typeof existUserInfo['id'] !== 'undefined') {
            await loginLogic.wechatLogin(false)
        }
        // 店铺配置信息
        const result = await shopModel.info()
        if (result) {
            fa.cache.set('shop_info', result)
        }
        // 地址预加载
        areaModel.list({ level: 2 }).then(function (data) {
            fa.cache.set('area_list_level2', data)
        })
    }
})
