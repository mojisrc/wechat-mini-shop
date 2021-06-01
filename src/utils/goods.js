import Arr from "./array";

export const GOODS_TYPES = {
    ORDINARY: 0,
    GROUP: 1,
    SECKILL: 2,
    GIFT: 3,
    POINTS_EXCHANGE: 4
}
export default class Goods {

    /**
     *
     * @param {Array} goods_spec
     * @returns {string}
     */
    static getSkuSpecString({ pay_type, weight, spec }) {
        let string = pay_type === 2 ? (weight > 0 ? '重量:' + weight + 'kg' : '不计重量') : ''

        if (Array.isArray(spec) && spec.length > 0) {
            string += spec.map((specItem) => {
                return specItem.id > 0 ? `${specItem.name}:${specItem.value_name}` : ''
            }).join(',')
        }

        return string
    }

    /**
     *
     * @param {Array} goods_spec
     * @returns {string}
     */
    static getSkuSpecSimpleString({ spec }) {
        let string = ``
        if (Array.isArray(spec) && spec.length > 0) {
            string += spec.map((specItem) => {
                return specItem.id > 0 ? `${specItem.name}:${specItem.value_name}` : ''
            }).join(',')
        }
        return string
    }

    /**
     * 获得sku里默认的sku
     * 用于活动商品 从列表默认跳转到活动详情，并选中规格
     * @param {Array} skuList
     * @returns {item,index}
     * 返回的items为goods/skuList的数据结构
     */
    static getDefaultSku(skuList) {
        let item = skuList[0]
        for (let i = 0; i < skuList.length; i++) {
            let _item = skuList[i]
            if (_item.marketing_activity !== 0) {
                return { item: _item, index: i }
            }
        }
        return { item, index: 0 }
    }

    /**
     * 某条sku是否为营销活动
     * @param sku
     * @returns {boolean}
     */
    static isMarketingActivity(sku) {
        return sku.marketing_activity !== 0
    }

    /**
     * 规格列表选中状态拓展
     * @param selectedIds
     * @param specList
     * @returns {*}
     */
    static specListSelectedExtends(selectedIds, specList) {
        return specList.map((spec) => {
            // 是否存在选中的值
            let has = false
            // 某条spec值的集合
            let valueIds = []
            for (var i = 0; i < spec.value_list.length; i++) {
                valueIds.push(spec.value_list[i].id)
                if (!has && Arr.inArray(spec.value_list[i].id, selectedIds)) {
                    has = true
                }
            }
            return {
                ...spec,
                ...{ has, valueIds }
            }
        })
    }

    /**
     * 根据已选中的值切换spec的新的值
     * @param valueId
     * @param selectedValueIds
     * @param spec
     * @returns {[]}
     */
    static specToggleValueIds(valueId, selectedValueIds, spec) {
        let specValueIds = []
        for (var i = 0; i < spec.value_list.length; i++) {
            let id = spec.value_list[i].id
            // 删除spec siblings
            if (id !== valueId) {
                specValueIds = Arr.del(id, selectedValueIds)
            }
        }
        specValueIds = Arr.toggle(valueId, selectedValueIds)
        return specValueIds
    }

    /**
     * 规格值排序
     * @param specValueIds
     * @returns {string}
     */
    static sortSpecValueIdToString(specValueIds) {
        return JSON.stringify(specValueIds.sort((a, b) => {
            return a - b
        }))
    }

    /**
     * 格式化规格列表
     * 为了统一切换的时候价格和库存能使用同一字段
     * @param skuList
     * @param goodsInfo
     */
    static formatSkuList(skuList, goodsInfo = {}) {
        return skuList.map((sku) => {
            let format = {
                price: sku.price,
                stock: sku.stock,
                saleNum: sku.sale_num,
                // 可能某种场景不需要商品信息
                linePrice: typeof goodsInfo['line_price'] !== "undefined" ? goodsInfo['line_price'] : 0,
            }
            return {
                ...sku,
                ...{ format }
            }
        })
    }
}
