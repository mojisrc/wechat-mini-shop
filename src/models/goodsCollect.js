import goodsCollect from "@/services/goodsCollect";

export default {
    namespace: "goodsCollect",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        add: {},
        del: {},
        state: {
            result: { state: 0 }
        }
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(goodsCollect.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(goodsCollect.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(goodsCollect.del, payload);
            yield put({
                type: "_del",
                payload: response
            });
            if (callback) callback(response);
        },
        * changeState({ payload: { is_collect,  goods_ids }, callback }, { call, put }) {
            if (is_collect) {
                yield put({
                    type: 'del',
                    payload: {
                        goods_id:goods_ids[0]
                    },
                    callback:(e)=>{
                        if (callback) callback(e);
                    }
                })
            } else {
                yield put({
                    type: 'add',
                    payload: {
                        goods_ids
                    },
                    callback:(e)=>{
                        if (callback) callback(e);
                    }
                })
            }
        },
        * state({ payload, callback }, { call, put }) {
            try {
                const response = yield call(goodsCollect.state, payload);
                yield put({
                    type: "_state",
                    payload: response
                });
                if (callback) callback(response);
            } catch (err) {
                console.log(err);
            }
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
        _del(state, action) {
            return {
                ...state,
                del: action.payload
            };
        },
        _state(state, action) {
            return {
                ...state,
                state: action.payload
            };
        },
    }
};
