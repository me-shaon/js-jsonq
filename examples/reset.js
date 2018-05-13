/*
Example of reset() API
---------------------
You can pass a JSON file path, or a JSON string or a JSON Object as parameter to this method.
If no data passed in the `data` parameter, the `jsonQ` Object instance will be reset to
previously initialized data.
*/
const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

const users = Q.at('users')
    .where('id', '=', 1)
    .fetch();
console.log('-------- Printing Users ---------');
console.log(users);

// Resetting the instance to initial state
// because the previous at() query changed it internal state
Q = Q.reset();

const userVisits = Q.at('users.5.visits')
    .where('year', '=', 2011)
    .fetch();
console.log('-------- Printing User Visits ---------');
console.log(userVisits);

//You can reset the instance to a different set of Data
Q = Q.reset([1, 2, 5]);

const count = Q.count();
console.log('-------- Printing Count ---------');
console.log(count);
