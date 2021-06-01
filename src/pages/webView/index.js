import connect from "@/utils/connect";

Page(connect(({ user }) => ({
    login: user.login,
}))({
    data:{
        src:"",
        title:""
    },
    onLoad(options) {
        this.setData(options)
        if(typeof options['title'] !== "undefined"){
            wx.setNavigationBarTitle({
                title:options['title']
            })
        }
    },
    onWebViewLoad(){
        console.warn('加载完毕')
    },
    onError(e) {
        console.warn(e)
    },

}))
