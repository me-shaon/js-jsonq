/*
Example of nth() API
---------------------
Find the nth element of the collection.
You need to pass the 'index' parameter as in position of the element to get the nth element.
*/
const jsonQ = require('../index.js');
let Q = new jsonQ(__dirname + '/data.json');

const element = Q.from('products').nth(2);
console.log('-------- Printing Second Element ---------');
console.log(element);

Q = Q.reset();

const result = Q.from('products').nth(-2);

console.log('-------- Printing Second Element from the last ---------');
console.log(result);
