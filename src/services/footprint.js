import fa from "@/utils/fa";

export default {
    async goodsList(params = {}) {
        return await fa.request(
            {
                url: `footprint/goodsList`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
