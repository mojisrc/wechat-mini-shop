import refund from "@/services/refund";

export default {
    namespace: "refund",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        info: { result: { info: {} } },
        add: {},
        edit: {},
        del: {},
        reasonList: {
            result: { list: [], total_number: 0 }
        },
    },

    effects: {
        * reasonList({ payload, callback }, { call, put }) {
            const response = yield call(refund.reasonList, payload);
            yield put({
                type: "_reasonList",
                payload: response
            });
            if (callback) callback(response);
        },
        * apply({ payload, callback }, { call, put }) {
            const response = yield call(refund.apply, payload);
            yield put({
                type: "_apply",
                payload: response
            });
            if (callback) callback(response);
        },
        * list({ payload, callback }, { call, put }) {
            const response = yield call(refund.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(refund.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * setTrackingNo({ payload, callback }, { call, put }) {
            const response = yield call(refund.setTrackingNo, payload);
            yield put({
                type: "_setTrackingNo",
                payload: response
            });
            if (callback) callback(response);
        },
        * revoke({ payload, callback }, { call, put }) {
            const response = yield call(refund.revoke, payload);
            yield put({
                type: "_revoke",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _reasonList(state, action) {
            return {
                ...state,
                reasonList: action.payload
            };
        },
        _apply(state, action) {
            return {
                ...state,
                apply: action.payload
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
        _setTrackingNo(state, action) {
            return {
                ...state,
                setTrackingNo: action.payload
            };
        },
        _revoke(state, action) {
            return {
                ...state,
                revoke: action.payload
            };
        },
    }
};
