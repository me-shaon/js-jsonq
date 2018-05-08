class Matcher {
    constructor() {
        this.condMapper = {
            '=': 'isEqual',
            '!=': 'isNotEqual',
            '>': 'isGreater',
            '<': 'isSmaller',
            '>=': 'isGreaterOrEqual',
            '<=': 'isSmallerOrEqual',
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

    match(left_val, op, right_val) {
      return this[this.condMapper[op]](left_val, right_val);
    }
}

module.exports = Matcher
