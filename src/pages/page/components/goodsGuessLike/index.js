import apiServices from "@/services/goods";
import Arr from "@/utils/array"

Component({
    externalClasses: [ 'custom-class'],
    properties: {
        payload: {
            type: Object,
            value: null
        },
    },
    data: {
        page: 1,
        loading: false,
        noMore: false,
    },
    methods: {
        getDefaultRequestParams() {
            const { payload: { data, options: { goods_display_num, source_type, goods_sort } } } = this.data
            return {
                noMore: false,
                page: 1,
                rows: source_type === 'choose' ? 200 : goods_display_num,
                goods_sort: source_type !== 'choose' ? goods_sort : null,
                ids: source_type === 'choose' && Array.isArray(data) ? data.map((s) => s.id) : []
            }
        },
        onPullDownRefresh() {
            // 相当于construct
            this.setData(this.getDefaultRequestParams())
        },
        getRequestParams(defaultResponseInfo = false) {
            const { page, rows, ids, goods_sort } = defaultResponseInfo === true ? this.getDefaultRequestParams() : this.properties
            let params = { page, rows, goods_sort }
            if (Array.isArray(ids) && ids.length > 0) {
                params["ids"] = ids
            }
            return params
        },
        async request(defaultResponseInfo = false) {
            const { payload: { data, options: { source_type } } } = this.properties
            if (source_type === 'choose' && Array.isArray(data) && data.length === 0) {
                return {
                    code: 0,
                    result: {
                        list: [],
                        total_number: 0
                    },
                    msg: ""
                }
            } else {
                this.setData({ loading: true })
                const response = await apiServices.likeGoods(this.getRequestParams(defaultResponseInfo))
                this.setData({ loading: false })
                return response
            }
        },
        async onReachBottom() {
            if (this.properties.noMore === false) {
                this.setData({
                    page: this.properties.page + 1
                }, async () => {
                    const { payload } = this.properties
                    const response = await this.request()
                    if (response.code === 0 && response.result.list.length > 0) {
                        let _payload = { ...payload }
                        _payload["data"] = Arr.merge(payload.data, response.result.list)
                        this.triggerEvent('onChange', { payload: _payload });
                    } else {
                        this.setData({
                            noMore: true
                        })
                    }
                })
            }
        },
    },
});
