// 用于计算商品的价格逻辑
export default class GoodsItemUtils {
    linePirce
    price
    extend
    goodsInfo

    constructor(goodsInfo) {
        const { line_price, price, extend } = goodsInfo || {}
        this.linePirce = line_price
        this.price = price
        this.extend = extend
        this.goodsInfo = goodsInfo
    }

    /**
     * 匹配并初始化价格和划线价
     */
    matchLowestPrice() {
        const { price, line_price } = this.goodsInfo || {}

        this.price = price
        this.linePirce = line_price
    }

    getPrice() {
        return this.price
    }

    getLinePrice() {
        return this.linePirce
    }
}
