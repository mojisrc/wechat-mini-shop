import diff from "deep-diff"
const hasOwn = Object.prototype.hasOwnProperty;

const is = (x, y) => {
    if (x === y) {
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    }
    return x !== x && y !== y;
};

const shallowEqual = (objA, objB) => {
    if (is(objA, objB)) return true;

    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;

    for (let i = 0; i < keysA.length; i++) {
        if (!hasOwn.call(objB, keysA[i]) ||
            !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
};

const defaultMapStateToProps = () => ({});
const defaultMapDispatchToProps = dispatch => ({ dispatch });

const createConnect = (mapStateToProps, mapDispatchToProps) => {
    const app = getApp();
    const mapState = mapStateToProps || defaultMapStateToProps;
    // const mapDispatch = mapDispatchToProps && typeof mapDispatchToProps === 'object' ?
    // dispatch => bindActionCreators(mapDispatchToProps, dispatch) : defaultMapDispatchToProps;

    const mapDispatch = mapDispatchToProps || defaultMapDispatchToProps;

    return (page) => {
        function onStateChange() {
            if (this.unsubscribe) {
                const state = app._store.getState();
                const mappedState = mapState(state);
                if (!shallowEqual(this.data, mappedState)) {
                    let _mappedState = { ...mappedState }

                    Object.keys(mappedState).forEach(function (key) {
                        if (typeof _mappedState[key] === "undefined") {
                            _mappedState[key] = null
                        }
                    });

                    var changes = diff(this.preStoreState, _mappedState);
                    if(changes){
                        this.preStoreState = _mappedState
                        let startTime =  new Date().getTime()
                        this.setData(_mappedState,()=>{
                            let endTime = new Date().getTime()
                            console.log(endTime - startTime, '渲染时长')
                        });
                        if (page.onStateChange && typeof page.onStateChange === 'function') page.onStateChange.call(this);
                    }
                }
            }
        }

        function onLoad(options) {
            this.preStoreState = null
            const isMapStateToProps = Boolean(mapStateToProps);
            if (isMapStateToProps) {
                this.unsubscribe = app._store.subscribe(onStateChange.bind(this));
                onStateChange.apply(this);
            }
            if (page.onLoad && typeof page.onLoad === 'function') page.onLoad.call(this, options);
        }

        function onUnload() {
            if (page.onUnload && typeof page.onUnload === 'function') page.onUnload.call(this);
            if (this.unsubscribe) {
                this.unsubscribe();
                this.unsubscribe = null;
            }
        }

        return Object.assign({},
            page,
            mapDispatch(app._store.dispatch),
            { dispatch: app._store.dispatch },
            { onLoad, onUnload }
        );
    };
};

export default createConnect;
