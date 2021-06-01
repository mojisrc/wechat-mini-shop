const posterConfig = {
    demoConfig: {
        width: 750,
        height: 1000,
        backgroundColor: '#fff',
        debug: false,
        blocks: [
            {
                x: 0,
                y: 10,
                width: 750, // 如果内部有文字，由文字宽度和内边距决定
                height: 120,
                paddingLeft: 0,
                paddingRight: 0,
                borderWidth: 10,
                borderColor: 'red',
                backgroundColor: 'blue',
                borderRadius: 40,
                text: {
                    text: [
                        {
                            text: '金额¥ 1.00',
                            fontSize: 80,
                            color: 'yellow',
                            opacity: 1,
                            marginLeft: 50,
                            marginRight: 10,
                        },
                        {
                            text: '金额¥ 1.00',
                            fontSize: 20,
                            color: 'yellow',
                            opacity: 1,
                            marginLeft: 10,
                            textDecoration: 'line-through',
                        },
                    ],
                    baseLine: 'middle',
                },
            }
        ],
        texts: [
            {
                x: 0,
                y: 180,
                text: [
                    {
                        text: '长标题长标题长标题长标题长标题长标题长标题长标题长标题',
                        fontSize: 40,
                        color: 'red',
                        opacity: 1,
                        marginLeft: 0,
                        marginRight: 10,
                        width: 200,
                        lineHeight: 40,
                        lineNum: 2,
                    },
                    {
                        text: '原价¥ 1.00',
                        fontSize: 40,
                        color: 'blue',
                        opacity: 1,
                        marginLeft: 10,
                        textDecoration: 'line-through',
                    },
                ],
                baseLine: 'middle',
            },
            {
                x: 10,
                y: 330,
                text: '金额¥ 1.00',
                fontSize: 80,
                color: 'blue',
                opacity: 1,
                baseLine: 'middle',
                textDecoration: 'line-through',
            },
        ],
        images: [
            {
                url: 'https://51youshop.oss-cn-hangzhou.aliyuncs.com/20191108/1573204156161117.jpeg',
                width: 300,
                height: 300,
                y: 450,
                x: 0,
                // borderRadius: 150,
                // borderWidth: 10,
                // borderColor: 'red',
            },
            {
                url: 'https://51youshop.oss-cn-hangzhou.aliyuncs.com/20191108/1573204156161117.jpeg',
                width: 100,
                height: 100,
                y: 450,
                x: 400,
                borderRadius: 100,
                borderWidth: 10,
            },
        ],
        lines: [
            {
                startY: 800,
                startX: 10,
                endX: 300,
                endY: 800,
                width: 5,
                color: 'red',
            }
        ]

    }
};


Component({
    data: {
        posterConfig: posterConfig.demoConfig,//海报配置
        show: false,//分享海报是否展示
        videoPlay: false
    },
    properties: {
        goodsInfo: {
            type: Object,
            value: {}
        },
    },
    lifetimes: {
        ready: function () {
            this.videoContext = wx.createVideoContext('myVideo', this)
        },
    },
    methods: {
        onBannerPreview({currentTarget}) {
            wx.previewImage({
                current: currentTarget.dataset.url,
                urls: this.data.goodsInfo.images
            })
        },
        onPosterSuccess(e) {
            const {detail} = e;
            console.log(detail);
            wx.previewImage({
                current: detail,
                urls: [detail]
            })
        },
        onPosterFail(err) {
            console.error(err);
        },
        onPopupOpen() {
            this.setData({
                show: true
            })
        },
        onPopupClose() {
            this.setData({
                show: false
            })
        },
        onVideoToggle() {
            const { videoPlay } = this.data
            if (videoPlay) {
                this.videoContext.pause()
            } else {
                this.videoContext.play()
            }
            this.setData({
                videoPlay: !videoPlay
            })
        }
    },
});

