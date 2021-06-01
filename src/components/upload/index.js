import storage from "@/services/storage";
import { api } from "@/api";

Component({
    properties: {
        count: {
            type: Number,
            value: 1
        },
        url: {
            type: String,
            value: api.upload.addImage.url
        },
        header: {
            type: Object,
            value: {}
        },
        formData: {
            type: Object,
            value: {}
        },
        name: {
            type: String,
            value: 'image'
        },
    },
    data: {
        urls: []
    },
    methods: {
        onUpload() {
            const accessToken = storage.getUserToken()
            let header = {
                'Content-Type': 'multipart/form-data',
                'Access-Token': accessToken.access_token
            }
            wx.chooseImage({
                count: this.data.count,
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: (res) => {
                    const tempFilePaths = res.tempFilePaths
                    for (let i = 0; i < tempFilePaths.length; i++) {
                        const filePath = tempFilePaths[i]
                        wx.getFileSystemManager().readFile({
                            filePath: filePath, //选择图片返回的相对路径
                            encoding: 'base64', //编码格式
                            success: (base64Res) => {
                                console.warn(base64Res)
                                wx.uploadFile({
                                    url: this.data.url,
                                    filePath: tempFilePaths[i],
                                    name: this.data.name,
                                    header,
                                    formData: this.data.formData,
                                    success: (res) => {
                                        let res1 = JSON.parse(res.data)
                                        this.triggerEvent('onUploadSuccess', res1.result.origin);
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
    },
});

