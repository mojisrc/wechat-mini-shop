import "regenerator-runtime/runtime"
import { api, request } from '../api';
import Model from '../utils/model'
import { AddressListInterface,AddressInfoInterface } from '../interface/address'

export default class Address extends Model {
    async list(params) {
        try {
            const { result } = await request(api.address.list, { data: params })
            return new AddressListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async info(params) {
        try {
            const { result } = await request(api.address.info, { data: params })
            return new AddressInfoInterface(result.info)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async add(params) {
        try {
            await request(api.address.add, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async edit(params) {
        try {
            await request(api.address.edit, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async del(params) {
        try {
            await request(api.address.del, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async types(params) {
        try {
            const {result} = await request(api.address.types, { data: params })
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async getDefault() {
        try {
            const {result} = await request(api.address.getDefault)
            return new AddressInfoInterface(result.info)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async setDefault(params) {
        try {
            const {result} = await request(api.address.setDefault, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}
