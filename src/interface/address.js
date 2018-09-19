import Exception from "../utils/exception";
import Interface from "../utils/interface";

export class AddressListInterface extends Interface {
    total_number;
    list;

    constructor(param) {
        super()
        try {
            this.total_number = param.total_number
            this.list = param.list.map(function (item) {
                return new AddressListInfoInterface(item)
            })
        } catch (e) {
            throw new Exception(e, 'AddressListInterface interface attribute error')
        }
    }
}

export class AddressListInfoInterface extends Interface {
    id;
    truename;
    province_id;
    city_id;
    area_id;
    combine_detail;
    is_default;
    phone;
    address;
    type;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.truename = param.truename
            this.province_id = param.province_id
            this.city_id = param.city_id
            this.area_id = param.area_id
            this.is_default = param.is_default
            this.combine_detail = param.combine_detail
            this.phone = param.mobile_phone
            this.type = param.type
            this.address = param.address
        } catch (e) {
            throw new Exception(e, 'AddressListInfoInterface interface attribute error')
        }
    }
}


export class AddressInfoInterface extends Interface {
    id;
    truename;
    province_id;
    city_id;
    area_id;
    combine_detail;
    is_default;
    phone;
    address;
    type;
    constructor(param) {
        super()
        try {
            this.id = param.id
            this.truename = param.truename
            this.province_id = param.province_id
            this.city_id = param.city_id
            this.area_id = param.area_id
            this.is_default = param.is_default
            this.combine_detail = param.combine_detail
            this.phone = param.mobile_phone
            this.type = param.type
            this.address = param.address
        } catch (e) {
            throw new Exception(e, 'AddressInfoInterface interface attribute error')
        }
    }
}
