import fa from "@/utils/fa";
import validate from "@/utils/validate"
export default {
    namespace: "search",
    state: {
        list: { result: { list: [] } },
        add: { result: {} },
        clear: { result: {} },
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            let historyList = yield call(() => {
                return fa.cache.get('search_history')
            })
            let response = {
                code: 0,
                result: {
                    list: historyList
                }
            }
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            let historyList = yield call(() => {
                return fa.cache.get('search_history')
            })
            if (validate.isEmpty(payload.title)) {
                if (Array.isArray(historyList)) {
                    historyList.unshift(payload)
                    // todo 改造loash
                    // historyList = _.uniqBy(historyList, 'value').map((item) => {
                    //     return {
                    //         value: item.value,
                    //     }
                    // })
                    yield call(() => {
                        return fa.cache.set('search_history', historyList)
                    })
                } else {
                    yield call(() => {
                        return fa.cache.set('search_history', [payload])
                    })
                }
            }
            let response = { code: 0, result: {} }
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * clear({ payload, callback }, { call, put }) {
            yield call(() => {
                return fa.cache.set('search_history', null)
            })
            let response = {
                code: 0,
                result: {}
            }
            yield put({
                type: "_clear",
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
        _add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        },
        _clear(state, action) {
            return {
                ...state,
                clear: action.payload
            };
        }
    }
};
