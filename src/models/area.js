import area from "@/services/area";

export default {
    namespace: "area",
    state: {
        list: [],
        info: { result: { info: {} } }
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(area.list, payload);
            yield put({
                type: "_list",
                payload: response.result.list
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(area.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        }
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
        }
    }
};
