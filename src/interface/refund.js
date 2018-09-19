import Interface from "../utils/interface";
import Exception from "../utils/exception";

export class RefundListInterface extends Interface {

    total_number;
    list;

    constructor(param) {
        super()
        try {
            this.total_number = param.total_number
            this.list = param.list.map(function (item) {
                return new RefundListInfoInterface(item)
            })
        } catch (e) {
            throw new Exception(e, 'RefundListInterface interface attribute error')
        }
    }
}

export class RefundListInfoInterface extends Interface {
    id;
    order_id;
    order_sn;
    order_state;
    order_goods_id;
    refund_sn;
    user_id;
    user_name;
    goods_id;
    goods_sku_id;
    goods_title;
    goods_spec;
    goods_spec_string;
    goods_img;
    goods_pay_price;
    goods_num;
    goods_freight_fee;
    refund_type;
    refund_amount;
    order_amount;
    order_lock;
    create_time;
    user_reason;
    user_explain;
    tracking_no;
    tracking_phone;
    tracking_company;
    tracking_explain;
    tracking_images;
    tracking_time;
    receive;
    receive_time;
    receive_message;
    payment_code;
    trade_no;
    handle_state;
    handle_message;
    handle_time;
    user_receive;
    user_images;
    is_close;
    handle_expiry_time;
    handle_expiry_seconds = 0;
    send_expiry_time;
    send_expiry_seconds = 0;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.order_id = param.order_id
            this.order_sn = param.order_sn
            this.order_state = param.order_state
            this.order_goods_id = param.order_goods_id
            this.refund_sn = param.refund_sn
            this.user_id = param.user_id
            this.user_name = param.user_name
            this.goods_id = param.goods_id
            this.goods_sku_id = param.goods_sku_id
            this.goods_title = param.goods_title
            this.goods_spec = param.goods_spec
            this.goods_img = param.goods_img
            this.goods_pay_price = param.goods_pay_price
            this.goods_num = param.goods_num
            this.goods_freight_fee = param.goods_freight_fee
            this.refund_type = param.refund_type
            this.refund_amount = param.refund_amount
            this.order_amount = param.order_amount
            this.order_lock = param.order_lock
            this.create_time = param.create_time
            this.user_reason = param.user_reason
            this.user_explain = param.user_explain
            this.tracking_no = param.tracking_no
            this.tracking_phone = param.tracking_phone
            this.tracking_company = param.tracking_company
            this.tracking_explain = param.tracking_explain
            this.tracking_images = param.tracking_images
            this.tracking_time = param.tracking_time
            this.receive = param.receive
            this.receive_time = param.receive_time
            this.receive_message = param.receive_message
            this.payment_code = param.payment_code
            this.trade_no = param.trade_no
            this.handle_state = param.handle_state
            this.handle_message = param.handle_message
            this.handle_time = param.handle_time
            this.user_receive = param.user_receive
            this.user_images = param.user_images
            this.is_close = param.is_close
            this.handle_expiry_time = param.handle_expiry_time
            this.send_expiry_time = param.send_expiry_time

            this.goods_spec_string = param.goods_spec.map(function (item) {
                return item.value_id > 0 ? `${item.name}:${item.value_name}` : ''
            })

            if(param.handle_expiry_time){
                this.handle_expiry_seconds = parseInt(param.handle_expiry_time - Date.now() / 1000)
            }
            if(param.send_expiry_time){
                this.send_expiry_seconds = parseInt(param.send_expiry_time - Date.now() / 1000)
            }
        } catch (e) {
            throw new Exception(e, 'RefundListInfoInterface interface attribute error')
        }
    }
}

export class RefundInfoInterface extends Interface {
    id;
    order_id;
    order_sn;
    order_state;
    order_goods_id;
    refund_sn;
    user_id;
    user_name;
    goods_id;
    goods_sku_id;
    goods_title;
    goods_spec;
    goods_spec_string;
    goods_img;
    goods_pay_price;
    goods_num;
    goods_freight_fee;
    refund_type;
    refund_amount;
    order_amount;
    order_lock;
    create_time;
    user_reason;
    user_explain;
    tracking_no;
    tracking_phone;
    tracking_company;
    tracking_explain;
    tracking_images;
    tracking_time;
    receive;
    receive_time;
    receive_message;
    payment_code;
    trade_no;
    handle_state;
    handle_message;
    handle_time;
    user_receive;
    user_images;
    is_close;
    handle_expiry_time;
    send_expiry_time;

    handle_expiry_seconds = 0;
    send_expiry_seconds = 0;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.order_id = param.order_id
            this.order_sn = param.order_sn
            this.order_state = param.order_state
            this.order_goods_id = param.order_goods_id
            this.refund_sn = param.refund_sn
            this.user_id = param.user_id
            this.user_name = param.user_name
            this.goods_id = param.goods_id
            this.goods_sku_id = param.goods_sku_id
            this.goods_title = param.goods_title
            this.goods_spec = param.goods_spec
            this.goods_img = param.goods_img
            this.goods_pay_price = param.goods_pay_price
            this.goods_num = param.goods_num
            this.goods_freight_fee = param.goods_freight_fee
            this.refund_type = param.refund_type
            this.refund_amount = param.refund_amount
            this.order_amount = param.order_amount
            this.order_lock = param.order_lock
            this.create_time = param.create_time
            this.user_reason = param.user_reason
            this.user_explain = param.user_explain
            this.tracking_no = param.tracking_no
            this.tracking_phone = param.tracking_phone
            this.tracking_company = param.tracking_company
            this.tracking_explain = param.tracking_explain
            this.tracking_images = param.tracking_images
            this.tracking_time = param.tracking_time
            this.receive = param.receive
            this.receive_time = param.receive_time
            this.receive_message = param.receive_message
            this.payment_code = param.payment_code
            this.trade_no = param.trade_no
            this.handle_state = param.handle_state
            this.handle_message = param.handle_message
            this.handle_time = param.handle_time
            this.user_receive = param.user_receive
            this.user_images = param.user_images
            this.is_close = param.is_close
            this.handle_expiry_time = param.handle_expiry_time
            this.send_expiry_time = param.send_expiry_time
            this.goods_spec_string = param.goods_spec.map(function (item) {
                return item.value_id > 0 ? `${item.name}:${item.value_name}` : ''
            })
            if(param.handle_expiry_time){
                this.handle_expiry_seconds = parseInt(param.handle_expiry_time - Date.now() / 1000)
            }
            if(param.send_expiry_time){
                this.send_expiry_seconds = parseInt(param.send_expiry_time - Date.now() / 1000)
            }
        } catch (e) {
            throw new Exception(e, 'RefundInfoInterface interface attribute error')
        }
    }
}
