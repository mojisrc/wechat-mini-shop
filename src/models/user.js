import user from "@/services/user";
import storage from "@/services/storage";
import Toast from "@/utils/toast";
import fa from "@/utils/fa";
import Inviter from "@/utils/inviter";
import Shy from "@/utils/shy";
export default {
    namespace: "user",
    state: {
        login: false,
        userToken: null,
        register: {},
        logout: {},
        token: {},
        editPassword: {},
        verifyCode: {},
        self: {
            profile: {
                avatar: null,
                sex: null,
                birthday: null,
            },
            assets: {
                points: 0,
                protect_points: 0,
                frozen_points: 0
            }
        },
        editPasswordByFind: {},
        editProfile: {},
        bindPhone: {},
        bindWechat: {},
        unbindWechat: {},
        unbindPhone: {},
        evaluatedList: {},
        assetsInfo: {
            balance: 0.0,
            frozen_balance: 0.0,
            points: 0,
            coupon_num: 0,
            goods_collect_num: 0,
            member_card: {
                member_card_user_id: 0,
                title: null
            }
        }
    },

    effects: {
        * initUserinfo({ payload, callback }, { put, call }) {
            const userToken = storage.getUserToken()
            if (userToken) {
                const response = yield call(user.token, payload);
                if (response.code === 0) {
                    yield put({
                        type: 'userLoginSuccessAfter',
                        payload: userToken
                    })
                } else {
                    yield put({
                        type: "logout",
                    });
                }
                if (callback) callback();
            }
        },
        * login({ payload, callback }, { call, put }) {
            try {
                const response = yield call(user.login, payload);
                if (response.code === 0) {
                    yield put({
                        type: 'userLoginSuccessAfter',
                        payload: response.result
                    })
                    if (callback) callback(response);
                } else {
                    fa.toast.show({
                        title: fa.code.parse(response.code)
                    })
                }
            } catch (err) {
                Toast.fail(typeof response["code"] !== "undefined" ? response.msg : "登录失败", 1)
            }
        },
        * wechatLogin({ payload: { tokenData, userData }, callback }, { call, put }) {
            try {
                const payload = {
                    login_type: 'wechat_app',
                    wechat_openid: userData.openid
                }
                const response = yield call(user.login, payload)
                if (response.code === 0) {
                    yield put.resolve({
                        type: 'userLoginSuccessAfter',
                        payload: response.result
                    })
                    if (callback) callback(response);
                } else if (response.code === 10014) { // 不存在
                    yield put.resolve({
                        type: 'wechatRegister',
                        payload: { tokenData, userData }
                    })
                } else {
                    Toast.fail(`${response.code}  ${response.msg}`, 3)
                }
            } catch (err) {
                Toast.fail(err, 3)
            }
        },
        * wechatRegister({ payload: { tokenData, userData } }, { call, put }) {
            try {
                const params = {
                    register_type: 'wechat_app',
                    wechat_openid: userData.openid,
                    wechat: userData
                }
                const e = yield call(user.register, params)
                if (e.code === 0) {
                    yield put({
                        type: 'wechatLogin',
                        payload: {
                            tokenData,
                            userData
                        }
                    })
                } else {
                    Toast.fail(e.msg)
                }
            } catch (err) {
                Toast.fail('登录失败')
            }
        },
        * userLoginSuccessAfter({ payload, callback }, { call, put }) {
            try {
                storage.setUserToken(payload)
                yield put.resolve({
                    type: "_userToken",
                    payload: payload
                });
                yield put.resolve({
                    type: "_login",
                    payload: true
                });
                yield put.resolve({ type: 'self' })
                yield put.resolve({ type: 'assetsInfo' })
                yield put.resolve({ type: 'cart/totalNum' })
                Inviter.bind();
                if (callback) callback();
            } catch (err) {
                console.warn(err)
                Toast.fail('登录失败')
            }
        },
        * register({ payload, callback }, { call, put }) {
            try {
                const response = yield call(user.register, { ...payload, ...{ register_type: 'password' } })
                if (response.code === 0) {
                    const { username, password } = payload
                    const params = {
                        username,
                        password,
                        login_type: "password"
                    }
                    yield put({
                        type: 'login',
                        payload: params
                    })
                }
                if (callback) callback(response);
            } catch (err) {
                Toast.fail(err, 1)
            }
        },
        * logout({ payload, callback }, { call, put }) {
            const response = yield call(user.logout, payload);
            yield put({
                type: 'userLogoutSuccessAfter',
                payload: response
            })
            if (callback) callback(response);
        },
        * userLogoutSuccessAfter({ response }, { call, put }) {
            yield put({
                type: "_login",
                payload: false
            });
            yield put({
                type: "_userToken",
                payload: {}
            });
            yield put({
                type: "_logout",
                payload: response
            });
            yield put({
                type: 'order/_stateNum',
                payload: {
                    result: {
                        state_new: 0,
                        state_send: 0,
                        state_success: 0,
                        state_close: 0,
                        state_unevaluate: 0,
                        state_refund: 0,
                    }
                }
            })
            yield put({
                type: 'cart/_totalNum',
                payload: {
                    result: { total_num: 0 }
                }
            })
            yield put({
                type: '_assetsInfo',
                palyload: {
                    balance: 0.0,
                    frozen_balance: 0.0,
                    points: 0,
                    coupon_num: 0,
                    goods_collect_num: 0,
                    member_card: {
                        member_card_user_id: 0,
                        title: null
                    }
                }
            })
            storage.removeUserInfo()
            storage.removeUserToken()
        },
        * token({ payload, callback }, { call, put }) {
            const response = yield call(user.token, payload);
            yield put({
                type: "_token",
                payload: response
            });
            if (callback) callback(response);
        },
        * editPassword({ payload, callback }, { call, put }) {
            const response = yield call(user.editPassword, payload);
            yield put({
                type: "_editPassword",
                payload: response
            });
            if (callback) callback(response);
        },
        * verifyCode({ payload, callback }, { call, put }) {
            const response = yield call(user.verifyCode, payload);
            yield put({
                type: "_verifyCode",
                payload: response
            });
            if (callback) callback(response);
        },
        * self({ payload, callback }, { call, put }) {
            const response = yield call(user.self, payload);
            storage.setUserInfo({ value: response.result.info })
            yield put({
                type: "_self",
                payload: {
                    ...response.result.info,
                    shyPhone: Shy.phone(response.result.info.phone)
                }
            });
            if (callback) callback(response.result.info);
        },
        * editPasswordByFind({ payload, callback }, { call, put }) {
            const response = yield call(user.editPasswordByFind, payload);
            yield put({
                type: "_editPasswordByFind",
                payload: response
            });
            if (callback) callback(response);
        },
        * editProfile({ payload, callback }, { call, put }) {
            const response = yield call(user.editProfile, payload);
            yield put({
                type: "_editProfile",
                payload: response
            });
            if (callback) callback(response);
        },
        * bindPhone({ payload, callback }, { call, put }) {
            const response = yield call(user.bindPhone, payload);
            yield put({
                type: "_bindPhone",
                payload: response
            });
            if (response.code === 0) {
                yield put({
                    type: 'self'
                })
            }
            if (callback) callback(response);
        },
        * bindWechat({ userData }, { call, put }) {
            const response = yield call(user.bindWechat, {
                wechat_openid: userData.openid,
                wechat: userData
            });
            yield put({
                type: "_bindWechat",
                payload: response
            });
            Toast.info('绑定成功', 1)
            yield put({
                type: 'self'
            })
            if (callback) callback(response);
        },
        * unbindWechat({ payload, callback }, { call, put }) {
            const response = yield call(user.unbindWechat, payload);
            yield put({
                type: "_unbindWechat",
                payload: response
            });
            Toast.info('解除关联成功', 1)
            yield put({ type: 'self' })
            if (callback) callback(response);
        },
        * unbindPhone({ payload, callback }, { call, put }) {
            const response = yield call(user.unbindPhone, payload);
            yield put({
                type: "_unbindPhone",
                payload: response
            });
            yield put({ type: 'self' })
            if (callback) callback(response);
        },
        * evaluatedList({ payload, callback }, { call, put }) {
            const response = yield call(user.evaluatedList, payload);
            yield put({
                type: "_evaluatedList",
                payload: response
            });
            if (callback) callback(response);
        },
        * assetsInfo({ payload, callback }, { call, put }) {
            const response = yield call(user.assetsInfo, payload);
            yield put({
                type: "_assetsInfo",
                payload: response.result.info
            });
            if (callback) callback(response);
        },

    },
    reducers: {
        _login(state, action) {
            return {
                ...state,
                login: action.payload
            };
        },
        _userToken(state, action) {
            return {
                ...state,
                userToken: action.payload
            };
        },
        _register(state, action) {
            return {
                ...state,
                register: action.payload
            };
        },
        _logout(state, action) {
            return {
                ...state,
                logout: action.payload
            };
        },
        _token(state, action) {
            return {
                ...state,
                token: action.payload
            };
        },
        _editPassword(state, action) {
            return {
                ...state,
                editPassword: action.payload
            };
        },
        _verifyCode(state, action) {
            return {
                ...state,
                verifyCode: action.payload
            };
        },
        _self(state, action) {
            return {
                ...state,
                self: action.payload
            };
        },
        _editPasswordByFind(state, action) {
            return {
                ...state,
                editPasswordByFind: action.payload
            };
        },
        _editProfile(state, action) {
            return {
                ...state,
                editProfile: action.payload
            };
        },
        _bindPhone(state, action) {
            return {
                ...state,
                bindPhone: action.payload
            };
        },
        _bindWechat(state, action) {
            return {
                ...state,
                bindWechat: action.payload
            };
        },
        _unbindWechat(state, action) {
            return {
                ...state,
                unbindWechat: action.payload
            };
        },
        _unbindPhone(state, action) {
            return {
                ...state,
                unbindPhone: action.payload
            };
        },
        _evaluatedList(state, action) {
            return {
                ...state,
                evaluatedList: action.payload
            };
        },
        _assetsInfo(state, action) {
            return {
                ...state,
                assetsInfo: action.payload
            };
        },
    }
};
