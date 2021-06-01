import storage from "@/utils/storage";
import Toast from "@/utils/toast";

export default class MiniCode {
    /**
     * 实时动态强制更改用户录入
     * arg1 inputObject
     **/
    static async refresh() {
        const login = await wx.login()
        if (login.errMsg === "login:ok") {
            storage.set('code', login.code)
        } else {
            Toast.info(login.errMsg)
        }
    }

    static getCode(){
        return storage.get('code')
    }
}
