import brand from "../services/brand";

export default {
    namespace: "brand",
    state: {
        info: { result: { info: {} } },
    },

    effects: {
        * info({ payload, callback }, { call, put }) {
            const response = yield call(brand.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
    }
};
