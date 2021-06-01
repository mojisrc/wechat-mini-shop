import fa from "@/utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `goodscategory/list`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `goodscategory/info`,
                method: 'GET'
            }, {
                params
            }
        )
    }
}
