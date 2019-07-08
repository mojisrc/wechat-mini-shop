import GoodsModel from '@/models/goods'
import fa from '@/utils/fa'
import "regenerator-runtime/runtime"

const goodsModel = new GoodsModel()

Page({
    data: {
        keywords: '',
        categoryId: 1,
        categoryKeywords: '',
        imageWidth: 0,
        page: 1,
        rows: 10,
        noMore: false,
        list: [],
    },
    async onLoad({ keywords = '', category_id = '', category_keywords = '' }) {
        const systemInfo = wx.getSystemInfoSync()
        this.setData({
            keywords,
            categoryId: category_id,
            categoryKeywords: category_keywords,
            imageWidth: (systemInfo.windowWidth - 18) / 2
        })
        if(category_id){
            this.getList()
        }
    },
    async getList() {
        const page = this.data.page
        if (page > 1 && this.data.noMore === true) {
            return
        }
        const rows = this.data.rows
        const list = page === 1 ? [] : this.data.list
        let requestParam = { page, rows }
        if (this.data.categoryId > 0) {
            requestParam['category_ids'] =[parseInt(this.data.categoryId)]
        }
        if (this.data.keywords) {
            requestParam['keywords'] = this.data.keywords
        }
        const result = await goodsModel.list(requestParam)
        if (result) {
            let data = { page: page + 1 }
            if (result.list.length === 0) {
                data['noMore'] = true
            }
            data['list'] = list.concat(result.list)
            this.setData(data)
        }
    },
    async onReachBottom() {
        if (this.data.noMore === true) {
            return false
        } else {
            this.getList()
        }
    },
    goGoodsDetail(e) {
        wx.navigateTo({
            url: '/pages/goods/detail/index?id=' + e.currentTarget.dataset.id
        })
    },
    onSearchConfirm(e) {
        this.setData({
            keywords: e.detail.keywords,
            categoryId: e.detail.categoryId,
            categoryKeywords: e.detail.categoryKeywords,
            page: 1
        })
    }
})
