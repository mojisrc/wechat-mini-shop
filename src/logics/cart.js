import cartServices from '@/services/cart'

export default class Cart {
    // 判断是否存在
    async exist(goods_sku_id) {
        const e = await cartServices.exist({
            goods_sku_id: goods_sku_id
        })
        return e.result.state
    }

    async save(goods_sku_id, quantity) {
        const exist = await this.exist(goods_sku_id)
        if (exist) {
            return await cartServices.edit({
                goods_sku_id: goods_sku_id,
                quantity: quantity,
            })
        } else {
            return await cartServices.add({
                goods_sku_id: goods_sku_id,
                quantity: quantity,
            })
        }
    }

    async delete(goods_sku_ids) {
        return await cartServices.del({
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
                const e = await cartServices.del({
                    goods_sku_ids: [goods_sku_id]
                })
                return e.code === 0
            } else {
                return true
            }
        } else {
            return false
        }
    }
}
