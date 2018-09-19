import Interface from "../utils/interface";
import Exception from "../utils/exception";
import Time from '../utils/time';

export class OrderInfoInterface extends Interface {
    info;
    order_log;

    constructor(param) {
        super()
        try {
            this.info = new OrderInfoInfoInterface(param.info)
            this.order_log = param.order_log.map(function (item) {
                return new OrderInfoLogInterface(item)
            })
        } catch (e) {
            throw new Exception(e, 'OrderInfoInterface interface attribute error')
        }
    }
}

export class OrderInfoInfoInterface extends Interface {
    id;
    sn;
    pay_sn;
    create_time;
    payment_code;
    pay_name;
    payment_time;
    finnshed_time;
    goods_amount;
    goods_num;
    amount;
    pd_amount;
    freight_fee;
    freight_unified_fee;
    freight_template_fee;
    state;
    refund_amount;
    refund_state;
    lock_state;
    delay_time;
    tracking_no;
    evaluate_state;
    trade_no;
    state_desc;
    payment_name;
    extend_order_extend;
    extend_order_goods;

    if_pay;
    if_cancel;
    if_complain;
    if_receive;
    if_lock;
    if_deliver;
    if_evaluate;

    showLogisticsBtn;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.sn = param.sn
            this.pay_sn = param.pay_sn
            this.create_time = param.create_time
            this.payment_code = param.payment_code
            this.pay_name = param.pay_name
            this.payment_time = param.payment_time
            this.finnshed_time = param.finnshed_time
            this.goods_amount = param.goods_amount
            this.goods_num = param.goods_num
            this.amount = param.amount
            this.pd_amount = param.pd_amount
            this.freight_fee = param.freight_fee
            this.freight_unified_fee = param.freight_unified_fee
            this.freight_template_fee = param.freight_template_fee
            this.state = param.state
            this.refund_amount = param.refund_amount
            this.refund_state = param.refund_state
            this.lock_state = param.lock_state
            this.delay_time = param.delay_time
            this.tracking_no = param.tracking_no
            this.evaluate_state = param.evaluate_state
            this.trade_no = param.trade_no
            this.evaluate_state = param.evaluate_state
            this.state_desc = param.state_desc
            this.payment_name = param.payment_name
            this.extend_order_extend = param.extend_order_extend
            this.extend_order_goods = param.extend_order_goods.map(function (goods) {
                return new OrderGoodsInterface(goods)
            })
            this.if_pay = param.if_pay
            this.if_cancel = param.if_cancel
            this.if_complain = param.if_complain
            this.if_receive = param.if_receive
            this.if_lock = param.if_lock
            this.if_deliver = param.if_deliver
            this.if_evaluate = param.if_evaluate
            this.showLogisticsBtn = (param.state === 30 || param.state === 40)
        } catch (e) {
            throw new Exception(e, 'OrderGoodsInterface interface attribute error')
        }
    }
}

export class OrderInfoLogInterface extends Interface {
    id;
    order_id;
    msg;
    create_time;
    role;
    order_state;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.order_id = param.order_id
            this.msg = param.msg
            this.create_time = param.create_time
            this.role = param.role
            this.order_state = param.order_state
        } catch (e) {
            throw new Exception(e, 'OrderInfoLogInterface interface attribute error')
        }
    }
}

export class OrderGoodsInterface extends Interface {
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
    refund_state;
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
            this.refund_state = param.refund_state
        } catch (e) {
            throw new Exception(e, 'OrderGoodsInterface interface attribute error')
        }
    }
}