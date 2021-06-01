import buy from "@/services/buy";

export default {
    namespace: "buy",
    state: {
        calculate: { result: null },
        info: { result: { info: {} } },
        create: {},
        pay: {}
    },

    effects: {
        * calculate({ payload, callback }, { call, put }) {
            const response = yield call(buy.calculate, payload);
            yield put({
                type: "_calculate",
                payload: response
            });
            if (callback) callback(response);
        },
        * create({ payload, callback }, { call, put }) {
            const response = yield call(buy.create, payload);
            yield put({
                type: "_create",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(buy.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * pay({ payload, callback }, { call, put }) {
            const response = yield call(buy.pay, payload);
            yield put({
                type: "_pay",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _calculate(state, action) {
            return {
                ...state,
                calculate: action.payload
            };
        },
        _create(state, action) {
            return {
                ...state,
                create: action.payload
            };
        },
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _pay(state, action) {
            return {
                ...state,
                pay: action.payload
            };
        },
    }
};
