/*
Example of last() API
---------------------
Find the last element of the collection
*/
const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

const element = Q.from('products').last();
console.log('-------- Printing Last Element ---------');
console.log(element);
