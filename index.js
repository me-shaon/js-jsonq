const path = require('path');
const fs = require('fs');

class JsonQuery {
    constructor(filepath = '') {
        this.setPath(filepath);
        this._resetQueries();

        this._condMapper = {
            '=': '_equals',
            '!=': '_notEquals'
        };
    }

    _resetQueries() {
        this._queries = [];
        this._currentQueryInd = 0;
    }

    import(filepath) {}

    _parseJsonFromFile() {
        if (this.filePath != '') {
            if (path.extname(this.filePath) != '.json') {
                throw Error('Not a valid Json File');
            }

            this.rawContent = fs.readFileSync(
                path.resolve(__dirname, this.filePath)
            );

            this._jsonContent = JSON.parse(this.rawContent);
        }
    }

    setPath(filepath) {
        this.filePath = filepath;
        this._parseJsonFromFile();
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
                    andPassed &= this[this._condMapper[query.op]](
                        elem[query.key],
                        query.val
                    );
                }

                orPassed |= andPassed;
            }

            return orPassed;
        });
    }

    find(path = '') {
        return this.from(path)
            .prepare()
            .get();
    }

    _insertQuery(query) {
        const index = this._currentQueryInd;
        if (!(index in this._queries)) {
            this._queries.push([]);
        }

        this._queries[index].push(query);
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

    _equals(left_val, right_val) {
        return left_val == right_val;
    }

    _notEquals(left_val, right_val) {
        return left_val != right_val;
    }

    sum(column) {
        return this._jsonContent.reduce((acc, current) => {
            return Number(acc) + Number(current[column]);
        }, 0);
    }
}

module.exports = JsonQuery;
