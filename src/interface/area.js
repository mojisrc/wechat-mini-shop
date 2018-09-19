import Exception from "../utils/exception";
import Interface from "../utils/interface";

export class AreaListInterface extends Interface {
    list;

    constructor(params) {
        super()
        try {
            if (params.list.length > 0) {
                this.list = params.list.map(function (item) {
                    return new AreaListChildInterface(item)
                });
            } else {
                this.list = []
            }
        } catch (e) {
            throw new Exception(e, 'AreaListInterface interface attribute error')
        }
    }
}

export class AreaListChildInterface extends Interface {
    id;
    name;
    pid;
    childs;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.name = param.name
            this.pid = param.pid
            if (typeof param._child !== 'undefined' && param._child.length > 0) {
                this.childs = param._child.map(function (item) {
                    return new AreaListChildInterface(item)
                });
            } else {
                this.childs = []
            }
        } catch (e) {
            throw new Exception(e, 'AreaListChildInterface interface attribute error')
        }
    }
}

export class AreaInfoInterface extends Interface {
    items;
    constructor(param) {
        super()
        try {
            this.items = param.map(function (item) {
                return new AreaInfoItemInterface(item)
            });
        } catch (e) {
            throw new Exception(e, 'AreaInfoInterface interface attribute error')
        }
    }
}

export class AreaInfoItemInterface extends Interface {
    id;
    name;
    pid;

    constructor(param) {
        super()
        try {
            this.id = param.id
            this.name = param.name
            this.pid = param.pid
        } catch (e) {
            throw new Exception(e, 'AreaInfoItemInterface interface attribute error')
        }
    }
}
