import regeneratorRuntime from '../libs/regenerator-runtime/runtime-module'
import { api, request } from '../api';
import Model from '../utils/model'
import { OrderStateNumInterface, OrderListInterface ,OrderGoodsInfoInterface} from '../interface/order'
import { OrderInfoInterface } from '../interface/orderDetail'

export default class Order extends Model {
    async list(params) {
        try {
            const { result } = await request(api.order.list, { data: params })
            return new OrderListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async detail(params) {
        try {
            const { result } = await request(api.order.detail, { data: params })
            return new OrderInfoInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async stateNum() {
        try {
            const { result } = await request(api.order.stateNum)
            return new OrderStateNumInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async cancel(params) {
        try {
            await request(api.order.cancel, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }
    async confirmReceipt(params) {
        try {
            await request(api.order.confirmReceipt, { data: params })
            return true
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async deliverInfo(params) {
        try {
            const { result } = await request(api.order.deliverInfo, { data: params })
            return result
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async goodsList(params) {
        try {
            const { result } = await request(api.order.goodsList, { data: params })
            return new OrderGoodsListInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }

    async goodsInfo(params) {
        try {
            const { result } = await request(api.order.goodsInfo, { data: params })
            return new OrderGoodsInfoInterface(result)
        } catch (e) {
            this.setException(e)
            return false
        }
    }
}