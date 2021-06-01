export default class Url {
    static getQueryString(name, url) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        const urlObj = url;
        var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    static parseUrl(url) {
        var query = url.indexOf("?") !== -1 ? url.split("?")[1] : url;
        var queryArr = query.split("&");
        var obj = {};
        queryArr.forEach(function (item) {
            var value = item.split("=")[1];
            var key = item.split("=")[0];
            obj[key] = value;
        });
        return obj;
    }

    /**
     * 对象转url参数
     * @param {*} data
     */
    static httpBuildQuery(data) {
        var _result = [];
        for (var key in data) {
            var value = data[key];
            if (Array.isArray(value)) {
                value.forEach(function (_value) {
                    _result.push(key + "=" + _value);
                });
            } else {
                _result.push(key + '=' + value);
            }
        }
        return _result.join('&');
    }
}
