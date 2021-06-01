import fa from "@/utils/fa";

export default {
    async addMiniFormId(params = {}) {
        return await fa.request(
            {
                url: `wechat/addMiniFormId`,
                method: 'POST'
            }, {
                params
            }
        )
    },
}
