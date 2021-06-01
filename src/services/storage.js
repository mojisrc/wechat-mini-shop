import storage from "@/utils/storage"

export default {
    get(params = {}) {
        return storage.get(params.key)
    },
    set(params = {}) {
        return storage.set(
            params.key,
            JSON.stringify(params.value)
        )
    },
    remove(params = {}) {
        return storage.remove(params.key)
    },
    getUserInfo() {
        return storage.getUserInfo();
    },
    setUserInfo(params = {}) {
        return storage.setUserInfo(params.value);
    },
    removeUserInfo() {
        return storage.removeUserInfo();
    },
    getUserToken() {
        try{
            return JSON.parse( storage.get('user_token'));
        }catch (e) {
            return null
        }
    },
    setUserToken(value) {
        return storage.set('user_token',JSON.stringify(value));
    },
    removeUserToken() {
        return storage.remove('user_token');
    },
}
