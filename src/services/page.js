import fa from "@/utils/fa";

export default {
    async portal(params = {}) {
        return await fa.request(
            {
                url: `page/portal`,
                method: 'GET',
            }, {
                params
            },
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `page/info`,
                method: 'GET',
            }, {
                params
            }
        )
    },
    async extra(params = {}) {
        return await fa.request(
            {
                url: `page/extra`,
                method: 'GET',
            }, {
                params
            }
        )
    },
}
