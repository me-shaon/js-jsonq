/*
Example of orWhere() API
---------------------
orWhere() method can take three parameters: 'key', 'op', 'val'

* `key` -- the property name of the data. Or you can pass a Function here to group multiple query inside it. See details in [example]('./examples/where.js')
* `val` -- value to be matched with. It can be a _int_, _string_, _bool_ or even _Function_ - depending on the `op`.
* `op` -- operand to be used for matching. The following operands are available to use:

    * `=` : For weak equality matching
    * `eq` : Same as `=`
    * `!=` : For weak not equality matching
    * `neq` : Same as `!=`
    * `==` : For strict equality matching
    * `seq` : Same as `==`
    * `!==` : For strict not equality matching
    * `sneq` : Same as `!==`
    * `>` : Check if value of given **key** in data is Greater than **val**
    * `gt` : Same as `>`
    * `<` : Check if value of given **key** in data is Less than **val**
    * `lt` : Same as `<`
    * `>=` : Check if value of given **key** in data is Greater than or Equal of **val**
    * `gte` : Same as `>=`
    * `<=` : Check if value of given **key** in data is Less than or Equal of **val**
    * `lte` : Same as `<=`
    * `null` : Check if the value of given **key** in data is **null** (`val` parameter in `where()` can be omitted for this `op`)
    * `notnull` : Check if the value of given **key** in data is **not null** (`val` parameter in `where()` can be omitted for this `op`)
    * `in` : Check if the value of given **key** in data is exists in given **val**. **val** should be a plain _Array_.
    * `notin` : Check if the value of given **key** in data is not exists in given **val**. **val** should be a plain _Array_.
    * `startswith` : Check if the value of given **key** in data starts with (has a prefix of) the given **val**. This would only works for _String_ type data.
    * `endswith` : Check if the value of given **key** in data ends with (has a suffix of) the given **val**. This would only works for _String_ type data.
    * `contains` : Check if the value of given **key** in data has a substring of given **val**. This would only works for _String_ type data.
    * `match` : Check if the value of given **key** in data has a Regular Expression match with the given **val**. The `val` parameter should be a **RegExp** for this `op`.
    * `macro` : It would try to match the value of given **key** in data executing the given `val`. The `val` parameter should be a **Function** for this `op`. This function should have a matching logic inside it and return **true** or **false** based on that.
*/

const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

const users = Q.from('users')
    .where('id', '=', 1)
    .orWhere('id', '=', 2)
    .fetch();
console.log('-------- Printing Users ---------');
console.log(users);

// resetting the instance to initial state
Q = q.reset();

//You can pass a anonymous function in 'orWhere' to group multiple conditions
const result = Q.from('users')
    .where('id', '=', 1)
    .orWhere(function(q) {
        q.where('id', '=', 2).where('city', '!=', 'Barishal');
    })
    .fetch();

console.log('-------- Printing Query result ---------');
console.log(result);
