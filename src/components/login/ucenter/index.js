Component({
    externalClasses: ['mask-class', 'container-class'],
    properties: {},
    methods: {
        onClick(currentTarget) {
            this.triggerEvent('click', { currentTarget });
        },
        onLogin(currentTarget) {
            this.triggerEvent('login', { currentTarget });
        },
        onSuccess(e) {
            const result = e.detail.result
            this.triggerEvent('login-success', { result })
        },
        onFail(e) {
            const result = e.detail.result
            this.triggerEvent('login-fail', { result })
        }
    }
});
