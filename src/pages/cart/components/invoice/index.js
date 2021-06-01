import validate from "@/utils/validate";
import Toast from "@/utils/toast";

Component({
    externalClasses: [ 'custom-class'],
    properties: {
        typeList: {
            type: Array,
            value: [
                {
                    id: 1,
                    title: '普通发票',
                },
                {
                    id: 0,
                    title: '不开具',
                }
            ]
        },
        headerList: {
            type: Array,
            value: [
                {
                    id: 0,
                    title: '个人',
                }, {
                    id: 1,
                    title: '公司',
                }
            ]
        }
    },
    data: {
        visible: false,
        type: 0,
        header: 0,
        company: '',
        tax_number: '',
    },
    methods: {
        onChange(e) {
            this.setData({
                _selectId: e.detail.selectId,
                _selectCouponInfo: e.detail.selectCouponInfo,
            })
        },
        onTypePress(e) {
            this.setData({
                type: e.currentTarget.dataset.id
            })
        },
        onHeaderPress(e) {
            this.setData({
                header: e.currentTarget.dataset.id
            })
        },
        onCompanyChange(e) {
            this.setData({
                company: e.detail.detail.value
            })
        },
        onTaxNumberChange(e) {
            this.setData({
                tax_number: e.detail.detail.value
            })
        },
        onSubmit() {
            const { type, company, tax_number, header } = this.data
            // 开发票
            if (type === 1) {
                // 公司
                if (header === 1 && (validate.isEmpty(tax_number) || validate.isEmpty(company))) {
                    Toast.fail("请完善票据信息")
                }
                this.triggerEvent('onConfirm', {
                    type,
                    company,
                    tax_number,
                    header
                });
                // 不开发票
            } else {
                this.triggerEvent('onConfirm', {
                    type,
                    company: '',
                    tax_number: '',
                    header: 0
                });
            }
            this.close()
        },
        close() {
            this.setData({
                visible: false
            })
        },
        show() {
            this.setData({
                visible: true
            })
        },
    },
})
