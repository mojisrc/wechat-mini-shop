import Time from "@/utils/time";

Component({
    externalClasses: ['custom-class'],
    properties: {
        refundInfo: {
            type: Object,
            value: null
        },
        steps: {
            type: Array,
            value: []
        }
    },
    data: {
        active: null
    },
    ready() {
        const { refundInfo } = this.data
        let data = {
            active: 0,
            steps: [
                {
                    text: '买家退款',
                    desc: Time.format('M/D h:m', refundInfo.create_time)
                },
                {
                    text: '商家受理',
                    desc: refundInfo.handle_time ? Time.format('M/D h:m', refundInfo.handle_time) : "-"
                },
                {
                    text: '退款成功',
                    desc: refundInfo.success_time ? Time.format('M/D h:m', refundInfo.success_time) : "-"
                }
            ]
        }
        if (refundInfo.refund_type === 2 && refundInfo.handle_state === 20 && refundInfo.is_close === 0 && refundInfo.send_expiry_time > 0) {
            data['active'] = 1
        } else if (refundInfo.handle_state === 30) {
            data['active'] = 2
        }
        this.setData(data)
    },
    methods: {}
});
