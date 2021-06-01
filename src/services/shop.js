import fa from "@/utils/fa";

export default {
    async info(params = {}) {
        return await fa.request(
            {
                url: `shop/info`,
                method: 'GET'
            }, {
                params
            }
        )
    },
}
