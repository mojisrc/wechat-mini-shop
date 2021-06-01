import arrayToTree from "smart-arraytotree";

export default class Arr {
    /**
     *
     * @param value
     * @param {Array} arr
     * @returns {boolean}
     */
    static inArray(value, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (value === arr[i]) {
                return true;
            }
        }
        return false;
    }

    /**
     * 删除
     * @param  {Array|String|Number} value
     * @param arr
     * @returns {*}
     */
    static del(value,arr){
        for (var i = 0; i < arr.length; i++) {
            if (value === arr[i]) {
                arr.splice(i,1);
            }
        }
        return arr
    }
    /**
     * 去重
     * @param {Array} arr
     * @returns {Array}
     */
    static unique(arr) {
        var hash = [];
        for (var i = 0; i < arr.length; i++) {
            if (hash.indexOf(arr[i]) === -1) {
                hash.push(arr[i]);
            }
        }
        return hash;
    }

    /**
     * 正反选
     * @param value
     * @param arr
     */
    static toggle(value,arr){
        let _arr = arr.concat()
        if (Arr.inArray(value,arr)) {
            _arr = Arr.del(value,arr)
        } else {
            _arr.push(value)
        }
        return _arr
    }

    /**
     *
     * @param {Array} arr1
     * @param  {Array} arr2
     * @returns {Array}
     */
    static merge(arr1, arr2) {
        for (var i = 0; i < arr2.length; i++) {
            arr1.push(arr2[i]);
        }
        return arr1;
    }

    /**
     * 合并多个数组
     * [arr1,arr2,arr3,....]
     * @param arrs
     * @returns {[]}
     */
    static mergeAll(arrs){
        let result = []
        arrs.map((arr)=>{
            if(Array.isArray(arr) && arr.length>0){
                arr.map((item)=>{
                    result.push(item)
                })
            }
        })
        return result
    }

    static toTree(list) {
        return arrayToTree(list, { id: "id", pid: "pid", firstPid: 0, children: "children" }) ?? [];
    }

    /**
     * 补全tree结构的children
     * 方便在需要必须每级都包含children的时候使用
     */
    static toTreeFillChildren(list) {
        list.map(function(item, index) {
            list[index]["children"] = [];
        });
        return arrayToTree(list, { id: "id", pid: "pid", firstPid: 0, children: "children" }) ?? [];
    }

    static objectToArray(object){
        var arr = []
        for (let i in object) {
            arr.push(object[i]);
        }
        return arr
    }



}
