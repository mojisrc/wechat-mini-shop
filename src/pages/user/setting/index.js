import fa from '@/utils/fa'
Page({
    data: {
        address:{
            name:'韩文博',
            phone:'13502176003',
            address:'天津市 河西区 龙博花园16-1-2'
        },
    },
    logout(){
        fa.cache.set('user_info',null)
        fa.cache.set('user_token',null)
        wx.switchTab({
            url: '/pages/user/index'
        })
    }
})
