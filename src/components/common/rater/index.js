Component({
    externalClasses: [ 'custom-class'],
    properties: {
        size: {
            type: Number,
            value: 12
        },
        num: {
            type: Number,
            value: 5
        },
        value:{
            type:Number,
            value:3
        }
    },
    ready: function () {
        let list = []
        for (let i = 1; i <= this.data.num; i++) {
            list = i
        }
        this.setData({
            list
        })
    },
    methods: {
        onChange(e){
            console.log(e.currentTarget.dataset.value)
            this.triggerEvent('change', { value: e.currentTarget.dataset.value  });
        }
    }
});
