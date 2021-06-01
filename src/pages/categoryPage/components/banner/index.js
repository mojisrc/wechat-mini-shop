import Link from "@/utils/link";

Component({
    externalClasses: [ 'custom-class'],
    properties: {
        dataSource: {
            type: Object,
            value: null
        },
        width: {
            type: Number,
            value: 275
        }
    },
    data: {
        height: 275 / 2
    },
    methods: {
        onPress(e) {
            Link.handel(e.currentTarget.dataset.item.link)
        },
        imageLoad(e) {
            const { width } = this.data
            const ratio = e.detail.width / width
            this.setData({
                height: e.detail.height / ratio
            })
        }
    },
});
