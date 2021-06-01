export default class Code {
    codes = {
        '-1': '失败',
        '0': '成功',
        '-2': '参数错误',
        500: '服务器错误',

        /* 用户相关 10000 */
        10001: '老密码与新密码不能相同',
        10002: '密码短了',
        10003: '密码长了',
        10004: '未登录',
        10005: '令牌错误',
        10006: '登录方式错误',
        10007: '创建token失败',
        10008: '用户名必填',
        10009: '密码必填',
        10010: '手机或邮箱格式不正确',
        10011: '账号不存在',
        10012: '手机格式错误',
        10013: '账号或密码错误',
        10014: '微信openid不存在',
        10015: '微信openid已存在',
        10016: '注册方式错误',
        10017: '账号存在（用户名|手机号|邮箱）',
        /** 验证码 */
        11000: '验证码长度错误',
        11001: '验证码个是不对',
        11002: '验证码已失效',
        11003: '验证码不存在',
        11004: '渠道错误',

        /* 订单相关 20000 */

        /* 商品相关 30000 */
        30001: '已下架',
        30002: '缺货',

        /* 购物车相关 31000 */
        31001: '购物车商品不存在',

        /* 微信 40000 */
        40000: '过期',
        40001: '未扫描',
        40002: '不存在',
        40003: '微信接口请求失败',


        server_login_fail: '服务器登录失败',
        wechat_login_fail: '登录失败，获得用户信息失败',
        wechat_login_error: '登录失败',
        pay_cancel: '支付取消',
        pay_error: '支付错误',
        pay_param_error: '支付参数错误',
        interface_attribute_error: '接口属性错误',

        user_password_old_same: '老密码与新密码不能相同',
        user_password_short: '密码短了',
        user_password_long: '密码长了',
        user_not_login: '未登录',
        user_access_token_error: '令牌错误',
        user_login_type_error: '登录方式错误',
        user_access_token_create_fail: '创建token失败',
        user_username_require: '用户名必填',
        user_password_require: '密码必填',
        user_username_or_email_error: '手机或邮箱格式不正确',
        user_account_not_exist: '账号不存在',
        user_phone_format_error: '手机格式错误',
        user_username_or_password_error: '账号或密码错误',
        user_wechat_openid_not_exist: '微信openid不存在',
        user_wechat_openid_exist: '微信openid已存在',
        user_register_type_error: '注册方式错误',
        user_account_exist: '账号存在（用户名|手机号|邮箱）',

        verify_code_length: '验证码长度错误',
        verify_code_number: '验证码个是不对',
        verify_code_expire: '验证码已失效',
        verify_code_not_exist: '验证码不存在',
        verify_code_check_channel_type_error: '渠道错误',
    }

    /**
     * 解析
     * @param code
     * @return String
     */
    parse(code) {
        if (typeof this.codes[code] !== 'undefined') {
            return this.codes[code]
        } else {
            return '操作失败'
        }
    }
}
