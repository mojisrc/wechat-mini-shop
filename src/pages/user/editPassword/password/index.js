Page({
    data: {
        showBottomPopup: true,
        stepper: {
            // 当前 stepper 数字
            stepper: 1,
            // 最小可到的数字
            min: 1,
            // 最大可到的数字
            max: 1
        },
        list: [
            {
                id: '1',
                title: '商品'
            },
            {
                id: '2',
                title: '评价'
            },
            {
                id: '3',
                title: '详情'
            }
        ],
        selectedId: '1',
        detail: {
            title: "2018新款风衣文艺范韩版修身款翻领纯棉七分袖百搭短款",
            images: [
                {
                    url: 'https://gd4.alicdn.com/imgextra/i4/0/TB1g8wEPFXXXXb.XVXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
                },
                {
                    url: 'https://gd4.alicdn.com/imgextra/i4/0/TB1g8wEPFXXXXb.XVXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
                },
                {
                    url: 'https://gw.alicdn.com/bao/uploaded/i3/3305375223/TB2DmNta6n85uJjSZFLXXbqMVXa_!!3305375223.jpg'
                },
                {
                    url: 'https://gw.alicdn.com/bao/uploaded/i4/22668250/TB24nBEa0PJ3eJjSZFLXXab3FXa_!!22668250.jpg'
                },
            ]
        }
    },
    onLoad: function () {

    },
    toggleGoodsSkuSelect() {
        console.log('toggleGoodsSkuSelect')
        this.setData({
            showBottomPopup: !this.data.showBottomPopup
        });
    },
})