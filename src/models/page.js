import "regenerator-runtime/runtime"
import { api, request } from '../api';
import Model from '../utils/model'

export default class Order extends Model {

    async info(params) {
        try {
            const { result } = await request(api.page.info, { data: params })
            return result.info
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async portal(params) {
        try {
            const { result } = await request(api.page.portal, { data: params })
            return result.info
        } catch (e) {
            this.setException(e)
            return false
        }
    }

}
