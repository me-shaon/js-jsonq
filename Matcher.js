class Matcher {
    constructor() {
        this.condMapper = {
            '=': 'isEqual',
            eq: 'isEqual',
            '!=': 'isNotEqual',
            neq: 'isNotEqual',
            '==': 'isStrictEqual',
            seq: 'isStrictEqual',
            '!==': 'isStrictNotEqual',
            sneq: 'isStrictNotEqual',
            '>': 'isGreater',
            gt: 'isGreater',
            '<': 'isLess',
            lt: 'isLess',
            '>=': 'isGreaterOrEqual',
            gte: 'isGreaterOrEqual',
            '<=': 'isLessOrEqual',
            lte: 'isLessOrEqual',
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

    isStrictEqual(left_val, right_val) {
        return left_val === right_val;
    }

    isNotEqual(left_val, right_val) {
        return left_val != right_val;
    }

    isStrictNotEqual(left_val, right_val) {
        return left_val !== right_val;
    }

    isGreater(left_val, right_val) {
        return left_val > right_val;
    }

    isLess(left_val, right_val) {
        return left_val < right_val;
    }

    isGreaterOrEqual(left_val, right_val) {
        return left_val >= right_val;
    }

    isLessOrEqual(left_val, right_val) {
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
