import CartModel from '@/models/cart'
import fa from '../utils/fa'
import "regenerator-runtime/runtime"

export default class Cart {
    cartModel = new CartModel()

    // 判断是否存在
    async exist(goods_sku_id) {
        return await this.cartModel.exist({
            goods_sku_id: goods_sku_id
        })
    }

    async save(goods_sku_id, quantity) {
        const exist = await this.exist(goods_sku_id)
        if (exist === true) {
            return await this.cartModel.edit({
                goods_sku_id: goods_sku_id,
                quantity: quantity,
            })
        } else {
            return await this.cartModel.add({
                goods_sku_id: goods_sku_id,
                quantity: quantity,
            })
        }
    }

    async delete(goods_sku_ids) {
        return await this.cartModel.del({
            goods_sku_ids: goods_sku_ids
        })
    }

    /**
     * 换规格
     * @param goods_sku_id
     * @param to_goods_sku_id
     * @param quantity
     * @returns {Promise<boolean>}
     */
    async change(goods_sku_id, to_goods_sku_id, quantity) {
        const save = await this.save(to_goods_sku_id, quantity)
        if (save) {
            if (goods_sku_id !== to_goods_sku_id) {
                return await this.cartModel.del({
                    goods_sku_ids: [goods_sku_id]
                })
            } else {
                return true
            }
        } else {
            return false
        }
    }
}
