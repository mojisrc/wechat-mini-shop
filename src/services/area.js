import fa from "@/utils/fa";
import cache from "@/utils/cache";
import Arr from "@/utils/array"

export default {
    async list(params = {}) {
        return await fa.request(
            {
                url: `area/list`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async info(params = {}) {
        return await fa.request(
            {
                url: `area/info`,
                method: 'GET'
            }, {
                params
            }
        )
    },
    async cache(refresh = false) {
        try {
            let areaList = [];
            if (refresh) {
                const res = await this.list({ level: 2 })
                areaList = res.result.list
                cache.set('area.list', areaList)
            } else {
                areaList = cache.get("area.list");
                if (!Array.isArray(areaList) || (Array.isArray(areaList) && areaList.length === 0)) {
                    const result = await this.list({ level: 2 })
                    areaList = result.list
                    cache.set('area.list', areaList)
                }
            }
            return areaList
        } catch (e) {
            return false
        }
    },
    async tree() {
        try {
            return Arr.toTreeFillChildren(await this.cache())
        } catch (e) {
            return []
        }
    }
}
