import Interface from "../utils/interface";
import Exception from "../utils/exception";

export class BuyCreateOrderInterface extends Interface {
    order_id;
    pay_sn;

    constructor(param) {
        super()
        try {
            this.order_id = param.order_id
            this.pay_sn = param.pay_sn
        } catch (e) {
            throw new Exception("BuyCreateOrderInterface", 'interface attribute error')
        }
    }
}
