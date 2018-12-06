exports.default = Component({
    externalClasses: ['img-class'],
    properties: {
        src: {
            type: String,
            value: null
        },
        size: {
            type: [String, Number],
            value: 30
        }
    },
    data: {},
    methods: {
        onClick: function () {
            this.triggerEvent('click');
        }
    }
});
