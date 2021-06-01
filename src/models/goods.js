import goods from "@/services/goods";
import Arr from "@/utils/array"

export default {
    namespace: "goods",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        info: { result: { info: {} } },
        brandList: {
            result: { list: [], total_number: 0 }
        },
        evaluateList: {
            result: { list: [], total_number: 0 }
        },
        similarGoods: {
            result: { list: [], total_number: 0 }
        },
        brandInfo: { result: { info: {} } },
        skuList: { result: { sku: [] } },
        infoBiz: {}
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(goods.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(goods.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * brandList({ payload, callback }, { call, put }) {
            const response = yield call(goods.brandList, payload);
            yield put({
                type: "_brandList",
                payload: response
            });
            if (callback) callback(response);
        },
        * evaluateList({ payload, callback }, { call, put }) {
            const response = yield call(goods.evaluateList, payload);
            yield put({
                type: "_evaluateList",
                payload: response
            });
            if (callback) callback(response);
        },
        * similarGoods({ payload, callback }, { call, put }) {
            const response = yield call(goods.similarGoods, payload);
            yield put({
                type: "_similarGoods",
                payload: response
            });
            if (callback) callback(response);
        },
        * brandInfo({ payload, callback }, { call, put }) {
            const response = yield call(goods.brandInfo, payload);
            yield put({
                type: "_brandInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * skuList({ payload, callback }, { call, put }) {
            const response = yield call(goods.skuList, payload);
            yield put({
                type: "_skuList",
                payload: response
            });
            if (callback) callback(response);
        },
        // 专为商品详情服务
        * infoBiz({ payload, callback }, { call }) {
            let result = {
                goodsBody: [],
                skuListReponse: { code: null },
                goodsReponse: { code: null },
                evaluateListResponse: { code: null },
                brandListResponse: { code: null },
            }

            // 商品sku集合
            const skuListReponse = yield call(goods.skuList, payload);

            if (skuListReponse.code === 0) {
                // 普通商品详情
                result.goodsReponse = yield call(goods.info, {
                    id: payload.id,
                });
                result.skuListReponse = skuListReponse
            }

            if (result.goodsReponse.code === 0) {
                let goodsInfo = result.goodsReponse.result.info
                // 品牌详情
                if (typeof goodsInfo['brand'] !== "undefined" && typeof goodsInfo['brand']["id"] !== "undefined") {
                    result.brandListResponse = yield call(goods.list, {
                        brand_ids: [goodsInfo.brand.id],
                        rows: 6
                    });
                }
                // 评价列表
                result.evaluateListResponse = yield call(goods.evaluateList, {
                    goods_id: goodsInfo.id,
                    rows: 3
                });
                // TODO 临时写法 应该是加入缓存  过期时间
                const goodsBodyReponse = yield call(goods.bodyInfo, payload);
                result.goodsBody = Arr.mergeAll([
                    goodsBodyReponse.result.info.header,
                    result.goodsReponse.result.info.body,
                    goodsBodyReponse.result.info.footer,
                ])
            }
            callback(result);
        },
    },
    reducers: {
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _brandList(state, action) {
            return {
                ...state,
                brandList: action.payload
            };
        },
        _evaluateList(state, action) {
            return {
                ...state,
                evaluateList: action.payload
            };
        },
        _similarGoods(state, action) {
            return {
                ...state,
                similarGoods: action.payload
            };
        },
        _brandInfo(state, action) {
            return {
                ...state,
                brandInfo: action.payload
            };
        },
        _skuList(state, action) {
            return {
                ...state,
                skuList: action.payload
            };
        },
    }
};
