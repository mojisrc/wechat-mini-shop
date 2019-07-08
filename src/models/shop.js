import "regenerator-runtime/runtime"
import { api, request } from '../api';
import Model from '../utils/model'
import { ShopInfoInterface } from '../interface/shop'

export default class Shop extends Model {
    async info(params) {
        try {
            const { result } = await request(api.shop.info, { data: params })
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
