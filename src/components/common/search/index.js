Component({
    externalClasses: [ 'custom-class'],
    properties: {
        keywords: {
            type: [String, Number],
            value: null
        },
        categoryId: {
            type: [String, Number],
            value: null
        },
        categoryKeywords: {
            type: String,
            value: null
        },
        showSearchBar: {
            type: Boolean,
            value: true
        },
    },
    data:{
        inputFoucs:false
    },
    ready:function(){
        if(!this.data.categoryId){
            this.setData({
                inputFoucs : true
            })
        }
    },
    methods: {
        showInput: function () {
            this.setData({
                inputFoucs: true
            });
        },
        hideInput: function () {
            this.setData({
                keywords: "",
                inputFoucs: false
            });
        },
        clearInput: function () {
            this.setData({
                keywords: ""
            });
        },
        onInput: function (e) {
            const keywords = e.detail.value.substring(0,20)
            if (this.categoryId) {
                this.setData({
                    categoryKeywords: this.data.categoryKeywords + keywords,
                    keywords: keywords,
                });
            } else {
                this.setData({
                    keywords: keywords
                })
            }
        },
        onSearch(e) {
            this.setData({
                inputFoucs:false
            });
            this.triggerEvent('search-confirm', {
                keywords: this.data.keywords,
                categoryId: this.data.categoryId,
                categoryKeywords: this.data.categoryKeywords,
            })
        },
        onCategoryCancel(){
            this.setData({
                keywords: "",
                inputFoucs:true
            });
        },
        onInputBlur(){
            this.setData({
                inputFoucs:false
            });
        },
        onInputFocus(){
            this.setData({
                inputFoucs:true
            });
        }
    }
});
