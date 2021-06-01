export default class Amount {
    /**
     * 实时动态强制更改用户录入
     * arg1 inputObject
     **/
    static amount(value) {
        value = `${value}`
        var regStrs = [
            ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
            ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
            ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
            ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
        ];
        for (var i = 0; i < regStrs.length; i++) {
            var reg = new RegExp(regStrs[i][0]);
            value = value.replace(reg, regStrs[i][1]);
        }
        return value
    }

    /**
     * 录入完成后，输入模式失去焦点后对录入进行判断并强制更改，并对小数点进行0补全
     * arg1 inputObject
     **/
    static overFormat(value) {
        var v = `${value}`;
        if (v === '') {
            v = '0.00';
        } else if (v === '0') {
            v = '0.00';
        } else if (v === '0.') {
            v = '0.00';
        } else if (/^0+\d+\.?\d*.*$/.test(v)) {
            v = v.replace(/^0+(\d+\.?\d*).*$/, '$1');
        } else if (/^0\.\d$/.test(v)) {
            v = v + '0';
        } else if (!/^\d+\.\d{2}$/.test(v)) {
            if (/^\d+\.\d{2}.+/.test(v)) {
                v = v.replace(/^(\d+\.\d{2}).*$/, '$1');
            } else if (/^\d+$/.test(v)) {
                v = v + '.00';
            } else if (/^\d+\.$/.test(v)) {
                v = v + '00';
            } else if (/^\d+\.\d$/.test(v)) {
                v = v + '0';
            } else if (/^[^\d]+\d+\.?\d*$/.test(v)) {
                v = v.replace(/^[^\d]+(\d+\.?\d*)$/, '$1');
            } else if (/\d+/.test(v)) {
                v = v.replace(/^[^\d]*(\d+\.?\d*).*$/, '$1');
                ty = false;
            } else if (/^0+\d+\.?\d*$/.test(v)) {
                v = v.replace(/^0+(\d+\.?\d*)$/, '$1');
                ty = false;
            } else {
                v = '0.00';
            }
        }
        return v
    }
}
