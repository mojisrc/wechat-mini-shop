import categoryPage from "@/services/categoryPage";

export default {
    namespace: "categoryPage",
    state: {
        portal: {
            result: { info: { body: [], background_color: '#f8f8f8' } }
        },
        info: {
            result: { info: { body: [], background_color: '#f8f8f8' } }
        }
    },

    effects: {
        * portal({ payload, callback }, { call, put }) {
            const response = yield call(categoryPage.portal, payload);
            yield put({
                type: "_portal",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(categoryPage.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        }
    },
    reducers: {
        _portal(state, action) {
            return {
                ...state,
                portal: action.payload
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
