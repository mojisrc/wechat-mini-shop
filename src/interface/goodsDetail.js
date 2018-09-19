import Interface from "../utils/interface";
import Exception from "../utils/exception";

export class GoodsInterface extends Interface {
    info;

    constructor(param) {
        super()
        try {
            this.info = new GoodsInfoInterface(param.info)
        } catch (e) {
            throw new Exception(e, 'GoodsInfoInterface interface attribute error')
        }
    }
}

export class GoodsInfoInterface extends Interface {
    id;
    title;
    images;
    category_ids;
    base_sale_num;
    freight_id;
    body;
    is_on_sale;
    image_spec_id;
    image_spec_images;
    sku_list;
    create_time;
    price;
    update_time;
    evaluate_good_star;
    evaluate_count;
    sale_num;
    sale_time;
    delete_time;
    spec_list;
    img;
    pay_type;
    freight_fee;
    goods_sku_id;
    current_sku;
    stock;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.title = param.title
            this.images = param.images
            this.category_ids = param.category_ids
            this.base_sale_num = param.base_sale_num
            this.freight_id = param.freight_id
            // todo body
            this.body = param.body
            this.is_on_sale = param.is_on_sale
            this.stock = param.stock
            this.image_spec_id = param.image_spec_id
            this.image_spec_images = param.image_spec_images
            this.sku_list = param.skus.map(function (item) {
                return new GoodsInfoSkuListInfoInterface(item)
            })
            this.create_time = param.create_time
            this.price = param.price
            this.update_time = param.update_time
            this.evaluate_good_star = param.evaluate_good_star
            this.evaluate_count = param.evaluate_count
            this.sale_num = param.sale_num
            this.sale_time = param.sale_time
            this.delete_time = param.delete_time
            this.spec_list = param.spec_list
            this.img = param.img
            this.pay_type = param.pay_type
            this.freight_fee = param.freight_fee
            this.goods_sku_id = param.goods_sku_id

            // for (let i = 0; i < param.sku_list.length; i++) {
            //     if (param.skus[i].id === param.goods_sku_id) {
            //         const specs = param.skus[i]['spec'].map(function (item) {
            //             return item.value_name
            //         })
            //         param.skus[i]['spec_string'] = specs.join(' ')
            //         param.skus[i]['title'] = param.title + ' ' + specs.join(' ')
            //         this.current_sku = param.skus[i]
            //         break;
            //     }
            // }
        } catch (e) {
            throw new Exception(e, 'GoodsInfoInterface interface attribute error')
        }
    }
}

export class GoodsInfoSkuListInfoInterface extends Interface {
    id;
    title;
    price;
    stock;
    code;
    img;
    weight;
    spec_list;
    spec_sign;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.title = param.title
            this.price = param.price
            this.stock = param.stock
            this.spec_sign = param.spec_sign
            this.spec_value_sign = param.spec_value_sign
            this.code = param.code
            this.img = param.img
            this.weight = param.weight
            this.spec_list = param.spec.map(function (item) {
                return new GoodsInfoSkuListInfoSpecInfoInterface(item)
            })
        } catch (e) {
            throw new Exception(e, 'GoodsInfoSkuListInfoInterface interface attribute error')
        }
    }
}

export class GoodsInfoImagesInterface extends Interface {
    id;
    url;
    is_default;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.url = param.url
            this.is_default = param.is_default
        } catch (e) {
            throw new Exception(e, 'GoodsInfoImagesInterface interface attribute error')
        }
    }
}

export class GoodsInfoSkuListInfoSpecInfoInterface extends Interface {
    spec_id;
    spec_name;
    spec_value_id;
    spec_value_name;

    constructor(param) {
        super()
        try {
            this.spec_id = param.spec_id
            this.spec_name = param.spec_name
            this.spec_value_id = param.spec_value_id
            this.spec_value_name = param.spec_value_name
        } catch (e) {
            throw new Exception(e, 'GoodsInfoSkuListInfoSpecListInfoInterface interface attribute error')
        }
    }
}
