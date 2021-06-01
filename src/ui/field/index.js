// https://vant-contrib.gitee.io/vant-weapp/#/field
function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}

Component({
    behaviors: ['wx://form-field'],
    properties: {
        // 额外
        title: { type: String, value: '' },
        range: { type: Array, value: [] },
        max: { type: Number },
        maxCount: { type: Number, value: 9 },
        multiple: { type: Boolean, value: true },
        uploader: {
            type: Object,
            value: {
                url: '',
                filePath: '',
                name: '',
                header: {},
                formData: {},
            }
        },
        areaList: {
            type: Array,
            value: []
        },
        // van
        name: { type: String, value: '' },
        label: { type: String, value: '' },
        size: { type: String, value: '' },
        // 当为数组时，提交存在bug  数据是 xx,x,xx 正确应该是[xx,x,xx]
        // value: { type: String, optionalTypes: [Array, String, Number] },
        type: { type: String, value: 'textarea' },
        fixed: { type: Boolean, value: false },
        focus: { type: Boolean, value: false },
        border: { type: Boolean, value: true },
        disabled: { type: Boolean, value: false },
        readonly: { type: Boolean, value: false },
        clearable: { type: Boolean, value: false },
        clickable: { type: Boolean, value: false },
        required: { type: Boolean, value: false },
        center: { type: Boolean, value: false },
        password: { type: Boolean, value: false },
        titleWidth: { type: String, value: '6.2em' },
        maxlength: { type: Number, value: -1 },
        placeholder: { type: String, value: '' },
        placeholderStyle: { type: String, value: '' },
        customStyle: { type: String, value: '' },
        isLink: { type: Boolean, value: false },
        arrowDirection: { type: String, value: '' },
        showWordLimit: { type: Boolean, value: false },
        error: { type: Boolean, value: false },
        errorMessage: { type: String, value: '' },
        errorMessageAlign: { type: String, value: '' },
        inputAlign: { type: String, value: 'right' },
        autosize: { type: Boolean, optionalTypes: [Boolean, Object], value: false },
        leftIcon: { type: String, value: '' },
        rightIcon: { type: String, value: '' },
        confirmType: { type: String, value: 'done' },
        confirmHold: { type: Boolean, value: false },
        holdKeyboard: { type: Boolean, value: false },
        cursorSpacing: { type: Number, value: 50 },
        adjustPosition: { type: Boolean, value: true },
        showConfirmBar: { type: Boolean, value: true },
        selectionStart: { type: Number, value: -1 },
        selectionEnd: { type: Number, value: -1 },
        autoFocus: { type: Boolean, value: false },
        disableDefaultPadding: { type: Boolean, value: true },
        cursor: { type: Number, value: -1 },
    },
    data: {
        fileList: [],
    },
    observers: {
        'value': function (value) {
            const { type } = this.data
            if (type === 'uploader') {
                this.setData({
                    fileList: value.map((url) => {
                        return {
                            name: '',
                            url,
                            type: 'image'
                        }
                    })
                })
            }
        }
    },
    methods: {
        input(event) {
            this.triggerEvent('input', event.detail);
        },
        change(event) {
            const { type } = this.data
            switch (type) {
                case 'picker':
                    this.setData({
                        value: event.detail.value
                    })
                    this.triggerEvent('change', event.detail);
                    break
                case 'checkbox':
                    this.setData({
                        value: event.detail.value
                    })
                    this.triggerEvent('change', event.detail);
                    break
                case 'switch':
                    this.setData({
                        value: event.detail
                    })
                    this.triggerEvent('change', event.detail);
                    break
                case 'area':
                    this.setData({
                        value: event.detail.value
                    })
                    this.triggerEvent('change', event.detail);
                    break
                default:
                    this.setData({
                        value: event.detail
                    })
                    this.triggerEvent('change', event.detail);
            }
            // if (isNumber(this.data.max) && (this.data.type === 'number' || this.data.type === 'digit')) {
                // TOOD 增加不能操作过 小于 min max功能
                // if(parseFloat(isNumber(e.detail) || !e.detail ? 0 : e.detail)){
                //
                // }
                // this.setData({
                //     value:2
                // })
            // }
        },
        confirm(event) {
            this.triggerEvent('confirm', event.detail);
        },
        clickIcon() {
            this.triggerEvent('click-icon');
        },

        focus(event) {
            this.triggerEvent('focus', event.detail);
        },
        blur(event) {
            this.triggerEvent('blur', event.detail);
        },
        clear(event) {
            this.triggerEvent('clear');
        },
        clickInput() {
            this.triggerEvent('click-input');
        },
        linechange(event) {
            this.triggerEvent('linechange', event.detail);
        },
        keyboardheightchange(event) {
            this.triggerEvent('keyboardheightchange', event.detail);
        },
        uploaderChooseImage: function (e) {
            const { fileList, maxCount, uploader, value } = this.data
            if (fileList.length >= maxCount) {
                return false
            } else {
                const { file } = e.detail
                file.map((item) => {
                    wx.getFileSystemManager().readFile({
                        filePath: item.url, //选择图片返回的相对路径
                        encoding: 'base64', //编码格式
                        success: (base64Res) => {
                            wx.uploadFile({
                                ...uploader,
                                filePath: item.url,
                                success: (res) => {
                                    let filesRes = JSON.parse(res.data)
                                    fileList.push({
                                        url: filesRes.result.origin.path,
                                        name: '',
                                        type: 'image'
                                    })
                                    this.setData({
                                        value: fileList.map((item) => {
                                            return item.url
                                        })
                                    })
                                }
                            })
                        }
                    })
                })
            }
        },
        uploaderDel(e) {
            const { index } = e.detail
            const { value } = this.data
            value.splice(index, 1);
            this.setData({
                value
            })
        }
    }
});
