Component({
    properties: {
        payload: {
            type: Object,
            value: null
        }
    },
    data:{
        list:[]
    },
    observers: {
        'payload': function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                if (newVal.data.length > 0) {
                    this.setData({
                        list: newVal.data.map((item) => {
                            return {
                                ...item,
                                ...{ openType: item.link.action === "contact_service" ? 'contact' : '' }
                            }
                        }),
                    })
                }
            }
        }
    },
    methods: {
        onPress(e) {
            this.triggerEvent('click', { index: e.currentTarget.dataset.index, payload: this.data.payload });
        }
    }
});
