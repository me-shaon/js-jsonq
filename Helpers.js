/**
 * parseJson - parse Json Data from a given filePath
 * or a Json String or Json Object
 *
 * @param {string|Object} json
 *
 * @returns {Object} the parsed Json Object
 * @throws {Error}
 */
const parseJson = json => {
    let jsonObject = json;

    if (
        (typeof json === 'string' || json instanceof String) &&
        json.endsWith('.json')
    ) {
        jsonObject = require.resolve(`${json}`);
    }

    if (typeof jsonObject === 'string' || jsonObject instanceof String) {
        try {
            jsonObject = JSON.parse(json);
        } catch (e) {
            throw Error('Invalid Json data');
        }
    }

    if (!(Array.isArray(jsonObject) || jsonObject instanceof Object)) {
        throw Error('Invalid Json data');
    }

    return jsonObject;
};

/**
 * getByProperty - get the content of the Data by the given property
 *
 * @param {string} property
 * @param {Array|Object} data
 *
 * @returns {mixed}
 * @throws {Error}
 */
const getByProperty = (property, data) => {
    if (!(property in data)) {
        throw Error('Data not exists');
    }

    return data[property];
};

/**
 * compare - compare the values based on the given ordering (could be ascending,
 * descending or by the given method )
 *
 * @param {int|float|string} a
 * @param {int|float|string} b
 * @param {string|Function} order
 *
 * @returns {int} 0 or 1 or -1
 */
const compare = (a, b, order) => {
    //if a comparison method is given as third parameter
    if (order instanceof Function) {
        return order(a, b);
    } else {
        if (typeof a === 'string' || a instanceof String) {
            a = a.toLowerCase();
        }

        if (typeof b === 'string' || b instanceof String) {
            b = b.toLowerCase();
        }

        //comparison
        if (a < b) {
            return order == 'asc' ? -1 : 1;
        } else if (a > b) {
            return order == 'asc' ? 1 : -1;
        }

        return 0;
    }
};

module.exports = {
    parseJson,
    getByProperty,
    compare
};
