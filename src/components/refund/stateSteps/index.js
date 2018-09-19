import Time from "../../../utils/time";

Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        refundInfo:{
            type:Object,
            value:null
        },
        steps:{
            type: Array,
            value: []
        }
    },
    ready(){
        const refundInfo = this.data.refundInfo
        this.setData({
            steps:[
                {
                    current: false,
                    done: true,
                    text: '买家退款',
                    desc: Time.format('M/D h:m',refundInfo.create_time)
                },
                {
                    done: true,
                    current: false,
                    text: '商家受理',
                    desc: Time.format('M/D h:m',refundInfo.create_time)
                },
                {
                    done: true,
                    current: true,
                    text: '退款成功',
                    desc: Time.format('M/D h:m',refundInfo.create_time)
                }
            ]
        })
    },
    methods: {
    }
});
