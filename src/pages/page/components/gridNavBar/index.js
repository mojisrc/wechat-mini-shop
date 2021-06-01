Component({
    externalClasses: [ 'custom-class'],
    properties: {
        payload: {
            type: Object,
            value: null
        },
    },
    data: {
        itemWidth: 0,
        list: []
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
        onClick(e) {
            this.triggerEvent('click', { index: e.currentTarget.dataset.index, payload: this.data.payload });
        }
    },
    lifetimes: {
        attached: function() {
            this.setData({
                itemWidth: (100 / this.data.payload.options.each_row_display)
            })
        },

    },
});
