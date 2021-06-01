Component({
    properties: {
        style: {
            type: Object,
            value: {}
        },
        price:{
            type: String,
            value: 0
        },
        fontSize: {
            type: Number,
            value: 14
        },
        fontColor: {
            type: String,
            value: '#EE3B40'
        },
    },
    data: {
        _price:[]
    },
    attached: function () {
        const { price } = this.data;
        const _price = `${price}`.split(".");
        if (_price.length === 1) {
            _price.push("00")
        }
        this.setData({
            _price
        });
    },
    methods: {

    },

});
