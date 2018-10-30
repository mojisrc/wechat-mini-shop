import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module'
import { api, request } from '../api';
import Model from '../utils/model'
import { CartListInfoInterface, CartListInterface } from '../interface/cart'

export default class Cart extends Model {
    async list(params = {}) {
        try {
            const { result } = await request(api.cart.list, { data: params })
            return new CartListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async totalNum() {
        try {
            const { result } = await request(api.cart.totalNum)
            return result.total_num
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async add(params) {
        try {
            await request(api.cart.add, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async edit(params) {
        try {
            await request(api.cart.edit, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async exist(params) {
        try {
            const { result } = await request(api.cart.exist, { data: params })
            return result.state
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async check(params) {
        try {
            const { result } = await request(api.cart.check, { data: params })
            return result.state
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async info(params) {
        try {
            const { result } = await request(api.cart.info, { data: params })
            return new CartListInfoInterface(result.info)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async del(params) {
        try {
            await request(api.cart.del, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async destroy() {
        try {
            await request(api.cart.destroy)
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
