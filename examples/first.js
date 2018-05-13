/*
Example of first() API
---------------------
Find the first element of the collection
*/
const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

const element = Q.from('products').first();
console.log('-------- Printing First Element ---------');
console.log(element);
