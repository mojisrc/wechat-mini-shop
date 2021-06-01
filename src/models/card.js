import card from "@/services/card";

export default {
    namespace: "card",
    state: {
        myCard: {
            result: { list: [], total_number: 0 }
        },
        myCardInfo: {
            result: { info: {} }
        },
        list: {
            result: { list: [], total_number: 0 }
        },
        info: {
            result: { info: {} }
        },
        default: {
            id: 0
        },
        create: {
            result: {}
        },
        orderInfo: {
            result: { info: {} }
        },
        highest: {
            result: { info: {} }
        },
    },

    effects: {
        * myCardInfo({ payload, callback }, { call, put }) {
            const response = yield call(card.myCardInfo, payload);
            yield put({
                type: "_myCardInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * list({ payload, callback }, { call, put }) {
            const response = yield call(card.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (response.code === 0 && response.result.list.length > 0) {
                yield put({
                    type: "_default",
                    payload: response.result.list[0]
                });
            }
            if (callback) callback(response);
        },
        * myCard({ payload, callback }, { call, put }) {
            const response = yield call(card.myCard, payload);
            yield put({
                type: "_myCard",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(card.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * create({ payload, callback }, { call, put }) {
            const response = yield call(card.create, payload);
            yield put({
                type: "_create",
                payload: response
            });
            if (callback) callback(response);
        },
        * orderInfo({ payload, callback }, { call, put }) {
            const response = yield call(card.orderInfo, payload);
            yield put({
                type: "_orderInfo",
                payload: response
            });
            if (callback) callback(response);
        },
        * highest({ payload, callback }, { call, put }) {
            const response = yield call(card.highest, payload);
            yield put({
                type: "_highest",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _myCardInfo(state, action) {
            return {
                ...state,
                myCardInfo: action.payload
            };
        },
        _myCard(state, action) {
            return {
                ...state,
                myCard: action.payload
            };
        },
        _create(state, action) {
            return {
                ...state,
                create: action.payload
            };
        },
        _list(state, action) {
            return {
                ...state,
                list: action.payload
            };
        },
        _default(state, action) {
            return {
                ...state,
                default: action.payload
            };
        },
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _highest(state, action) {
            return {
                ...state,
                highest: action.payload
            };
        },
        _orderInfo(state, action) {
            return {
                ...state,
                orderInfo: action.payload
            };
        },
    }
};
