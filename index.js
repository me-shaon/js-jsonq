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

        this._resetQueries();

        return this;
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    fetch() {
        this._prepare();
        return this._jsonContent;
    }

    _get(key, data) {
        if (!(key in data)) {
            throw Error('Data not exists');
        }

        return this._jsonContent[key];
    }

    at(path) {
        const keyParts = path
            .trim()
            .split('.')
            .filter(val => val != '');

        for (const key of keyParts) {
            this._jsonContent = this._get(key, this._jsonContent);
        }

        return this;
    }

    _prepare() {
        if (this._queries.length > 0) {
            this._executeQueries();
            this._resetQueries();
        }
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
        return this.at(path).fetch();
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

    whereStartsWith(key, val) {
        this.where(key, 'startswith', val);

        return this;
    }

    whereEndsWith(key, val) {
        this.where(key, 'endswith', val);

        return this;
    }

    whereContains(key, val) {
        this.where(key, 'contains', val);

        return this;
    }

    /* ---------- Aggregate Methods -------------c */
    sum(property) {
        this._prepare();

        return this._jsonContent.reduce(
            (acc, current) =>
                Number(acc) + Number(column ? current[property] : current),
            0
        );
    }

    count() {
        this._prepare();

        return this._jsonContent.length;
    }

    max(property) {
        this._prepare();

        return this._jsonContent.reduce((max, current) => {
            const elem = property ? current[property] : current;

            return max > elem ? max : elem;
        }, property ? this._jsonContent[0][property] : this._jsonContent[0]);
    }

    min(property) {
        this._prepare();

        return this._jsonContent.reduce((min, current) => {
            const elem = property ? current[property] : current;

            return min < elem ? min : elem;
        }, property ? this._jsonContent[0][property] : this._jsonContent[0]);
    }

    avg(property) {
        this._prepare();

        return this.sum(property) / this.count();
    }

    first() {
        this._prepare();

        return this.count() > 0 ? this._jsonContent[0] : null;
    }

    last() {
        this._prepare();

        return this.count() > 0 ? this._jsonContent[this.count() - 1] : null;
    }

    nth(index) {
        this._prepare();

        const abs_index = Math.abs(index);

        if (!Number.isInteger(index) || this.count() < abs_index || index == 0)
            return null;

        return index > 0
            ? this._jsonContent[index - 1]
            : this._jsonContent[this.count() + index];
    }

    exists() {
        this._prepare();

        if (Array.isArray(this._jsonContent) && this._jsonContent.length > 0) {
            return true;
        } else if (this._jsonContent) {
            return true;
        }

        return false;
    }

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
}

module.exports = JsonQuery;
