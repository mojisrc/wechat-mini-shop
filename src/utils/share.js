export default class Share {
    static share({ title, path,imageUrl }) {
        // 判断是否已经登陆，如果登陆增加参数
        const app = getApp() || {}
        const { user } = app._store.getState() || {}
        const { self } = user || {}
        // 增加上级id
        if (typeof path !== "undefined" && self && typeof self['id'] !== "undefined" && self.id > 0) {
            if (path.indexOf("?") !== -1) {
                path = `${path}&inviter_user_id=${self.id}`
            } else {
                path = `${path}?inviter_user_id=${self.id}`
            }
        }
        if(imageUrl){
            return {
                title,
                path,
                imageUrl:`${imageUrl}?x-oss-process=image/resize,m_pad,w_500,h_400/format,png`
            }
        }else{
            return {
                title,
                path
            }
        }
    }
}
