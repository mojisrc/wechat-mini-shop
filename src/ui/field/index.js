Component({
    behaviors: ['wx://form-field'],

    properties: {
        title: String,
        desc: String,
        type: {
            type: String,
            value: 'input'
        },
        disabled: Boolean,
        loading: Boolean,
        checked: Boolean,
        inputType: {
            type: String,
            value: 'text'
        },
        pickerMode: {
            type: String,
            value: 'selector'
        },
        placeholder: String,
        focus: Boolean,
        mode: {
            type: String,
            value: 'normal'
        },
        range: {
            type: Array,
            value: []
        },
        rangeKey: {
            type: String,
            value: null
        },
        right: Boolean,
        error: Boolean,
        maxlength: {
            type: Number,
            value: 140
        },
        areaNames:{
            type: String,
            value: null
        },
        areaList: {
            type: Array,
            value: []
        },
        uploaderCount: {
            type: Number,
            value: 1
        },
        uploaderFiles: {
            type: Array,
            value: []
        },
        uploaderName: {
            type: String,
            value: 'image'
        },
        uploaderUrl: {
            type: String,
            value: null
        },
        uploaderButtonText: String,
        uploaderHeader: {
            type: Object,
            value: {}
        },
        uploaderFormData: {
            type: Object,
            value: {}
        },
        uploaderAllowDel: {
            type: Boolean,
            value: false
        }
    },
    methods: {
        handleFieldChange(event) {
            const { detail = {} } = event;
            const { value = '' } = detail;
            this.setData({ value });
            this.triggerEvent('change', event);
        },

        handleFieldFocus(event) {
            this.triggerEvent('focus', event);
        },
        handleFieldBlur(event) {
            this.triggerEvent('blur', event);
        },
        uploaderChooseImage: function (e) {
            let that = this;
            if (that.data.uploaderFiles.length >= that.data.uploaderCount) {
                return false
            } else {
                wx.chooseImage({
                    count: that.data.uploaderCount,
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        // todo 优化先预览后返回覆盖
                        const tempFilePaths = res.tempFilePaths
                        for(let i=0;i<=tempFilePaths.length;i++){
                            wx.uploadFile({
                                url: that.data.uploaderUrl,
                                filePath: tempFilePaths[i],
                                name: that.data.uploaderName,
                                header: that.data.uploaderHeader,
                                formData: that.data.uploaderFormData,
                                success: function (res) {
                                    that.triggerEvent('success', JSON.parse(res.data));
                                }
                            })
                        }
                    }
                })
            }
        },
        uploaderPreviewImage: function (e) {
            wx.previewImage({
                current: e.currentTarget.id,
                urls: this.data.uploaderFiles
            })
        },
        uploaderDelImage(e){
            console.log(e)
            this.triggerEvent('delete', {
                index : e.currentTarget.dataset.index,
                url: e.currentTarget.dataset.url,
            });
        }
    }
});
