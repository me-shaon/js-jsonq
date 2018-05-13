class Matcher {
    /**
     * constructor
     *
     * @returns
     */
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
            contains: 'isContain',
            match: 'hasMatch',
            macro: 'execMacro'
        };
    }

    /**
     * isEqual - Checks if the given values are equal
     *
     * @param {mixed} a
     * @param {mixed} b
     *
     * @returns {bool}
     */
    isEqual(a, b) {
        return a == b;
    }

    /**
     * isStrictEqual - Checks if the given values are Strictly equal
     *
     * @param {mixed} a
     * @param {mixed} b
     *
     * @returns {bool}
     */
    isStrictEqual(a, b) {
        return a === b;
    }

    /**
     * isNotEqual - Checks if the given values are not equal
     *
     * @param {mixed} a
     * @param {mixed} b
     *
     * @returns {bool}
     */
    isNotEqual(a, b) {
        return a != b;
    }

    /**
     * isStrictNotEqual - Checks if the given values are Strictly not equal
     *
     * @param {mixed} a
     * @param {mixed} b
     *
     * @returns {bool}
     */
    isStrictNotEqual(a, b) {
        return a !== b;
    }

    /**
     * isGreater - Checks if the given value 'a' is greater than given value 'b'
     *
     * @param {mixed} a
     * @param {mixed} b
     *
     * @returns {bool}
     */
    isGreater(a, b) {
        return a > b;
    }

    /**
     * isLess - Checks if the given value 'a' is less than given value 'b'
     *
     * @param {mixed} a
     * @param {mixed} b
     *
     * @returns {bool}
     */
    isLess(a, b) {
        return a < b;
    }

    /**
     * isGreaterOrEqual - Checks if the given value 'a' is greater or equal
     * than given value 'b'
     *
     * @param {mixed} a
     * @param {mixed} b
     *
     * @returns {bool}
     */
    isGreaterOrEqual(a, b) {
        return a >= b;
    }

    /**
     * isLessOrEqual - Checks if the given value 'a' is less or equal
     * than given value 'b'
     *
     * @param {mixed} a
     * @param {mixed} b
     *
     * @returns {bool}
     */
    isLessOrEqual(a, b) {
        return a <= b;
    }

    /**
     * isIn - Checks if the given 'key' is in given array 'arr'
     *
     * @param {mixed} key
     * @param {Array} arr
     *
     * @returns {bool}
     */
    isIn(key, arr) {
        return Array.isArray(arr) && arr.includes(key);
    }

    /**
     * isNotIn - Checks if the given 'key' is not in given array 'arr'
     *
     * @param {mixed} key
     * @param {Array} arr
     *
     * @returns {bool}
     */
    isNotIn(key, arr) {
        return Array.isArray(arr) && !arr.includes(key);
    }

    /**
     * isNull - Checks if the given 'val' is null
     *
     * @param {mixed} val
     *
     * @returns {bool}
     */
    isNull(val) {
        return val === null;
    }

    /**
     * isNotNull - Checks if the given 'val' is not null
     *
     * @param {mixed} val
     *
     * @returns {bool}
     */
    isNotNull(val) {
        return val !== null;
    }

    /**
     * isStartWith - Checks if the given string 'str' starts with given 'val'
     *
     * @param {string} str
     * @param {string} val
     *
     * @returns {bool}
     */
    isStartWith(str, val) {
        return str.startsWith(val);
    }

    /**
     * isEndWith - Checks if the given string 'str' ends with given 'val'
     *
     * @param {string} str
     * @param {string} val
     *
     * @returns {bool}
     */
    isEndWith(str, val) {
        return str.endsWith(val);
    }

    /**
     * isContain - Checks if the given string 'str' contains given 'val'
     *
     * @param {string} str
     * @param {string} val
     *
     * @returns {bool}
     */
    isContain(str, val) {
        return str.includes(val);
    }

    /**
     * hasMatch - Checks if the given string 'str' has a match for given RegExp
     *
     * @param {string} str
     * @param {RegExp} pattern
     *
     * @returns {bool}
     */
    hasMatch(str, pattern) {
        return RegExp(pattern).test(str);
    }

    /**
     * execMacro - execute the given Function and returns the result based on that
     *
     * @param {mixed} val
     * @param {Function} fn
     *
     * @returns {bool}
     */
    execMacro(val, fn) {
        if (fn instanceof Function) {
            return fn(val);
        }

        return false;
    }

    /**
     * check - compare the given 'a' and 'b' based on 'op'
     *
     * @param {mixed} a
     * @param {string} op
     * @param {mixed} b
     *
     * @returns {bool}
     */
    check(a, op, b) {
        if (!(op in this.condMapper)) {
            throw Error('Invalid where condition given');
        }

        return this[this.condMapper[op]](a, b);
    }
}

module.exports = Matcher;
