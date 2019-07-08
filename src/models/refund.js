import "regenerator-runtime/runtime"
import { api, request } from '../api';
import Model from '../utils/model'
import { RefundListInterface,RefundInfoInterface } from '../interface/refund'
import { RefundResonListInterface } from '../interface/refundReson'

export default class Refund extends Model {
    async reasonList(params) {
        try {
            const { result } = await request(api.refund.reasonList, { data: params })
            return new RefundResonListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async list(params) {
        try {
            const { result } = await request(api.refund.list, { data: params })
            return new RefundListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async info(params) {
        try {
            const { result } = await request(api.refund.info, { data: params })
            return new RefundInfoInterface(result.info)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async apply(params) {
        try {
            await request(api.refund.apply, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async setTrackingNo(params) {
        try {
            await request(api.refund.setTrackingNo, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async revoke(params) {
        try {
            await request(api.refund.revoke, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

}
