export default class Shy {
    static phone(tel) {
        if (tel) {
            var reg = /^(\d{3})\d{4}(\d{4})$/;
            return tel.replace(reg, "$1****$2");
        } else {
            return null
        }
    }

    static idcard(idcard) {
        var frontLen = 3
        var endLen = 4
        var star = ""
        if (idcard) {
            var len = idcard.length - frontLen - endLen;
            for (var i = 0; i < len; i++) {
                star += '*';
            }
            return idcard.substring(0, frontLen) + star + idcard.substring(idcard.length - endLen);
        } else {
            return null
        }
    }
}
