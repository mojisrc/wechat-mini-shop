Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        placeholder: {
            type: String,
            value: '请选择地区'
        },
        areaNames:{
            type: String,
            value: null
        },
        selected: {
            type: Array,
            value: [0, 0, 0]
        },
        areaList: {
            type: Array,
            value: null
        },
        // 省市县显示列数，3-省市县，2-省市，1-省
        columnsNum: {
            type: [String, Number],
            value: 3
        }
    },
    data: {
        displayList: []
    },
    attached: function () {
        this.initDisplayList()
    },
    methods: {
        columnChange: function (e) {
            let selected = this.data.selected
            selected[e.detail.column] = e.detail.value
            for (let i = 0; i < selected.length; i++) {
                if (e.detail.column < i) {
                    selected[i] = 0
                }
            }
            this.setData({
                selected: selected
            })
            this.initDisplayList()
        },
        change: function () {
            const displayList = this.data.displayList
            let selected = this.data.selected
            const areaList = this.data.areaList
            const areaNames = displayList[0][selected[0]] + ' ' + displayList[1][selected[1]] + ' ' + displayList[2][selected[2]]
            const provinceId = areaList[selected[0]]['id']
            const cityId = areaList[selected[0]]['childs'][selected[1]]['id']
            const areaId = areaList[selected[0]]['childs'][selected[1]]['childs'][selected[2]]['id']
            const ids = [provinceId, cityId, areaId]

            this.setData({
                areaNames
            })
            this.triggerEvent('change', {
                value: this.data.selected,
                areaNames,
                ids
            })
        },
        initDisplayList: function () {
            const displayList = []
            const areaList = this.data.areaList
            let selected = this.data.selected

            displayList[0] = areaList.map(function (item) {
                return item.name;
            })
            displayList[1] = areaList[selected[0]].childs.map(function (item) {
                return item.name;
            })
            displayList[2] = areaList[selected[0]].childs[selected[1]].childs.map(function (item) {
                return item.name;
            })

            this.setData({
                displayList: displayList
            })
        }
    },

});
