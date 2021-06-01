Component({
    behaviors: ['wx://form-field'],
    properties: {
        placeholder: {
            type: String,
            value: '请选择地区'
        },
        areaList: {
            type: Array,
            value: null
        },
        value: {
            type: Array,
            value: null
        },
        // 省市县显示列数，3-省市县，2-省市，1-省
        columnsNum: {
            type: [String, Number],
            value: 3
        },
    },
    data: {
        range: [],
        text: '',
        selected: [0, 0, 0],
        items: []
    },
    observers: {
        'areaList': function (areaList) {
            if(Array.isArray(areaList) && areaList.length>0){
                const range = this.getRange()
                this.setData({
                    range
                })
            }
        },
        'value': function (value) {
            const { areaList } = this.data
            // 防止第一次没传入报错
            if (areaList && areaList.length > 0) {
                // 防止第一次没值报错
                if (Array.isArray(value) && value.length === 3) {
                    // 防止默认值不对
                    if (value[0] > 0 && value[1] > 0 && value[2] > 0) {
                        let selected = []
                        let range = [[], [], []]
                        let items = []
                        // 赋值selected
                        areaList.map((province, index) => {
                            range[0].push({ id: province.id, name: province.name })
                            if (province.id === value[0]) {
                                selected.push(index)
                                items.push({ id: province.id, name: province.name })
                                province.children.map((city, cIndex) => {
                                    range[1].push({ id: city.id, name: city.name })
                                    if (city.id === value[1]) {
                                        selected.push(cIndex)
                                        items.push({ id: city.id, name: city.name })
                                        city.children.map((area, aIndex) => {
                                            range[2].push({ id: area.id, name: area.name })
                                            if (area.id === value[2]) {
                                                selected.push(aIndex)
                                                items.push({ id: area.id, name: area.name })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                        this.setData({
                            text: `${items[0]['name']} ${items[1]['name']} ${items[2]['name']}`,
                            selected,
                            range,
                            items
                        })

                    }
                }
            }
        },
    },
    methods: {
        onColumnChange: function (e) {
            let selected = this.data.selected
            selected[e.detail.column] = e.detail.value
            for (let i = 0; i < selected.length; i++) {
                if (e.detail.column < i) {
                    selected[i] = 0
                }
            }
            let range = this.getRange()
            this.setData({
                range,
                selected
            })
        },
        onChange: function (e) {
            let selected = e.detail.value
            let { range } = this.data
            let items = [range[0][selected[0]], range[1][selected[1]], range[2][selected[2]]]
            let value = [items[0].id, items[1].id, items[2].id]
            this.setData({
                value
            })
            this.triggerEvent('change', {
                value,
                items,
            })
        },
        getRange: function () {
            let range = []
            let areaList = Array.isArray(this.data.areaList) ? this.data.areaList : []
            let { selected } = this.data
            range[0] = areaList.map(function (item) {
                return item;
            })
            range[1] = areaList[selected[0]].children.map(function (item) {
                return item;
            })
            range[2] = areaList[selected[0]].children[selected[1]].children.map(function (item) {
                return item;
            })
            return range
        }
    },

});
