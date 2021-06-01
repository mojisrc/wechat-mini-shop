Component({
    externalClasses: [ 'custom-class'],
    properties: {
        value: {
            type: Number,
            value: null
        },
        format: {
            type: String,
            value: 'Y-M-D h:m'
        },
    },
    data: {
        time: null
    },
    ready () {
        this.setData({
            time: this.format(this.data.value, this.data.format)
        })
    },
    methods: {
        formatNumber(n) {
            n = n.toString()
            return n[1] ? n : '0' + n
        },
        /**
         * 时间戳转化为年 月 日 时 分 秒
         * number: 传入时间戳
         * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 Y/M/D h:m:s
         */
        format(number, format) {
            const formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
            let returnArr = []
            let date = new Date(number * 1000)
            returnArr.push(date.getFullYear())
            returnArr.push(this.formatNumber(date.getMonth() + 1))
            returnArr.push(this.formatNumber(date.getDate()))

            returnArr.push(this.formatNumber(date.getHours()))
            returnArr.push(this.formatNumber(date.getMinutes()))
            returnArr.push(this.formatNumber(date.getSeconds()))
            for (let i in returnArr) {
                format = format.replace(formateArr[i], returnArr[i])
            }
            return format
        }
    }
});
