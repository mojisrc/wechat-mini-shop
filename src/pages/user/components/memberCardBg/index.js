import navigation from "@/utils/navigation";

Component({
    externalClasses: [ 'custom-class'],
    properties: {
        login: {
            type: Boolean,
            value: false
        },
        card: {
            type: Object,
            value: null
        },
    },
    observers: {
        'card': function (newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                this.setData({
                    isVip: newVal !== null
                })
            }
        }
    },
    data: {
        isVip: false
    },
    methods: {
        onBtnPress() {
            const { login, isVip } = this.data
            if (!login) {
                navigation.navigate('user/login')
            } else {
                if (isVip) {
                    navigation.navigate('card/index')
                } else {
                    navigation.navigate('card/buy')
                }
            }
        }
    },
});
