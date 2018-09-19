import Interface from "../utils/interface";
import Exception from "../utils/exception";

export class GoodsEvaluateListInterface extends Interface {

    total_number;
    list;

    constructor(param) {
        super()
        try {
            this.total_number = param.total_number
            this.list = param.list.map(function (item) {
                return new GoodsEvaluateListInfoInterface(item)
            })
        } catch (e) {
            throw new Exception(e, 'GoodsEvaluateListInterface interface attribute error')
        }
    }
}

export class GoodsEvaluateListInfoInterface extends Interface {
    id;
    goods_id;
    order_id;
    goods_sku_id;
    goods_title;
    goods_price;
    goods_pay_price;
    goods_num;
    goods_img;
    goods_spec;
    goods_type;
    goods_freight_way;
    goods_freight_fee;
    evaluate_state;
    evaluate_time;
    lock_state;
    refund_handle_state;
    refund_id;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.goods_id = param.goods_id
            this.order_id = param.order_id
            this.goods_sku_id = param.goods_sku_id
            this.goods_title = param.goods_title
            this.goods_price = param.goods_price
            this.goods_pay_price = param.goods_pay_price
            this.goods_num = param.goods_num
            this.goods_img = param.goods_img
            this.goods_spec = param.goods_spec
            this.goods_type = param.goods_type
            this.goods_freight_way = param.goods_freight_way
            this.goods_freight_fee = param.goods_freight_fee
            this.evaluate_state = param.evaluate_state
            this.evaluate_time = param.evaluate_time
            this.lock_state = param.lock_state
            this.refund_handle_state = param.refund_handle_state
            this.refund_id = param.refund_id
        } catch (e) {
            throw new Exception(e, 'OrderListGoodsInterface interface attribute error')
        }
    }
}

export class GoodsEvaluateInfoInterface extends Interface {
    nickname;
    avatar;
    score;
    create_time;
    content;
    images;
    additional_content;
    additional_images;
    additional_time;
    additional_interval_day;
    reply_content;
    reply_time;
    reply_content2;
    reply_time2;

    constructor(param) {
        super()
        try {
            this.nickname = param.nickname
            this.avatar = param.avatar
            this.score = param.score
            this.create_time = param.create_time
            this.content = param.content
            this.images = param.images
            this.additional_content = param.additional_content
            this.additional_images = param.additional_images
            this.additional_time = param.additional_time
            this.additional_interval_day = param.additional_time ? parseInt((param.additional_time - param.create_time )/86400) : null
            this.reply_content = param.reply_content
            this.reply_time = param.reply_time
            this.reply_content2 = param.reply_content2
            this.reply_time2 = param.reply_time2
        } catch (e) {
            throw new Exception(e, 'GoodsEvaluateInfoInterface interface attribute error')
        }
    }
}
