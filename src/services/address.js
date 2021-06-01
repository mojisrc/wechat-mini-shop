import fa from "@/utils/fa";

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `address/list`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `address/info`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async add(params = {}) {
        return await fa.request(
            {
                url: `address/add`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async edit(params = {}) {
        return await fa.request(
            {
                url: `address/edit`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async del(params = {}) {
        return await fa.request(
            {
                url: `address/del`,
                method: 'POST'
            }, {
                params
            }
        )
    },
    async types(params = {}) {
        return await fa.request(
            {
                url: `address/types`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async getDefault(params = {}) {
        return await fa.request(
            {
                url: `address/default`,
                method: 'GET',
            }, {
                params
            }
        )
    },
    async setDefault(params = {}) {
        return await fa.request(
            {
                url: `address/setDefault`,
                method: 'POST'
            }, {
                params
            }
        )
    }
}
