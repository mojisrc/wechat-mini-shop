Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        orderState: {
            type: Number,
            value: null
        },
        expireSeconds: {
            type: Number,
            value: null
        },
        cost: {
            type: Number,
            value: null
        }
    },
    ready(){
        this.setData({
            timeText : this.toHourMinute(this.data.expireSeconds)
        })
    },
    methods: {
        // 将分钟数量转换为小时和分钟字符串
        toHourMinute(seconds) {
            return (Math.floor(seconds / 3600 ) + "小时" + Math.floor(seconds % 3600 /  60   ) + "分");
        }
    }
});
