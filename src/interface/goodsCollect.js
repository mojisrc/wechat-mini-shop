import Interface from "../utils/interface";
import Exception from "../utils/exception";

export class GoodsCollectListInterface extends Interface {
    list;
    total_number;

    constructor(param) {
        super()
        try {
            this.total_number = param.total_number
            this.list = param.list.map(function (item) {
                return new GoodsCollectListInfoInterface(item)
            })
        } catch (e) {
            throw new Exception(e, 'GoodsCollectListInterface interface attribute error')
        }
    }
}

export class GoodsCollectListInfoInterface extends Interface {
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

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.title = param.title
            this.images = param.images.map(function (item) {
                return new GoodsCollectListInfoImagesInterface(item)
            })
            this.category_ids = param.category_ids
            this.base_sale_num = param.base_sale_num
            this.freight_id = param.freight_id
            // todo body
            this.body = param.body
            this.is_on_sale = param.is_on_sale
            this.image_spec_id = param.image_spec_id
            this.image_spec_images = param.image_spec_images
            this.sku_list = param.sku_list.map(function (item) {
                return new GoodsCollectListInfoSkuListInfoInterface(item)
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
        } catch (e) {
            throw new Exception(e, 'GoodsCollectListInfoInterface interface attribute error')
        }
    }
}

export class GoodsCollectListInfoSkuListInfoInterface extends Interface {
    price;
    stock;
    code;
    img;
    weight;
    spec_list;

    constructor(param) {
        super()
        try {
            this.price = param.price
            this.stock = param.stock
            this.code = param.code
            this.img = param.img
            this.weight = param.weight
            this.spec_list = param.spec.map(function (item) {
                return new GoodsCollectListInfoSkuListInfoSpecListInfoInterface(item)
            })
        } catch (e) {
            throw new Exception(e, 'GoodsCollectListInfoSkuListInfoInterface interface attribute error')
        }
    }
}

export class GoodsCollectListInfoImagesInterface extends Interface {
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
            throw new Exception(e, 'GoodsCollectListInfoImagesInterface interface attribute error')
        }
    }
}

export class GoodsCollectListInfoSkuListInfoSpecListInfoInterface extends Interface {
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
            throw new Exception(e, 'GoodsCollectListInfoSkuListInfoSpecListInfoInterface interface attribute error')
        }
    }
}

export class GoodsCollectEvaluateListInterface extends Interface {
    total_number;
    list;

    constructor(param) {
        super()
        try {
            this.total_number = param.total_number
            this.list = param.list.map(function (item) {
                return new GoodsCollectEvaluateListInfoInterface(item)
            })
        } catch (e) {
            throw new Exception(e, 'GoodsCollectEvaluateListInterface interface attribute error')
        }
    }
}