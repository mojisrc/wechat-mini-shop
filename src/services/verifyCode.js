import fa from "@/utils/fa";

export default {
    async add(params = {}) {
        return await fa.request(
            {
                url: `verifycode/add`,
                method: 'POST'
            }, {
                params
            }
        )
    },
}
