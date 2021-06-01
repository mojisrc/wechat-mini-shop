import fa from "@/utils/fa";

export default {
    async addImage(params = {}) {
        return await fa.request(
            {
                url: `shop/addImage`,
                method: 'POST'
            }, {
                params
            }
        )
    },
}
