class Matcher {
    constructor() {
        this.condMapper = {
            '=': 'isEqual',
            '!=': 'isNotEqual',
            '>': 'isGreater',
            '<': 'isSmaller',
            '>=': 'isGreaterOrEqual',
            '<=': 'isSmallerOrEqual',
            in: 'isIn',
            notin: 'isNotIn',
            null: 'isNull',
            notnull: 'isNotNull',
            startswith: 'isStartWith',
            endswith: 'isEndWith',
            contains: 'isContain'
        };
    }

    isEqual(left_val, right_val) {
        return left_val == right_val;
    }

    isNotEqual(left_val, right_val) {
        return left_val != right_val;
    }

    isGreater(left_val, right_val) {
        return left_val > right_val;
    }

    isSmaller(left_val, right_val) {
        return left_val < right_val;
    }

    isGreaterOrEqual(left_val, right_val) {
        return left_val >= right_val;
    }

    isSmallerOrEqual(left_val, right_val) {
        return left_val <= right_val;
    }

    isIn(key, arr) {
        return Array.isArray(arr) && arr.includes(key);
    }

    isNotIn(key, arr) {
        return Array.isArray(arr) && !arr.includes(key);
    }

    isNull(val) {
        return val === null;
    }

    isNotNull(val) {
        return val !== null;
    }

    isStartWith(data, val) {
        return data.startsWith(val);
    }

    isEndWith(data, val) {
        return data.endsWith(val);
    }

    isContain(data, val) {
        return data.includes(val);
    }

    match(left_val, op, right_val) {
        if (!(op in this.condMapper)) {
            throw Error('Invalid where condition given');
        }

        return this[this.condMapper[op]](left_val, right_val);
    }
}

module.exports = Matcher;
