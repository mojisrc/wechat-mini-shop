import wechat from "@/services/wechat";

export default {
    namespace: "wechat",
    state: {
        addMiniFormId: {
            result: {}
        },
    },

    effects: {
        * addMiniFormId({ payload, callback }, { call, put }) {
            const response = yield call(wechat.addMiniFormId, payload);
            yield put({
                type: "_addMiniFormId",
                payload: response
            });
            if (callback) callback(response);
        },
    },
    reducers: {
        _addMiniFormId(state, action) {
            return {
                ...state,
                addMiniFormId: action.payload
            };
        },
    }
};
