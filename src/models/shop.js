import shop from "@/services/shop";

export default {
    namespace: "shop",
    state: {
        info: { result: { info: {} } }
    },

    effects: {
        * info({ payload, callback }, { call, put }) {
            const response = yield call(shop.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        }
    },
    reducers: {
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        }
    }
};
