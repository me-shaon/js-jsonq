const Matcher = require('./Matcher');

class QueryManager {
    /**
     * constructor
     *
     * @returns
     */
    constructor() {
        this._matcher = new Matcher();
        this.init();
    }

    /**
     * init - initialize the QueryManager instance
     *
     * @returns
     */
    init() {
        this._queries = [];
        this._currentQueryInd = 0;
    }

    /**
     * reset - reset the _queries and _currentQueryInd values to initial state
     *
     * @returns
     */
    reset() {
        this.init();
    }

    /**
     * createQueryGroup - increment the _currentQueryInd to add another Or query
     *
     * @returns
     */
    createQueryGroup() {
        this._currentQueryInd++;
    }

    /**
     * insertQuery - insert a new query to the _queries list
     *
     * @param {Object} query Objcet of the form {'key': key, 'op': op, 'val': val}
     *
     * @returns
     */
    insertQuery(query) {
        const index = this._currentQueryInd;
        if (!(index in this._queries)) {
            this._queries.push([]);
        }

        this._queries[index].push(query);
    }

    /**
     * _executeQueries - execute and filter given data based on the queries added
     * in the _queries list
     *
     * @param {Array} data
     *
     * @returns {Array} filtered data
     */
    _executeQueries(data) {
        return data.filter(elem => {
            let orPassed = false;
            for (const queryList of this._queries) {
                let andPassed = true;
                for (const query of queryList) {
                    andPassed &= this._matcher.check(
                        elem[query.key],
                        query.op,
                        query.val
                    );
                }

                orPassed |= andPassed;
            }

            return orPassed;
        });
    }

    /**
     * prepare - execute the queries and filter the data based on that
     *
     * @param {Array} data
     *
     * @returns {Array} filtered data
     */
    prepare(data) {
        if (this._queries.length > 0) {
            data = this._executeQueries(data);

            this._queries = [];
            this._currentQueryInd = 0;
        }

        return data;
    }
}

module.exports = QueryManager;
