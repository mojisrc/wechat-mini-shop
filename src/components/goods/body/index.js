Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        body: {
            type: Array,
            value: []
        }
    },
    methods: {
        onGoodsClick(e) {
            this.triggerEvent('goods-click', e);
        },
        onImageClick(e) {
            this.triggerEvent('image-click', e);
        }
    }
});
