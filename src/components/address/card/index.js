Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        addressId: {
            type: [String, Number],
            value: null,
        },
        name: {
            type: String,
            value: null
        },
        phone: {
            type: String,
            value: null
        },
        address: {
            type: String,
            value: null
        },
        checked: {
            type: Boolean,
            value: false
        }
    },
    methods: {
        onEdit: function (e) {
            this.triggerEvent('edit', {
                addressId: e.currentTarget.dataset.id
            });
        },
        onChecked: function (e) {
            console.log(e)
            this.triggerEvent('checked', {
                addressId: e.currentTarget.dataset.id
            });
        }
    },
});
