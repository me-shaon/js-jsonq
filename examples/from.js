/*
Example of from() API
---------------------
You need to pass a path string to the from()
API to get the desired result.
If you want to traverse to multi-level hierarchy,
just separate the properties by '.'.
*/
const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

//To get a direct property 'users' from Json
const users = Q.from('users')
    .where('id', '=', 1)
    .fetch();
console.log('-------- Printing Users ---------');
console.log(users);

// Resetting the instance to initial state
// because the previous at() query changed it internal state
Q = Q.reset();

const userVisits = Q.from('users.5.visits')
    .where('year', '=', 2011)
    .fetch();
console.log('-------- Printing User Visits ---------');
console.log(userVisits);
