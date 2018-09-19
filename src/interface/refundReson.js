import Interface from "../utils/interface";
import Exception from "../utils/exception";

export class RefundResonListInterface extends Interface {
    list;

    constructor(param) {
        super()
        try {
            this.list = param.list.map(function(item){
                return new RefundResonInfoInterface(item)
            })
        } catch (e) {
            throw new Exception(e, 'RefundResonListInterface interface attribute error')
        }
    }
}

export class RefundResonInfoInterface extends Interface {
    id;
    title;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.title = param.title
        } catch (e) {
            throw new Exception(e, 'RefundResonInfoInterface interface attribute error')
        }
    }
}
