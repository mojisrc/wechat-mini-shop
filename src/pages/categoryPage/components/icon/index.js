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
        },
    },
    data: {
        itemWidth: 0
    },
    methods: {
        onPress(e) {
            Link.handel(e.currentTarget.dataset.item.link)
        }
    },
    attached() {
        const {width} = this.data
        this.setData({
            itemWidth: (width - 30) / 3
        })
    }
});
