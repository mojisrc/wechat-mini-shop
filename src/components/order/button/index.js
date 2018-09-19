Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {
        size:{
            type:String,
            value:null
        },
        text:{
            type:String,
            value: null
        },
        type: {
            type: String,
            value: null
        },
        active: {
            type: Boolean,
            value: false
        }
    },
    methods: {
        onClick(e){
            this.triggerEvent('click',e);
        }
    }
});
