import fa from '@/utils/fa'
import goodsEvaluateServices from '@/services/goodsEvaluate'
import orderServices from '@/services/order'
import { api } from '@/api'
import storage from "@/services/storage";
import connect from "@/utils/connect";


Page(connect(({ user }) => ({
    login: user.login,
}))({
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
    // TODO 优化
    async onLoad({ order_goods_id = 440, delta = 1 }) {
        const accessToken = storage.getUserToken()
        const goodsInfoResult = await orderServices.goodsInfo({
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
        let files = this.data.uploaderFiles
        this.setData({
            uploaderFiles: files.concat(e.detail.result.origin.path)
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

        const result = await goodsEvaluateServices.add(data)
        if (result.code !== 0) {
            fa.toast.show({
                title: result.msg
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
}))
