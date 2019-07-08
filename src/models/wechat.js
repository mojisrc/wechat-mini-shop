import "regenerator-runtime/runtime"
import { api, request } from '../api';
import Model from '../utils/model'
import { AreaListInterface } from '../interface/area'

export default class Wechat extends Model {
    async buildConfig(params) {
        try {
            const { result } = await request(api.wechat.buildConfig, { data: params })
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async code(params) {
        try {
            const { result } = await request(api.wechat.code, { data: params })
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async userinfo(params) {
        try {
            const { result } = await request(api.wechat.userinfo, { data: params })
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
