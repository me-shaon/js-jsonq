/*
Example of count() API
---------------------
It will return the number of elements in the collection.
*/
const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

const count = Q.from('products').count();
console.log('-------- Printing Count ---------');
console.log(count);
