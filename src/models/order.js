import order from "@/services/order";

export default {
    namespace: "order",
    state: {
        stateNum: {
            result: {
                state_new: 0,
                state_send: 0,
                state_pay: 0,
                state_success: 0,
                state_close: 0,
                state_unevaluate: 0,
                state_refund: 0,
            }
        },
        list: { result: { info: {} } },
        info: {
            result: {
                info: null,
                order_log: null
            }
        },
        cancel: {},
        confirmReceipt: {},
        deliverInfo: {
            result: { list: [], total_number: 0 }
        },
        logistics: { result: { info: {} } },
        goodsList: {},
        goodsInfo: { result: { info: {} } },
    },

    effects: {
        * stateNum({ payload, callback }, { call, put }) {
            const response = yield call(order.stateNum, payload);
            yield put({
                type: "_stateNum",
                payload: response
            });
            if (callback) callback(response);
        },
        * list({ payload, callback }, { call, put }) {
            const response = yield call(order.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(order.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * cancel({ payload, callback }, { call, put }) {
            const response = yield call(order.cancel, payload);
            yield put({
                type: "_cancel",
                payload: response
            });
            if (callback) callback(response);
        },
        * confirmReceipt({ payload, callback }, { call, put }) {
            const response = yield call(order.confirmReceipt, payload);
            yield put({
                type: "_confirmReceipt",
                payload: response
            });
            if (callback) callback(response);
        },
        * deliverInfo({ payload, callback }, { call, put }) {
            const response = yield call(order.deliverInfo, payload);
            yield put({
                type: "_deliverInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * logistics({ payload, callback }, { call, put }) {
            const response = yield call(order.logistics, payload);
            yield put({
                type: "_logistics",
                payload: response
            });
            if (callback) callback(response);
        },
        * goodsList({ payload, callback }, { call, put }) {
            const response = yield call(order.goodsList, payload);
            yield put({
                type: "_goodsList",
                payload: response
            });
            if (callback) callback(response);
        },
        * goodsInfo({ payload, callback }, { call, put }) {
            const response = yield call(order.goodsInfo, payload);
            yield put({
                type: "_goodsInfo",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _stateNum(state, action) {
            return {
                ...state,
                stateNum: action.payload
            };
        },
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
        _cancel(state, action) {
            return {
                ...state,
                cancel: action.payload
            };
        },
        _confirmReceipt(state, action) {
            return {
                ...state,
                confirmReceipt: action.payload
            };
        },
        _deliverInfo(state, action) {
            return {
                ...state,
                deliverInfo: action.payload
            };
        },
        _logistics(state, action) {
            return {
                ...state,
                logistics: action.payload
            };
        },
        _goodsList(state, action) {
            return {
                ...state,
                goodsList: action.payload
            };
        },
        _goodsInfo(state, action) {
            return {
                ...state,
                goodsInfo: action.payload
            };
        },
    }
};
