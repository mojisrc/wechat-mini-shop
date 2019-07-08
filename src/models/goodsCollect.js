import "regenerator-runtime/runtime"
import { api, request } from '../api';
import Model from '../utils/model'
import {GoodsCollectListInterface } from '../interface/goodsCollect'

export default class GoodsCollect extends Model {
    async list(params) {
        try {
            const { result } = await request(api.goodsCollect.mine, { data: params })
            return new GoodsCollectListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async add(params) {
        try {
            await request(api.goodsCollect.add, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async del(params) {
        try {
            await request(api.goodsCollect.del, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
