/*
Example of copy() API
---------------------
It will return a complete new instance by cloning the current object.
*/
const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

const users = Q.at('users').where('id', '=', 1);
const copy = Q.copy();
console.log('-------- Printing Users ---------');
console.log(users.fetch());

console.log(copy.count());
