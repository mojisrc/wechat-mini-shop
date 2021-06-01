import goodsEvaluate from "@/services/goodsEvaluate";

export default {
    namespace: "goodsEvaluate",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        mine: {},
        add: {},
        append: {},
        info: {
            result: { info: {} }
        },
        isEvaluated: {},
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(goodsEvaluate.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * mine({ payload, callback }, { call, put }) {
            const response = yield call(goodsEvaluate.mine, payload);
            yield put({
                type: "_mine",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(goodsEvaluate.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * append({ payload, callback }, { call, put }) {
            const response = yield call(goodsEvaluate.append, payload);
            yield put({
                type: "_append",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(goodsEvaluate.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * isEvaluated({ payload, callback }, { call, put }) {
            const response = yield call(goodsEvaluate.isEvaluated, payload);
            yield put({
                type: "_isEvaluated",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        _mine(state, action) {
            return {
                ...state,
                mine: action.payload
            };
        },
        _add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        },
        _append(state, action) {
            return {
                ...state,
                append: action.payload
            };
        },
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _isEvaluated(state, action) {
            return {
                ...state,
                isEvaluated: action.payload
            };
        },
    }
};
