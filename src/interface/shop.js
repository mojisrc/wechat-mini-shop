import Interface from "../utils/interface";
import Exception from "../utils/exception";

export class ShopInfoInterface extends Interface {
    info;

    constructor(param) {
        super()
        try {
            this.info = param.info

        } catch (e) {
            throw new Exception(e, 'ShopInfoInterface interface attribute error')
        }
    }
}

export class ShopInfoInfoInterface extends Interface {
    name;
    logo;
    contact_number;
    description;
    color_scheme;
    portal_template_id;
    wechat_platform_qr;
    goods_category_style;
    host;
    order_auto_close_expires;
    order_auto_confirm_expires;
    order_auto_close_refound_expires;


    constructor(param) {
        super()
        try {
            this.name = param.name
            this.logo = param.logo
            this.contact_number = param.contact_number
            this.description = param.description
            this.color_scheme = param.color_scheme
            this.portal_template_id = param.portal_template_id
            this.wechat_platform_qr = param.wechat_platform_qr
            this.goods_category_style = param.goods_category_style
            this.host = param.host
            this.order_auto_close_expires = param.order_auto_close_expires
            this.order_auto_confirm_expires = param.order_auto_confirm_expires
            this.order_auto_close_refound_expires = param.order_auto_close_refound_expires

        } catch (e) {
            throw new Exception(e, 'ShopInfoInfoInterface interface attribute error')
        }
    }
}
