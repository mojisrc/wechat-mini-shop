import fa from "@/utils/fa";

export default {
    async portal(params = {}) {
        return await fa.request(
            {
                url: `categorypage/portal`,
                method: 'GET',
            }, {
                params
            },
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `categorypage/info`,
                method: 'GET',
            }, {
                params
            },
        )
    },
}
