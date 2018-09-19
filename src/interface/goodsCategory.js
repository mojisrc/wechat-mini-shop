import Exception from "../utils/exception";
import Interface from "../utils/interface";

export class GoodsCategoryListInterface extends Interface {
    list;

    constructor(params) {
        super()
        try {
            if (params.list.length > 0) {
                this.list = params.list.map(function (item) {
                    return new GoodsCategoryListChildInterface(item)
                });
            } else {
                this.list = []
            }
        } catch (e) {
            throw new Exception(e, 'GoodsCategoryListInterface interface attribute error')
        }
    }
}

export class GoodsCategoryListChildInterface extends Interface {
    id;
    name;
    pid;
    childs;
    icon;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.name = param.name
            this.pid = param.pid
            this.icon = param.icon
            if (typeof param._child !== 'undefined' && param._child.length > 0) {
                this.childs = param._child.map(function (item) {
                    return new GoodsCategoryListChildInterface(item)
                });
            } else {
                this.childs = []
            }
        } catch (e) {
            throw new Exception(e, 'GoodsCategoryListChildInterface interface attribute error')
        }
    }
}
