import Arr from "@/utils/array"

Component({
    externalClasses: [ 'custom-class'],
    properties: {
        prefixCls: {
            type: String,
            value: 'filterbar',
        },
        items: {
            type: Array,
            value: [],
        },
        cancelText: {
            type: String,
            value: '重置',
        },
        confirmText: {
            type: String,
            value: '确定',
        },
    },
    data: {
        tempCheckedValues: [],
        selectIndex: null
    },
    observers: {
        ['items.**'](newVal) {
            this.setData({ tempCheckedValues: getDisplayValues(newVal) })
        },
    },
    methods: {
        onChecked(e) {
            const { type, index, childIndex } = e.currentTarget.dataset
            const { items } = this.data
            let _values = [...items]
            // 当单选关闭
            if (type === 'radio') {
                _values[index].value = _values[index].children[childIndex].value
                _values[index].children = _values[index].children.map((item, _index) => {
                    return Object.assign({}, item, {
                        checked: parseInt(childIndex) === _index,
                    })
                })
                this.setData({
                    tempCheckedValues: _values
                }, () => {
                    this.onLabelToggle(e)
                    this.triggerEvent('onChange', { items: _values, values: getValues(_values) ,index:index})
                })
            } else if (type === 'text') {
                _values[index].value = !_values[index].value
                this.setData({
                    tempCheckedValues: _values
                }, () => {
                    this.triggerEvent('onChange', { items: _values, values: getValues(_values),index:index })
                })
            } else if (type === 'sort') {
                if (_values[index].value === 'down') {
                    _values[index].value = null
                } else {
                    _values[index].value = _values[index].value === null ? 'up' : 'down'
                }
                this.setData({
                    tempCheckedValues: _values
                }, () => {
                    this.triggerEvent('onChange', { items: _values, values: getValues(_values),index:index })
                })
            } else if (type === 'checkbox') {
                _values[index].children = _values[index].children.map((item, _index) => {
                    item.checked = parseInt(childIndex) === _index ? !item.checked : item.checked
                    return item
                })
                let pValue = []
                _values[index].children.map((item) => {
                    if (item.checked) {
                        pValue.push(item.value)
                    }
                })
                _values[index].value = pValue
                this.setData({ tempCheckedValues: _values })
            }
            // 复选不关闭
        },
        onConfirm(e) {
            const { tempCheckedValues } = this.data
            const {index} = e.currentTarget.dataset
            this.triggerEvent('onChange', { items: tempCheckedValues, values: getValues(tempCheckedValues) ,index:index})
            this.onLabelToggle(e)
        },
        onLabelToggle(e) {
            const { type, index } = e.currentTarget.dataset
            // 文字切换
            if (type === 'text') {
                this.onChecked(e)
            }
            // 排序切换
            if (type === 'sort') {
                this.onChecked(e)
            }
            if (type === 'checkbox' || type === 'radio') {
                const { items } = this.data
                let _values = [...items]
                this.triggerEvent('onChange', { items: _values, values: getValues(_values) ,index:index})
            }
            const { selectIndex } = this.data
            this.setData({
                selectIndex: (selectIndex === null || index !== selectIndex) ? parseInt(index) : null
            })
        }
    }
})

function getDisplayValues(options = []) {
    return options.reduce((acc, option) => {
        switch (option.type) {
            case 'radio':
                option.children.map((item) => {
                    item['checked'] = option.value === item.value
                    return item
                })
                acc.push(option)
                break
            case 'checkbox':
                option.children.map((item) => {
                    item['checked'] = option.value !== null ? Arr.inArray(item.value, option.value) : false
                    return item
                })
                acc.push(option)
                break
            default:
                acc.push(option)
        }
        return acc
    }, [])
}


function getValue(children = [], single = false) {
    const allValues = children.filter((v) => v.checked).map((v) => v.value)
    if (!single) return allValues
    return allValues[0] || null
}

function getValues(options = []) {
    return options.reduce((acc, option) => {
        switch (option.type) {
            case 'radio':
                acc.push(getValue(option.children, true))
                break
            case 'checkbox':
                acc.push(getValue(option.children, false))
                break
            case 'text':
                acc.push(option.value)
                break
            case 'sort':
                acc.push(option.value)
                break
        }
        return acc
    }, [])
}
