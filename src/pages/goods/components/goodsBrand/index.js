import navigation from "@/utils/navigation";

Component({
    externalClasses: [ 'custom-class'],
    properties: {
        list: {
            type: Array,
            value: []
        },
    },
    data :{
        smallImageWidth:0
    },
    attached() {
        const systemInfo = wx.getSystemInfoSync()
        this.setData({
            smallImageWidth:  (systemInfo.windowWidth - 18) / 3.5
        })
    },
    methods: {
        onPress(e) {
            navigation.navigate('goods/detail',{
                id:e.currentTarget.dataset.id
            })
        }
    },
});
