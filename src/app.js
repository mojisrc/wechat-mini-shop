import shopServices from '@/services/shop'
import areaServices from '@/services/area'
import Inviter from "@/utils/inviter"
import * as core from 'dva-core';
import createLoading from 'dva-loading';
import models from '@/_temp/dvaModel';
import cache from "@/utils/cache";

const dvapp = core.create({
    initialReducer: {}
});

dvapp.use(createLoading({ effects: true }));

let registered

if (!registered) models.forEach(model => dvapp.model(model));

registered = true;

dvapp.start();

App({
    ...dvapp,
    async onLaunch() {
        const dispatch = dvapp._store.dispatch

        dispatch({ type: 'user/initUserinfo' });
        // 为了计算价格
        dispatch({
            type: "card/list",
            payload: {
                rows: 20
            }
        })
        // 店铺配置信息
        const result = await shopServices.info()
        if (result.code === 0) {
            cache.set('shop_info', result)
        }
        // 地址预缓存
        areaServices.cache(true)

    },
    async onShow(options) {
        Inviter.bind();
    },
})
