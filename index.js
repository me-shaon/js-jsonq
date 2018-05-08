const path = require('path');
const fs = require('fs');

class JsonQuery {
    constructor(filepath = '') {
        this.setPath(filepath);
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

            this.jsonContent = JSON.parse(this.rawContent);
        }
    }

    setPath(filepath) {
        this.filePath = filepath;
        this._parseJsonFromFile();
    }

    get() {
        return this.jsonContent;
    }

    _fetch(key, data) {
        if (!(key in data)) {
            throw Error('Data not exists');
        }

        return this.jsonContent[key];
    }

    from(path) {
        const keyParts = path
            .trim()
            .split('.')
            .filter(val => val != '');

        for (const key of keyParts) {
            this.jsonContent = this._fetch(key, this.jsonContent);
        }

        return this;
    }

    prepare() {
        return this;
    }

    find(path = '') {
        return this.from(path)
            .prepare()
            .get();
    }
}

module.exports = JsonQuery;
