const path = require('path');
const fs = require('fs');
const Matcher = require('./Matcher');

class JsonQuery {
    constructor(filePath = '') {
        if (filePath != '') {
            this.setPath(filePath.trim());
        }

        this._resetQueries();
        this._matcher = new Matcher();
    }

    setPath(filePath) {
        this._parseJsonFromFile(filePath);

        return this;
    }

    _resetQueries() {
        this._queries = [];
        this._currentQueryInd = 0;
    }

    _parseJsonFromFile(filePath) {
        if (filePath == '' || path.extname(filePath) != '.json') {
            throw Error('Not a valid Json File');
        }

        this._rawContent = fs.readFileSync(path.resolve(__dirname, filePath));

        this.json(JSON.parse(this._rawContent));
    }

    json(jsonObject) {
        if (!(Array.isArray(jsonObject) || jsonObject instanceof Object)) {
            throw Error('Invalid Json data');
        }

        this._baseContent = jsonObject;

        this.reset(this._baseContent);

        return this;
    }

    reset(data) {
        data = data || this._baseContent;

        if (Array.isArray(data)) {
            this._jsonContent = Array.from(data);
        } else {
            this._jsonContent = Object.assign({}, data);
        }

        return this;
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    fetch() {
        return this._jsonContent;
    }

    _get(key, data) {
        if (!(key in data)) {
            throw Error('Data not exists');
        }

        return this._jsonContent[key];
    }

    from(path) {
        const keyParts = path
            .trim()
            .split('.')
            .filter(val => val != '');

        for (const key of keyParts) {
            this._jsonContent = this._get(key, this._jsonContent);
        }

        return this;
    }

    prepare() {
        if (this._queries.length > 0) {
            this._executeQueries();
            this._resetQueries();
        }

        return this;
    }

    _executeQueries() {
        this._jsonContent = this._jsonContent.filter(elem => {
            let orPassed = false;
            for (const queryList of this._queries) {
                let andPassed = true;
                for (const query of queryList) {
                    andPassed &= this._matcher.match(
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

    _insertQuery(query) {
        const index = this._currentQueryInd;
        if (!(index in this._queries)) {
            this._queries.push([]);
        }

        this._queries[index].push(query);
    }

    /* ---------- Query Methods ------------- */
    find(path = '') {
        return this.from(path)
            .prepare()
            .get();
    }

    where(key, op, val) {
        if (key instanceof Function) {
            key(this);
        } else {
            this._insertQuery({ key, op, val });
        }

        return this;
    }

    orWhere(key, op, val) {
        this._currentQueryInd++;
        if (key instanceof Function) {
            key(this);
        } else {
            this._insertQuery({ key, op, val });
        }

        return this;
    }

    whereIn(key, val) {
        this.where(key, 'in', val);

        return this;
    }

    whereNotIn(key, val) {
        this.where(key, 'notin', val);

        return this;
    }

    whereNull(key) {
        this.where(key, 'null');

        return this;
    }

    whereNotNull(key) {
        this.where(key, 'notnull');

        return this;
    }

    /* ---------- Aggregator Methods -------------c */
    sum(column) {
        return this._jsonContent.reduce(
            (acc, current) => Number(acc) + Number(current[column]),
            0
        );
    }
}

module.exports = JsonQuery;
