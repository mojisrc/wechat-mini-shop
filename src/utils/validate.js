import validator from '../libs/validator/validator';

export default class Validate {
    data = {}

    getData() {
        return this.data
    }

    setData(data) {
        this.data = data
    }

    check(data, rule) {
        if (validator.isEmpty(data) === false) {
            for (let field in data) {
                let rules = rule[field].split('|')
                for (let rule in rules) {

                    switch (rule) {
                        case 'notEmpty':
                            if (validator.isEmpty(data[field]) === true) {
                                return false
                            }
                            break
                        case 'Number':
                            if (!isNaN(Number)) {
                                return false
                            }
                            break
                        case 'String':
                            if (typeof (Number) !== 'string') {
                                return false
                            }
                            break
                        default:
                            break
                    }
                }
            }
        } else {
            return true
        }
    }

    /**
     *
     * @param value
     * @returns {boolean}
     */
    static isEmpty(value) {
        if (value === null || typeof (value) === 'undefined') {
            return true
        } else {
            return false
        }
    }
}
