Component({
    properties: {
        goodsInfo: {
            type: Object,
            value: {}
        },
    },
    data: {
        tags: []
    },
    observers: {
        'goodsInfo': function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                let arr = []
                this.setData({
                    tags: arr
                })
            }
        }
    },
    methods: {},
});

