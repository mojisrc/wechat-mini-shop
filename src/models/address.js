import address from "@/services/address";

export default {
    namespace: "address",
    state: {
        list: {
            result: { list: [], total_number: 0 }
        },
        info: { result: { info: {} } },
        add: {},
        edit: {},
        del: {},
        types: {
            result: { list: [], total_number: 0 }
        },
        getDefault: { result: { info: {} } },
        setDefault: {},
    },

    effects: {
        * list({ payload, callback }, { call, put }) {
            const response = yield call(address.list, payload);
            yield put({
                type: "_list",
                payload: response
            });
            if (callback) callback(response);
        },
        * info({ payload, callback }, { call, put }) {
            const response = yield call(address.info, payload);
            yield put({
                type: "_info",
                payload: response
            });
            if (callback) callback(response);
        },
        * add({ payload, callback }, { call, put }) {
            const response = yield call(address.add, payload);
            yield put({
                type: "_add",
                payload: response
            });
            if (callback) callback(response);
        },
        * edit({ payload, callback }, { call, put }) {
            const response = yield call(address.edit, payload);
            yield put({
                type: "_edit",
                payload: response
            });
            if (callback) callback(response);
        },
        * del({ payload, callback }, { call, put }) {
            const response = yield call(address.del, payload);
            yield put({
                type: "_del",
                payload: response
            });
            if (callback) callback(response);
        },
        * types({ payload, callback }, { call, put }) {
            const response = yield call(address.types, payload);
            yield put({
                type: "_types",
                payload: response
            });
            if (callback) callback(response);
        },
        * getDefault({ payload, callback }, { call, put }) {
            try{
                const response = yield call(address.getDefault, payload);
                yield put({
                    type: "_getDefault",
                    payload: response
                });
                if (callback) callback(response);
            }catch(err) {
                if (callback) callback({ result: { info: { id: 0 } } });
            }
        },
        * setDefault({ payload, callback }, { call, put }) {
            const response = yield call(address.setDefault, payload);
            yield put({
                type: "_setDefault",
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
        _info(state, action) {
            return {
                ...state,
                info: action.payload
            };
        },
        _add(state, action) {
            return {
                ...state,
                add: action.payload
            };
        },
        _edit(state, action) {
            return {
                ...state,
                edit: action.payload
            };
        },
        _del(state, action) {
            return {
                ...state,
                del: action.payload
            };
        },
        _types(state, action) {
            return {
                ...state,
                types: action.payload
            };
        },
        _getDefault(state, action) {
            return {
                ...state,
                getDefault: action.payload
            };
        },
        _setDefault(state, action) {
            return {
                ...state,
                setDefault: action.payload
            };
        },
    }
};
