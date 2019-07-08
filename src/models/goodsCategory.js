import "regenerator-runtime/runtime"
import { api, request } from '../api';
import Model from '../utils/model'
import { GoodsCategoryListInterface } from '../interface/goodsCategory'

export default class GoodsCategory extends Model {
    async list(params) {
        try {
            const { result } = await request(api.goodsCategory.list, { data: params })
            return new GoodsCategoryListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async info(params) {
        try {
            const { result } = await request(api.goodsCategory.info, { data: params })
            return result.info
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
