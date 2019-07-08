import "regenerator-runtime/runtime"
import { api, request } from '../api';
import Model from '../utils/model'
import { PaymentListInterface } from '../interface/payment'

export default class Payment extends Model {
    async list(params) {
        try {
            const { result } = await request(api.payment.list, { data: params })
            return new PaymentListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

}
