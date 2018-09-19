import fa from '../../../utils/fa'
import GoodsEvaluateModel from '../../../models/goodsEvaluate'
import OrderModel from '../../../models/order'
import regeneratorRuntime from '../../../libs/regenerator-runtime/runtime-module'
import { UploadImageInterface } from '../../../interface/uploadImage'
import { api } from '../../../api'

const goodsEvaluateModel = new GoodsEvaluateModel()
const orderModel = new OrderModel()

Page({
    data: {
        id: 0,
        delta: 1,
        score: 5,
        orderGoodsId: 0,
        content: '',
        goodsInfo: null,
        uploaderFiles: [],
        uploaderName: 'file',
        uploaderFormData: {
            type: 'file'
        },
        uploaderCount: 9,
        uploaderUrl: null,
        uploaderButtonText: '上传图片(最多9张)',
        uploaderHeader: {},
    },
    async onLoad({ order_goods_id = 440, delta = 1 }) {
        const accessToken = fa.cache.get('user_token')
        const goodsInfoResult = await orderModel.goodsInfo({
            id: order_goods_id
        })

        this.setData({
            id: goodsInfoResult.info.id,
            delta: typeof delta !== 'undefined' ? delta : 1,
            uploaderUrl: api.upload.addImage.url,
            uploaderHeader: {
                'Content-Type': 'multipart/form-data',
                'Access-Token': accessToken.access_token
            },
            goodsInfo: goodsInfoResult.info,
            orderGoodsId: order_goods_id
        })
    },
    onUploadFileSuccess(e) {
        const result = new UploadImageInterface(e.detail.result)
        let files = this.data.uploaderFiles
        this.setData({
            uploaderFiles: files.concat(result.origin.path)
        })
    },
    onUploadFileDelete(e) {
        this.setData({
            uploaderFiles: fa.remove(this.data.uploaderFiles, e.detail.url)
        })
    },
    onContentChange(e) {
        this.setData({
            content: e.detail.detail.value
        })
    },
    onScoreChange(e) {
        this.setData({
            score: parseInt(e.detail.value)
        })
    },

    async onSubmit() {
        if (!this.data.score) {
            return fa.toast.show({ title: '请选择评分' })
        }
        if (!this.data.content) {
            return fa.toast.show({ title: '请输入评价内容' })
        }

        let data = {
            order_goods_id: this.data.orderGoodsId,
            is_anonymous: 0,
            content: this.data.content,
            score: this.data.score,
        }
        if (this.data.uploaderFiles.length > 0) {
            data['images'] = this.data.uploaderFiles
        }

        const result = await goodsEvaluateModel.add(data)
        if (result === false) {
            fa.toast.show({
                title: fa.code.parse(goodsEvaluateModel.getException().getCode())
            })
        } else {
            this.updateListRow()
            wx.navigateBack({
                delta: this.data.delta
            })
        }
    },
    updateListRow() {
        const { id } = this.data
        if (id > 0) {
            const pages = getCurrentPages();
            const prevPage = pages[pages.length - 2];
            prevPage.updateListRow(id);
        }
    }
})
