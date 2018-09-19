//index.js
Page({
    data: {
        stepper: {
            // 当前 stepper 数字
            stepper: 1,
            // 最小可到的数字
            min: 1,
            // 最大可到的数字
            max: 1
        },
        cartList: [
            {
                id: 1,
                img: {
                    url: 'https://gd4.alicdn.com/imgextra/i4/0/TB1g8wEPFXXXXb.XVXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
                },
                title: 'Huawei/华为 P10 Plus6G+128G曜石黑全网通4G手机双卡双待特价',
                price: 200,
                market_price: 300,
                desc: '描述'
            },
            {
                id: 1,
                img: {
                    url: 'https://gd4.alicdn.com/imgextra/i4/0/TB1g8wEPFXXXXb.XVXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
                },
                title: 'Huawei/华为 P10 Plus6G+128G曜石黑全网通4G手机双卡双待特价',
                price: 200,
                market_price: 300,
                desc: '描述'
            },
            {
                id: 1,
                img: {
                    url: 'https://gw.alicdn.com/bao/uploaded/i3/3305375223/TB2DmNta6n85uJjSZFLXXbqMVXa_!!3305375223.jpg'
                },
                title: 'Huawei/华为 P10 Plus6G+128G曜石黑全网通4G手机双卡双待特价',
                price: 200,
                market_price: 300,
                desc: '描述'
            },
            {
                id: 1,
                img: {
                    url: 'https://gw.alicdn.com/bao/uploaded/i4/22668250/TB24nBEa0PJ3eJjSZFLXXab3FXa_!!22668250.jpg'
                },
                title: 'Huawei/华为 P10 Plus6G+128G曜石黑全网通4G手机双卡双待特价',
                price: 200,
                market_price: 300,
                desc: '描述'
            },
        ]
    },
    handleZanStepperChange({ componentId, stepper }) {
        // componentId 即为在模板中传入的 componentId
        // 用于在一个页面上使用多个 stepper 时，进行区分
        // stepper 代表操作后，应该要展示的数字，需要设置到数据对象里，才会更新页面展示
        this.setData({
            stepper
        });
    }
})
