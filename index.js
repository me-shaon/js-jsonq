const { parseJson, getByProperty, compare } = require('./Helpers');
const QueryManager = require('./QueryManager');

class JSJsonQ {
    /**
     * constructor - A JSJsonQ Object can be initialized with a filepath{type: string}
     * or a Json String{type: string} or a Json Object {type: Object}
     *
     * @param {string|Object} json required
     *
     * @returns
     * @throws {Error}
     */
    constructor(json) {
        if (!json) {
            throw Error(
                'You must pass a filePath or a Json Object or a Json String as parameter'
            );
        }

        this._baseContent = parseJson(json);

        this._queryManager = new QueryManager();

        this.reset();
    }

    /**
     * reset - A JsonQuery Object can be reset to new data according to the
     * given filepath{type: string} or a Json String{type: string}
     * or a Json Object {type: Object}.
     * The method parameter 'data' is optional. If no 'data' given,
     * the JsonQuery Object will be reset to the previously initialized data.
     * All the query and processing done so far will be reset to initial state too.
     *
     * @param {string|Object} data optional
     *
     * @returns {JsonQuery} Object reference
     */
    reset(data) {
        data = parseJson(data || this._baseContent);

        if (Array.isArray(data)) {
            this._jsonContent = Array.from(data);
        } else {
            this._jsonContent = Object.assign({}, data);
        }

        this._queryManager.reset();

        return this;
    }

    /**
     * copy - Clone and return the exact same copy of the this Object instance
     *
     * @returns {JsonQuery}
     */
    copy() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    /**
     * _prepare - Pseudo private method to process data based on the queries
     *
     * @returns {None}
     */
    _prepare() {
        this._jsonContent = this._queryManager.prepare(this._jsonContent);
    }

    /**
     * fetch - get the processed data after executing queries
     *
     * @returns {mixed}
     */
    fetch() {
        this._prepare();

        return this._jsonContent;
    }

    /**
     * at - get the data traversing through the given path hierarchy
     * Will return the JsonQuery Object instance, so that further
     * Query can be done on that data
     *
     * @param {string} path path hierarchy as a string, separated by '.'
     *
     * @returns {JsonQuery} Object reference
     */
    at(path) {
        const keyParts = path
            .trim()
            .split('.')
            .filter(val => val != '');

        for (const key of keyParts) {
            this._jsonContent = getByProperty(key, this._jsonContent);
        }

        return this;
    }

    /**
     * from - Alias method of at()
     *
     * @param {type} path Description
     *
     * @returns {type} Description
     */
    from(path) {
        return this.at(path);
    }

    /* ------------------------- Query Methods ------------------------- */

    /**
     * find - get the data traversing through the given path hierarchy
     * works like at() method, except it will return the processed data.
     * So, no further query method can be chained on it.
     *
     * @param {type} path Description
     *
     * @returns {mixed} Description
     * @throws {Error}
     */
    find(path) {
        if (!path) {
            throw Error('Invalid parameter given');
        }
        return this.at(path).fetch();
    }

    /**
     * where - This method is avaialble to run different types of Query on data,
     * such as if the given key is equal to, not equal to, greater than, less than
     * etc.
     * Details can be found at Example.
     *
     * @param {string} key 'key' to be searched for
     * @param {string} op  operator (valid operator lists are defined in Matcher Class)
     * @param {mixed|Function} val can be a data or an anonymous function
     *
     * @returns {JsonQuery} Object instance
     */
    where(key, op, val) {
        if (key instanceof Function) {
            key(this);
        } else {
            this._queryManager.insertQuery({ key, op, val });
        }

        return this;
    }

    /**
     * orWhere - This method is avaialble to run different types of Query on data,
     * such as if the given key is equal to, not equal to, greater than, less than
     * etc. These queries will be ORed with other queries.
     * Details can be found at Example.
     *
     * @param {string} key 'key' to be searched for
     * @param {string} op  operator (valid operator lists are defined in Matcher Class)
     * @param {mixed|Function} val can be a data or an anonymous function
     *
     * @returns {JsonQuery} Object instance
     */
    orWhere(key, op, val = null) {
        // For a 'Or' type query, every time a new Query group will be created
        this._queryManager.createQueryGroup();

        if (key instanceof Function) {
            key(this);
        } else {
            this._queryManager.insertQuery({ key, op, val });
        }

        return this;
    }

    /**
     * whereIn - alias for method call: where(key, 'in', array)
     *
     * @param {string} key 'key' to be searched for
     * @param {mixed|Function} val can be a data or an anonymous function
     *
     * @returns {JsonQuery} Object instance
     */
    whereIn(key, val) {
        return this.where(key, 'in', val);
    }

    /**
     * whereNotIn - alias for method call: where(key, 'notin', array)
     *
     * @param {string} key 'key' to be searched for
     * @param {mixed|Function} val can be a data or an anonymous function
     *
     * @returns {JsonQuery} Object instance
     */
    whereNotIn(key, val) {
        return this.where(key, 'notin', val);
    }

    /**
     * whereNull - alias for method call: where(key, 'null')
     *
     * @param {string} key 'key' to be searched for
     *
     * @returns {JsonQuery} Object instance
     */
    whereNull(key) {
        return this.where(key, 'null');
    }

    /**
     * whereNotNull - alias for method call: where(key, 'notnull')
     *
     * @param {string} key 'key' to be searched for
     *
     * @returns {JsonQuery} Object instance
     */
    whereNotNull(key) {
        return this.where(key, 'notnull');
    }

    /**
     * whereStartsWith - alias for method call: where(key, 'startswith', val)
     *
     * @param {string} key 'key' to be searched for
     * @param {mixed|Function} val can be a data or an anonymous function
     *
     * @returns {JsonQuery} Object instance
     */
    whereStartsWith(key, val) {
        return this.where(key, 'startswith', val);
    }

    /**
     * whereEndsWith - alias for method call: where(key, 'endswith', val)
     *
     * @param {string} key 'key' to be searched for
     * @param {mixed|Function} val can be a data or an anonymous function
     *
     * @returns {JsonQuery} Object instance
     */
    whereEndsWith(key, val) {
        return this.where(key, 'endswith', val);
    }

    /**
     * whereContains - alias for method call: where(key, 'contains', val)
     *
     * @param {string} key 'key' to be searched for
     * @param {mixed|Function} val can be a data or an anonymous function
     *
     * @returns {JsonQuery} Object instance
     */
    whereContains(key, val) {
        return this.where(key, 'contains', val);
    }

    /* --------------------- Aggregate Methods ------------------------- */

    /**
     * sum - If a 'property' given as parameter this method will return the summation
     * result of the collection contains that property, otherwise it will assume
     * that the collection is an integer array and just return sum of all of them
     *
     * @param {string} property
     *
     * @returns {int|float}
     */
    sum(property) {
        this._prepare();

        return this._jsonContent.reduce(
            (acc, current) =>
                Number(acc) + Number(property ? current[property] : current),
            0
        );
    }

    /**
     * count - returns the size of the collection
     *
     * @returns {int}
     */
    count() {
        this._prepare();

        return this._jsonContent.length;
    }

    /**
     * size - returns the size of the collection
     *
     * @returns {int}
     */
    size() {
        return this.count();
    }

    /**
     * max - If a 'property' given as parameter this method will return the maximum
     * value of the collection contains that property, otherwise it will assume
     * that the collection is an integer array and just return maximum of them
     *
     * @param {string} property
     *
     * @returns {int|float}
     */
    max(property) {
        this._prepare();

        return this._jsonContent.reduce((max, current) => {
            const elem = property ? current[property] : current;

            return max > elem ? max : elem;
        }, property ? this._jsonContent[0][property] : this._jsonContent[0]);
    }

    /**
     * min - If a 'property' given as parameter this method will return the minimum
     * value of the collection contains that property, otherwise it will assume
     * that the collection is an integer array and just return minimum of them
     *
     * @param {string} property
     *
     * @returns {int|float}
     */
    min(property) {
        this._prepare();

        return this._jsonContent.reduce((min, current) => {
            const elem = property ? current[property] : current;

            return min < elem ? min : elem;
        }, property ? this._jsonContent[0][property] : this._jsonContent[0]);
    }

    /**
     * avg - returns the average of the result by summing up the values of
     * given property divided by their count
     *
     * @returns {int|float}
     */
    avg(property) {
        this._prepare();

        return this.sum(property) / this.count();
    }

    /**
     * first - Returns the first element of the collection
     *
     * @returns {mixed}
     */
    first() {
        this._prepare();

        return this.count() > 0 ? this._jsonContent[0] : null;
    }

    /**
     * last - Returns the last element of the collection
     *
     * @returns {mixed}
     */
    last() {
        this._prepare();

        return this.count() > 0 ? this._jsonContent[this.count() - 1] : null;
    }

    /**
     * nth - Returns the nth element of the collection by the given index (n)
     * if the given index is negative, such as -2, it will return the value of
     * nth index from the end.
     *
     * @returns {mixed}
     */
    nth(index) {
        this._prepare();

        const abs_index = Math.abs(index);

        if (!Number.isInteger(index) || this.count() < abs_index || index == 0)
            return null;

        return index > 0
            ? this._jsonContent[index - 1]
            : this._jsonContent[this.count() + index];
    }

    /**
     * exists - Check if the content is empty or null
     *
     * @returns {boolean}
     */
    exists() {
        this._prepare();

        if (Array.isArray(this._jsonContent)) {
            return this._jsonContent.length > 0;
        } else if (
            this._jsonContent instanceof Object &&
            this._jsonContent.constructor === Object
        ) {
            return Object.keys(this._jsonContent).length > 0;
        }

        return !!this._jsonContent;
    }

    /**
     * groupBy - return the grouped result by the given property
     *
     * @param {string} property
     *
     * @returns {Array}
     */
    groupBy(property) {
        if (!property) {
            throw Error(
                `A 'property' parameter must be given to groupBy() method`
            );
        }

        this._prepare();

        const groupedData = {};

        this._jsonContent.forEach(data => {
            if (property in data) {
                if (!(data[property] in groupedData)) {
                    groupedData[data[property]] = [];
                }

                groupedData[data[property]].push(data);
            }
        });

        this._jsonContent = groupedData;

        return this;
    }

    /**
     * sort - return the sorted result of the given collection.
     * By default, the result would be sorted as 'Ascending'. If you want to
     * sort the result as 'Descending', pass 'desc' as the parameter.
     * If you want to define a different logic for sorting, pass a compare
     * Function as parameter.
     *
     * This method should be used for array of integers or floats.
     * If you want to sort an array of Objects by a specific property,
     * use sortBy() method.
     *
     * @param {string|Function} [order=asc]
     *
     * @returns {mixed}
     */
    sort(order = 'asc') {
        this._prepare();

        if (!Array.isArray(this._jsonContent)) {
            return this;
        }

        this._jsonContent.sort((a, b) => {
            return compare(a, b, order);
        });

        return this;
    }

    /**
     * sortBy - return the sorted result of the given collection by the given
     * property.
     * By default, the result would be sorted as 'Ascending'. If you want to
     * sort the result as 'Descending', pass 'desc' as the second parameter.
     * If you want to define a different logic for sorting, pass a compare
     * Function as second parameter.
     *
     * This method should be used for array of Objects.
     * If you want to sort an array of integers or floats, use sort() method.
     *
     * @param {string} property
     * @param {string|Function} property
     * @returns {mixed}
     * @throws {Error}
     */
    sortBy(property, order = 'asc') {
        if (!property) {
            throw Error(
                `A 'property' parameter must be given to sortAs() method`
            );
        }

        this._prepare();

        if (!Array.isArray(this._jsonContent)) {
            return this;
        }

        this._jsonContent.sort((a, b) => {
            if (a instanceof Object && property in a) {
                a = a[property];
            }

            if (b instanceof Object && property in b) {
                b = b[property];
            }

            return compare(a, b, order);
        });

        return this;
    }
}

module.exports = JSJsonQ;
