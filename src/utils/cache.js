export default class Cache {
    event = [
        'user_info',
        'user_token',
        'cart_id_checked_list',
        'cart_id_remove_checked_list',
        'address_checked_id',
        // 微信权限
        'wx_get_setting',
        // 地区
        'area_list_level2',
    ]

    get($key) {
        return wx.getStorageSync($key);
    }

    set($key, $value) {
        return wx.setStorageSync($key, $value);
    }
}
